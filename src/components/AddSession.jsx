import { useState } from "react";
import useStore from "@/store/useStore";

export default function AddSession({ onClose }) {
  const [sessionData, setSessionData] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    type: "",
    classroom: "",
    module: "",
    groupNumber: "",
    academicYear: "",
    academicLevel: "",
    semester: "",
    teacherId: ""
  });

  const handleChange = (e) => {
    setSessionData({ ...sessionData, [e.target.name]: e.target.value });
  };

  const { addSession, teachers } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    addSession(sessionData);
    setSessionData({
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      type: "",
      classroom: "",
      module: "",
      groupNumber: "",
      academicYear: "",
      academicLevel: "",
      semester: "",
      teacherId: ""
    });
    onClose();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a Session</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        {/* Column 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Day of the Week</label>
          <select name="dayOfWeek" value={sessionData.dayOfWeek} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select a day</option>
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Start Time</label>
          <input type="time" name="startTime" value={sessionData.startTime} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">End Time</label>
          <input type="time" name="endTime" value={sessionData.endTime} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Column 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Teacher</label>
          <select name="teacherId" value={sessionData.teacherId} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.familyName} {teacher.firstName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Type</label>
          <select name="type" value={sessionData.type} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select a type</option>
            <option value="Lecture">Lecture</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Lab">Lab</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Module</label>
          <input type="text" name="module" value={sessionData.module} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Column 3 */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Classroom</label>
          <input type="text" name="classroom" value={sessionData.classroom} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Group Number</label>
          <input type="text" name="groupNumber" value={sessionData.groupNumber} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Academic Year</label>
          <input type="text" name="academicYear" value={sessionData.academicYear} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g., 2024-2025" />
        </div>

        {/* Additional Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Academic Level</label>
          <input type="text" name="academicLevel" value={sessionData.academicLevel} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g., Undergraduate, Master" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Semester</label>
          <input type="text" name="semester" value={sessionData.semester} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g., Semester 1, Semester 2" />
        </div>

        {/* Submit Button - Full Width */}
        <div className="col-span-3 flex justify-center mt-4">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
