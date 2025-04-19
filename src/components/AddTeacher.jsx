"use client";

import { useState } from "react";
import useStore from "@/store/useStore";
import { translations } from "@/app/admin/translate";

export default function AddTeacher({ onClose }) {
  const { addTeacher, uploidImage, isLoading } = useStore();
  const isEnglish = true; // You can make this dynamic based on user preference
  const t = translations.find(item => item.page === "teachers").modalAddTeacher;

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
      newErrors.firstName = isEnglish 
        ? "First name must be PascalCase. Ex: Mustapha" 
        : "Le prénom doit être en PascalCase. Ex: Mustapha";
    }

    if (!nameRegex.test(form.familyName)) {
      newErrors.familyName = isEnglish 
        ? "Family name must be PascalCase. Ex: Rahal" 
        : "Le nom de famille doit être en PascalCase. Ex: Rahal";
    }

    const birthDate = new Date(form.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 23 || age > 80) {
      newErrors.dateOfBirth = isEnglish 
        ? "Age must be between 23 and 80 years." 
        : "L'âge doit être compris entre 23 et 80 ans.";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phoneNumber)) {
      newErrors.phoneNumber = isEnglish 
        ? "Phone number must be exactly 10 digits." 
        : "Le numéro de téléphone doit comporter exactement 10 chiffres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = isEnglish 
        ? "Email is not valid." 
        : "L'email n'est pas valide.";
    }

    if (!/^\d+$/.test(form.extraOursOutside)) {
      newErrors.extraOursOutside = isEnglish 
        ? "Extra hours must be a valid number." 
        : "Les heures supplémentaires doivent être un nombre valide.";
    }

    if (form.bio.length > 100) {
      newErrors.bio = isEnglish 
        ? "Bio must be under 100 characters." 
        : "La biographie doit contenir moins de 100 caractères.";
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
      <h1 className="text-left p-3 text-[#141F75] text-3xl">{t.title}</h1>
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
            <label className="block text-left text-[#141F75]">{t.firstname}</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              type="text"
              placeholder={isEnglish ? "Enter first name" : "Entrez le prénom"}
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            <label className="block text-left text-[#141F75]">{t.familyName}</label>
            <input
              name="familyName"
              value={form.familyName}
              onChange={handleChange}
              type="text"
              placeholder={isEnglish ? "Enter family name" : "Entrez le nom de famille"}
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.familyName && (
              <p className="text-red-500 text-sm">{errors.familyName}</p>
            )}

            <label className="block text-left text-[#141F75]">{t.email}</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder={isEnglish ? "Enter email" : "Entrez l'email"}
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-left text-[#141F75]">{t.dateOfBirth}</label>
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

            <label className="block text-left text-[#141F75]">{t.phoneNumber}</label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              type="text"
              placeholder={isEnglish ? "Enter phone number" : "Entrez le numéro de téléphone"}
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}

            <label className="block text-left text-[#141F75]">
              {t.extraHours}
            </label>
            <input
              name="extraOursOutside"
              value={form.extraOursOutside}
              onChange={handleChange}
              type="text"
              placeholder={isEnglish ? "Enter extra hours" : "Entrez les heures supplémentaires"}
              className="w-full p-2 border rounded-md border-gray-200"
            />
            {errors.extraOursOutside && (
              <p className="text-red-500 text-sm">{errors.extraOursOutside}</p>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-left text-[#141F75]">{t.photo}</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md border-gray-200 cursor-pointer"
            />

            <label className="block text-left text-[#141F75]">{t.status}</label>
            <select
              name="isActive"
              value={form.isActive}
              onChange={handleChange}
              className="w-full p-2 border rounded-md border-gray-200 cursor-pointer"
            >
              <option value="0">{isEnglish ? "Not Active" : "Non Actif"}</option>
              <option value="1">{isEnglish ? "Active" : "Actif"}</option>
            </select>

            <label className="block text-left text-[#141F75]">{t.bio}</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder={isEnglish ? "Write a short bio..." : "Écrivez une courte biographie..."}
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
          {isLoading ? (isEnglish ? "Loading..." : "Chargement...") : t.confirmButton}
        </button>
      </div>
    </div>
  );
}