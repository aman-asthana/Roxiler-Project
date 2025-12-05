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

    const decoded = JSON.parse(atob(token.split(".")[1]));
    localStorage.setItem("user", JSON.stringify(decoded));

    setUser(decoded);

    return true;

  } catch (err) {
    alert("Invalid email or password", err);
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

