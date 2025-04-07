"use client";

import { useRef, useState } from "react";
import useStore from "@/store/useStore";

export default function AddTeacher({ onClose }) {
  const { addTeacher, uploidImage , isLoading } = useStore();
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
      });
      onClose();
    }else {
      addTeacher({
        firstName: firstName.current.value,
        familyName: familyName.current.value,
        phoneNumber: phoneNumber.current.value,
        email: email.current.value,
        dateOfBirth: dateOfBirth.current.value,
        extraOursOutside: extraOursOutside.current.value,
        isActive: isActive.current.value,
        bio: bio.current.value,
        picture: "https://www.smithshearer.com.au/static/uploads/images/smsf-compliance-esperance-wfjxcpafclmz.png",
      });
      onClose();
    }
  }
    

  return (<div className=" w-full ">
    <h1 className=" text-left p-3 text-[#141F75] text-3xl">Add teacher</h1>
    <div className="max-w-3xl w-full mx-auto p-6 bg-gray-100  rounded-xl flex flex-col h-full">
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            preview ||
            "https://th.bing.com/th/id/OIP.939YVYG6r2voj7iGiDc1QQAAAA?w=300&h=300&rs=1&pid=ImgDetMain"
          }
          alt="Teacher"
          className="w-28 h-28 object-cover rounded-full border-4 border-gray-300"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow">
        <div className="space-y-4">
          <label className="block text-left text-[#141F75]">First Name</label>
          <input
            ref={firstName}
            type="text"
            placeholder="Enter first name"
            className="w-full p-2 border rounded-md border-gray-200"
          />
  
          <label className="block text-left text-[#141F75]">Family Name</label>
          <input
            ref={familyName}
            type="text"
            placeholder="Enter family name"
            className="w-full p-2 border rounded-md border-gray-200"
          />
  
          <label className="block text-left text-[#141F75]">Email</label>
          <input
            ref={email}
            type="email"
            placeholder="Enter email"
            className="w-full p-2 border rounded-md border-gray-200"
          />
        </div>
  
        <div className="space-y-4">
          <label className="block text-left text-[#141F75]">Date Of Birth</label>
          <input
            ref={dateOfBirth}
            type="date"
            className="w-full p-2 border rounded-md border-gray-200 cursor-text"
          />
  
          <label className="block text-left text-[#141F75]">Phone Number</label>
          <input
            ref={phoneNumber}
            type="number"
            placeholder="Enter phone number"
            className="w-full p-2 border rounded-md border-gray-200"
          />
  
          <label className="block text-left text-[#141F75]">
            Extra hours outside this department
          </label>
          <input
            ref={extraOursOutside}
            type="text"
            placeholder="Enter extra hours"
            className="w-full p-2 border rounded-md border-gray-200"
          />
        </div>
  
        <div className="space-y-4">
          <label className="block text-left text-[#141F75]">Photo</label>
          
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md border-gray-200 cursor-pointer "
          />
  
          <label className="block text-left text-[#141F75]">Status</label>
          <select
            ref={isActive}
            className="w-full p-2 border rounded-md border-gray-200 cursor-pointer"
          >
            <option value={0}>Not Active</option>
            <option value={1}>Active</option>
          </select>
  
          <label className="block text-left text-[#141F75]">Bio</label>
          <textarea
            ref={bio}
            placeholder="Write a short bio..."
            className="w-full p-2 border rounded-md border-gray-200"
          />
        </div>
      </div>
  
      <button
        onClick={handleAdd}
        className="w-full mt-4 p-3 text-white bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg shadow-md transition"
      >
        {isLoading  ? "Loading ..." : "Confirm"}
      </button>
    </div>
  </div>
  
  );
}
