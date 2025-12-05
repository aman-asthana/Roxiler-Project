import { useState } from "react";
import { updatePasswordAPI } from "../../api/user";

const UpdatePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updatePasswordAPI(form.oldPassword, form.newPassword);
      alert(res.data.message);
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Update Password</h2>

        <label className="block mb-1 font-medium">Old Password</label>
        <input
          type="password"
          className="border p-2 w-full rounded mb-3"
          value={form.oldPassword}
          onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
        />

        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          className="border p-2 w-full rounded mb-4"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
