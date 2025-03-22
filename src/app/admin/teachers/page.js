"use client";
import TeacherCard from "@/components/teacherCard.jsx";
import { useEffect, useState } from "react";
import AddTeacher from "@/components/AddTeacher";
import useStore from "@/store/useStore.js";
import Modal from "@/components/Modal";

export default function Teachers() {
  const { filteredTeachers, getTeachers,teachers,  searchTeacher, filterTeachers } = useStore();

  const [query, setQuery] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const [selectedFilter, setFilter] = useState("ALL");

  useEffect(() => {
    filterTeachers(selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    if (!query || query == "") {
      getTeachers();
      return;
    }
    

    const timeoutId = setTimeout(()=>{searchTeacher(query)}, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleAddTeacher= () =>{
    setOpenAdd(true);
    
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search teacher ..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
       
      
       
      </div> 
      <button className="w-full p-2 text-white rounded-md bg-gray-300" onClick={handleAddTeacher}> add teacher +</button>
      <div className="mb-4">
        <label className="mr-2 font-medium text-gray-700">Filter by:</label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="MCA">MCA</option>
          <option value="MCB">MCB</option>
          <option value="PROFESSOR">PROFESSOR</option>
          <option value="ALL">ALL</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="p-4 bg-white shadow rounded-lg">
            <TeacherCard teacherData={teacher} />
          </div>
        ))}
      </div>
      { openAdd && <Modal isOpen={openAdd} onClose={() => setOpenAdd(false)}> <AddTeacher /></Modal>} 
    </div>
  );
}
