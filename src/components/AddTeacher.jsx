"use client";

import { useState } from "react";
import useStore from "@/store/useStore";

export default function AddTeacher({ onClose }) {
  const { addTeacher, uploidImage, isLoading } = useStore();

  const [form, setForm] = useState({
    firstName: "",
    familyName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    isActive: "0",
    extraOursOutside: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const newErrors = {};
    const nameRegex = /^[A-Z][a-z]*$/;

    if (!nameRegex.test(form.firstName)) {
      newErrors.firstName = "First name must be PascalCase. Ex: Mustapha";
    }

    if (!nameRegex.test(form.familyName)) {
      newErrors.familyName = "Family name must be PascalCase. Ex: Rahal";
    }

    const birthDate = new Date(form.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 23 || age > 80) {
      newErrors.dateOfBirth = "Age must be between 23 and 80 years.";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Email is not valid.";
    }

    if (!/^\d+$/.test(form.extraOursOutside)) {
      newErrors.extraOursOutside = "Extra hours must be a valid number.";
    }

    if (form.bio.length > 100) {
      newErrors.bio = "Bio must be under 100 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validateInputs()) return;

    let imageUrl = image
      ? await uploidImage(image)
      : "https://www.smithshearer.com.au/static/uploads/images/smsf-compliance-esperance-wfjxcpafclmz.png";

    addTeacher({
      ...form,
      picture: imageUrl,
    });

    onClose();
  };

  return (
    <div className="w-full">
      <h1 className="text-left p-3 text-[#141F75] text-3xl">Add teacher</h1>
      <div className="w-full mx-auto p-6 bg-gray-100 rounded-xl flex flex-col h-full">
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
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              type="text"
              placeholder="Enter first name"
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            <label className="block text-left text-[#141F75]">Family Name</label>
            <input
              name="familyName"
              value={form.familyName}
              onChange={handleChange}
              type="text"
              placeholder="Enter family name"
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.familyName && (
              <p className="text-red-500 text-sm">{errors.familyName}</p>
            )}

            <label className="block text-left text-[#141F75]">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

   
          <div className="space-y-4">
            <label className="block text-left text-[#141F75]">Date Of Birth</label>
            <input
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              type="date"
              className="w-full p-2 border rounded-md border-gray-200 cursor-text"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}

            <label className="block text-left text-[#141F75]">Phone Number</label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              type="text"
              placeholder="Enter phone number"
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}

            <label className="block text-left text-[#141F75]">
              Extra hours outside this department
            </label>
            <input
              name="extraOursOutside"
              value={form.extraOursOutside}
              onChange={handleChange}
              type="text"
              placeholder="Enter extra hours"
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.extraOursOutside && (
              <p className="text-red-500 text-sm">{errors.extraOursOutside}</p>
            )}
          </div>

         
          <div className="space-y-4">
            <label className="block text-left text-[#141F75]">Photo</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md border-gray-200 cursor-pointer"
            />

            <label className="block text-left text-[#141F75]">Status</label>
            <select
              name="isActive"
              value={form.isActive}
              onChange={handleChange}
              className="w-full p-2 border rounded-md border-gray-200 cursor-pointer"
            >
              <option value="0">Not Active</option>
              <option value="1">Active</option>
            </select>

            <label className="block text-left text-[#141F75]">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Write a short bio..."
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full mt-4 p-3 text-white bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg shadow-md transition"
        >
          {isLoading ? "Loading ..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
