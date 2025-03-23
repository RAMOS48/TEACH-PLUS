
import {database} from "@/lib/mysql"

export async function GET(req : Request, context: { params: { id: string } }) {
  try {
    const {id} = await context.params
    const authorizedAdminId = req.headers.get("x-admin-id")
    const [rows]:any = await database.query("SELECT * FROM Teachers WHERE teacher_id = ? AND admin_id = ?", [id, authorizedAdminId]); 
    if (!rows.length) {
      return Response.json({status : "FAILED", message : "Teacher not found or doesn't belong to this admin !"}, {status : 400 })
    }
    const [rank] = await database.execute("SELECT rank FROM Ranks WHERE teacher_id = ? AND starting_date >= ALL (SELECT starting_date FROM Ranks) LIMIT 1;", [id])
    if (rank.length) {
      return Response.json({status : "SUCCESS", message : "Teacher found successfully !", teacher : Object.assign({}, rows[0], rank[0])}, {status : 200})
    }
    else {
      return Response.json({status : "SUCCESS", message : "Teacher found successfully !", teacher : rows[0]}, {status : 200});
    }
  } catch (error) {
    return Response.json({ error: "Database query failed" }, {status : 500});
  }
}
export async function PUT(req : Request, context : {params : {id : string}}) {
  try {
    const authorizedAdminId = req.headers.get("x-admin-id")
    const {id} = await context.params;
    const [adminOfTeacher] : any = await database.execute("SELECT admin_id FROM Teachers WHERE teacher_id = ?", [id])
    if (!adminOfTeacher.length) {
      return Response.json({status : "FAILED", message : "Teacher not found or his admin is unkown !"}, {status : 404})
    }
    if (adminOfTeacher[0].admin_id != authorizedAdminId) {
      return Response.json({status : "FAILED", message : "Unauthorized ! this teacher doesn't belong to this admin"}, {status : 401})
    }

    const { firstName, familyName, email, picture, phoneNumber, dateOfBirth, extraHoursOutside, bio, isActive  } = await req.json();

    const [teachersWithSameEmail]: any = await database.execute("SELECT * FROM Teachers WHERE email = ? AND teacher_id != ?", [email,id])
    const [teachersWithSamePhoneNumber] : any = await database.execute("SELECT * FROM Teachers WHERE phone_number = ? AND teacher_id != ?", [phoneNumber, id])

    if (teachersWithSameEmail.length) {
      return Response.json({status : "FAILED", message : "Email must be unique !"}, {status : 400})
    }
    if (teachersWithSamePhoneNumber.length) {
      return Response.json({status : "FAILED", message : "Phone number must be unique !"}, {status : 400})
    }

    await database.query(
      "UPDATE Teachers SET first_name = ?, family_name = ?, email = ?, picture = ?, extra_hours_outside = ?, phone_number = ?, date_of_birth = ?, bio = ?, is_active = ? WHERE teacher_id = ?",
      [firstName, familyName, email, picture, extraHoursOutside, phoneNumber, dateOfBirth, bio, isActive, id]
    );
    return Response.json({ message: "Teacher updated successfully" }, {status : 200});
  } catch (error:any) {
    return Response.json({ error: "Database update failed", message : error.message }, {status : 500});
  }
}

export async function DELETE(req : Request, context : {params : {id : string}}) {
  try {
    const authorizedAdminId = req.headers.get("x-admin-id")
    const {id} = await context.params
    const [adminOfTeacher]: any = await database.execute("SELECT admin_id FROM Teachers WHERE teacher_id = ?", [id])
    if (!adminOfTeacher.length) {
      return Response.json({status : "FAILED", message : "Teacher not found or his admin is unknown !"}, {status : 404})
    }
    if (adminOfTeacher[0].admin_id != authorizedAdminId) {
      return Response.json({status : "FAILED", message : "Unauthorized ! this teacher doesn't belong to this admin"})
    }
    await database.execute("DELETE FROM Ranks WHERE teacher_id = ?", [id])
    await database.execute("DELETE FROM Absences WHERE teacher_id = ?", [id])
    const [sessions] = await database.execute("SELECT session_id FROM Sessions WHERE teacher_id = ?", [id])
    if (sessions.length) {
      sessions.forEach(async (session: {session_id: any}) => {
        await database.execute("DELETE FROM Absences WHERE session_id = ?", [session.session_id])
      })
    }
    await database.execute("DELETE FROM Sessions WHERE teacher_id = ?", [id])
    await database.execute("DELETE FROM Teachers WHERE teacher_id = ?", [id])
    return Response.json({status : "SUCCESS", message : "Teacher deleted successfully"})
  } catch(err) {
    return Response.json({status : "FAILED", message : err.message}, {status : 500})
  }
}
export async function PATCH(req : Request, context : {params : {id : string}}) {
  try {
    const authorizedAdminId = req.headers.get("x-admin-id")
    const {id} = await context.params
    const [adminOfTeacher]: any = await database.execute("SELECT admin_id FROM Teachers WHERE teacher_id = ?", [id])
    if (!adminOfTeacher.length) {
      return Response.json({status : "FAILED", message : "Teacher not found or his admin is unknown !"}, {status : 404})
    }
    if (adminOfTeacher[0].admin_id != authorizedAdminId) {
      return Response.json({status : "FAILED", message : "Unauthorized ! this teacher doesn't belong to this admin"})
    }
    await database.execute("UPDATE Teachers SET is_active = false WHERE teacher_id = ?", [id])
    return Response.json({status : "SUCCESS", message : "Teacher deleted logically !"}, {status : 200})
  } catch(err) {
    return Response.json({status : "FAILED", message : err.message}, {status : 500})
  }
}