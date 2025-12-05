import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/admin";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getAdminDashboard();
      setStats(res.data);
    };
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      bg: "bg-blue-600",
    },
    {
      title: "Total Stores",
      value: stats.totalStores,
      bg: "bg-green-600",
    },
    {
      title: "Total Ratings",
      value: stats.totalRatings,
      bg: "bg-yellow-500",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-md text-white ${card.bg} hover:shadow-lg transition`}
          >
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-3xl font-bold mt-3">{Number(card.value) || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
