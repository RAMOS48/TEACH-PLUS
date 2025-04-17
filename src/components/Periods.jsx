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
        name: formData.name,
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
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Periods</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div 
          ref={formRef}
          className="bg-gray-50 p-4 rounded-lg flex-1"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? 'Edit Period' : 'Add New Period'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Period Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
            
            <div className="flex items-center space-x-2">
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
                    setFormData({ name: '', from: '', to: '' });
                    setError('');
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="flex-1" style={{ height: formHeight }}>
          <h2 className="text-xl font-semibold mb-4">Current Periods</h2>
          {periods.length === 0 ? (
            <div className="flex items-center justify-center" style={{ height: `calc(${formHeight} - 40px)` }}>
              <p className="text-gray-500">No periods added yet.</p>
            </div>
          ) : (
            <div 
              className="space-y-3 overflow-y-auto pr-2"
              style={{ 
                height: `calc(${formHeight} - 40px)`,
                scrollbarWidth: 'thin'
              }}
            >
              {periods.map(period => (
                <div key={period.period_id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{period.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>From: {formatDate(period.from)}</p>
                        <p>To: {formatDate(period.to)}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button 
                        onClick={() => handleEdit(period)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(period.period_id)}
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
      </div>
    </div>
  );
}