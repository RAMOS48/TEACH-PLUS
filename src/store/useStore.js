import { create } from "zustand";
import axios from "axios";
import teacherTimeTable from "@/components/teacherTimeTable";
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

  teachers: [{id:"0001" ,  firstName:"nasro",familyName:"simoh",photo:"https://media.licdn.com/dms/image/C4D03AQGzVmIkm78BtA/profile-displayphoto-shrink_200_200/0/1532969415740?e=2147483647&v=beta&t=DsOd94JRP0u86NFuKyiA_0_qwgNqDBkyhwCj5AmCF1Q",
  rank:"MCA"},
  {id:"0002", firstName:"nasro",familyName:"simoh",photo:"https://media.licdn.com/dms/image/C4D03AQGzVmIkm78BtA/profile-displayphoto-shrink_200_200/0/1532969415740?e=2147483647&v=beta&t=DsOd94JRP0u86NFuKyiA_0_qwgNqDBkyhwCj5AmCF1Q",
    rank:"MCB"}],


    filteredTeachers: [{id:"0001" ,  firstName:"nasro",familyName:"simoh",photo:"https://media.licdn.com/dms/image/C4D03AQGzVmIkm78BtA/profile-displayphoto-shrink_200_200/0/1532969415740?e=2147483647&v=beta&t=DsOd94JRP0u86NFuKyiA_0_qwgNqDBkyhwCj5AmCF1Q",
      rank:"MCA"},
      {id:"0002", firstName:"nasro",familyName:"simoh",photo:"https://media.licdn.com/dms/image/C4D03AQGzVmIkm78BtA/profile-displayphoto-shrink_200_200/0/1532969415740?e=2147483647&v=beta&t=DsOd94JRP0u86NFuKyiA_0_qwgNqDBkyhwCj5AmCF1Q",
        rank:"MCB"}],
  getTeachers:  async () => {
    // work 
    try {
      const response = await axios.get(`http://localhost:3001/api/teachers`);
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
      const response = await axios.get(`http://localhost:3001/api/teachers?name=${query}`);
      set({teachers: response.data});
      set({filteredTeachers: response.data});

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  },

  addTeacher : async (addedTeacher) => {
    // work
    try {
      const response = await axios.post(`http://localhost:3001/teachers/admins/${admin.id}`, addedTeacher );
      
    } catch (error) {
      console.log("Error inserting teacher:", error);
    }
  },


  selectedTeacher: null,
  teacher:{id:"0001" , email : "adf@gmail.com" ,  firstName:"nasro",familyName:"simoh",photo:"https://media.licdn.com/dms/image/C4D03AQGzVmIkm78BtA/profile-displayphoto-shrink_200_200/0/1532969415740?e=2147483647&v=beta&t=DsOd94JRP0u86NFuKyiA_0_qwgNqDBkyhwCj5AmCF1Q",
    rank:"MCA"},
  teacherTimeTable : [],
  // work
  selectTeacher: (teacher) => { set({ selectedTeacher: teacher } ) },

  // work
  updateStateTeacher: (newTeacher) => { set({ teacher: newTeacher }  ) },

  // work
  getTeacher:  async () => {
    try {
      const data = get();
      const response = await axios.get(`http://localhost:3001/api/teachers/${data.selectedTeacher}`);
      
      set({ teacher: response.data });
    } catch (error) {
      console.log("Error fetching teacher:", error);
    }
  },

  updateTeacher : async (updatedTeacher) => {
    // work
    try {

      const response = await axios.patch(`http://localhost:3001/api/teachers/${updatedTeacher.id}`, updatedTeacher );
      
    } catch (error) {
      console.log("Error updating teacher :", error);
    }
  },

  deleteTeacher : async () => {
    // work
    try {
  const data = get()
      const response = await axios.delete(`http://localhost:3001/teachers/${data.selectedTeacher}` );
      
    } catch (error) {
      console.log("Error deleting teacher:", error);
    }
  },
  teacherTimeTable:[{
    sessionId: 1,
    dayOfWeek: "Sun",
    startTime: "08:00",
    endTime: "09:00",  
    type: "TD",   
    module: "Math",
    classroom: "salle A1",
    groupNumber: "G1",
    academicYear: "2024-2025",
    academicLevel: "1CS",
    semester: "S1"
  }],

  getTeacherTimeTable :  async () => {
    try {
      const data = get ();
      const response = await axios.get(`http://localhost:3001/api/timetable/${data.selectedTeacher}`);
      set({ teacherTimeTable: response.data });
    } catch (error) {
      console.log("Error fetching timeTable:", error);
    }
  },

  

  



  

// handle Absences  .................................................................
  

  absences:[{absenceId:"00021",date:"kjjj",caughtUp:"true"},{absenceId:"00029",date:"kjjj",caughtUp:"true"}] ,

  getAbsences :  async () => {
    // work 
    try {
      const data = get()
      const response = await axios.get(`http://localhost:3001/api/absences?teacherId=${data.selectedTeacher}`);
      set({ absences: response.data });
    } catch (error) {
      console.log("Error fetching absences:", error);
    }
  },

  markAbsence : async (absenceData) => {
    try {
   // work      
      const response = await axios.post(`http://localhost:3001/api/absences`, absenceData );
      
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
      const response = await axios.patch(`http://localhost:3001/api/absences/${data.selectedAbsence}`, updatedAbsence);
      
    } catch (error) {
      console.log("Error updating absence:", error);
    }
  },

  catchUpAbsence : async (absenceId) => {
    try {
      // work
      const response = await axios.patch(`http://localhost:3001/api/catch_up_absence/${absenceId}`);
      
    } catch (error) {
      console.log("Error catching up absence:", error);
    }
  },

  deleteAbsence : async (absenceId) => {
    // work
    try {
      const response = await axios.delete(`http://localhost:3001/api/absences/${absenceId}` );
      
    } catch (error) {
      console.log("Error deleting absence:", error);
    }
  },


// handle Ranks .........................................................................



  historyRank:[{rankId :"0101" , startingDate:"12/23/4324" , rank:"mcb"}] ,
  getRanks :  async () => {
    // work
    try {
      const data = get();
      const response = await axios.get(`http://localhost:3001/api/ranks/${data.selectedTeacher}`);
      set({ historyRank: response.data });
    } catch (error) {
      console.log("Error fetching ranks:", error);
    }
  },
  addRank : async (addedRank) => {
    // work
    try {
     
      const data = get(); 
      const response = await axios.post(`http://localhost:3001/api/ranks`,{teacherId:data.selectedTeacher , ...addedRank}  );
      
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
      const response = await axios.patch(`http://localhost:3001/api/ranks/${data.selectedRank}`, {newTeacherId:data.selectedTeacher , ...newRank});
      
    } catch (error) {
      console.log("Error updating rank", error);
    }
  },
  deleteRank : async () => {
    // work
    try {
      const data = get();

      const response = await axios.delete(`http://localhost:3001/api/ranks/${data.selectedRank}` );
      
    } catch (error) {
      console.log("Error deleting rank :", error);
    }
  },


  // handle Sessions ............................................................................




  sessions:[{
    sessionId: 1,
    dayOfWeek: "Sun",
    startTime: "08:00",
    endTime: "09:00",  
    type: "Lecture",   
    module: "Math",
    classroom: "A1",
    groupNumber: "G1",
    academicYear: "2024-2025",
    academicLevel: "Undergraduate",
    semester: "Semester 1"
  }
  ] ,
  getSessions :  async (filter) => {
    try {
      // work
      const response = await axios.get(`http://localhost:3001/api/timetable`, filter);
      set({ sessions: response.data });
    } catch (error) {
      console.log("Error fetching sessions:", error);
    }
  },
  addSession : async (addedSession) => {
    // work 
    try {
      const response = await axios.post(`http://localhost:3001/api/sessions`, addedSession );
      
    } catch (error) {
      console.log("Error inserting session:", error);
    }
  },

  selectedSession: {},
  selectSession: (session) => set({ selectedSession: session }),

  updateSession : async (updatedSession) => {
    // work 
    try {
      const response = await axios.patch(`http://localhost:3001/api/sessions/${updatedSession.sessionId}`, updatedSession );
      
    } catch (error) {
      console.log("Error updating session:", error);
    }
  },
  deleteSession : async (sessionId) => {
    // work 
    try {
      const response = await axios.delete(`http://localhost:3001/api/sessions/${sessionId}` );
      
    } catch (error) {
      console.log("Error deleting session:", error);
    }
  },

  


  
}));

export default useStore;
