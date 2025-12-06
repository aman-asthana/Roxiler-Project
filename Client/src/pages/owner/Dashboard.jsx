import { useEffect, useState } from "react";
import api from "../../api/axios";

const OwnerDashboard = () => {
  const [data, setData] = useState({
    store_id: null,
    store_name: "",
    average_rating: null,
    total_ratings: 0,
    rated_users: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/owner/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load owner dashboard:", err);
        alert("Failed to load dashboard. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8">


      <h2 className="text-3xl font-bold mb-6">
        {data.store_name
          ? `${data.store_name} — Dashboard`
          : "Owner Dashboard"}
      </h2>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold">Average Rating</h3>
          <p className="text-4xl font-bold mt-2">
            {data.average_rating ? data.average_rating : "0.0"}
          </p>
        </div>


        <div className="bg-green-600 text-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold">Total Ratings</h3>
          <p className="text-4xl font-bold mt-2">{data.total_ratings}</p>
        </div>


        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold">Store ID</h3>
          <p className="text-3xl font-bold mt-2">{data.store_id}</p>
        </div>
      </div>


      <h3 className="text-2xl font-bold mb-4">Users Who Rated Your Store</h3>

      {data.rated_users.length === 0 ? (
        <p className="text-gray-500 text-lg">No ratings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.rated_users.map((user, index) => (
            <div
              key={index}
              className="bg-white border shadow-sm rounded-xl p-5 hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold">{user.name}</h4>
              <p className="text-gray-600 text-sm mb-2">{user.email}</p>

              <p className="text-yellow-600 font-bold text-xl">
                ⭐ {user.rating_value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
