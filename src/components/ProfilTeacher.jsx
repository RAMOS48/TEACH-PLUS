"use client";

import { useState } from "react";
import useStore from "@/store/useStore";

export default function ProfileTeacher({ teacher, onClose }) {
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState({});
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

  const validateInputs = () => {
    const newErrors = {};
    const pascalCaseRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const age = new Date().getFullYear() - new Date(updatedTeacher.dateOfBirth).getFullYear();

    if (!pascalCaseRegex.test(updatedTeacher.firstName)) {
      newErrors.firstName = "First name must be in PascalCase (e.g., John)";
    }

    if (!pascalCaseRegex.test(updatedTeacher.familyName)) {
      newErrors.familyName = "Family name must be in PascalCase (e.g., Smith)";
    }

    if (age < 20 || age > 80) {
      newErrors.dateOfBirth = "Teacher age must be between 20 and 80 years";
    }

    if (!phoneRegex.test(updatedTeacher.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!emailRegex.test(updatedTeacher.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!/^\d+$/.test(updatedTeacher.extraHoursOutside)) {
      newErrors.extraHoursOutside = "Extra hours must be an integer";
    }

    if (updatedTeacher.bio.length > 100) {
      newErrors.bio = "Bio must be under 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validateInputs()) return;

    updateTeacher(updatedTeacher);
    setIsChanged(false);
    onClose();
  };

  return (
    <div className="w-full">
      <h1 className="text-left p-3 text-[#141F75] text-3xl">Update teacher</h1>
      <div className="w-full mx-auto p-2 bg-white shadow-md rounded-lg flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 flex justify-center mb-4">
            <img
              src={updatedTeacher.picture || "/default-avatar.png"}
              alt="Teacher"
              className="w-24 h-24 object-cover rounded-full border"
            />
          </div>

          {[
            {
              label: "First Name",
              name: "firstName",
              type: "text",
              value: updatedTeacher.firstName,
              error: errors.firstName,
            },
            {
              label: "Family Name",
              name: "familyName",
              type: "text",
              value: updatedTeacher.familyName,
              error: errors.familyName,
            },
            {
              label: "Date Of Birth",
              name: "dateOfBirth",
              type: "date",
              value: new Date(updatedTeacher.dateOfBirth).toISOString().split("T")[0],
              error: errors.dateOfBirth,
            },
            {
              label: "Phone Number",
              name: "phoneNumber",
              type: "number",
              value: updatedTeacher.phoneNumber,
              error: errors.phoneNumber,
            },
            {
              label: "Photo",
              name: "picture",
              type: "file",
              onChange: handleFileChange,
            },
            {
              label: "Extra hours outside this departement",
              name: "extraHoursOutside",
              type: "text",
              value: updatedTeacher.extraHoursOutside,
              error: errors.extraHoursOutside,
            },
            {
              label: "Status",
              name: "isActive",
              type: "select",
              value: updatedTeacher.isActive,
              options: [
                { label: "Not Active", value: 0 },
                { label: "Active", value: 1 },
              ],
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              value: updatedTeacher.email,
              error: errors.email,
            },
            {
              label: "Bio",
              name: "bio",
              type: "textarea",
              value: updatedTeacher.bio,
              error: errors.bio,
            },
          ].map((field, idx) => (
            <div key={idx} className="space-y-2">
              <label className="block text-left text-[#141F75]">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-200 hover:cursor-pointer"
                >
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-200"
                />
              ) : field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={field.onChange}
                  className="w-full p-2 border rounded-md border-gray-200 hover:cursor-pointer"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-200"
                />
              )}
              {field.error && (
                <p className="text-red-500 text-sm">{field.error}</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleUpdate}
          disabled={!isChanged}
          className={`w-full mt-4 p-2 text-white rounded-md ${
            isChanged
              ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Confirm Update
        </button>
      </div>
    </div>
  );
}
