import  { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  if (!user) return null;

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h2 className="text-2xl font-bold tracking-wide">
        ⭐ <span className="text-yellow-400">Rating</span> System
      </h2>

      <nav className="flex gap-5 items-center">

        {user.role === "ADMIN" && (
          <>
            <Link to="/admin/dashboard" className="hover:text-yellow-400 transition-colors font-medium">
              Dashboard
            </Link>
            <Link to="/admin/add-user" className="hover:text-yellow-400 transition-colors font-medium">
              Add User
            </Link>
            <Link to="/admin/add-store" className="hover:text-yellow-400 transition-colors font-medium">
              Add Store
            </Link>
            <Link to="/admin/users" className="hover:text-yellow-400 transition-colors font-medium">
              Users
            </Link>
            <Link to="/admin/stores" className="hover:text-yellow-400 transition-colors font-medium">
              Stores
            </Link>
          </>
        )}

        {user.role === "USER" && (
          <>
            <Link to="/stores" className="hover:text-yellow-400 transition-colors font-medium">
              Stores
            </Link>
            <Link to="/update-password" className="hover:text-yellow-400 transition-colors font-medium">
              Update Password
            </Link>
          </>
        )}

        {user.role === "OWNER" && (
          <>
            <Link to="/owner/dashboard" className="hover:text-yellow-400 transition-colors font-medium">
              Dashboard
            </Link>
            <Link to="/update-password" className="hover:text-yellow-400 transition-colors font-medium">
              Update Password
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-all ml-2"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}


export default Navbar