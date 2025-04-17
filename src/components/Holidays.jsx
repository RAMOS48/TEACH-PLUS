"use client"

import useStore from "@/store/useStore.js";
import { useState, useEffect, useRef } from 'react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return dateString;
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

export default function Holidays() {
  const { holidays, addHoliday, updateHoliday, deleteHoliday } = useStore();
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(0);
  
  const [formData, setFormData] = useState({ 
    description: '', 
    from: '', 
    to: '', 
    academicYear: '' 
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [academicYears, setAcademicYears] = useState([]);
  const [hoveredHoliday, setHoveredHoliday] = useState(null);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, [editingId, formData]); 

 
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 9; i >= 0; i--) {
      const year = currentYear - i;
      years.push(`${year-1}/${year}`); 
    }
    setAcademicYears(years);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.description || !formData.from || !formData.to || !formData.academicYear) {
      setError('Please fill all fields');
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
    
    if (!validateForm()) return;

    if (editingId !== null) {
     
      updateHoliday(editingId, { 
        newDescription: formData.description,
        newFrom: formData.from,
        newTo: formData.to,
        newAcademicYear: formData.academicYear,
      });
      setEditingId(null);
    } else {
    
      addHoliday(formData);
    }

  
    setFormData({ 
      description: '', 
      from: '', 
      to: '', 
      academicYear: '' 
    });
    setError('');
  };

  const handleEdit = (holiday) => {
    const formatForDateInput = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    setFormData({
      description: holiday.description,
      from: formatForDateInput(holiday.from),
      to: formatForDateInput(holiday.to),
      academicYear: holiday.academic_year,
    });
    setEditingId(holiday.holiday_id);
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      deleteHoliday(id);
    }
  };

  return (
    <div className="p-4 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Holidays</h1>
      
    
      <div className="flex flex-col md:flex-row gap-6">
       
        <div ref={formRef} className="bg-gray-50 p-4 rounded-lg flex-1">
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? 'Edit Holiday' : 'Add New Holiday'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="description" className="block mb-1 text-sm font-medium">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-sm"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="from" className="block mb-1 text-sm font-medium">From</label>
                <input
                  type="date"
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="to" className="block mb-1 text-sm font-medium">To</label>
                <input
                  type="date"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-sm"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="academicYear" className="block mb-1 text-sm font-medium">Academic Year</label>
              <select
                id="academicYear"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-sm"
                required
              >
                <option value="">Select Academic Year</option>
                {academicYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                {editingId !== null ? 'Update' : 'Add Holiday'}
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
                    setError('');
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

       
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Holidays</h2>
          
       
          <div className="grid grid-cols-12 gap-4 items-center p-3 border-b font-medium text-sm bg-gray-50">
            <div className="col-span-5">Description</div>
            <div className="col-span-3">From</div>
            <div className="col-span-3">To</div>
            <div className="col-span-1"></div>
          </div>
          
          <div 
            className="overflow-y-auto border rounded-lg" 
            style={{ maxHeight: formHeight ? `${formHeight - 60}px` : 'auto' }}
          >
            {holidays.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No holidays added yet.
              </div>
            ) : (
              <div className="divide-y">
                {holidays.map(holiday => (
                  <div 
                    key={holiday.holiday_id} 
                    className="p-3 hover:bg-gray-50"
                    onMouseEnter={() => setHoveredHoliday(holiday.holiday_id)}
                    onMouseLeave={() => setHoveredHoliday(null)}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-5">
                        <p className="font-medium truncate">{holiday.description}</p>
                      </div>
                      
                      {hoveredHoliday !== holiday.holiday_id && (
                        <>
                          <div className="col-span-3">
                            <p className="text-gray-600">{formatDate(holiday.from)}</p>
                          </div>
                          <div className="col-span-3">
                            <p className="text-gray-600">{formatDate(holiday.to)}</p>
                          </div>
                        </>
                      )}
                      
                      {hoveredHoliday === holiday.holiday_id && (
                        <div className="col-span-7 flex justify-end">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEdit(holiday)}
                              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                              title="Edit"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(holiday.holiday_id)}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                              title="Delete"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}