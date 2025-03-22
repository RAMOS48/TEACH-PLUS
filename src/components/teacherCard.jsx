"use client";

import dynamic from 'next/dynamic';
const Absences = dynamic(() => import('./absencesList'), {
  ssr: false, 
  loading: () => <p>Loading...</p>, 
});
const ProfilTeacher = dynamic(() => import('./ProfilTeacher'), {
  ssr: false, 
  loading: () => <p>Loading...</p>, 
});
const Ranks = dynamic(() => import('./Ranks'), {
  ssr: false, 
  loading: () => <p>Loading...</p>, 
});
const DeleteTeacher = dynamic(() => import('./Delete'), {
  ssr: false, 
  loading: () => <p>Loading...</p>, 
});

import { useState, useEffect, useRef } from "react";

import Modal from "./Modal";
import useStore from "@/store/useStore";

const TeacherCard = ({ teacherData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState([false, ""]);

  const menuRef = useRef(null);
  
  const { getRanks ,getTeacherTimeTable,   selectTeacher , getTeacher , getAbsences  } =useStore();

  function handleModal(option , teacherId) {
    setIsModalOpen([true, option]);
    selectTeacher(teacherId);
    switch (option) {
      case "absences":
        getAbsences();
        getTeacherTimeTable();
        break;
      case "profil":
        getTeacher();
      break;
      case "ranks":
        getRanks();
      break;
      default:
        break;
    }
  }

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);
  return (
    <div className="relative bg-gray-100 p-6 rounded-xl shadow-md w-64 text-center">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
          <img className="rounded-4xl" src={teacherData.picture} alt={teacherData.family_name} />
        </div>
        <h2 className="text-xl font-semibold mt-2">{teacherData.family_name}{" "}{teacherData.first_name}</h2>
        <p className="text-gray-600">rank here {teacherData.rank}</p>
      </div>

      <button className="absolute top-4 right-4 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        Menu
      </button>

      {isMenuOpen && (
        <div ref={menuRef} className="absolute right-4 top-12 bg-white border shadow-md rounded-md overflow-hidden">
          <ul className="text-left">
            <li className="p-2 border-b cursor-pointer hover:bg-gray-200" onClick={() => handleModal("profil",teacherData.teacher_id)}>
              see profile
            </li>
            <li className="p-2 border-b cursor-pointer hover:bg-gray-200" onClick={() => handleModal("absences",teacherData.teacher_id)}>
              manage absences
            </li>
            <li className="p-2 border-b cursor-pointer hover:bg-gray-200" onClick={() => handleModal("ranks",teacherData.teacher_id)}>
              history rank
            </li>
            <li className="p-2 border-b cursor-pointer hover:bg-gray-200" onClick={() => handleModal("delete",teacherData.teacher_id)}>
              delete teacher
            </li>
          </ul>
        </div>
      )}

      <Modal isOpen={isModalOpen[0]} onClose={() => setIsModalOpen([false, ""])}>
        {isModalOpen[1]=="absences" && <Absences/>}
        {isModalOpen[1]=="profil" && <ProfilTeacher teacher={teacherData}/>}
        {isModalOpen[1]=="ranks" && <Ranks/>}
        {isModalOpen[1]=="delete" && <DeleteTeacher />}

      </Modal>
    </div>
  );
};

export default TeacherCard;
