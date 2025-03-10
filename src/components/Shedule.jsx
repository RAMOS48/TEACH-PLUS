import React from 'react';

const Schedule = ({ sessions }) => {
  // Define days of the week
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create a schedule grid
  const schedule = {};
  days.forEach((day) => (schedule[day] = []));

  // Populate schedule with sessions
  sessions.forEach((session) => {
    const dayName = days[session.day];
    schedule[dayName].push(session);
  });

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400 w-full text-center">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Time Slot</th>
            {days.map((day) => (
              <th key={day} className="border border-gray-400 px-4 py-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(12)].map((_, hour) => ( // 12 time slots (e.g., 8 AM - 8 PM)
            <tr key={hour}>
              <td className="border border-gray-400 px-4 py-2">{8 + hour}:00</td>
              {days.map((day) => {
                const session = schedule[day].find(
                  (s) => s.start_hour === 8 + hour
                );
                return (
                  <td
                    key={day}
                    className="border border-gray-400 px-4 py-2 text-white"
                    style={{ backgroundColor: session ? '#4CAF50' : 'white' }}
                  >
                    {session ? `${session.module} (${session.classroom})` : ''}
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

// Example usage
const sessions = [
  { day: 0, start_hour: 9, duration: 3, type: 'Lecture', module: 'Math', classroom: 'A101', group: 'G1' },
  { day: 3, start_hour: 14, duration: 1, type: 'Lab', module: 'Physics', classroom: 'B203', group: 'G2' },
];

export default function Shedule() {
  return <Schedule sessions={sessions} />;
}
