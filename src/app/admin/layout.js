"use client"
import Sidebar from "@/components/Sidebar";
import useStore from "@/store/useStore";
import { useEffect } from "react";

export default function AdminLayout({ children }) {

  const {  getAdmin , getTeachers } = useStore();

  const setAdmin = async() =>{
   await getAdmin();
   await getTeachers();
  }
  useEffect(() => {
    setAdmin();
    
  }, []);
    
  

  return (
    <div className="flex h-screen">
      
      <Sidebar />

    
      <div className="flex-1 overflow-y-auto bg-gray-100 p-1">
        {children}
      </div>
    </div>
  );
}