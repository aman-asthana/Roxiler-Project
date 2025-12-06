import React from 'react'
import { useState } from 'react';
import { signupAPI } from '../api/auth';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const validateForm = () => {
    const { name, email, address, password } = form;

    if (name.length < 20 || name.length > 60) {
      alert("Name must be 20–60 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return false;
    }

    if (address.length > 400) {
      alert("Address must be less than 400 characters");
      return false;
    }

    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passRegex.test(password)) {
      alert("Password must be 8–16 chars, include 1 uppercase & 1 special char.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await signupAPI(form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Create Account
      </h2>


      <label className="block text-gray-700 font-medium mb-1">Full Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your full name"
        className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={handleChange}
      />


      <label className="block text-gray-700 font-medium mb-1">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={handleChange}
      />

      <label className="block text-gray-700 font-medium mb-1">Address</label>
      <textarea
        name="address"
        placeholder="Your address"
        className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        rows="3"
        onChange={handleChange}
      />


      <label className="block text-gray-700 font-medium mb-1">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        className="w-full border p-2 rounded mb-5 focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={handleChange}
      />


      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 w-full text-white font-semibold p-2 rounded-lg"
      >
        Signup
      </button>
      <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
    </form>
  </div>
);
}

export default Signup