"use client";
import useStore from "@/store/useStore";
import { useRef, useState } from "react";




// update variables for absences 


export default function Ranks() {
    const {absences , timeTable ,   markAbsence , updateAbsence , getAbsences , selectAbsence , catchUpAbsence , deleteAbsence } = useStore();
    const [updateForm, setUpdateForm] = useState(false);

    const date = useRef("");
    const selectedSession = useRef("");
    const newDate = useRef("");
    const newSelectedSession = useRef("");

    const openUpdateForm = (absenceId) => {
        setUpdateForm(true);
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
        <div>
            { absences.length > 0 ? (
                absences.map((absence) => (
                    <div key={absence.absenceId}>
                        <div onClick={() => openUpdateForm(absence.absenceId)}>
                            <div>{absence.date}</div>
                            <div>{absence.caughtUp}</div>
                        </div>
                        <button onClick={() => deleteAbsence(absence.absenceId)}>Delete rank</button>
                    </div>
                ))
            ) : (
                <div>No Absences</div>
            )}

            {updateForm && (
                <form onSubmit={handleUpdate}>
                    <label>Updated starting date: </label>
                    <input ref={newDate} type="date" />
                    <label>Updated session:</label>
                    <input  type="text" />
                    <select ref={newSelectedSession} >
       {" here we add opptions as time table of teacher "}

      </select>
                    <button type="submit">Confirm</button>
                </form>
            )}

            <input ref={date} type="date" />
            <input ref={selectedSession} placeholder="Type rank here ..." type="text" />
            { " also here we add options as time table of teachers "}
            <button
                onClick={() => {
                    addRank({ date: date.current.value, selectedSession: selectedSession.current.value });
                }}
            >
                Add rank
            </button>
        </div>
    );
}
