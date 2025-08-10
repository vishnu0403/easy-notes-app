import React, { useState } from "react";
import API from "../services/api";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/auth/signup",
        {
          user_name: userName,
          user_email: userEmail,
          password: password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup successful:", response.data);
      alert("Signup successful!");
      // Optionally, redirect to login after signup
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="add">Sign Up</button>
      </form>
    </div>
  );
}
