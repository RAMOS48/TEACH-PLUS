"use client";

import { useState } from "react";
import  useStore  from "@/store/useStore";

export default function ProfilTeacher({teacher}) {
  const [isChanged, setIsChanged] = useState(false);
const { updateTeacher }=useStore();
const onCamelCase = {
  teacherId:teacher.teacher_id ,
  email:teacher.email,
  phoneNumber:teacher.phone_number,
  familyName:teacher.family_name,
  firstName : teacher.first_name,
  extraHoursOutside: teacher.extra_hours_outside,
}

const [ updatedTeacher , setUpdatedTeacher ]= useState(onCamelCase)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsChanged(true);
    setUpdatedTeacher({
      ...updatedTeacher,  
      [name]: value,  
    });
  };
  const handleUpdate = () => {
    
    setIsChanged(false);
    updateTeacher(updatedTeacher)
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-center mb-4">
        <img
          src={updatedTeacher.picture}
          alt="Teacher"
          className="w-24 h-24 object-cover rounded-full border"
        />
      </div>
      <div className="space-y-2">
        <input
          type="text"
          name="firstName"
          value={updatedTeacher.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="familyName"
          value={updatedTeacher.familyName}
          onChange={handleChange}
          placeholder="Family Name"
          className="w-full p-2 border rounded-md"
        />
         <input
          type="number"
          name="phoneNumber"
          value={updatedTeacher.phoneNumber}
          onChange={handleChange}
          placeholder="Phone number"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="extraHoursOutside"
          value={updatedTeacher.extraHoursOutside}
          onChange={handleChange}
          placeholder="Extra ours outside"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          value={updatedTeacher.email}
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
