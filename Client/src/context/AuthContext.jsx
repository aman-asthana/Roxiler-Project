import React, { createContext, useState } from 'react'
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(
      JSON.parse(localStorage.getItem('user')) || null
    )

    const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;

      localStorage.setItem("token", token);

      let decoded;
      try {
        decoded = JSON.parse(atob(token.split(".")[1]));
      } catch (decodeErr) {
        console.error("Failed to decode token:", decodeErr);
        alert("Invalid token received. Please try again.");
        return false;
      }

      localStorage.setItem("user", JSON.stringify(decoded));
      setUser(decoded);

      return true;
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Invalid email or password");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

