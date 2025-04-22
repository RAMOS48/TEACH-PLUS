import { database } from "@/lib/mysql";
import { generateDatedSessions, getExtraSessions, groupSessionsByDate } from "@/lib/calculate"
export async function POST(req) {
    try {
        const { from, to, teacherId, academicYear, rankPrice } = await req.json();
        if (!from || !to || !teacherId || !academicYear || !rankPrice) {
            return Response.json({ status: "FAILED", message: "A required data field is missing" }, { status: 400 })
        }
        console.log("infos :" , teacherId , " " , from , " ", to , " ", rankPrice , " " , academicYear);
        
        const [sheet] = await database.execute(
            "SELECT * FROM Extra_hours_sheet WHERE teacher_id = ? AND `from` = ? AND `to` = ?",
            [teacherId, from, to]
        );
        console.log(sheet);
        
        if (sheet.length) {
            return Response.json({ status: "EXISTS", message: "Sheet already exists", sheet: sheet[0] }, { status: 200 })
        }
        else {
            const toDate = new Date(to)
            let semester
            if (toDate.getMonth() + 1 in [9, 10, 11, 12, 1]) {
                semester = "S1"
            }
            else {
                semester = "S2"
            }
            const [teacherTimetable] = await database.execute("SELECT * FROM Sessions WHERE teacher_id = ? AND academic_year = ? AND semester = ?", [teacherId, academicYear, semester])
            const [holidays] = await database.execute("SELECT * FROM Holidays WHERE academic_year = ?", [academicYear])
            const [absences] = await database.execute("SELECT * FROM Absences WHERE teacher_id = ?", [teacherId])
            const extraSessions = getExtraSessions(teacherTimetable)
            const datedExtraSessions = generateDatedSessions(new Date(from), new Date(to), extraSessions, holidays, absences)
            let sheetTotalHours = 0
            let extraDays = []
            for (const day of groupSessionsByDate(datedExtraSessions)) {
                sheetTotalHours += day.totalDuration
                const [extraDayResult] = await database.execute("INSERT INTO Extra_days (day, date, number_of_hours) VALUES (?, ?, ?)", [day.day_of_week, day.date, day.totalDuration])
                extraDays.push({ extra_day_id: extraDayResult.insertId, day: day.day_of_week, date: day.date, number_of_hours: day.totalDuration })
            }

            const [periodRank] = await database.execute("SELECT rank FROM Ranks WHERE teacher_id = ? AND starting_date <= ? ORDER BY starting_date DESC LIMIT 1", [teacherId, from])
            const [sheetResult] = await database.execute("INSERT INTO Extra_hours_sheet (teacher_id, `from`, `to`, rank, rank_price, extra_hours_number, amount_of_money, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())", [teacherId, from, to, periodRank[0], rankPrice, sheetTotalHours, sheetTotalHours * rankPrice])
            for (const day of extraDays) {
                await database.execute("UPDATE Extra_days SET sheet_id = ? WHERE extra_day_id = ?", [sheetResult.insertId, day.extra_day_id])
            }
            return Response.json({ status: "SUCCESS", message: "Successfully calculated extra hours !", sheet: { sheet_id: sheetResult.insertId, from: from, to: to, rank: periodRank[0].rank, rank_price: rankPrice, extra_hours_number: sheetTotalHours, amount_of_money: sheetTotalHours * rankPrice, teacher_id: teacherId }, extraDays: extraDays.map((e) => Object.assign({}, e, { sheet_id: sheetResult.insertId })) }, { status: 200 })
        }
    } catch (err) {
        console.error("Error in sheets route:", err)
        return Response.json({ status: "FAILED", message: err.message }, { status: 500 })
    }
}