"use client";

import  useStore  from "@/store/useStore.js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, logout } = useStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}!</h1>
        <button
          onClick={logout}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}