export async function OPTIONS(req) {
    try {
        const { from, to, teacherId, academicYear } = await req.body();
        if (!from || !to || !teacherId || !academicYear) {
            return Response.json({ status: "FAILED", message: "A required data field is missing" }, { status: 400 });
        }

    } catch (err) {
        return Response.json({ status: "FAILED", message: err.message }, { status: 500 })
    }
}