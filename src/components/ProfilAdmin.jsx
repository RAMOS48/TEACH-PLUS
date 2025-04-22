"use client"

import useStore from "@/store/useStore.js";
import { useState, useEffect } from 'react';
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
export default function Profiluser() {
    const { user, updateProfile } = useStore();
    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        firstName: '',
        familyName: '',
        dateOfBirth: '',
        department: '',
        address: '',
        picture: ''
    });

    const isoToInputDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    };

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                phoneNumber: user.phone_number || '', 
                firstName: user.first_name || '',
                familyName: user.family_name || '',
                dateOfBirth: isoToInputDate(user.date_of_birth) || '',
                department: user.department || '',
                address: user.address || '',
                picture: user.picture || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const dataToSubmit = {
            newEmail: formData.email,
            newPhoneNumber: formData.phoneNumber,
            newFirstName: formData.firstName,
            newFamilyName: formData.familyName,
            newDateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
            newDepartment: formData.department,
            newAddress: formData.address,
            newPicture: formData.picture
        };
        console.log(dataToSubmit);
        
        updateProfile(dataToSubmit);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-indigo-50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 lowercase">
                first name :
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 lowercase">
                last name :
              </label>
              <input
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
  
          {/* Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 lowercase">
                phone number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pr-10 pl-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <FaPhone className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 lowercase">
                e-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pr-10 pl-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <MdEmail className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
  
          {/* Date of Birth + Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 lowercase">
                birth date
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pr-10 pl-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <FaCalendarAlt className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 lowercase">
                Departement
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                disabled
                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 cursor-not-allowed"
              />
            </div>
          </div>
  
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 lowercase">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
  
          {/* Submit Button */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-indigo-700 transition duration-200"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
  
    );
}