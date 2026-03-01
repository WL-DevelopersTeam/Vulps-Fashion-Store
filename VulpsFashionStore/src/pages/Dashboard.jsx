import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Menu, X, Bell } from "lucide-react"; // Using Lucide for modern icons
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

/* Mock data */
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

export default function Dashboard({ onMenuToggle }) {
    const [filter, setFilter] = useState("month");
    const [pendingCount, setPendingCount] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get("/api/orders");
            const data = res.data;
            setTotalOrders(data.length);
            setPendingCount(data.filter(o => o.status === "PENDING").length);
            const sales = data
                .filter(o => o.status === "DELIVERED")
                .reduce((sum, o) => sum + Number(o.price) * Number(o.quantity), 0);
            setTotalSales(sales);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="flex items-center gap-3">
                        {/* 🔹 HAMBURGER MENU: Triggers the Sidebar on Mobile */}
                        <button 
                            onClick={onMenuToggle} 
                            className="md:hidden p-2 bg-white rounded-lg shadow-sm border border-gray-200"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                            Dashboard
                        </h1>
                    </div>
                    
                    {/* Mobile Notification Icon */}
                    <div className="relative cursor-pointer sm:hidden bg-white p-2 rounded-lg shadow-sm">
                        <Bell size={20} />
                        {pendingCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                                {pendingCount}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* PC Notification Icon */}
                    <div className="hidden sm:block relative cursor-pointer bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                        <Bell size={20} />
                        {pendingCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                                {pendingCount}
                            </span>
                        )}
                    </div>

                    {/* Filter Segmented Control */}
                    <div className="flex bg-white p-1 rounded-lg border border-gray-200 w-full sm:w-auto">
                        {["day", "week", "month"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`...`}
                                >
                                    {f?.charAt(0).toUpperCase() + f?.slice(1)}
                                </button>
                            ))}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard title="Total Sales" value={`₹${totalSales.toLocaleString()}`} icon="💰" color="text-green-600" />
                <StatCard title="Total Orders" value={totalOrders} icon="📦" color="text-blue-600" />
                <StatCard title="Pending" value={pendingCount} icon="⏳" color="text-orange-600" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-base md:text-lg font-bold text-gray-800 mb-6">Order Status Breakdown</h2>
                    <div className="w-full h-[250px] md:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={DATA[filter]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                <Bar dataKey="orders" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[250px]">
                    <div className="bg-gray-50 p-4 rounded-full mb-3 text-2xl">📈</div>
                    <p className="text-gray-500 text-sm">Waiting for advanced analytics data...</p>
                </div>
            </div>

            {/* Add Product Form */}
            {/* <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Add New Product</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <Input label="Product Name" placeholder="e.g. Summer T-Shirt" />
                    <Input label="Price (₹)" placeholder="0.00" type="number" />
                    <Input label="Stock Quantity" placeholder="0" type="number" />
                    <Input label="Category" placeholder="Select Category" />
                </div>
                <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg">
                    Save Product
                </button>
            </div> */}
        </div>
    );
}

/* Updated Helper Components */
function StatCard({ title, value, icon, color }) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="text-2xl p-3 bg-gray-50 rounded-xl">{icon}</div>
            <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <h3 className={`text-xl font-bold mt-0.5 ${color}`}>{value}</h3>
            </div>
        </div>
    );
}

function Input({ label, placeholder, type = "text" }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 ml-1">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
        </div>
    );
}