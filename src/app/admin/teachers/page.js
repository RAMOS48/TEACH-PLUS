"use client";
import TeacherCard from "@/components/teacherCard.jsx";
import { useEffect, useState } from "react";
import AddTeacher from "@/components/AddTeacher";
import useStore from "@/store/useStore.js";
import Modal from "@/components/Modal";
import { translations } from "../translate";

export default function Teachers() {
  const { filteredTeachers, searchTeacher, empty, filterTeachers } = useStore();
  const [query, setQuery] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedFilter, setFilter] = useState("ALL");

  useEffect(() => {
    filterTeachers(selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchTeacher(query);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleAddTeacher = () => {
    setOpenAdd(true);
  };

  // Accès aux traductions
  const t = translations[0]; // Puisque votre translations est un array avec un seul objet

  return (
    <div className="w-full p-3">
      <h1 className="text-3xl font-bold text-[#141F75]">{t.title}</h1>
      <p className="text-[#141F75] text-sm mb-4 font-mono">{t.subtitle}</p>
      <hr className="text-gray-400"></hr>
      
      <div className="flex flex-row items-center justify-between m-4 gap-4">
        <div className="w-[70%]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full p-2 border bg-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative inline-block w-[13%]">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-2 text-center bg-gray-200 rounded-md text-blue-900 w-full h-full hover:cursor-pointer"
          >
            <option value="ALL">ALL</option>
            <option value="MCA">MCA</option>
            <option value="MCB">MCB</option>
            <option value="PROFESSOR">PROFESSOR</option>
          </select>
        </div>
        
        <div className="w-[17%]">     
          <button 
            className="p-2 text-white bg-[#2738BD] rounded-md hover:cursor-pointer" 
            onClick={handleAddTeacher}
          >
            {t.addButton}
          </button>
        </div>
      </div>
      
      {filteredTeachers?.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.teacher_id} teacherData={teacher} />
          ))}
        </div>
      ) : empty ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl font-medium">{t.noTeachers.title}</p>
          <p className="text-sm">{t.noTeachers.message}</p>
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded-md animate-pulse h-48"></div>
          ))}
        </div>
      )}
      
      {openAdd && (
        <Modal isOpen={openAdd} onClose={() => setOpenAdd(false)}>
          <AddTeacher onClose={() => setOpenAdd(false)} />
        </Modal>
      )}
    </div>
  );
}