"use client"
import { useState } from "react";
// import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, password });

      Cookies.set("token", res.data.token, { expires: 1 });
      console.log(res.data);
      
      // router.push(res.data.redirect); // Redirect to /admin
    } catch (error) {
      setMessage(error.response?.data?.message );
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
