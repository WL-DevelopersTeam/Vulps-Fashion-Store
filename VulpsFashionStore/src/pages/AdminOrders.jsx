import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://vulps-fashion-store.onrender.com/api/orders"
      );
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      let endpoint = "";

      if (status === "ACCEPTED") endpoint = "accept";
      if (status === "DECLINED") endpoint = "decline";
      if (status === "DELIVERED") endpoint = "accept"; // temp

      await axios.put(
        `https://vulps-fashion-store.onrender.com/api/orders/${orderId}/${endpoint}`
      );

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status } : o
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📦 Orders Management</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th>Customer</th>
              <th>Product</th>
              <th className="text-center">Qty</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-semibold">#{order.id}</td>

                <td>
                  <div className="font-medium">{order.fullName}</div>
                  <div className="text-xs text-gray-500">
                    {order.mobile}
                  </div>
                </td>

                <td>{order.productName}</td>

                <td className="text-center">{order.quantity}</td>

                <td className="text-center font-semibold">
                  ₹ {order.price * order.quantity}
                </td>

                {/* STATUS BADGE */}
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold
                      ${
                        order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "ACCEPTED"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="text-center space-x-2">
                    {/* ACCEPT */}
                    <button
                      disabled={order.status !== "PENDING"}
                      onClick={() => updateStatus(order.id, "ACCEPTED")}
                      className={`px-3 py-1 text-xs rounded-md
                        ${
                          order.status === "PENDING"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      Accept
                    </button>

                    {/* DELIVER */}
                    <button
                      disabled={order.status !== "ACCEPTED"}
                      onClick={() => updateStatus(order.id, "DELIVERED")}
                      className={`px-3 py-1 text-xs rounded-md
                        ${
                          order.status === "ACCEPTED"
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      Delivered
                    </button>

                    {/* DECLINE */}
                    <button
                      disabled={order.status !== "PENDING"}
                      onClick={() => updateStatus(order.id, "DECLINED")}
                      className={`px-3 py-1 text-xs rounded-md
                        ${
                          order.status === "PENDING"
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      Decline
                    </button>
                  </td>

              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
