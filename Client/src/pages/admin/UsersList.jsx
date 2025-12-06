import React, { useEffect, useState } from 'react'
import { getUsersList } from '../../api/admin';

const UsersList = () => {
 const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

const [sort, setSort] = useState({
    field: "",
    order: "asc",
});

  const fetchUsers = async (sortField) => {
  try {
    const res = await getUsersList({
      ...filters,
      sort: sortField || sort.field,
      order: sort.order
    });
    setUsers(res.data);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    alert("Failed to load users. Please try again.");
  }
};

  useEffect(() => {
        fetchUsers();
  }, []);

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSort = (field) => {
        setSort((prev) => ({
            field,
            order: prev.order === "asc" ? "desc" : "asc",
        }));
        fetchUsers(field);
    };


  const applyFilters = () => fetchUsers();

  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold mb-6">Users List</h2>

   
      <div className="grid grid-cols-4 gap-4 mb-6">

        <input
          name="name"
          type="text"
          placeholder="Search by Name"
          className="border p-2 rounded"
          onChange={handleFilter}
        />

        <input
          name="email"
          type="text"
          placeholder="Search by Email"
          className="border p-2 rounded"
          onChange={handleFilter}
        />

        <input
          name="address"
          type="text"
          placeholder="Search by Address"
          className="border p-2 rounded"
          onChange={handleFilter}
        />

        <select
          name="role"
          className="border p-2 rounded"
          onChange={handleFilter}
        >
          <option value="">All Roles</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="OWNER">OWNER</option>
        </select>

      </div>

      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Apply Filters
      </button>


      <table className="w-full border text-left">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 cursor-pointer" onClick={() => handleSort("name")}>
              Name {sort.field === "name" && (sort.order === "asc" ? "↑" : "↓")}
            </th>

          <th className="p-2 cursor-pointer" onClick={() => handleSort("email")}>
            Email {sort.field === "email" && (sort.order === "asc" ? "↑" : "↓")}
          </th>

          <th className="p-2 cursor-pointer" onClick={() => handleSort("address")}>
            Address {sort.field === "address" && (sort.order === "asc" ? "↑" : "↓")}
          </th>

          <th className="p-2 cursor-pointer" onClick={() => handleSort("role")}>
            Role {sort.field === "role" && (sort.order === "asc" ? "↑" : "↓")}
          </th>

          <th className="p-2">Action</th>

            <th className='p-2'>View User</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.address}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                    <a
                        href={`/admin/users/${u.id}`}
                        className="text-blue-600 underline"
                    >
                        View Details
                    </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList