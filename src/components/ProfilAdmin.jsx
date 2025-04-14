"use client"

import useStore from "@/store/useStore.js";
import { useState, useEffect } from 'react';

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

    // Convert ISO date to YYYY-MM-DD format for the input
    const isoToInputDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    };

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                phoneNumber: user.phone_number || '',  // Match your backend property names
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
        // Convert back to your backend's expected property names
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
        <div className=" w-full mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Family Name</label>
                        <input
                            type="text"
                            name="familyName"
                            value={formData.familyName}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
}