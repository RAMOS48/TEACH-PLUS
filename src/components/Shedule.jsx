import React, { useState } from "react";
import Modal from "./Modal";
import UpdateSession from "./updateSession";
import useStore from "@/store/useStore";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const startTimes = Array.from({ length: 20 }, (_, i) => {
  const h = Math.floor(i / 2) + 8;
  const m = i % 2 === 0 ? "00:00" : "30:00";
  return `${h.toString().padStart(2, "0")}:${m}`;
});

const Timetable = ({ sessions }) => {
  const [hoveredSession, setHoveredSession] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isOpenUpdateSession, setIsOpenUpdateSession] = useState(false);
  const {selectSession , getTeachers}= useStore();

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
                  (s) => s.day_of_week === day && s.start_time === time
                );
                

                return (
                  <td key={day + time} className="border p-2">
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
                              <div
                                onClick={() => {
                                  setIsOpenUpdateSession(true);
                                  setSelectedSession(session);
                                  selectSession(session.session_id)
                                  getTeachers()
                                }}
                                className="text-xs text-white space-y-1"
                              >
                                <div className="font-semibold">{session.module} ({session.type})</div>
                                <div>Classroom: {session.classroom}</div>
                                <div>Group: {session.group_number}</div>
                                <div>end time: {session.end_time} </div>
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
