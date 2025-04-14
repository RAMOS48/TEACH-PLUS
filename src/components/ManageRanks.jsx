"use client"

import { useState, useEffect } from 'react';

export default function ManageRanks() {
  const [ranks, setRanks] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Load ranks from localStorage on component mount
  useEffect(() => {
    const savedRanks = localStorage.getItem('ranks');
    if (savedRanks) {
      setRanks(JSON.parse(savedRanks));
    }
  }, []);

  // Save ranks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ranks', JSON.stringify(ranks));
  }, [ranks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      alert('Please fill all fields');
      return;
    }

    if (editingId !== null) {
      // Update existing rank
      setRanks(ranks.map(rank => 
        rank.id === editingId ? { ...formData, id: editingId } : rank
      ));
      setEditingId(null);
    } else {
      // Add new rank
      const newRank = {
        ...formData,
        id: Date.now() // Using timestamp as a simple unique ID
      };
      setRanks([...ranks, newRank]);
    }

    // Reset form
    setFormData({
      name: '',
      price: ''
    });
  };

  const handleEdit = (rank) => {
    setFormData({
      name: rank.name,
      price: rank.price
    });
    setEditingId(rank.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this rank?')) {
      setRanks(ranks.filter(rank => rank.id !== id));
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Ranks</h1>
      
      {/* List of Ranks */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Ranks</h2>
        {ranks.length === 0 ? (
          <p className="text-gray-500">No ranks added yet.</p>
        ) : (
          <div className="space-y-3">
            {ranks.map(rank => (
              <div key={rank.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Name: {rank.name}</p>
                  <p>Price: {rank.price}</p>
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
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingId !== null ? 'Edit Rank' : 'Add New Rank'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
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
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
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
                setFormData({
                  name: '',
                  price: ''
                });
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