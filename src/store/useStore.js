import { create } from "zustand";

const useStore = create((set , get) => ({

// handle Admins 

// here [esma] define admin APIs for

/*

.login 
.logout
.getAdmin
.refresh token
.forgot password
.reset password
. update profile ( parametrage )
. delete account 

reference :  PDF of Ayoub

*/ 


// handle Teachers .....................................................................

  teachers: [{firstName:"nasro",familyName:"simoh",photo:"https://media.licdn.com/dms/image/C4D03AQGzVmIkm78BtA/profile-displayphoto-shrink_200_200/0/1532969415740?e=2147483647&v=beta&t=DsOd94JRP0u86NFuKyiA_0_qwgNqDBkyhwCj5AmCF1Q",
  rank:"MCA"},
  {firstName:"nasro",familyName:"simoh",photo:"https://media.licdn.com/dms/image/C4D03AQGzVmIkm78BtA/profile-displayphoto-shrink_200_200/0/1532969415740?e=2147483647&v=beta&t=DsOd94JRP0u86NFuKyiA_0_qwgNqDBkyhwCj5AmCF1Q",
    rank:"MCB"}],


    filteredTeachers: [{firstName:"nasro",familyName:"simoh",photo:"https://media.licdn.com/dms/image/C4D03AQGzVmIkm78BtA/profile-displayphoto-shrink_200_200/0/1532969415740?e=2147483647&v=beta&t=DsOd94JRP0u86NFuKyiA_0_qwgNqDBkyhwCj5AmCF1Q",
      rank:"MCA"},
      {firstName:"nasro",familyName:"simoh",photo:"https://media.licdn.com/dms/image/C4D03AQGzVmIkm78BtA/profile-displayphoto-shrink_200_200/0/1532969415740?e=2147483647&v=beta&t=DsOd94JRP0u86NFuKyiA_0_qwgNqDBkyhwCj5AmCF1Q",
        rank:"MCB"}],
  getTeachers:  async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/teachers`);
      set({ teachers: response.data });
    } catch (error) {
      console.log("Error fetching teachers:", error);
    }
  },

  filterTeachers: (filter) => {
    const { teachers  } = get(); 
  console.log(filter);
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
    try {
      const response = await axios.get(`http://localhost:3001/api/teachers?name=${query}`);
      set({teachers: response.data});
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  },

  addTeacher : async (addedTeacher) => {
    try {
      const response = await axios.post(`http://localhost:3001/teachers/admins/${admin.id}`, addedTeacher );
      
    } catch (error) {
      console.log("Error inserting teacher:", error);
    }
  },


  selectedTeacher: null,
  teacher:{},
  teacherTimeTable : [],
  selectTeacher: (teacher) => set({ selectedTeacher: teacher }),

  getTeacher:  async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/teachers/${selectedTeacher}`);
      set({ teacher: response.data });
    } catch (error) {
      console.log("Error fetching teacher:", error);
    }
  },

  updateTeacher : async (updatedTeacher) => {
    try {
      const response = await axios.update(`http://localhost:3001/api/teachers/${selectedTeacher}`, updatedTeacher );
      
    } catch (error) {
      console.log("Error updating teacher :", error);
    }
  },

  deleteTeacher : async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/teachers/${selectedTeacher}` );
      
    } catch (error) {
      console.log("Error deleting teacher:", error);
    }
  },

  getTeacherTimeTable :  async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/timetable/${selectedTeacher}`);
      set({ teacherTimeTable: response.data });
    } catch (error) {
      console.log("Error fetching timeTable:", error);
    }
  },

  

  



  

// handle Absences  .................................................................
  

  absences:null ,

  getAbsences :  async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/absences?teacherId=${selectedTeacher}`);
      set({ absences: response.data });
    } catch (error) {
      console.log("Error fetching absences:", error);
    }
  },
  markAbsence : async (absenceDate) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/absences`, {date:absenceDate } );
      
    } catch (error) {
      console.log("Error inserting absence:", error);
    }
  },


  selectedAbsence: {},
  selectAbsence: (absence) => set({ selectedAbsence: absence }),



  updateAbsence : async (updatedAbsence) => {
    try {
      const response = await axios.update(`http://localhost:3001/api/absences/${selectedAbsence}`, updatedAbsence);
      
    } catch (error) {
      console.log("Error updating absence:", error);
    }
  },

  cahtchUpAbsence : async () => {
    try {
      const response = await axios.update(`http://localhost:3001/api/catch_up_absence/${selectedAbsence}`);
      
    } catch (error) {
      console.log("Error catching up absence:", error);
    }
  },

  deleteAbsence : async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/absences/${selectedAbsence}` );
      
    } catch (error) {
      console.log("Error deleting absence:", error);
    }
  },


// handle Ranks .........................................................................



  historyRank:[] ,
  getRanks :  async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/teachers/${selectedTeacher}/ranks`);
      set({ historyRank: response.data });
    } catch (error) {
      console.log("Error fetching ranks:", error);
    }
  },
  addRank : async (addedRank) => {
    try {
      const response = await axios.post(`http://localhost:3001/teachers/${selectedTeacher}/ranks/`, addedRank );
      
    } catch (error) {
      console.log("Error inserting rank:", error);
    }
  },

  selectedRank: {},
  selectRank: (rank) => set({ selectedRank: rank }),

  updateRank : async (newRank) => {
    try {
      const response = await axios.update(`http://localhost:3001/teachers/${selectedTeacher}/ranks/${selectedRank}`, newRank);
      
    } catch (error) {
      console.log("Error updating rank", error);
    }
  },
  deleteRank : async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/teachers/${selectedTeacher}/ranks/${selectedRank}` );
      
    } catch (error) {
      console.log("Error deleting rank :", error);
    }
  },


  // handle Sessions ............................................................................




  sessions:null ,
  getSessions :  async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/sessions`);
      set({ sessions: response.data });
    } catch (error) {
      console.log("Error fetching sessions:", error);
    }
  },
  addSession : async (addedSession) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/sessions`, addedSession );
      
    } catch (error) {
      console.log("Error inserting session:", error);
    }
  },

  selectedSession: {},
  selectSession: (session) => set({ selectedSession: session }),

  updateSession : async (updatedSession) => {
    try {
      const response = await axios.update(`http://localhost:3001/api/sessions/${selectedSession}`, updatedSession );
      
    } catch (error) {
      console.log("Error updating session:", error);
    }
  },
  deleteSession : async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/sessions/${selectedSession}` );
      
    } catch (error) {
      console.log("Error deleting session:", error);
    }
  },

  


  
}));

export default useStore;
