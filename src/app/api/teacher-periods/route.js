import { database } from "@/lib/mysql";

async function getTeacherPeriods(teacherId, academicYear) {
  const [startYear, endYear] = academicYear.split('/');
  if (!startYear || !endYear) throw new Error("Format d'année invalide");

  const periodStart = new Date(`${startYear}-09-01`);
  const periodEnd = new Date(`${endYear}-07-31`);

  const [periods] = await database.execute(
    `SELECT * FROM Periods WHERE \`from\` >= ? AND \`to\` <= ?`,
    [periodStart, periodEnd]
  );

  const [rankChanges] = await database.execute(
    `SELECT startingDate FROM Ranks 
     WHERE teacher_id = ? AND starting_date BETWEEN ? AND ?
     ORDER BY starting_date`,
    [teacherId, periodStart, periodEnd]
  );

  if (rankChanges.length === 0) {
    return periods.map(p => ({
      from: p.from.toISOString().split('T')[0],
      to: p.to.toISOString().split('T')[0]
    }));
  }

  const result = [];
  
  for (const period of periods) {
    const periodStart = new Date(period.from);
    const periodEnd = new Date(period.to);
    
    const changesInPeriod = rankChanges.filter(change => {
      const changeDate = new Date(change.startingDate);
      return changeDate > periodStart && changeDate < periodEnd;
    });

    if (changesInPeriod.length === 0) {
      result.push({
        from: period.from.toISOString().split('T')[0],
        to: period.to.toISOString().split('T')[0]
      });
    } else {
      let currentStart = periodStart;
      const sortedChanges = changesInPeriod
        .map(c => new Date(c.startingDate))
        .sort((a, b) => a.getTime() - b.getTime());

      for (const changeDate of sortedChanges) {
        result.push({
          from: currentStart.toISOString().split('T')[0],
          to: new Date(changeDate.getTime() - 86400000).toISOString().split('T')[0]
        });
        currentStart = changeDate;
      }
      result.push({
        from: currentStart.toISOString().split('T')[0],
        to: periodEnd.toISOString().split('T')[0]
      });
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
      return new Response(JSON.stringify({
        success: false,
        message: 'Paramètres requis'
      }), { status: 400 });
    }

    const periods = await getTeacherPeriods(teacherId, academicYear);
    
    return new Response(JSON.stringify({ 
      success: true, 
      data: periods 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message || 'Erreur serveur'
    }), { status: 500 });
  }
}