import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
   const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const success = await login(form.email, form.password);
    setLoading(false);

    if (!success) return;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user.role === "ADMIN") navigate("/admin/dashboard");
    if (user.role === "OWNER") navigate("/owner/dashboard");
    if (user.role === "USER") navigate("/stores");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">


          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 p-2 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full border border-gray-300 p-2 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition 
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login" }
          </button>
        </form>


        <p className="text-center text-gray-600 mt-6">
          Dont have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;