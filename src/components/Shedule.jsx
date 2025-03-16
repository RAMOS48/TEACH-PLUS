import React, { useState } from "react";
import Modal from "./Modal";
import UpdateSession from "./updateSession";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const startTimes = Array.from({ length: 20 }, (_, i) => {
  const h = Math.floor(i / 2) + 8;
  const m = i % 2 === 0 ? "00" : "30";
  return `${h.toString().padStart(2, "0")}:${m}`;
});

const Timetable = ({ sessions }) => {
  const [hoveredSession, setHoveredSession] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isOpenUpdateSession, setIsOpenUpdateSession] = useState(false);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-sm">
            <th className="border p-2">Time</th>
            {daysOfWeek.map((day) => (
              <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {startTimes.map((time) => (
            <tr key={time} className="text-center">
              <td className="border p-2 font-medium">{time}</td>
              {daysOfWeek.map((day) => {
                const matchingSessions = sessions.filter(
                  (s) => s.dayOfWeek === day && s.startTime === time
                );

                return (
                  <td key={day + time} className="border p-2">
                    {matchingSessions.length > 0 ? (
                      <div className="space-y-1">
                        {matchingSessions.map((session) => (
                          <div
                            key={session.sessionId}
                            onMouseEnter={() => setHoveredSession(session)}
                            onMouseLeave={() => setHoveredSession(null)}
                            className={`bg-blue-500 text-white p-2 rounded text-sm transition-all duration-300 transform ${
                              hoveredSession === session ? "scale-105 shadow-md" : ""
                            }`}
                          >
                            {hoveredSession === session ? (
                              <div
                                onClick={() => {
                                  setIsOpenUpdateSession(true);
                                  setSelectedSession(session);
                                }}
                                className="text-xs text-white space-y-1"
                              >
                                <div className="font-semibold">{session.module} ({session.type})</div>
                                <div>Classroom: {session.classroom}</div>
                                <div>Group: {session.groupNumber}</div>
                                <div>Duration: {session.duration} min</div>
                              </div>
                            ) : (
                              <div>{session.module} ({session.type})</div>
                            )}
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
      {isOpenUpdateSession && (
        <Modal isOpen={isOpenUpdateSession} onClose={() => setIsOpenUpdateSession(false)}>
          <UpdateSession session={selectedSession} onClose={() => setIsOpenUpdateSession(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Timetable;
