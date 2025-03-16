import { database } from "@/lib/mysql"

export async function DELETE(req, {params}) {
    try {
        const authorizedAdminId = req.headers.get("x-admin-id")
        const {absenceId} = await params
        const searchQuery = `SELECT D.admin_id
        FROM Absences A
        JOIN Teachers T ON A.teacher_id = T.teacher_id
        JOIN Admins D ON T.admin_id = D.admin_id
        WHERE A.absence_id = ?
        `
        const [adminOfAbsence] = await database.execute(searchQuery, [absenceId])
        if (!adminOfAbsence.length) {
            return Response.json({status : "FAILED", message : "Absence doesn't exist or its admin is unknown !"}, {status : 400})
        }
        if (adminOfAbsence[0].admin_id != authorizedAdminId) {
            return Response.json({status : "FAILED", message : "Unauthorized ! this absence doesn't belong to this admin"}, {status : 401})
        }
        await database.execute("DELETE FROM Absences WHERE absence_id = ?", [absenceId])
        return Response.json({status : "SUCCESS", message : "Absence deleted successfully !"}, {status : 200})
    } catch(err) {
        return Response.json({status : "FAILED", message : err.message}, {status : 500})
    }
}