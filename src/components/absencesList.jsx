"use client";
import useStore from "@/store/useStore";
import { useRef, useState, useEffect } from "react";






// add in form the select sessions options 




export default function AbsenceList() {
  const { absences, selectedTeacher, getAbsences, teacherTimeTable, markAbsence, updateAbsence, selectAbsence, catchUpAbsence, deleteAbsence } = useStore();
  const [updateForm, setUpdateForm] = useState(false);


  const date = useRef("");
  const selectedSession = useRef("");
  const notes = useRef("");
  const reason = useRef("");
  const newDate = useRef("");
  const newSelectedSession = useRef("");
  const newNotes = useRef("");
  const newReason = useRef("");



  const openUpdateForm = (absenceId) => {
    setUpdateForm(!updateForm);
    selectAbsence(absenceId);

  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (date.current.value && selectedSession.current.value) {
      markAbsence({ teacherId: selectedTeacher, date: date.current.value, sessionId: selectedSession.current.value, reason: reason.current.value, notes: notes.current.value });
    }
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    if (newDate.current.value && newSelectedSession.current.value) {
      updateAbsence({
        date: newDate.current.value,
        sessionId: newSelectedSession.current.value,
        reason: newReason.current.value,
        notes: newNotes.current.value

      });
    }
    setUpdateForm(false);


  };

  return (
    <div className=" w-full p-4 bg-gray-100 min-h-screen">
      <h1 className="ml-3 p-3 text-[#141F75] font-bold text-3xl">Absences</h1>

      {!updateForm && absences?.length > 0 && (
        <div>
          <div className="w-full overflow-x-auto">
            <div className="hidden lg:flex text-[#141F75] font-semibold text-sm">
              <div className="w-1/6 p-2">Date</div>
              <div className="w-1/6 p-2">Caught up ?</div>
              <div className="w-1/6 p-2">Reason</div>
              <div className="w-1/6 p-2">Notes</div>
              <div className="w-1/6 p-2">Catch up</div>
              <div className="w-1/6 p-2">Delete</div>
            </div>
          </div>

          {absences?.length === 0 && (
            <div className="text-blue-950 text-2xl font-bold">No absences</div>
          )}

          {absences?.length > 0 &&
            absences.map((absence) => (
              <div
                key={absence.absence_id}
                className="bg-gray-200 p-4 my-2 rounded-lg shadow-md"
              >
                <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center">
                  <div
                    onClick={() => openUpdateForm(absence.absence_id)}
                    className="cursor-pointer flex flex-col lg:flex-row w-full lg:w-4/6 hover:bg-gray-300"
                  >
                    <div className="w-full lg:w-1/4 text-gray-600 p-2">
                      {new Date(absence.date).toLocaleDateString("en-GB")}
                    </div>
                    <div className="w-full lg:w-1/4 text-sm p-2 text-gray-600">
                      {absence.caught_up ? "yes" : "no"}
                    </div>
                    <div className="w-full lg:w-1/4 text-sm p-2 text-gray-600">
                      {absence.reason}
                    </div>
                    <div className="w-full lg:w-1/4 text-sm p-2 text-gray-600">
                      {absence.notes}
                    </div>
                  </div>

                  <div className="flex w-full lg:w-2/6 gap-2 mt-2 lg:mt-0">
                    <button
                      onClick={() => catchUpAbsence(absence.absence_id)}
                      className="bg-blue-700 text-white p-2 w-1/2 rounded hover:bg-[#141F75] cursor-pointer transition"
                    >
                      {absence.caught_up ? "Undo" : "Catch up"}
                    </button>
                    <button
                      onClick={() => deleteAbsence(absence.absence_id)}
                      className="bg-red-500 text-white p-2 w-1/2 rounded hover:bg-red-600 cursor-pointer transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {updateForm && (
        <div>
          <h1 className="text-left ml-3 p-3 text-[#141F75] text-2xl">
            Update Absence
          </h1>
          <button
            className="text-left bg-[#141F75] text-white p-2 m-1 rounded-2xl hover:cursor-pointer"
            onClick={() => {
              setUpdateForm(false);
            }}
          >
            {"< Back"}
          </button>
          <form
            onSubmit={handleUpdate}
            className="bg-white p-4 rounded-lg shadow-md mt-4"
          >
            <label className="block font-semibold">Updated starting date:</label>
            <input
              ref={newDate}
              type="date"
              className="border p-2 rounded w-full hover:cursor-text"
              required
            />

            <label className="block font-semibold mt-2">Updated session:</label>
            <select
              ref={newSelectedSession}
              className="border p-2 rounded w-full mt-2 hover:cursor-pointer"
              required
            >
              <option value="" disabled>
                Select session
              </option>
              {teacherTimeTable.map((session) => (
                <option
                  key={session.session_id}
                  value={session.session_id}
                >
                  {session.day_of_week}_{session.start_time}
                </option>
              ))}
            </select>

            <label className="block font-semibold">Reason:</label>
            <input
              type="text"
              ref={newReason}
              className="border p-2 rounded w-full"
            />

            <label className="block font-semibold">Notes:</label>
            <input
              type="text"
              ref={newNotes}
              className="border p-2 rounded w-full"
            />

            <button
              type="submit"
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition"
            >
              Confirm
            </button>
          </form>
        </div>
      )}

      {!updateForm && teacherTimeTable.length !== 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h1 className="text-left p-3 text-[#141F75] text-2xl">Mark new absence</h1>
          <form>
            <label className="block font-semibold">Select date:</label>
            <input
              ref={date}
              type="date"
              className="border p-2 rounded w-full hover:cursor-text"
              required
            />

            <label className="block font-semibold">Select Session:</label>
            <select
              ref={selectedSession}
              className="border p-2 rounded w-full mt-2 hover:cursor-pointer"
              required
            >
              <option value="" disabled>
                Select session
              </option>
              {teacherTimeTable.map((session) => (
                <option
                  key={session.session_id}
                  value={session.session_id}
                >
                  {session.day_of_week}_{session.start_time}
                </option>
              ))}
            </select>

            <label className="block font-semibold">Reason:</label>
            <input
              type="text"
              ref={reason}
              className="border p-2 rounded w-full"
            />

            <label className="block font-semibold">Notes:</label>
            <input
              type="text"
              ref={notes}
              className="border p-2 rounded w-full"
            />

            <button
              onClick={handleAdd}
              className="w-full p-2 text-white rounded-md bg-blue-500 hover:bg-blue-800 mt-3 cursor-pointer"
            >
              Add Absence
            </button>
          </form>
        </div>
      )}

      {teacherTimeTable.length === 0 && (
        <div className="text-red-700 font-semibold">
          This teacher has no timetable!
        </div>
      )}
    </div>

  );
}
