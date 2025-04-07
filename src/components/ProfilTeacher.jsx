"use client";

import { useState } from "react";
import useStore from "@/store/useStore";

export default function ProfileTeacher({ teacher, onClose }) {
  const [isChanged, setIsChanged] = useState(false);
  const { updateTeacher, uploidImage } = useStore();

  const initialTeacher = {
    teacherId: teacher.teacher_id,
    email: teacher.email,
    phoneNumber: teacher.phone_number,
    dateOfBirth: teacher.date_of_birth,
    familyName: teacher.family_name,
    firstName: teacher.first_name,
    extraHoursOutside: teacher.extra_hours_outside,
    isActive: teacher.is_active,
    bio: teacher.bio,
    picture: teacher.picture,
  };

  const [updatedTeacher, setUpdatedTeacher] = useState(initialTeacher);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsChanged(true);
    setUpdatedTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploidImage(file);
        setUpdatedTeacher((prev) => ({ ...prev, picture: imageUrl }));
        setIsChanged(true);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleUpdate = () => {
    if (!isChanged) return;
    setIsChanged(false);
    updateTeacher(updatedTeacher);
    onClose();
  };

  return (
    <div>
      <h1 className="text-left p-3 text-[#141F75] text-3xl">Update teacher</h1>
      <div className=" w-full mx-auto p-2 bg-white shadow-md rounded-lg flex flex-col">

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 flex justify-center mb-4">
            <img
              src={updatedTeacher.picture || "/default-avatar.png"}
              alt="Teacher"
              className="w-24 h-24 object-cover rounded-full border"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-left text-[#141F75]">First Name</label>
            <input type="text" name="firstName" value={updatedTeacher.firstName} onChange={handleChange} className="w-full p-2 border rounded-md border-gray-200" />
          </div>

          <div className="space-y-2">
            <label className="block text-left text-[#141F75]">Family Name</label>
            <input type="text" name="familyName" value={updatedTeacher.familyName} onChange={handleChange} className="w-full p-2 border rounded-md border-gray-200" />
          </div>

          <div className="space-y-2">
            <label className="block text-left text-[#141F75] hover:cursor-pointer">Date Of Birth</label>
            <input type="date" name="dateOfBirth" value={new Date(updatedTeacher.dateOfBirth).toISOString().split("T")[0]} onChange={handleChange} className="w-full p-2 border rounded-md border-gray-200 hover:cursor-text" />
          </div>

          <div className="space-y-2">
            <label className="block text-left text-[#141F75]">Phone Number</label>
            <input type="number" name="phoneNumber" value={updatedTeacher.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded-md border-gray-200" />
          </div>

          <div className="space-y-2">
            <label className="block text-left text-[#141F75]">Photo</label>
            <input type="file" name="picture" onChange={handleFileChange} className="w-full p-2 border rounded-md border-gray-200 hover:cursor-pointer" />
          </div>

          <div className="space-y-2">
            <label className="block text-left text-[#141F75]">Extra hours outside this departement</label>
            <input type="text" name="extraHoursOutside" value={updatedTeacher.extraHoursOutside} onChange={handleChange} className="w-full p-2 border rounded-md border-gray-200" />
          </div>

          <div className="space-y-2">
            <label className="block text-left text-[#141F75]">Status</label>
            <select name="isActive" value={updatedTeacher.isActive} onChange={handleChange} className="w-full p-2 border rounded-md border-gray-200 hover:cursor-pointer">
              <option value={0}>Not Active</option>
              <option value={1}>Active</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-left text-[#141F75]">Email</label>
            <input type="email" name="email" value={updatedTeacher.email} onChange={handleChange} className="w-full p-2 border rounded-md border-gray-200" />
          </div>

          <div className="space-y-2">
            <label className="block text-left text-[#141F75]">Bio</label>
            <textarea name="bio" value={updatedTeacher.bio} onChange={handleChange} className="w-full p-2 border rounded-md border-gray-200" />
          </div>
        </div>

        <button onClick={handleUpdate} disabled={!isChanged} className={`w-full mt-4 p-2 text-white rounded-md ${isChanged ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}>
          Confirm Update
        </button>
      </div>
    </div>

  );
}
