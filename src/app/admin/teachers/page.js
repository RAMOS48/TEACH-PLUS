"use client";
import TeacherCard from "@/components/teacherCard.jsx";
import { useEffect, useState } from "react";
import AddTeacher from "@/components/AddTeacher";
import useStore from "@/store/useStore.js";
import Modal from "@/components/Modal";

export default function Teachers() {
  const { filteredTeachers, getTeachers, teachers, searchTeacher, filterTeachers } = useStore();

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
    const timeoutId = setTimeout(() => {
      searchTeacher(query);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleAddTeacher = () => {
    setOpenAdd(true);
  };

  return (
    <div className="max-w-7xl  p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-[#141F75]">Teacher Management Panel</h1>
      <p className="text-[#141F75] text-sm mb-4">Browse and manage teachers, view profiles, and update information.</p>
      <hr className=" text-gray-400"></hr>
      <div className="flex flex-wrap items-center justify-between m-4 gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder=" 🔍 Search by name, grade, or status..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="relative inline-block"> <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-blue-900">
    ▼
  </span>
  <select
    onChange={(e) => setFilter(e.target.value)}
    className="px-2 py-2 bg-gray-100 text-blue-900 font-normal  appearance-none shadow-md"
  >
    <option value="" disabled>Filter</option>
    <option value="MCA">MCA</option>
    <option value="MCB">MCB</option>
    <option value="PROFESSOR">PROFESSOR</option>
    <option value="ALL">ALL</option>
  </select>
 
</div>
        <button className="p-2 text-white bg-[#2738BD] rounded-md" onClick={handleAddTeacher}>+ Add Teacher</button>
      </div>
      
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.teacher_id} teacherData={teacher} />
        ))}
      </div>
      
      {openAdd && (
        <Modal isOpen={openAdd} onClose={() => setOpenAdd(false)}>
          <AddTeacher onClose={() => setOpenAdd(false)} />
        </Modal>
      )}
    </div>
  );
}
