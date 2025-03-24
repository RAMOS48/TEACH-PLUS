import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
const useStore = create((set , get) => ({

// handle Admins 

// here [esma] define admin APIs for

// handle Admins 

// here [esma] define admin APIs for
user: null,
  token: Cookies.get("session") || null,
  isLoading: false,
  error: null,

  //  Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, userData } = res.data;

      // Store token in cookies (expires in 7 days)
      Cookies.set("session", token, { expires: 7 });

      set({ user: userData, token });
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout
  
  logout: async () => {
    try {
      await axios.delete("/api/auth/logout"); // Change to DELETE
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      //  Remove token from cookies and reset state
      Cookies.remove("session");
      set({ user: null, token: null });
    
    }
  },

  //  Get Admin Info
  getAdmin: async (adminId) => {
    set({ isLoading: true, error: null });
    try {
      const token = get().token;
      if (!token) throw new Error("No token found");

      const res = await axios.get(`/api/auth/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: res.data.admin });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch admin data" });
    } finally {
      set({ isLoading: false });
    }
  },

  //  Refresh Token (After 7 Days)
  refreshToken: async () => {
    try {
      const res = await axios.post("/api/auth/login");
      const { token, userData } = res.data;

      // Update token and state
      Cookies.set("session", token, { expires: 7 });
      set({ user: userData, token });
    } catch (error) {
      console.error("Failed to refresh token:", error);
      get().logout(); // Logout on token refresh failure
    }
  },
  //delete account 
  deleteAccount: async () => {
    try {
      const token = get().token;
      if (!token) throw new Error("No token found");

      await axios.delete("/api/auth/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // After deletion, clear state and remove token
      Cookies.remove("session");
      set({ user: null, token: null });
    } catch (error) {
      console.error("Failed to delete account:", error);
      set({ error: error.response?.data?.message || "Failed to delete account" });
    }
  },
   //  Update Profile
   updateProfile: async (updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const token = get().token;
      if (!token) throw new Error("No token found");

      const res = await axios.put("/api/auth/update-profile", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state with new user data
      set({ user: res.data.admin });
    } catch (error) {
      console.error("Failed to update profile:", error);
      set({ error: error.response?.data?.message || "Failed to update profile" });
    } finally {
      set({ isLoading: false });
    }
  },
   // Forgot Password
   forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      console.log(res.data.message);
      alert(res.data.message); // Display success message
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to send reset link' });
      alert(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      set({ isLoading: false });
    }
  },

  // Reset Password
  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post('/api/auth/reset-password', { token, newPassword });
      console.log(res.data.message);
      alert(res.data.message); // Display success message
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to reset password' });
      alert(err.response?.data?.message || 'Failed to reset password');
    } finally {
      set({ isLoading: false });
    }
  },

// cloudinary ..........................................................................

uploidImage: async (image) => {
  try {
    const formData = new FormData();
    formData.append('file', image);

    const response = await axios.post('/api/uploid', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    });

    return response.data.url;
} catch (error) {
    console.error('Upload error:', error.response?.data || error.message);
    alert('Upload failed');
}
},
// handle Teachers .....................................................................

  teachers: [],


    filteredTeachers: [],
  getTeachers:  async () => {
    // work 
    try {
      const response = await axios.get(`http://localhost:3000/api/teachers`);
      set({ teachers: response.data });
      
      
      set({ filteredTeachers: response.data });

    } catch (error) {
      console.log("Error fetching teachers:", error);
    }
  },

  filterTeachers: (filter) => {
    // work
    const { teachers  } = get(); 
    switch (filter) {
      case "MCA":
        set({ filteredTeachers: teachers.filter(teacher => teacher.rank === "MCA") });
        break;
      case "MCB":
        set({ filteredTeachers: teachers.filter(teacher => teacher.rank === "MCB") });
        break;
      case "PROFESSOR":
        set({ filteredTeachers: teachers.filter(teacher => teacher.rank === "PROFESSOR") });
        break;
      default:
        set({ filteredTeachers: teachers }); 
        break;
    }
  },
  

  searchTeacher: async (query) => {
    // work
    try {
      const response = await axios.get(`http://localhost:3000/api/teachers?name=${query}`);
      set({teachers: response.data});
      set({filteredTeachers: response.data});
      

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  },

  addTeacher : async (addedTeacher) => {
    // work
    try {
      const data = get();

      const response = await axios.post(`http://localhost:3000/api/teachers`, addedTeacher );
      data.getTeachers();
      
    } catch (error) {
      console.log("Error inserting teacher:", error);
    }
  },


  selectedTeacher: null,
  teacher:{},
  teacherTimeTable : [],
  // work
  selectTeacher: (teacher) => { set({ selectedTeacher: teacher } ) },

  // work
  updateStateTeacher: (newTeacher) => { set({ teacher: newTeacher }  ) },

  // work
  getTeacher:  async () => {
    try {
      const data = get();
      const response = await axios.get(`http://localhost:3000/api/teachers/${data.selectedTeacher}`);
      
      set({ teacher: response.data });
    } catch (error) {
      console.log("Error fetching teacher:", error);
    }
  },

  updateTeacher : async (updatedTeacher) => {
    // work
    try {
     const data = get();
      const response = await axios.put(`http://localhost:3000/api/teachers/${data.selectedTeacher}`, updatedTeacher );
      data.getTeachers();
    } catch (error) {
      console.log("Error updating teacher :", error);
    }
  },

  deleteTeacher : async () => {
    // work
    try {
  const data = get()
      const response = await axios.delete(`http://localhost:3000/api/teachers/${data.selectedTeacher}` );
      data.getTeachers();
    } catch (error) {
      console.log("Error deleting teacher:", error);
    }
  },
  

  getTeacherTimeTable :  async () => {
    try {
      const data = get ();
      const response = await axios.get(`http://localhost:3000/api/timetable/${data.selectedTeacher}`);
      set({ teacherTimeTable: response.data.timeTable });
      
    } catch (error) {
      console.log("Error fetching timeTable:", error);
    }
  },

  

  



  

// handle Absences  .................................................................
  

  absences:[] ,

  getAbsences :  async () => {
    // work 
    try {
      const data = get()
      const response = await axios.get(`http://localhost:3000/api/absences?teacherId=${data.selectedTeacher}`);
      set({ absences: response.data.absences });

    } catch (error) {
      console.log("Error fetching absences:", error);
    }
  },

  markAbsence : async (absenceData) => {
    try {
      const data = get()

   // work      
      const response = await axios.post(`http://localhost:3000/api/absences`, absenceData );
      data.getAbsences();
    } catch (error) {
      console.log("Error inserting absence:", error);
    }
  },


  selectedAbsence: {},
  selectAbsence: (absence) => set({ selectedAbsence: absence }),



  updateAbsence : async (updatedAbsence) => {
    try {
      // work
      const data = get();
      const response = await axios.patch(`http://localhost:3000/api/absences/${data.selectedAbsence}`, updatedAbsence);
      data.getAbsences();

    } catch (error) {
      console.log("Error updating absence:", error);
    }
  },

  catchUpAbsence : async (absenceId) => {
    try {      const data = get();

      // work
      const response = await axios.patch(`http://localhost:3000/api/catch_up_absence/${absenceId}`);
      data.getAbsences();

    } catch (error) {
      console.log("Error catching up absence:", error);
    }
  },

  deleteAbsence : async (absenceId) => {
    // work
    try {
      const data = get();

      const response = await axios.delete(`http://localhost:3000/api/absences/${absenceId}` );
      data.getAbsences();

    } catch (error) {
      console.log("Error deleting absence:", error);
    }
  },


// handle Ranks .........................................................................



  historyRank:[] ,
  getRanks :  async () => {
    // work
    try {
      const data = get();
      const response = await axios.get(`http://localhost:3000/api/ranks-history/${data.selectedTeacher}`);
      set({ historyRank: response.data.ranksHistory });
      
    } catch (error) {
      console.log("Error fetching ranks:", error);
    }
  },
  addRank : async (addedRank) => {
    // work
    try {
     
      const data = get(); 
      const response = await axios.post(`http://localhost:3000/api/ranks`,{teacherId:data.selectedTeacher , ...addedRank}  );
      data.getRanks()
    } catch (error) {
      console.log("Error inserting rank:", error);
    }
  },

  selectedRank: {},
  // work
  selectRank: (rank) => set({ selectedRank: rank }),

  updateRank : async (newRank) => {
    // work 
    try {
      const data = get();
      const response = await axios.put(`http://localhost:3000/api/ranks/${data.selectedRank}`, {newTeacherId:data.selectedTeacher , ...newRank});
      data.getRanks()
    } catch (error) {
      console.log("Error updating rank", error);
    }
  },
  deleteRank : async (rankId) => {
    // work
    try {
      const data = get();

      const response = await axios.delete(`http://localhost:3000/api/ranks/${rankId}` );
      data.getRanks()
    } catch (error) {
      console.log("Error deleting rank :", error);
    }
  },


  // handle Sessions ............................................................................



  filteredTimeTable :{},
  sessions:[
  ] ,
  getSessions :  async (filter) => {
    try {
      // work
      const response = await axios.get(`http://localhost:3000/api/timetable?promo=${filter.promo}&academicYear=${filter.academicYear}&semester=${filter.semester}`);
      set({ sessions: response.data.timetable });
      set({filteredTimeTable:filter})
    } catch (error) {
      set({ sessions: [] });
    }
  },
  addSession : async (addedSession , filter) => {
    // work 
    try {
      const data= get();
      const response = await axios.post(`http://localhost:3000/api/sessions`, addedSession );
      data.getSessions(data.filteredTimeTable);
    } catch (error) {
      console.log("Error inserting session:", error);
    }
  },

  selectedSession: null,
  
  selectSession: (session) => set({ selectedSession: session }),

  updateSession : async (updatedSession ) => {
    // work 
    try {
      const data = get();
      const response = await axios.put(`http://localhost:3000/api/sessions/${data.selectedSession}`, updatedSession );
      data.getSessions(data.filteredTimeTable);
    } catch (error) {
      console.log("Error updating session:", error);
    }
  },
  deleteSession : async (sessionId ) => {
    // work 
    try {
      const data= get();
      const response = await axios.delete(`http://localhost:3000/api/sessions/${sessionId}` );
      data.getSessions(data.filteredTimeTable);
    } catch (error) {
      console.log("Error deleting session:", error);
    }
  },

  


  
}));

export default useStore;
