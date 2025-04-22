'use client';

import React from 'react';
import { format, eachDayOfInterval, parseISO, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';

function groupWeeksByMonth(from, to) {
  const allDays = eachDayOfInterval({
    start: parseISO(from),
    end: parseISO(to),
  });

  const months = {};
  let currentWeek = [];

  for (let i = 0; i < allDays.length; i++) {
    const day = allDays[i];
    const dayOfWeek = getDay(day); // 0 = Sunday, ..., 6 = Saturday
    const monthName = format(day, 'MMMM', { locale: fr });

    if (!months[monthName]) months[monthName] = [];

    currentWeek.push(day);

    const isEndOfWeek = dayOfWeek === 4; // Jeudi
    const isLastDay = i === allDays.length - 1;
    const nextMonth = i < allDays.length - 1 && format(day, 'MM') !== format(allDays[i + 1], 'MM');

    if (isEndOfWeek || isLastDay || nextMonth) {
      months[monthName].push([...currentWeek]);
      currentWeek = [];
    }
  }

  return months;
}

export default function ExtraHoursSheet({ teacher }) {
  const weeksByMonth = groupWeeksByMonth(teacher.from, teacher.to);
  const extraHoursDays = teacher.extraDays;

  function getExtraHoursEntry(date) {
    const formatted = format(date, 'yyyy-MM-dd');
    return extraHoursDays.find(d => d.date === formatted);
  }

  const totalExtraHours = Object.values(weeksByMonth)
    .flat()
    .reduce((sum, week) => {
      return sum + week.reduce((innerSum, d) => {
        const match = getExtraHoursEntry(d);
        return match ? innerSum + Number(match.number_of_hours) : innerSum;
      }, 0);
    }, 0);

  return (
    <div className="p-6">
      <h1 className="text-center text-lg font-bold mb-4">
        République Algérienne Démocratique et Populaire<br />
        Ministère de l’Enseignement Supérieur et de la Recherche Scientifique
      </h1>

      <h2 className="text-center text-md font-semibold mb-2">
        École Supérieure en Informatique 08 Mai 1945 - Sidi Bel Abbès
      </h2>

      <div className="mb-4">
        <p>Full Name : {teacher.firstName} {teacher.familyName}</p>
        <p>Rank : {teacher.rank}</p>
        <p>Academic Year : {teacher.academicYear}</p>
        <p>Period : {`${teacher.from} to ${teacher.to}`}</p>
      </div>

      <table className="table-auto w-full border border-black text-sm">
        <thead>
          <tr>
            <th className="border border-black p-1">Months</th>
            <th className="border border-black p-1">Weeks</th>
            <th className="border border-black p-1">Extra hours</th>
            <th className="border border-black p-1">Dates</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(weeksByMonth).map(([month, weeks], monthIndex) => (
            <React.Fragment key={monthIndex}>
              {weeks.map((week, weekIndex) => {
                const validDays = week.filter(d => {
                  const day = getDay(d);
                  return day >= 0 && day <= 4; // Sunday to Thursday
                });

                const extraHours = validDays.reduce((sum, d) => {
                  const match = getExtraHoursEntry(d);
                  return match ? sum + Number(match.number_of_hours) : sum;
                }, 0);

                const extraDates = validDays
                  .filter(d => getExtraHoursEntry(d))
                  .map(d => format(d, 'MM/dd'));

                return (
                  <tr key={`${month}-${weekIndex}`}>
                    {weekIndex === 0 && (
                      <td rowSpan={weeks.length} className="border border-black p-1 font-semibold">
                        {month}
                      </td>
                    )}
                    <td className="border border-black p-1">Semaine {weekIndex + 1}</td>
                    <td className="border border-black p-1">{extraHours}h</td>
                    <td className="border border-black p-1">{extraDates.join(', ')}</td>
                  </tr>
                );
              })}
              <tr>
                <td className="border border-black p-1 font-bold" colSpan={2}>Total {month}</td>
                <td className="border border-black p-1 font-bold">
                  {
                    weeks.reduce((sum, week) => {
                      return sum + week.reduce((innerSum, d) => {
                        const match = getExtraHoursEntry(d);
                        return match ? innerSum + Number(match.number_of_hours) : innerSum;
                      }, 0);
                    }, 0)
                  }h
                </td>
                <td className="border border-black p-1" />
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <td className="border border-black p-1 font-bold" colSpan={2}>Total</td>
            <td className="border border-black p-1 font-bold">{totalExtraHours}h</td>
            <td className="border border-black p-1" />
          </tr>
        </tbody>
      </table>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <p>Le Directeur des Études</p>
          <br /><br />
          <p>_________________</p>
        </div>
        <div>
          <p>Les enseignants concernés</p>
          <br /><br />
          <p>_________________</p>
        </div>
        <div>
          <p>Le Directeur</p>
          <br /><br />
          <p>_________________</p>
        </div>
      </div>
    </div>
  );
}
