import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get("/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, [axiosSecure]);

  if (!stats) {
    return <LoadingSpinner />;
  }

  const chartData = [
    { name: "Pending", orders: stats.pendingOrders },
    { name: "Delivered", orders: stats.deliveredOrders },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6"> Platform Statistics</h2>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">Total Users</p>
          <h3 className="text-3xl font-bold">{stats.totalUsers}</h3>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">Pending Orders</p>
          <h3 className="text-3xl font-bold text-orange-500">
            {stats.pendingOrders}
          </h3>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">Delivered Orders</p>
          <h3 className="text-3xl font-bold text-green-600">
            {stats.deliveredOrders}
          </h3>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">Total Payments ($)</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {stats.totalPaymentAmount}
          </h3>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Orders Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatistics;
