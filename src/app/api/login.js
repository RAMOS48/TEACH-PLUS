"use client";

import { useState } from "react";
import useStore from "@/store/useStore.js";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {user, login, isLoading, error } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ Clear previous errors
    setEmailError("");
    setPasswordError("");
    

    let valid = true;

    // ✅ Email validation
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    }

    // ✅ Password validation (minimum 8 characters, 1 number, 1 special character)
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one number");
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      valid = false;
    }

    if (!valid) return;
    await login(email, password);

    if (!error) {
      router.push("/admin/dashboard");
    }
    console.log(user); 
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
         {/* Error message */}
         {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}


       

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none
               ${
              emailError ? "border-red-500 " : "focus:border-blue-500"
            }`}
            
          />
           
 
         
          {emailError &&  ( <div>
            <p className="mt-1 text-red-500 text-sm">{emailError}</p>
            </div>
            
          )}
        
         
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none ${
              passwordError ? "border-red-500" : "focus:border-blue-500"
            }`}
           
          />
          {passwordError && (
            <p className="mt-1 text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
