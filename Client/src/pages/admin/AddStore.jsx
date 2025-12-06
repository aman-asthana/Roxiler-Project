import React, { useState } from "react";
import { addStoreAPI } from "../../api/admin";

const AddStore = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        address: form.address,
        owner_id: form.owner_id ? Number(form.owner_id) : null,
      };

      const res = await addStoreAPI(payload);
      setMsg(res.data.message);
      setMsgType("success");

      setForm({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error adding store");
      setMsgType("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Add Store
      </h2>

      {msg && (
        <div
          className={`p-3 mb-5 rounded text-sm font-semibold ${
            msgType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow-md p-6 rounded-xl border">

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Store Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter store name"
            required
          />
        </div>


        <div>
          <label className="block text-gray-700 mb-1 font-medium">Store Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter email"
            required
          />
        </div>


        <div>
          <label className="block text-gray-700 mb-1 font-medium">Store Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter full address"
            required
          ></textarea>
        </div>

      
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Owner ID <span className="text-gray-400">(optional)</span>
          </label>
          <input
            name="owner_id"
            value={form.owner_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter owner ID"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AddStore;
