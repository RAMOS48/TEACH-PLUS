"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { LayoutDashboard, User, Calendar, Table, Clock, FileText } from "lucide-react";
import useStore from "@/store/useStore";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Teachers", icon: User, path: "/admin/teachers" },
  { name: "Schedules", icon: Calendar, path: "/admin/sessions" },
  { name: "Timetables", icon: Table, path: "/admin/timetable" },
  { name: "Absences", icon: User, path: "/admin/absences" },
  { name: "Extrahours", icon: Clock, path: "/admin/extrahours" },
  { name: "Reports", icon: FileText, path: "/admin/reports" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();
  const { logout } = useStore();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth < 768;
      setIsSmallScreen(isSmall);
      if (isSmall) setIsOpen(false);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className={`h-screen bg-gray-50 ${isOpen ? "w-64" : "w-16"} transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        {isOpen && (
          <h1 className="text-blue-950 font-extrabold text-xl">
            TEACH<span className=" text-bleu-950 font-light">PLUS</span>
          </h1>
        )}
        {!isSmallScreen && (
          <button className="hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.path)}
            className="flex items-center p-3 cursor-pointer hover:bg-gray-200"
          >
            <item.icon className="text-gray-600" />
            {isOpen && <span className="ml-3">{item.name}</span>}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="absolute bottom-4 flex items-center p-3 cursor-pointer hover:bg-gray-200"
      >
        <FiLogOut className="text-red-500" />
        {isOpen && <span className="ml-3 text-red-500">Logout</span>}
      </div>
    </div>
  );
};

export default Sidebar;
