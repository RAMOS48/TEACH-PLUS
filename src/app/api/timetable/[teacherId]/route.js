import { NextResponse } from "next/server";
import { database } from "@/lib/mysql"; 

export async function GET(req, { params }) { // 🔹 Utiliser { params }
    const { teacherId } = await params; // ✅ Correction ici

    if (!teacherId) {
        return NextResponse.json({ message: "teacherId est requis" }, { status: 400 });
    }

    try {
        const authorizedAdminId = req.headers.get("x-admin-id")
        const [adminOfTeacher] = await database.execute("SELECT admin_id FROM Teachers WHERE teacher_id = ?", [teacherId])
        if (!adminOfTeacher.length) {
            return Response.json({status : "FAILED", message : "Teacher not found or his admin is unknown !"}, {status : 404})
        }
        if (adminOfTeacher[0].admin_id != authorizedAdminId) {
            return Response.json({status : "FAILED", message : "Unauthorized ! this teacher doesn't belong to this admin"}, {status : 401})
        }

        const [rows] = await database.query(
            `SELECT * FROM Sessions WHERE teacher_id = ? ORDER BY day_of_week, start_time`,
            [teacherId]
        );

        return NextResponse.json({ timeTable: rows }, { status: 200 });

    } catch (error) {
        console.error("Erreur MySQL :", error);
        return NextResponse.json({ message: "Erreur serveur", error: error.message }, { status: 500 });
    }
}
