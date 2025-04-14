"use client"

import useStore from "@/store/useStore.js";
import { useState } from 'react';

export default function Periods() {
  const { periods, getPeriods, addPeriod, updatePeriod, deletePeriod } = useStore();
  const [formData, setFormData] = useState({ from: '', to: '' });
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
    
    if (!formData.from || !formData.to) {
      alert('Please fill both date fields');
      return;
    }

    if (editingId !== null) {
      // Update existing period
      updatePeriod(editingId, formData);
      setEditingId(null);
    } else {
      // Add new period
      addPeriod(formData);
    }

    // Reset form
    setFormData({ from: '', to: '' });
  };

  const handleEdit = (period) => {
    setFormData({
      from: period.from,
      to: period.to
    });
    setEditingId(period.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this period?')) {
      deletePeriod(id);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Periods</h1>
      
      {/* List of Periods */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Periods</h2>
        {periods.length === 0 ? (
          <p className="text-gray-500">No periods added yet.</p>
        ) : (
          <div className="space-y-3">
            {periods.map(period => (
              <div key={period.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">From: {period.from}</p>
                  <p>To: {period.to}</p>
                </div>
                <div className="space-x-2">
                  <button 
                    onClick={() => handleEdit(period)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(period.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingId !== null ? 'Edit Period' : 'Add New Period'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {editingId !== null ? 'Update Period' : 'Add Period'}
          </button>
          
          {editingId !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ from: '', to: '' });
              }}
              className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}