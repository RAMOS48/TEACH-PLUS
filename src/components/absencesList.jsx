"use client";
import useStore from "@/store/useStore";
import { useRef, useState } from "react";

export default function Ranks() {
    const { absences, timeTable, markAbsence, updateAbsence, selectAbsence, catchUpAbsence, deleteAbsence } = useStore();
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
            newDate: newDate.current.value,
            newSelectedSession: newSelectedSession.current.value,
        });
        setUpdateForm(false);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            {absences.length > 0 && !updateForm && (
                absences.map((absence) => (
                    <div key={absence.absenceId} className="bg-amber-200 p-4 my-2 rounded-lg shadow-md">
                        <div onClick={() => openUpdateForm(absence.absenceId)} className="cursor-pointer">
                            <div className="font-semibold">{absence.date}</div>
                            <div className="text-sm text-gray-600">{absence.caughtUp}</div>
                        </div>
                        <button 
                            onClick={() => deleteAbsence(absence.absenceId)}
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
                    <input type="text" className="border p-2 rounded w-full" />
                    <select ref={newSelectedSession} className="border p-2 rounded w-full mt-2">
                        {" here we add options as time table of teacher "}
                    </select>
                    <button type="submit" className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Confirm</button>
                </form>
            )}

            {!updateForm && (
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <input ref={date} type="date" className="border p-2 rounded w-full" />
                    <input ref={selectedSession} placeholder="Type rank here ..." type="text" className="border p-2 rounded w-full mt-2" />
                    {" also here we add options as time table of teachers "}
                    <button 
                        onClick={() => {
                            markAbsence({ date: date.current.value, selectedSession: selectedSession.current.value });
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
