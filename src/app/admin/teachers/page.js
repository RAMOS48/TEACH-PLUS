"use client";
import TeacherCard from "@/components/teacherCard.jsx"
import { useEffect , useState } from "react";
import useStore from "@/store/useStore.js";





// add sideBar component


export default function Teachers() {
  const { filteredTeachers , getTeachers , searchTeacher ,filterTeachers} = useStore();

  const [query, setQuery] = useState("");
  const [selectedFilter, setFilter] = useState("ALL");

  useEffect(() => {
    filterTeachers( selectedFilter );
  }, [selectedFilter]);

 
  useEffect(() => { 
    if (!query || query=="") {getTeachers();return};

  const timeoutId = setTimeout(searchTeacher, 500); 
  return () => clearTimeout(timeoutId);
}, [query]);

  

 
    return (
      <div className=" ">
        <div><input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search teacher ..."
      />
      </div>
        <div>Filter by : <select  onChange={(e) => setFilter(e.target.value)}>
        <option value="MCA">MCA</option>
        <option value="MCB">MCB</option>
        <option value="PROFESSOR">PROFESSOR</option>
        <option value="ALL">ALL</option>

      </select></div>
        <div>
        {  filteredTeachers.map((teacher)=>( <div> <TeacherCard  teacherData={teacher} /></div>))}
        </div>
      </div>
    );
  }
  