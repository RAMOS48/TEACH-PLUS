
// this file is used as tutorial to use zustand library 


import create from 'zustand';

const useStore = create((set) => ({
  data: 0, 
  // defFunction: () => set((state) => ({ /* code here */ })) 
 
}));
export default useStore;


// select specific value :

const count = useStore((state) => state.data);

// functions used :

// set() >>>  setData: (newName) => set({ data: newData }),

// get() >>>  increase: () => set({ count: get().count + 1 }),


// for async functions :

import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: null,

  // Set user directly
  setUser: (user) => set({ user }),

  // Fetch user from API
  getUser: async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },

  // Update user data
  updateUser: async (id, updatedData) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedData);
      set({ user: response.data });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      set({ user: null });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
}));



