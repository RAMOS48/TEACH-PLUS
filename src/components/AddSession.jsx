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
  const currentYear = new Date().getFullYear();
  const academicYears = Array.from({ length: 10 }, (_, i) => `${currentYear - i}-${currentYear - i + 1}`);
  const { addSession, teachers  } = useStore();
 
  
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

        <div>
          <label className="block text-sm font-medium text-gray-600">Teacher</label>
          <select name="teacherId" value={sessionData.teacherId} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.teacher_id} value={teacher.teacher_id}>
                {teacher.family_name} {teacher.first_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Type</label>
          <select name="type" value={sessionData.type} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select a type</option>
            <option value="COURS">Cours</option>
            <option value="TD">TD</option>
            <option value="TP">TP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Module</label>
          <input type="text" name="module" value={sessionData.module} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Classroom</label>
          <select  name="classroom" value={sessionData.classroom} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select classroom</option>
            {["salle A1","salle A2" , "Amphi C" , "salle TP1"].map((sl) => (
              <option key={sl} value={sl}>{sl}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Group Number</label>
          <select  name="groupNumber" value={sessionData.groupNumber} onChange={handleChange} className="w-full p-2 border rounded" >
            <option value="">Select group number</option>
            {["G1","G2","G3","G4","G5","G6","G7","G8","G9","G10","G11","G12","G13","G14","G15"].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Academic Year</label>
          <select name="academicYear" value={sessionData.academicYear} onChange={handleChange} className="w-full p-2 border rounded" >
          <option value="" disabled>Select academic year</option>
        {academicYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Academic Level</label>
          <select name="academicLevel" value={sessionData.academicLevel} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g., Undergraduate, Master">
            <option value="">Select academic level</option>
            {["1CP","2CP","1CS","2CS","3CS"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Semester</label>
          <select name="semester" value={sessionData.semester} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g., Semester 1, Semester 2">
            <option value="">Select semester</option>
            {["S1","S2"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="col-span-3 flex justify-center mt-4">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
