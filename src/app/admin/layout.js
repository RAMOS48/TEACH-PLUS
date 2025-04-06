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
      <div className=" max-w-1/5">
      <Sidebar />
      </div>
    
      <div className="flex-1 overflow-y-auto p-1 w-4/5">
        {children}
      </div>
    </div>
  );
}