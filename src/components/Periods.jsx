"use client"

import useStore from "@/store/useStore.js";
import { useState, useEffect, useRef } from 'react';

export default function Periods() {
  const { periods, getPeriods, addPeriod, updatePeriod, deletePeriod } = useStore();
  const [formData, setFormData] = useState({ name: '', from: '', to: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState('auto');

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(`${formRef.current.offsetHeight}px`);
    }
  }, [formData, editingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (error) setError('');
  };

  const validateDates = () => {
    if (!formData.name) {
      setError('Please enter a name for the period');
      return false;
    }

    if (!formData.from || !formData.to) {
      setError('Please fill both date fields');
      return false;
    }

    if (new Date(formData.to) <= new Date(formData.from)) {
      setError('End date must be after start date');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDates()) return;

    if (editingId !== null) {
      updatePeriod(editingId, {
        newName: formData.name,
        newFrom: formData.from,
        newTo: formData.to
      });
      setEditingId(null);
    } else {
      addPeriod(formData);
    }

    setFormData({ name: '', from: '', to: '' });
    setError('');
  };

  const handleEdit = (period) => {
    setFormData({
      name: period.name,
      from: period.from,
      to: period.to
    });
    setEditingId(period.period_id);
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this period?')) {
      deletePeriod(id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Periods</h1>
  
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Form Section */}
      <div className="bg-[#f3f3fd] p-6 rounded-xl shadow-sm flex-1" style={{ height: formHeight }}>
        <h2 className="text-lg font-semibold text-[#2f2f79] mb-4">Current Periods</h2>
  
        {periods.length === 0 ? (
          <div className="flex items-center justify-center text-gray-500" style={{ height: `calc(${formHeight} - 40px)` }}>
            No periods added yet.
          </div>
        ) : (
          <div
            className="space-y-4 overflow-y-auto pr-2"
            style={{
              height: `calc(${formHeight} - 40px)`,
              scrollbarWidth: 'thin',
            }}
          >
            {periods.map(period => (
              <div key={period.period_id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[#2f2f79]">{period.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(period.from)} - {formatDate(period.to)}
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDelete(period.period_id)}
                    className="text-gray-600 hover:text-red-500 transition"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={() => handleEdit(period)}
                    className="text-gray-600 hover:text-blue-500 transition"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        ref={formRef}
        className="bg-[#f3f3fd] p-6 rounded-xl shadow-sm flex-1"
      >
        <h2 className="text-lg font-semibold text-[#2f2f79] mb-4">
          {editingId !== null ? 'Edit Period' : 'Add new period'}
        </h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
  
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-600">
              Period name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="ramadan session"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
              required
            />
          </div>
  
          <div>
            <label htmlFor="from" className="block mb-1 text-sm font-medium text-gray-600">
              start date
            </label>
            <input
              type="date"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
              required
            />
          </div>
  
          <div>
            <label htmlFor="to" className="block mb-1 text-sm font-medium text-gray-600">
              end date
            </label>
            <input
              type="date"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
              required
            />
          </div>
  
          <button
            type="submit"
            className="bg-[#3b3baf] hover:bg-[#2f2f79] text-white px-6 py-2 mt-4 rounded-md text-sm shadow-lg transition"
          >
            {editingId !== null ? 'Update Period' : 'create period'}
          </button>
        </form>
      </div>
  
      {/* Period List Section */}
      
    </div>
  </div>
  
  );
}