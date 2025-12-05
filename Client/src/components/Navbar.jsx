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
    <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">


      <h2 className="text-xl font-semibold">⭐ Rating System</h2>

      <nav className="flex gap-6 items-center">

        {user.role === "ADMIN" && (
          <>
            <Link to="/admin/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/admin/add-user" className="hover:text-gray-300">
              Add User
            </Link>
            <Link to="/admin/add-store" className="hover:text-gray-300">
              Add Store
            </Link>
            <Link to="/admin/users" className="hover:text-gray-300">
              Users
            </Link>
            <Link to="/admin/stores" className="hover:text-gray-300">
              Stores
            </Link>
          </>
        )}

        {user.role === "USER" && (
          <>
            <Link to="/stores" className="hover:text-gray-300">
              Stores
            </Link>
            <Link to="/update-password" className="hover:text-gray-300">
              Update Password
            </Link>
          </>
        )}

        {user.role === "OWNER" && (
          <>
            <Link to="/owner/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/update-password" className="hover:text-gray-300">
              Update Password
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}


export default Navbar