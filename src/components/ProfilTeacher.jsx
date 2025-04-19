"use client";

import { useState } from "react";
import useStore from "@/store/useStore";

// Utilisation de la même variable isEnglish que dans translate.js
const isEnglish = false;

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
      newErrors.firstName = isEnglish ? "First name must be in PascalCase (e.g., John)" : "Le prénom doit être en PascalCase (ex. Jean)";
    }

    if (!pascalCaseRegex.test(updatedTeacher.familyName)) {
      newErrors.familyName = isEnglish ? "Family name must be in PascalCase (e.g., Smith)" : "Le nom de famille doit être en PascalCase (ex. Dupont)";
    }

    if (age < 20 || age > 80) {
      newErrors.dateOfBirth = isEnglish ? "Teacher age must be between 20 and 80 years" : "L'âge de l'enseignant doit être entre 20 et 80 ans";
    }

    if (!phoneRegex.test(updatedTeacher.phoneNumber)) {
      newErrors.phoneNumber = isEnglish ? "Phone number must be exactly 10 digits" : "Le numéro de téléphone doit comporter exactement 10 chiffres";
    }

    if (!emailRegex.test(updatedTeacher.email)) {
      newErrors.email = isEnglish ? "Invalid email format" : "Format d'email invalide";
    }

    if (!/^\d+$/.test(updatedTeacher.extraHoursOutside)) {
      newErrors.extraHoursOutside = isEnglish ? "Extra hours must be an integer" : "Les heures supplémentaires doivent être un entier";
    }

    if (updatedTeacher.bio.length > 100) {
      newErrors.bio = isEnglish ? "Bio must be under 100 characters" : "La biographie doit faire moins de 100 caractères";
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

  // Définition des traductions directement dans le composant
  const translations = {
    title: isEnglish ? "Update Teacher" : "Modifier l'Enseignant",
    firstName: isEnglish ? "First Name" : "Prénom",
    familyName: isEnglish ? "Family Name" : "Nom de Famille",
    dateOfBirth: isEnglish ? "Date of Birth" : "Date de Naissance",
    phoneNumber: isEnglish ? "Phone Number" : "Numéro de Téléphone",
    photo: isEnglish ? "Photo" : "Photo",
    extraHours: isEnglish ? "Extra Hours" : "Heures Supplémentaires",
    status: isEnglish ? "Status" : "Statut",
    email: isEnglish ? "Email" : "Email",
    bio: isEnglish ? "Biography" : "Biographie",
    updateButton: isEnglish ? "Update" : "Mettre à Jour",
    statusOptions: {
      active: isEnglish ? "Active" : "Actif",
      inactive: isEnglish ? "Not Active" : "Non Actif"
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-left p-3 text-[#141F75] text-3xl">
        {translations.title}
      </h1>
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
              label: translations.firstName,
              name: "firstName",
              type: "text",
              value: updatedTeacher.firstName,
              error: errors.firstName,
            },
            {
              label: translations.familyName,
              name: "familyName",
              type: "text",
              value: updatedTeacher.familyName,
              error: errors.familyName,
            },
            {
              label: translations.dateOfBirth,
              name: "dateOfBirth",
              type: "date",
              value: new Date(updatedTeacher.dateOfBirth).toISOString().split("T")[0],
              error: errors.dateOfBirth,
            },
            {
              label: translations.phoneNumber,
              name: "phoneNumber",
              type: "number",
              value: updatedTeacher.phoneNumber,
              error: errors.phoneNumber,
            },
            {
              label: translations.photo,
              name: "picture",
              type: "file",
              onChange: handleFileChange,
            },
            {
              label: translations.extraHours,
              name: "extraHoursOutside",
              type: "text",
              value: updatedTeacher.extraHoursOutside,
              error: errors.extraHoursOutside,
            },
            {
              label: translations.status,
              name: "isActive",
              type: "select",
              value: updatedTeacher.isActive,
              options: [
                { label: translations.statusOptions.inactive, value: 0 },
                { label: translations.statusOptions.active, value: 1 },
              ],
            },
            {
              label: translations.email,
              name: "email",
              type: "email",
              value: updatedTeacher.email,
              error: errors.email,
            },
            {
              label: translations.bio,
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
          {translations.updateButton}
        </button>
      </div>
    </div>
  );
}