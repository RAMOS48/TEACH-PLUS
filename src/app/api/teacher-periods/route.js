import { database } from "@/lib/mysql";

async function getTeacherPeriods(teacherId, academicYear) {
  const [startYear, endYear] = academicYear.split('/');
  if (!startYear || !endYear) throw new Error("Invalid Year Format");

  const academicYearStart = new Date(`${startYear}-09-01`);
  const academicYearEnd = new Date(`${endYear}-07-31`);
  const [periods] = await database.execute(
    `SELECT * FROM Periods WHERE \`from\` >= ? AND \`to\` <= ? AND NOT \`from\` > CURDATE()`,
    [academicYearStart, academicYearEnd]
  );

  const [rankChanges] = await database.execute(
    `SELECT starting_date FROM Ranks 
     WHERE teacher_id = ? AND starting_date BETWEEN ? AND ? AND NOT starting_date > CURDATE()
     ORDER BY starting_date`,
    [teacherId, academicYearStart, academicYearEnd]
  );
  if (rankChanges.length === 0) {
    const availablePeriods = periods.filter(async p => {
      const periodStart = new Date(p.from);
      const periodEnd = new Date(p.to);
      const now = new Date();
      return periodEnd.getTime() < now.getTime() && periodStart.getTime() < now.getTime();
    }
    );
    let periodsWithRank = []
    let rank
    for (const p of availablePeriods) {
      [rank] = await database.execute("SELECT rank FROM Ranks WHERE teacher_id = ? AND starting_date <= ? ORDER BY starting_date DESC LIMIT 1 ", [teacherId,new Date(p.from).toISOString().split('T')[0]])
      periodsWithRank.push({from : p.from, to : p.to, rank : rank[0].rank})
    }
    console.log(periodsWithRank)
    return periodsWithRank.map(async p => ({
      from: new Date(p.from).toISOString().split('T')[0],
      to: new Date(p.to).toISOString().split('T')[0],
      rank : p.rank
    }));
  }
  const result = [];

  for (const period of periods) {
    const periodStart = new Date(period.from);
    const periodEnd = new Date(period.to);
    const changesInPeriod = rankChanges.filter(change => {
      const changeDate = new Date(change.starting_date);
      return changeDate.getTime() > periodStart.getTime() && changeDate.getTime() < periodEnd.getTime() && changeDate.getTime() < new Date().getTime();
    });
    if (changesInPeriod.length === 0) {
      if (periodEnd.getTime() < new Date().getTime()) {
        result.push({
          from: new Date(period.from).toISOString().split('T')[0],
          to: new Date(period.to).toISOString().split('T')[0]
        });
      }
    } else {
      let currentStart = periodStart;
      const sortedChanges = changesInPeriod
        .map(c => new Date(c.starting_date))
        .sort((a, b) => a.getTime() - b.getTime());
      for (const changeDate of sortedChanges) {
        result.push({
          from: currentStart.toISOString().split('T')[0],
          to: new Date(changeDate.getTime() - 86400000).toISOString().split('T')[0]
        });
        currentStart = changeDate;
      }
      if (periodEnd.getTime() < new Date().getTime()) {
        result.push({
          from: currentStart.toISOString().split('T')[0],
          to: periodEnd.toISOString().split('T')[0]
        });
      }
    }
  }

  return result;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('teacherId');
    const academicYear = searchParams.get('academicYear');

    if (!teacherId || !academicYear) {
      return Response.json({ status: "FAILED", message: "A required data field is missing !" }, { status: 400 })
    }

    const periods = await getTeacherPeriods(teacherId, academicYear);

    return Response.json({ status: "SUCCESS", message: "Sub-Periods found successfully !", data: periods }, { status: 200 })

  } catch (error) {
    return Response.json({ status: "FAILED", message: error.message }, { status: 500 })
  }
}