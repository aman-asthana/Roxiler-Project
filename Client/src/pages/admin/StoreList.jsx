import { useEffect, useState } from "react";
import { getAllStores } from "../../api/store";

const AdminStoreList = () => {
  const [stores, setStores] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [sort, setSort] = useState({
    field: "",
    order: "asc",
  });

  const fetchStores = async (sortField, sortOrder) => {
    try {
      const res = await getAllStores({
        ...filters,
        sort: sortField ?? sort.field,
        order: sortOrder ?? sort.order,
      });
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores:", err);
      alert("Failed to load stores. Please try again.");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSort = (field) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    fetchStores(field, newOrder);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Stores List (Admin)</h2>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          name="name"
          className="border p-2 rounded"
          placeholder="Search by Name"
          onChange={handleFilter}
        />

        <input
          name="email"
          className="border p-2 rounded"
          placeholder="Search by Email"
          onChange={handleFilter}
        />

        <input
          name="address"
          className="border p-2 rounded"
          placeholder="Search by Address"
          onChange={handleFilter}
        />

        <button
          onClick={() => fetchStores()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>


      <div className="flex gap-3 mb-6 flex-wrap">
        <span className="text-gray-600 font-medium">Sort by:</span>
        {["name", "email", "address", "rating"].map((field) => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            className={`px-3 py-1 rounded border ${
              sort.field === field
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
            {sort.field === field && (sort.order === "asc" ? "↑" : "↓")}
          </button>
        ))}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.length === 0 ? (
          <p className="text-gray-500">No stores found</p>
        ) : (
          stores.map((store) => (
            <div
              key={store.id}
              className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{store.name}</h3>

              <p className="text-gray-600 text-sm mb-1">
                <strong>Email:</strong> {store.email}
              </p>

              <p className="text-gray-600 text-sm mb-1">
                <strong>Address:</strong> {store.address}
              </p>

              <p className="text-gray-700 font-medium mt-3">
                ⭐ Rating:{" "}
                {store.overall_rating
                  ? Number(store.overall_rating).toFixed(1)
                  : "No Ratings"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminStoreList;
