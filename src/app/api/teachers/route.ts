import { NextRequest, NextResponse } from 'next/server';
import {database} from '@/lib/mysql'; // Assure-toi que le chemin est correct

// 🔹 GET : Récupérer tous les enseignants
export async function GET(req : NextRequest) {
  try {
    const {searchParams} = new URL(req.url)
    if (searchParams.get("adminId")) {
      const authorizedAdminId = req.headers.get("x-admin-id")
      if (searchParams.get("adminId") != authorizedAdminId) {
        return NextResponse.json({status : "FAILED", message : "Unauthorized ! the requested admin is not the same as the logged in admin"}, {status : 401})
      }
      const [teachers] = await database.execute("SELECT * FROM Teachers WHERE admin_id = ?", [authorizedAdminId])
      if (!teachers) {
        return NextResponse.json({status : "FAILED", message : "Teachers not found !"}, {status : 404})
      }
      return NextResponse.json({status : "SUCCESS", message : "Teachers found successfully !", teachers : teachers}, {status : 200})
    }
    else {
      const [rows]: any = await database.query("SELECT * FROM Teachers;");
      return NextResponse.json(rows, { status: 200 });
    }
  }catch (error) {
    console.error("Error fetching teachers:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error"; // ✅ Vérification du type
  
    return NextResponse.json({ 
      error: "Internal Server Error", 
      message: errorMessage 
    }, { status: 500 });
  }
}  

// 🔹 POST : Ajouter un enseignant
export async function POST(req: Request) {
  try {
    const authorizedAdminId = req.headers.get("x-admin-id")
    const body = await req.json();
    let { firstName, familyName, email, picture, phoneNumber, dateOfBirth, extraHoursOutside, bio  } = body;
    if (!firstName || !familyName || !email) {
      return NextResponse.json({status : "FAILED", message : "A required data filed is missing !"}, {status : 400})
    }
    picture = picture || ""
    phoneNumber = phoneNumber || ""
    dateOfBirth = dateOfBirth || ""
    extraHoursOutside = extraHoursOutside || 0
    bio = bio || ""

    const [teachersWithSameEmail]: any = await database.execute("SELECT * FROM Teachers WHERE email = ?", [email])
    const [teachersWithSamePhoneNumber] : any = await database.execute("SELECT * FROM Teachers WHERE phone_number = ?", [phoneNumber])

    if (teachersWithSameEmail.length) {
      return NextResponse.json({status : "FAILED", message : "Email must be unique !"}, {status : 400})
    }
    if (teachersWithSamePhoneNumber.length) {
      return NextResponse.json({status : "FAILED", message : "Phone number must be unique !"}, {status : 400})
    }


    const [result]: any = await database.query(
      "INSERT INTO Teachers (first_name, family_name, email, picture, extra_hours_outside, phone_number, date_of_birth, admin_id, bio, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)",
      [firstName, familyName, email, picture, extraHoursOutside, phoneNumber, dateOfBirth, authorizedAdminId, bio]
    );

    return NextResponse.json({ message: "Teacher added", id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error("Error creating teacher:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
