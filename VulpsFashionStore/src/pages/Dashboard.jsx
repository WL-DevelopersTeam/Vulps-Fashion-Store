
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import api from "../api/axios";


/* Mock data (will be replaced by backend later) */
const DATA = {
    day: [
        { name: "Pending", orders: 4 },
        { name: "Shipped", orders: 2 },
        { name: "Delivered", orders: 6 },
    ],
    week: [
        { name: "Pending", orders: 14 },
        { name: "Shipped", orders: 10 },
        { name: "Delivered", orders: 28 },
    ],
    month: [
        { name: "Pending", orders: 55 },
        { name: "Shipped", orders: 42 },
        { name: "Delivered", orders: 120 },
    ],
};

export default function Dashboard() {
    const [filter, setFilter] = useState("month");
    const [orders, setOrders] = useState([]);
    const [pendingCount, setPendingCount] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
  fetchOrders();

  const interval = setInterval(fetchOrders, 10000); // 10 sec
  return () => clearInterval(interval);
}, []);

const fetchOrders = async () => {
  const res = await api.get("/api/orders");

  const data = res.data;

  setOrders(data);
  setTotalOrders(data.length);

  const pending = data.filter(o => o.status === "PENDING").length;
  setPendingCount(pending);

  const sales = data
  .filter(o => o.status === "DELIVERED")
  .reduce(
    (sum, o) => sum + Number(o.price) * Number(o.quantity),
    0
  );

setTotalSales(sales);

};



    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Dashboard
                </h1>

                <div className="relative cursor-pointer">
  🔔
  {pendingCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
      {pendingCount}
    </span>
  )}
</div>


                {/* Day / Week / Month Filter */}
                <div className="flex gap-2">
                    {["day", "week", "month"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium border transition
                ${filter === f
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            {f.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard title="Total Sales" value={`₹${totalSales.toLocaleString()}`} />
                <StatCard title="Orders" value={totalOrders} />
                <StatCard title="Pending Orders" value={pendingCount} />

            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Chart */}
                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Order Status ({filter})
                    </h2>

                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={DATA[filter]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#2563eb" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Placeholder */}
                <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-center text-gray-400">
                    Waiting for order data...
                </div>
            </div>

            {/* Add Product */}
            <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Add Product
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Product Name" />
                    <Input placeholder="Price" />
                    <Input placeholder="Stock" />
                    <Input placeholder="Category" />
                </div>

                <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                    Add Product
                </button>
            </div>
        </div>
    );
}

/* Components */

function StatCard({ title, value }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-1">
                {value}
            </h3>
        </div>
    );
}

function Input({ placeholder }) {
    return (
        <input
            placeholder={placeholder}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}
