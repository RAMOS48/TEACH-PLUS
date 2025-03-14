"use client";

import Shedule from "@/components/Shedule";
import useStore from "@/store/useStore.js";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import AddSession from "@/components/AddSession";

export default function Schedule() {
  const { sessions, getSessions } = useStore();
  const [filterTimeTable, setFilterTimeTable] = useState({
    promo: "",
    semester: "",
    year: "",
  });
  const [ isOpenAddSession , setIsOpenAddSession] = useState(false);

  useEffect(() => {
    getSessions(filterTimeTable);
  }, [filterTimeTable]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Schedule Page
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Type year here..."
          onChange={(e) =>
            setFilterTimeTable({ ...filterTimeTable, year: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          onChange={(e) =>
            setFilterTimeTable({ ...filterTimeTable, semester: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Semester</option>
          <option value="s1">S1</option>
          <option value="s2">S2</option>
        </select>

        <select
          onChange={(e) =>
            setFilterTimeTable({ ...filterTimeTable, promo: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Promotion</option>
          <option value="1cp">1CP</option>
          <option value="2cp">2CP</option>
          <option value="1cs">1CS</option>
          <option value="2cs">2CS</option>
          <option value="3cs">3CS</option>
        </select>
        <button onClick={()=>{setIsOpenAddSession(true)}} className="w-full hover:cursor-pointer p-2 text-amber-50 bg-blue-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">Add session</button>
      </div>

      <div className="bg-gray-100 p-4 rounded-md shadow-inner">
        <Shedule sessions={sessions} />
      </div>
      {isOpenAddSession && <Modal isOpen={isOpenAddSession} onClose={() => setIsOpenAddSession(false)}> <AddSession onClose={() => setIsOpenAddSession(false)}/> </Modal>}
    </div>
  );
}
