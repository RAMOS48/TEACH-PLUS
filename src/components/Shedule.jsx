import React from "react";



const days = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
const startHours = Array.from({ length: 20 }, (_, i) => {
  const h = Math.floor(i / 2) + 8; // De 08:00 à 18:30
  const m = i % 2 === 0 ? "00" : "30";
  return `${h.toString().padStart(2, "0")}:${m}`;
});

const Timetable = ({sessions}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Heure</th>
            {days.map((day) => (
              <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {startHours.map((hour) => (
            <tr key={hour}>
              <td className="border p-2 text-center">{hour}</td>
              {days.map((day) => {
                const matchingSessions = sessions.filter(
                  (s) => s.day === day && s.start_hour === hour
                );

                return (
                  <td key={day + hour} className="border p-2 text-center">
                    {matchingSessions.length > 0 ? (
                      <div className="space-y-1">
                        {matchingSessions.map((session) => (
                          <div key={session.session_id} className="bg-blue-500 text-white p-1 rounded text-sm">
                            {session.module} ({session.type}) - {session.classroom}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
