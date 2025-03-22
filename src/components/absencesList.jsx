"use client";
import useStore from "@/store/useStore";
import { useRef, useState , useEffect } from "react";






// add in form the select sessions options 




export default function Ranks() {
    const { absences ,selectedTeacher  , teacherTimeTable , markAbsence, updateAbsence, selectAbsence, catchUpAbsence, deleteAbsence } = useStore();
    const [updateForm, setUpdateForm] = useState(false);

    const date = useRef("");
    const selectedSession = useRef("");
    const newDate = useRef("");
    const newSelectedSession = useRef("");

    const openUpdateForm = (absenceId) => {
        setUpdateForm(!updateForm);
        selectAbsence(absenceId);
        
    };
    

    const handleUpdate = (e) => {
        e.preventDefault(); 
        updateAbsence({
            date: newDate.current.value,
            sessionId: newSelectedSession.current.value,
            
        });
        setUpdateForm(false);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            {absences.length > 0 && !updateForm && (
                absences.map((absence) => (
                    <div key={absence.absence_id} className="bg-amber-200 p-4 my-2 rounded-lg shadow-md">
                        <div onClick={() => openUpdateForm(absence.absence_id)} className="cursor-pointer">
                            <div className="font-semibold">{absence.date}</div>
                            <div className="text-sm text-gray-600">{absence.caught_up}</div>
                        </div>
                        <button 
                            onClick={() => catchUpAbsence(absence.absence_id)}
                            className="mt-2 bg-red-300 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                            Catch up 
                        </button>
                        <button 
                            onClick={() => deleteAbsence(absence.absence_id)}
                            className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                            Delete Absence
                        </button>
                    </div>
                ))
            )}

            {updateForm && (
                <form onSubmit={handleUpdate} className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <label className="block font-semibold">Updated starting date:</label>
                    <input ref={newDate} type="date" className="border p-2 rounded w-full" />
                    <label className="block font-semibold mt-2">Updated session:</label>
                    <select ref={newSelectedSession} className="border p-2 rounded w-full mt-2">
                    <option value="" disabled>Select session</option>
            {(teacherTimeTable  ).map((session) => (
              <option key={session.session_id} value={session.session_id}>{session.day_of_week}_{session.start_time}</option>
            ))}
                    </select>
                    <button type="submit" className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Confirm</button>
                </form>
            )}

            {!updateForm && (
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <input ref={date} type="date" className="border p-2 rounded w-full" />
                    <select ref={selectedSession} className="border p-2 rounded w-full mt-2">
                    <option value="" disabled>Select session</option>
            {teacherTimeTable.map((session) => (
              <option key={session} value={session.session_id}>{session.day_of_week}_{session.start_time}</option>
            ))}
                    </select>
                    <button 
                        onClick={() => {
                            markAbsence({teacherId :selectedTeacher , date: date.current.value, sessionId: selectedSession.current.value });
                        }}
                        className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Add Absence
                    </button>
                </div>
            )}
        </div>
    );
}
