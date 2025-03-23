"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';
import Sidebar from '@/components/Sidebar';

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await resetPassword(password);
      setMessage(response.message);

      if (response.status === 'SUCCESS') {
        router.push('/');
      }
    } catch (error) {
      setMessage('Failed to reset password');
    }
  };

  return (
    

    <div className="flex h-screen bg-gray-50">
        {/* Left side - Form
      <div className="w-1/2 bg-white flex flex-col justify-center p-16">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg">
            Reset Password
          </button>
          {message && <p className="mt-4 text-gray-600">{message}</p>}
        </form>
  
      </div> */}
      <Sidebar/>

     
    </div>
  );
}
