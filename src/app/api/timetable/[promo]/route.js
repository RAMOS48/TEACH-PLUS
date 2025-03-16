import { database } from "@/lib/mysql"

export async function GET(req, {params}) {
    try {
        const {promo} = await params
        const [timetable] = await database.execute("SELECT * FROM Sessions WHERE academic_level = ?", [promo])
        if (!timetable.length) {
            return Response.json({status : "FAILED", message : "Timetable not found !"}, {status : 404})
        }
        return Response.json({status : "SUCESS", message : "Timetable found successfully !", timetable : timetable}, {status : 200})
    } catch(err) {
        return Response.json({status : "FAILED", message : err.message}, {status : 500})
    }
}