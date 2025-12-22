import { useState } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
    const [orders, setOrders] = useState([
        {
            id: 101,
            customer: "Rahul Sharma",
            total: 2499,
            status: "Pending",
        },
        {
            id: 102,
            customer: "Anjali Patil",
            total: 1799,
            status: "Delivered",
        },
        {
            id: 103,
            customer: "Amit Verma",
            total: 999,
            status: "Shipped",
        },
    ]);

    const updateStatus = (id, newStatus) => {
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    const statusColor = (status) => {
        if (status === "Pending") return "bg-yellow-100 text-yellow-700";
        if (status === "Shipped") return "bg-blue-100 text-blue-700";
        if (status === "Delivered") return "bg-green-100 text-green-700";
    };

    return (

            <div className="flex-1 p-6">
                <h1 className="text-2xl font-semibold mb-6">Orders</h1>

                <div className="bg-white rounded-xl shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="p-3 text-left">Order ID</th>
                                <th className="text-left">Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-t">
                                    <td className="p-3">#{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td className="text-center">₹{order.total}</td>

                                    <td className="text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${statusColor(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="text-center space-x-3">
                                        <Link
                                            to={`/admin/orders/${order.id}`}
                                            className="text-blue-600"
                                        >
                                            View
                                        </Link>

                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                updateStatus(order.id, e.target.value)
                                            }
                                            className="border rounded px-2 py-1"
                                        >
                                            <option>Pending</option>
                                            <option>Shipped</option>
                                            <option>Delivered</option>
                                        </select>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    );
}
