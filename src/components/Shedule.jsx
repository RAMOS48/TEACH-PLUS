import React, { useState } from "react";
import Modal from "./Modal";
import UpdateSession from "./updateSession";

const days = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
const startHours = Array.from({ length: 20 }, (_, i) => {
  const h = Math.floor(i / 2) + 8; // De 08:00 à 18:30
  const m = i % 2 === 0 ? "00" : "30";
  return `${h.toString().padStart(2, "0")}:${m}`;
});

const Timetable = ({ sessions }) => {
  const [hoveredSession, setHoveredSession] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);


  const [ isOpenUpdateSession , setIsOpenUpdateSession]=useState(false);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-sm">
            <th className="border p-2">Heure</th>
            {days.map((day) => (
              <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {startHours.map((hour) => (
            <tr key={hour} className="text-center">
              <td className="border p-2 font-medium">{hour}</td>
              {days.map((day) => {
                const matchingSessions = sessions.filter(
                  (s) => s.day === day && s.start_hour === hour
                );

                return (
                  <td key={day + hour} className="border p-2">
                    {matchingSessions.length > 0 ? (
                      <div className="space-y-1">
                        {matchingSessions.map((session) => (
                          <div
                            key={session.session_id}
                            onMouseEnter={() => setHoveredSession(session)}
                            onMouseLeave={() => setHoveredSession(null)}
                            className={`bg-blue-500 text-white p-2 rounded text-sm transition-all duration-300 transform ${
                              hoveredSession === session ? "scale-105 shadow-md" : ""
                            }`}
                           
                          >
                            {hoveredSession === session ? (
                              <div  onClick={()=>{setIsOpenUpdateSession(true); setSelectedSession(session)}} className="text-xs text-white space-y-1">
                                <div className="font-semibold">{session.module} ({session.type})</div>
                                <div>Salle: {session.classroom}</div>
                                <div>Groupe: {session.group}</div>
                                <div>Durée: {session.duration} min</div>
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
      {isOpenUpdateSession &&  <Modal isOpen={isOpenUpdateSession} onClose={() => setIsOpenUpdateSession(false)}><UpdateSession session={selectedSession}  onClose={() => setIsOpenUpdateSession(false)}/></Modal>}
    </div>
  );
};

export default Timetable;
