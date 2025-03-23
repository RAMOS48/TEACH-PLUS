"use client";

import useStore from '@/store/useStore';
import { useState } from "react";
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { forgotPassword } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
    } catch (error) {
      setMessage('Failed to send reset link');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/2 bg-white flex flex-col justify-center p-16">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg">Send Reset Link</button>
          {message && <p className="mt-4 text-gray-600">{message}</p>}
        </form>
      </div>
      
    </div>
  );
}