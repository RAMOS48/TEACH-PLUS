import useStore from "@/store/useStore";
import { useState, useEffect } from "react";

export default function UpdateSession({ session, onClose }) {
  const [updatedSession, setUpdatedSession] = useState({ ...session });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setUpdatedSession({ ...session });
    setIsModified(false);
  }, [session]);

  const { updateSession, deleteSession } = useStore();

  const handleChange = (e) => {
    setUpdatedSession({ ...updatedSession, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateSession(updatedSession);
    setIsModified(false);
  };

  const handleDelete = () => {
    deleteSession(updatedSession.sessionId);
    setIsModified(false);
    onClose();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Session</h2>

      <form className="grid grid-cols-2 gap-4">
        {/* Day of the Week */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Day of the Week</label>
          <select
            name="dayOfWeek"
            value={updatedSession.dayOfWeek}
            onChange={handleChange}
            className="w-full p-2 border rounded">
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={updatedSession.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-600">End Time</label>
          <input
            type="time"
            name="endTime"
            value={updatedSession.endTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Session Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Type</label>
          <select
            name="type"
            value={updatedSession.type}
            onChange={handleChange}
            className="w-full p-2 border rounded">
            <option value="Lecture">Lecture</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Lab">Lab</option>
          </select>
        </div>

        {/* Classroom */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Classroom</label>
          <input
            type="text"
            name="classroom"
            value={updatedSession.classroom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Module */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Module</label>
          <input
            type="text"
            name="module"
            value={updatedSession.module}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Group Number */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Group Number</label>
          <input
            type="text"
            name="groupNumber"
            value={updatedSession.groupNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Academic Year */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Academic Year</label>
          <input
            type="text"
            name="academicYear"
            value={updatedSession.academicYear}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Academic Level */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Academic Level</label>
          <input
            type="text"
            name="academicLevel"
            value={updatedSession.academicLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Semester */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Semester</label>
          <input
            type="text"
            name="semester"
            value={updatedSession.semester}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Update & Delete Buttons */}
        <div className="col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            onClick={handleUpdate}
            disabled={!isModified}
            className={`px-6 py-2 rounded text-white transition 
              ${isModified ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}>
            Update
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
