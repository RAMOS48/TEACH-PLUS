import { database } from "@/lib/mysql"

export async function POST(req) {
    try {
        const body = await req.json(); // Parse the request body
        const { promo, academicYear, semester } = body; // Extract values

        if (!promo || !academicYear || !semester) {
            return Response.json({ status: "FAILED", message: "Missing required fields" }, { status: 400 });
        }

        const [timetable] = await database.execute(
            "SELECT * FROM Sessions WHERE academic_level = ? AND academic_year = ? AND semester = ?", 
            [promo, academicYear, semester]
        );

        if (!timetable.length) {
            return Response.json({ status: "FAILED", message: "Timetable not found!" }, { status: 404 });
        }

        return Response.json({ 
            status: "SUCCESS", 
            message: "Timetable found successfully!", 
            timetable 
        }, { status: 200 });

    } catch (err) {
        return Response.json({ status: "FAILED", message: err.message }, { status: 500 });
    }
}