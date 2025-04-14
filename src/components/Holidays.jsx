"use client"

import useStore from "@/store/useStore.js";
import { useState } from 'react';

export default function Holidays() {
  const { holidays, getHolidays, addHoliday, updateHoliday, deleteHoliday } = useStore();
  const [formData, setFormData] = useState({ 
    description: '', 
    from: '', 
    to: '', 
    academicYear: '' 
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.from || !formData.to || !formData.academicYear) {
      alert('Please fill all fields');
      return;
    }

    if (editingId !== null) {
      // Update existing holiday
      updateHoliday(editingId, formData);
      setEditingId(null);
    } else {
      // Add new holiday
      addHoliday(formData);
    }

    // Reset form
    setFormData({ 
      description: '', 
      from: '', 
      to: '', 
      academicYear: '' 
    });
  };

  const handleEdit = (holiday) => {
    setFormData({
      description: holiday.description,
      from: holiday.from,
      to: holiday.to,
      academicYear: holiday.academicYear
    });
    setEditingId(holiday.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      deleteHoliday(id);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Holidays</h1>
      
      {/* List of Holidays */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Holidays</h2>
        {holidays.length === 0 ? (
          <p className="text-gray-500">No holidays added yet.</p>
        ) : (
          <div className="space-y-3">
            {holidays.map(holiday => (
              <div key={holiday.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Description: {holiday.description}</p>
                    <p>From: {holiday.from}</p>
                    <p>To: {holiday.to}</p>
                    <p>Academic Year: {holiday.academic_year}</p>
                  </div>
                  <div className="space-x-2">
                    <button 
                      onClick={() => handleEdit(holiday)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(holiday.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingId !== null ? 'Edit Holiday' : 'Add New Holiday'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="from" className="block mb-1 font-medium">From Date</label>
            <input
              type="date"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="to" className="block mb-1 font-medium">To Date</label>
            <input
              type="date"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="academicYear" className="block mb-1 font-medium">Academic Year</label>
            <input
              type="text"
              id="academicYear"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {editingId !== null ? 'Update Holiday' : 'Add Holiday'}
            </button>
            
            {editingId !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ 
                    description: '', 
                    from: '', 
                    to: '', 
                    academicYear: '' 
                  });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}