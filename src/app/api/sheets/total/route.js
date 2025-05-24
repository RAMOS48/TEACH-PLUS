import { database } from "@/lib/mysql";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type")
        const category = searchParams.get("category")
        if (!type || !category) {
            return Response.json({ status: "FAILED", message: "Type and category are required" }, { status: 400 });
        }
        const authorizedAdminId = req.headers.get("x-admin-id")
        if (!authorizedAdminId) {
            return Response.json({ status: "FAILED", message: "Unauthorized access" }, { status: 401 });
        }
        let data
        const query = `
            SELECT 
            CONCAT(first_name, " ", family_name) as full_name, account_number, rank, rank_price, extra_hours_number, amount_of_money, \`from\`, \`to\`, amount_of_money * 9/100 AS social_security, (amount_of_money - amount_of_money * 9/100) * 10/100 AS irg, amount_of_money * 9/100 + (amount_of_money - amount_of_money * 9/100) * 10/100 AS debited_amount, amount_of_money - (amount_of_money * 9/100 + (amount_of_money - amount_of_money * 9/100) * 10/100) AS net_amount
            FROM Teachers T JOIN Extra_hours_sheet E ON T.teacher_id = E.teacher_id 
            WHERE T.admin_id = ? AND T.type = ? AND account_number ${category !== "CCP" ? "NOT" : ""} REGEXP '^[0-9]{10} [0-9]{2}$'
        `
        [data] = await database.execute(query, [authorizedAdminId, type])
        return Response.json({ status: "SUCCESS", message: "Data fetched successfully", data }, { status: 200 })

    } catch (err) {
        return Response.json({ status: "FAILED", message: err.message }, { status: 500 })
    }
}