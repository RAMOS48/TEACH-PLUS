"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";

const Absences = dynamic(() => import("./absencesList"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const ProfilTeacher = dynamic(() => import("./ProfilTeacher"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const Ranks = dynamic(() => import("./Ranks"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const DeleteTeacher = dynamic(() => import("./Delete"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const Modal = dynamic(() => import("./Modal"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

import useStore from "@/store/useStore";

const TeacherCard = ({ teacherData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState([false, ""]);
  const menuRef = useRef(null);

  const {
    getRanks,
    getTeacherTimeTable,
    selectTeacher,
    getTeacher,
    getAbsences,
  } = useStore();

  // Get current academic year in format "yyyy/yyyy"
  const getCurrentAcademicYear = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // 1-12
    
    // Academic year runs from September (9) to July (7)
    if (currentMonth >= 9) { // September-December
      return `${currentYear}/${currentYear + 1}`;
    } else { // January-August
      return `${currentYear - 1}/${currentYear}`;
    }
  };

  // Get current semester ("S1" or "S2")
  const getCurrentSemester = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // 1-12
    const currentDay = today.getDate();
    
    // S1: September 1 - January 31
    if ((currentMonth === 9 && currentDay >= 1) || // September
        (currentMonth >= 10 && currentMonth <= 12) || // October-December
        (currentMonth === 1 && currentDay <= 31)) { // January
      return "S1";
    } 
    // S2: February 1 - July 31
    else if ((currentMonth === 2 && currentDay >= 1) || // February
             (currentMonth >= 3 && currentMonth <= 7)) { // March-July
      return "S2";
    }
    // August is between academic years, default to S1
    return "S1";
  };

  const academicYear = getCurrentAcademicYear();
  const semester = getCurrentSemester();

  function handleModal(option, teacherId) {
    setIsModalOpen([true, option]);
    selectTeacher(teacherId);
    switch (option) {
      case "absences":
        getAbsences();
        getTeacherTimeTable(academicYear, semester);
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

  let ModalContent = null;
  if (isModalOpen[1] === "absences") {
    ModalContent = <Absences onClose={() => setIsModalOpen([false, ""])} />;
  } else if (isModalOpen[1] === "profil") {
    ModalContent = (
      <ProfilTeacher
        teacher={teacherData}
        onClose={() => setIsModalOpen([false, ""])}
      />
    );
  } else if (isModalOpen[1] === "ranks") {
    ModalContent = <Ranks onClose={() => setIsModalOpen([false, ""])} />;
  } else if (isModalOpen[1] === "delete") {
    ModalContent = <DeleteTeacher onClose={() => setIsModalOpen([false, ""])} />;
  }

  return (
    <div className="relative bg-gray-100 p-1 rounded-lg w-full text-center border border-gray-200">
      <div className="w-1/3 m-4 bg-gray-300 rounded-full overflow-hidden border border-gray-400">
        <img
          className="w-full aspect-square"
          src={
            teacherData.picture
              ? teacherData.picture
              : "https://www.smithshearer.com.au/static/uploads/images/smsf-compliance-esperance-wfjxcpafclmz.png"
          }
          alt={teacherData.family_name}
        />
      </div>
      <div className="flex flex-col items-center m-4">
        <div className="bg-white mx-4 p-2 w-full rounded-xl">
          <h2 className="text-md font-semibold text-left text-[#141F75]">
            {teacherData.family_name} {teacherData.first_name}
          </h2>
          <h4 className="text-left text-sm text-[#141F75]">
            {teacherData.rank ? teacherData.rank : "Unknown"}
          </h4>
          <p
            className={`text-sm text-left p-1 font-medium mt-1 ${
              teacherData.is_active ? "text-green-600" : "text-red-600"
            }`}
          >
            {teacherData.is_active ? "🟢 Active" : "🔴 Not Active"}
          </p>
          <button
            className="text-sm bg-blue-900 text-white rounded-2xl flex items-center gap-1 px-2 py-1 hover:cursor-pointer"
            onClick={() => handleModal("profil", teacherData.teacher_id)}
          >
            <FaRegEye /> View Profile
          </button>
        </div>
      </div>

      <button
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <HiDotsHorizontal size={20} />
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-4 top-12 bg-white border border-gray-300 shadow-md rounded-md w-40 text-left"
        >
          <ul className="text-sm text-gray-700">
            <li
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleModal("absences", teacherData.teacher_id)}
            >
              Manage Absences
            </li>
            <li
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleModal("ranks", teacherData.teacher_id)}
            >
              Manage Ranks
            </li>
            <li
              className="p-2 cursor-pointer text-red-600 hover:bg-gray-100"
              onClick={() => handleModal("delete", teacherData.teacher_id)}
            >
              Delete Teacher
            </li>
          </ul>
        </div>
      )}
      {ModalContent &&
        <Modal isOpen={isModalOpen[0]} onClose={() => setIsModalOpen([false, ""])}>
          {ModalContent}
        </Modal>}
    </div>
  );
};

export default TeacherCard;