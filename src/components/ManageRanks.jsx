"use client"

import { useState, useEffect, useRef } from 'react';

export default function ManageRanks() {
  const [ranks, setRanks] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState('auto');

  useEffect(() => {
    const savedRanks = localStorage.getItem('ranks');
    if (savedRanks) {
      setRanks(JSON.parse(savedRanks));
    }
  }, []);

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

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter a rank name');
      return false;
    }
    
    if (!formData.price.trim()) {
      setError('Please enter a price');
      return false;
    }
    
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('Price must be a positive number');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (editingId !== null) {
      const updatedRanks = ranks.map(rank => 
        rank.id === editingId ? { ...formData, id: editingId } : rank
      );
      setRanks(updatedRanks);
      localStorage.setItem('ranks', JSON.stringify(updatedRanks));
      setEditingId(null);
    } else {
      const newRank = {
        ...formData,
        id: Date.now()
      };
      const updatedRanks = [...ranks, newRank];
      setRanks(updatedRanks);
      localStorage.setItem('ranks', JSON.stringify(updatedRanks));
    }

    setFormData({
      name: '',
      price: ''
    });
    setError('');
  };

  const handleEdit = (rank) => {
    setFormData({
      name: rank.name,
      price: rank.price
    });
    setEditingId(rank.id);
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this rank?')) {
      const updatedRanks = ranks.filter(rank => rank.id !== id);
      setRanks(updatedRanks);
      localStorage.setItem('ranks', JSON.stringify(updatedRanks));
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Ranks</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div 
          ref={formRef}
          className="bg-gray-50 p-4 rounded-lg flex-1"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? 'Edit Rank' : 'Add New Rank'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Rank Name</label>
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
              <label htmlFor="price" className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {editingId !== null ? 'Update Rank' : 'Add Rank'}
              </button>
              
              {editingId !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ name: '', price: '' });
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
          <h2 className="text-xl font-semibold mb-4">Current Ranks</h2>
          {ranks.length === 0 ? (
            <div className="flex items-center justify-center" style={{ height: `calc(${formHeight} - 40px)` }}>
              <p className="text-gray-500">No ranks added yet.</p>
            </div>
          ) : (
            <div 
              className="space-y-3 overflow-y-auto pr-2"
              style={{ 
                height: `calc(${formHeight} - 40px)`,
                scrollbarWidth: 'thin'
              }}
            >
              {ranks.map(rank => (
                <div key={rank.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{rank.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>Price: {parseFloat(rank.price).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button 
                        onClick={() => handleEdit(rank)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(rank.id)}
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