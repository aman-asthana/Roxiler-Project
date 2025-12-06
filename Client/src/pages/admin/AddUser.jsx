import { useState } from "react";
import { addUserAPI } from "../../api/admin";

const AddUser = ()=> {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addUserAPI(form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New User</h2>

      {msg && <p className="mb-4 text-blue-600 font-semibold">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Address"
          name="address"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="USER">USER</option>
          <option value="OWNER">OWNER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser