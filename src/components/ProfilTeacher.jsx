"use client";

import { useState } from "react";
import  useStore  from "@/store/useStore";

export default function ProfilTeacher() {
  const [isChanged, setIsChanged] = useState(false);
const { teacher , updateTeacher , updateStateTeacher}=useStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsChanged(true);
    updateStateTeacher({
      ...teacher,  
      [name]: value,  
    });
  };
  const handleUpdate = () => {
    
    setIsChanged(false);
    updateTeacher(teacher)
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-center mb-4">
        <img
          src={teacher.photo}
          alt="Teacher"
          className="w-24 h-24 object-cover rounded-full border"
        />
      </div>
      <div className="space-y-2">
        <input
          type="text"
          name="firstName"
          value={teacher.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="familyName"
          value={teacher.familyName}
          onChange={handleChange}
          placeholder="Family Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="rank"
          value={teacher.rank}
          onChange={handleChange}
          placeholder="Rank"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          value={teacher.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleUpdate}
          disabled={!isChanged}
          className={`w-full p-2 text-white rounded-md ${
            isChanged ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Confirm Update
        </button>
      </div>
    </div>
  );
}
