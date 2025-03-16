import { database } from "@/lib/mysql"

export async function PUT(req, {params}) {
    try {
        const authorizedAdminId = req.headers.get("x-admin-id")
        const {rankId} = await params
        const [rank] = await database.execute("SELECT * FROM Ranks WHERE rank_id = ?", [rankId])
        if (!rank.length) {
            return Response.json({status: "FAILED", message : "Rank not found !"}, {status : 404})
        }
        const searchQuery = `SELECT D.admin_id 
        FROM Ranks R 
        JOIN Teachers T ON R.teacher_id = T.teacher_id
        JOIN Admins D ON T.admin_id = D.admin_id
        WHERE R.rank_id = ?
        `
        const [adminOfRank] = await database.execute(searchQuery,[rankId])
        if (!adminOfRank.length) {
            return Response.json({status : "FAILED", message : "Rank not found or its admin is unknown !"}, {status : 404})
        }
        if (adminOfRank[0].admin_id != authorizedAdminId) {
            return Response.json({status : "FAILED", message : "Unauthorized ! This rank doesn't belong to this admin"}, {status : 401})
        }
        let {newTeacherId, newStartingDate, newRank} = await req.json()
        newTeacherId = newTeacherId || rank[0].teacher_id
        newStartingDate = newStartingDate || rank[0].starting_date
        newRank = newRank || rank[0].rank
        const [adminOfTeacher] = await database.execute("SELECT admin_id FROM Teachers WHERE teacher_id = ?", [newTeacherId])
        if (!adminOfTeacher.length) {
            return Response.json({status : "FAILED", message : "Teacher doesn't exist or his admin is unknown !"}, {status : 404})
        }
        if (adminOfTeacher[0].admin_id != authorizedAdminId) {
            return Response.json({status : "FAILED", message : "Unauthorized ! this teacher doesn't belong to this admin !"}, {status : 401})
        }
        const updateQuery = `UPDATE Ranks
        SET teacher_id = ?, starting_date = ?, rank = ?
        WHERE rank_id = ?
        `
        const updateValues = [newTeacherId , newStartingDate, newRank, rankId]
        await database.execute(updateQuery, updateValues)
        return Response.json({status : "SUCCESS", message : "Rank updated successfully !"}, {status : 200})

    } catch(err) {
        return Response.json({status : "FAILED", message : err.message}, {status : 500})
    }
}