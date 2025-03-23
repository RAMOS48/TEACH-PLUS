import { database } from "@/lib/mysql"
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const promo = searchParams.get("promo")
        const academicYear = searchParams.get("academicYear")
        const semester = searchParams.get("semester")
        const [timetable] = await database.execute("SELECT * FROM Sessions WHERE academic_level = ? AND academic_year = ? AND semester = ?", [promo, academicYear, semester])
        if (!timetable.length) {
            return Response.json({status : "FAILED", message : "Timetable not found !"}, {status : 404})
        }
        return Response.json({status : "SUCESS", message : "Timetable found successfully !", timetable : timetable}, {status : 200})
    } catch (err) {
        return Response.json({status : "FAILED", message : err.message}, {status : 500})
    }
}