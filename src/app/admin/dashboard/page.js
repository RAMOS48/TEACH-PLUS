"use client";

import useStore from "@/store/useStore.js";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { user, logout } = useStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.first_name} !</h1>
        <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 100 }}
  whileHover={{ scale: 1.4 }}
  whileTap={{ scale: 0.7 }}
>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button></motion.div>
      </div>
    </div>
  );
}