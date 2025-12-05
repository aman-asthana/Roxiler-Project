import { useEffect, useState } from "react";
import { getAllStores } from "../../api/store";

const AdminStoreList = () => {
  const [stores, setStores] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });

  const fetchStores = async () => {
    const res = await getAllStores(filters);
    setStores(res.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Stores List (Admin)</h2>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          name="name"
          className="border p-2 rounded"
          placeholder="Search by Name"
          onChange={handleFilter}
        />

        <input
          name="address"
          className="border p-2 rounded"
          placeholder="Search by Address"
          onChange={handleFilter}
        />

        <button
          onClick={fetchStores}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
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
