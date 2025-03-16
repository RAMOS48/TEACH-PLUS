import { database } from "@/lib/mysql"

export async function GET(req) {
    try {
        const authorizedAdminId = req.headers.get("x-admin-id")
        const {searchParams} = new URL(req.url)
        if (!searchParams.get("teacherId")) {
            const searchQuery = `SELECT A.absence_id, A.teacher_id, A.session_id, A.date, A.caught_up, A.reason, A.created_at, A.updated_at
            FROM Absences A
            JOIN Teachers T ON A.teacher_id = T.teacher_id
            JOIN Admins D ON T.admin_id = D.admin_id
            WHERE D.admin_id = ?;
            `
            const [absences] = await database.execute(searchQuery, [authorizedAdminId])
            if (!absences.length) {
                return Response.json({status : "FAILED", message : "No absences found !"}, {status : 404})
            }
            return Response.json({status : "SUCCESS", message : "Absences found successfully !", absences : absences}, {status : 200})
        } else {
            const teacherId = searchParams.get("teacherId")
            const [adminOfTeacher] = await database.execute("SELECT admin_id FROM Teachers WHERE teacher_id = ?", [teacherId])
            if (!adminOfTeacher.length) {
                return Response.json({status : "FAILED", message : "Teacher doesn't exist or his admin is unknown !"}, {status : 404})
            }
            if (adminOfTeacher[0].admin_id != authorizedAdminId) {
                return Response.json({status : "FAILED", message : "Unauthorized ! This teacher doesn't belong to this admin"}, {status : 401})
            }
            const [absences] = await database.execute("SELECT * FROM Absences WHERE teacher_id = ?", [teacherId])
            return Response.json({status : "SUCCESS", message : "Absences found successfully !", absences : absences}, {status : 200})
        }
    } catch(err) {
        return Response.json({status : "FAILED", message : err.message}, {status : 500})
    }
}