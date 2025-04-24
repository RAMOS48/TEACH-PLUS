"use client";

import { useState } from "react";
import useStore from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";

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
    type: teacher.type || "Permanent",
    accountNumber: teacher.account_number || ""
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

    if (!updatedTeacher.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
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
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1 
        className="text-left p-3 text-[#141F75] text-3xl"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      >
        Update Teacher Profile
      </motion.h1>
      
      <motion.div 
        className="w-full mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <motion.div 
          className="flex justify-center mb-6"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={updatedTeacher.picture || "/default-avatar.png"}
            alt="Teacher"
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              label: "Date of Birth",
              name: "dateOfBirth",
              type: "date",
              value: new Date(updatedTeacher.dateOfBirth).toISOString().split("T")[0],
              error: errors.dateOfBirth,
            },
            {
              label: "Phone Number",
              name: "phoneNumber",
              type: "tel",
              value: updatedTeacher.phoneNumber,
              error: errors.phoneNumber,
            },
            {
              label: "Profile Photo",
              name: "picture",
              type: "file",
              onChange: handleFileChange,
            },
            {
              label: "Extra Hours",
              name: "extraHoursOutside",
              type: "number",
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
              label: "Type",
              name: "type",
              type: "select",
              value: updatedTeacher.type,
              options: [
                { label: "Permanent", value: "Permanent" },
                { label: "Vacataire", value: "Vacataire" },
              ],
            },
            {
              label: "Account Number",
              name: "accountNumber",
              type: "text",
              value: updatedTeacher.accountNumber,
              error: errors.accountNumber,
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              value: updatedTeacher.email,
              error: errors.email,
            },
            {
              label: "Biography",
              name: "bio",
              type: "textarea",
              value: updatedTeacher.bio,
              error: errors.bio,
              className: "md:col-span-2 lg:col-span-3"
            },
          ].map((field, idx) => (
            <motion.div 
              key={idx} 
              className={`space-y-2 ${field.className || ""}`}
              whileHover={{ y: -2 }}
            >
              <motion.label 
                className="block text-left text-[#141F75] font-medium"
                whileHover={{ x: 3 }}
              >
                {field.label}
              </motion.label>
              
              {field.type === "select" ? (
                <motion.select
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-200 hover:cursor-pointer"
                  whileFocus={{ scale: 1.01 }}
                >
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </motion.select>
              ) : field.type === "textarea" ? (
                <motion.textarea
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-200 min-h-[100px]"
                  whileFocus={{ scale: 1.01 }}
                />
              ) : field.type === "file" ? (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                >
                  <input
                    type="file"
                    name={field.name}
                    onChange={field.onChange}
                    className="w-full p-2 border rounded-md border-gray-200 hover:cursor-pointer"
                  />
                </motion.div>
              ) : (
                <motion.input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-200"
                  whileFocus={{ scale: 1.01 }}
                />
              )}
              
              <AnimatePresence>
                {field.error && (
                  <motion.p 
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {field.error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex gap-4 mt-8">
          <motion.button
            onClick={onClose}
            className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          
          <motion.button
            onClick={handleUpdate}
            disabled={!isChanged}
            className={`flex-1 p-3 text-white rounded-lg ${
              isChanged
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            whileHover={isChanged ? { scale: 1.02 } : {}}
            whileTap={isChanged ? { scale: 0.98 } : {}}
          >
            Update Profile
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}