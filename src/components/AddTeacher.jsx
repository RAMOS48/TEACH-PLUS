"use client";

import { useRef, useState } from "react";
import  useStore  from "@/store/useStore";

export default function AddTeacher() {
const {  addTeacher }=useStore();
 const [ addedTeacher , setAddedTeacher] = useState ();



 const firstName=useRef();
 const familyName=useRef();

 const email=useRef();

 const photo=useRef();

 const rank=useRef();


  const handleAdd = () => {
    addTeacher({firstName:firstName.current.value , familyName:familyName.current.value , photo:photo.current.value , email:email.current.value , rank:rank.current.value});
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-center mb-4">
        <img
          src={null}
          alt="Teacher"
          className="w-24 h-24 object-cover rounded-full border"
        />
      </div>
      <div className="space-y-2">
        <input
          ref={firstName}
          type="text"
          name="firstname"
          placeholder="First Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          ref={photo}
          type="image"
          name="photo"
          placeholder="Photo"
          className="w-full p-2 border rounded-md"
        />
        <input
          ref={familyName}
          type="text"
          name="familyname"
          placeholder="Family Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          ref={rank}
          type="text"
          name="rank"
          placeholder="Rank"
          className="w-full p-2 border rounded-md"
        />
        <input
          ref={email}
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleAdd}
          
          className={`w-full p-2 text-white rounded-md 
           bg-gray-300 
          `}
        >
          Confirm Update
        </button>
      </div>
    </div>
  );
}
