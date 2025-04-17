"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { LayoutDashboard, User, Calendar, Table, Clock, FileText } from "lucide-react";
import useStore from "@/store/useStore";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Teachers", icon: User, path: "/admin/teachers" },
  { name: "Timetables", icon: Table, path: "/admin/timetable" },
  { name: "Extrahours", icon: Clock, path: "/admin/extrahours" },
  { name: "Settings", icon: FileText, path: "/admin/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
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

      <nav className="mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <div
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-200 ${
                isActive ? "bg-blue-100 text-blue-600" : ""
              }`}
            >
              <item.icon className={isActive ? "text-blue-600" : "text-gray-600"} />
              {isOpen && <span className="ml-3">{item.name}</span>}
            </div>
          );
        })}
      </nav>

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