"use client"

import useStore from "@/store/useStore.js";
import { useState, useEffect } from 'react';

export default function TableRanks() {
  const { getRanksList, addRankInfos, updateRankInfos, deleteRankInfos } = useStore();
  
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    year: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [years, setYears] = useState([]);
  const [selectedRank, setSelectedRank] = useState(null);
  const [filterYear, setFilterYear] = useState('');
  const [ranks, setRanks] = useState([]); // Initialize as empty array

  // Load ranks and generate years
  useEffect(() => {
    // Load ranks from store - ensure we always get an array
    const loadedRanks = getRanksList();
    setRanks(Array.isArray(loadedRanks) ? loadedRanks : []);

    // Generate years from current year back 10 years
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = 0; i < 10; i++) {
      yearsArray.push(currentYear - i);
    }
    setYears(yearsArray);
  }, [getRanksList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.price || !formData.year) {
      setError('Please fill all fields');
      return false;
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('Price must be a positive number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const rankData = {
      name: formData.name,
      price: parseFloat(formData.price),
      year: formData.year
    };

    try {
      if (editingId !== null) {
        await updateRankInfos(editingId, rankData);
      } else {
        await addRankInfos(rankData);
      }

      // Refresh ranks after update
      const updatedRanks = getRanksList();
      setRanks(Array.isArray(updatedRanks) ? updatedRanks : []);

      setFormData({ name: '', price: '', year: '' });
      setEditingId(null);
      setError('');
      setSelectedRank(null);
    } catch (err) {
      setError('Failed to save rank: ' + err.message);
    }
  };

  const handleEdit = (rank) => {
    setFormData({
      name: rank.name,
      price: rank.price?.toString() || '',
      year: rank.year?.toString() || ''
    });
    setEditingId(rank.id);
    setSelectedRank(rank);
    setError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rank?')) {
      try {
        await deleteRankInfos(id);
        // Refresh ranks after deletion
        const updatedRanks = getRanksList();
        setRanks(Array.isArray(updatedRanks) ? updatedRanks : []);
      } catch (err) {
        setError('Failed to delete rank: ' + err.message);
      }
    }
  };

  // Ensure ranks is always an array before filtering
  const filteredRanks = Array.isArray(ranks) 
    ? ranks.filter(rank => !filterYear || rank.year?.toString() === filterYear)
    : [];

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#141F75] mb-6">Manage Table Ranks</h1>

      {!editingId && (
        <>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Ranks</h2>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Filter by Year:</label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="p-2 border cursor-pointer border-gray-300 rounded-md focus:ring-[#141F75] focus:border-[#141F75]"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {filteredRanks.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                {ranks.length === 0 ? 'No ranks' : 'No ranks match the selected filter'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRanks.map((rank) => (
                      <tr key={rank.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {rank.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${rank.price?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {rank.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(rank)}
                              className="px-3 cursor-pointer py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm hover:bg-indigo-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(rank.id)}
                              className="px-3 cursor-pointer py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Rank</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#141F75] focus:border-[#141F75]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#141F75] focus:border-[#141F75]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:ring-[#141F75] focus:border-[#141F75]"
                    required
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 cursor-pointer py-2 bg-[#141F75] text-white rounded-md hover:bg-[#0e1757] transition-colors"
                >
                  {editingId ? 'Update Rank' : 'Add Rank'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {editingId && selectedRank && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <button
              className="flex cursor-pointer items-center text-[#141F75] hover:text-[#0e1757] mr-4"
              onClick={() => {
                setEditingId(null);
                setSelectedRank(null);
                setFormData({ name: '', price: '', year: '' });
                setError('');
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Edit Rank</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#141F75] focus:border-[#141F75]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#141F75] focus:border-[#141F75]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#141F75] focus:border-[#141F75]"
                  required
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setSelectedRank(null);
                  setFormData({ name: '', price: '', year: '' });
                  setError('');
                }}
                className="px-4 cursor-pointer py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 cursor-pointer py-2 bg-[#141F75] text-white rounded-md hover:bg-[#0e1757] transition-colors"
              >
                Update Rank
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}