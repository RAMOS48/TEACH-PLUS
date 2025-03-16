import { database } from "@/lib/mysql"

export async function POST(req) {
    try {
        const authorizedAdminId = req.headers.get("x-admin-id")
        const [authorizedAdmin] = await database.execute("SELECT * from Admins WHERE admin_id = ?", [authorizedAdminId])
        if (!authorizedAdmin.length) {
            return Response.json({status : "FAILED", message : "Admin not found !"}, {status : 404})
        }
        let {teacherId, dayOfWeek, startTime, endTime, type, classroom, module, groupNumber, academicYear, academicLevel, semester} = await req.json()
        if ([teacherId, dayOfWeek, startTime, endTime, type, classroom, groupNumber, academicLevel, academicYear, semester].some((data) => data === undefined || data === "")) {
            return Response.json({status : "FAILED", message : "A required data field is missing !"}, {status : 400})
        }
        module = module || null
        
        const [adminOfTeacher] = await database.execute("SELECT admin_id FROM Teachers WHERE teacher_id = ?",[teacherId])
        if (!adminOfTeacher.length) {
            return Response.json({status : "FAILED", message : "Teacher doesn't exist or his admin is unknown !"}, {status : 404})
        }
        if (adminOfTeacher[0].admin_id != authorizedAdmin) {
            return Response.json({status : "FAILED", message : "Unauthorized ! This teacher doesn't belong to this admin"}, {status : 401})
        }
        const insertionQuery = `INSERT INTO Sessions(admin_id, teacher_id, day_of_week, start_time, end_time, type, module, classroom, group_number, academic_year, academic_level, semester, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)
        `
        await database.execute(insertionQuery, [authorizedAdminId, teacherId, dayOfWeek, startTime, endTime, type, module, classroom, groupNumber, academicYear, academicLevel, semester ])
        return Response.json({status : "SUCCESS", message : "Session added successfully !"}, {status : 200})
    } catch(err) {
        return Response.json({status : "FAILED", message : err.message}, {status : 500})
    }
}