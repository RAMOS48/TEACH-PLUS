"use client";

import { useRef, useState } from "react";
import useStore from "@/store/useStore";
import axios from "axios";

export default function AddTeacher({ onClose }) {
  const { addTeacher, uploidImage } = useStore();
  const firstName = useRef();
  const familyName = useRef();
  const phoneNumber = useRef();
  const email = useRef();
  const bio = useRef();
  const dateOfBirth = useRef();
  const isActive = useRef();
  const extraOursOutside = useRef();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = async () => {
    let imageUrl = "";
    if (image) {
      imageUrl = await uploidImage(image);
    }
    
    if(imageUrl !== ""){
    addTeacher({
      firstName: firstName.current.value,
      familyName: familyName.current.value,
      phoneNumber: phoneNumber.current.value,
      email: email.current.value,
      dateOfBirth: dateOfBirth.current.value,
      extraOursOutside: extraOursOutside.current.value,
      isActive: isActive.current.value,
      bio: bio.current.value,
      picture: imageUrl,
    });}
    onClose();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-lg rounded-xl flex flex-col h-full">
      <div className="flex flex-col items-center mb-6">
        <img
          src={preview || ""}
          alt="Teacher"
          className="w-28 h-28 object-cover rounded-full border-4 border-gray-300"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 flex-grow">
        <div className="space-y-4">
          <label className="block font-medium text-gray-700">First Name</label>
          <input ref={firstName} type="text" placeholder="Enter first name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
          
          <label className="block font-medium text-gray-700">Family Name</label>
          <input ref={familyName} type="text" placeholder="Enter family name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
          
          <label className="block font-medium text-gray-700">Email</label>
          <input ref={email} type="email" placeholder="Enter email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
        </div>

        <div className="space-y-4">
          <label className="block font-medium text-gray-700">Date of Birth</label>
          <input ref={dateOfBirth} type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
          
          <label className="block font-medium text-gray-700">Phone Number</label>
          <input ref={phoneNumber} type="number" placeholder="Enter phone number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
          
          <label className="block font-medium text-gray-700">Extra Hours Outside</label>
          <input ref={extraOursOutside} type="text" placeholder="Enter extra hours" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
        </div>

        <div className="space-y-4">
          <label className="block font-medium text-gray-700">Photo</label>
          <input type="file" onChange={handleImageChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
          
          <label className="block font-medium text-gray-700">Status</label>
          <select ref={isActive} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200">
            <option value={0}>Not Active</option>
            <option value={1}>Active</option>
          </select>
          
          <label className="block font-medium text-gray-700">Bio</label>
          <textarea ref={bio} placeholder="Write a short bio..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
        </div>
      </div>

      <button onClick={handleAdd} className="w-full mt-4 p-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition">
        Confirm
      </button>
    </div>
  );
}
