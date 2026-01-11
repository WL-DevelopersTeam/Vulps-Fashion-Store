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
      if (status === "DELIVERED") endpoint = "deliver";

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

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow p-6 border"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-lg">
                  Order #{order.id}
                </h2>
                <p className="text-xs text-gray-500">
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>

              {/* STATUS */}
              <span
                className={`px-4 py-1 rounded-full text-xs font-bold
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
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* CUSTOMER DETAILS */}
              <div>
                <h3 className="font-semibold mb-2">👤 Customer</h3>
                <p className="font-medium">{order.fullName}</p>
                <p className="text-sm text-gray-600">{order.mobile}</p>
                <p className="text-sm text-gray-600">
                  {order.address}, {order.city}
                </p>
              </div>

              {/* PRODUCT DETAILS */}
              <div>
                <h3 className="font-semibold mb-2">🛍 Product</h3>
                <p className="font-medium">{order.productName}</p>
                <p className="text-sm text-gray-600">
                  Size: {order.size} | Color: {order.color}
                </p>
                <p className="text-sm text-gray-600">
                  Qty: {order.quantity}
                </p>
                <p className="font-semibold mt-1">
                  ₹ {order.price * order.quantity}
                </p>
              </div>

              {/* PAYMENT DETAILS */}
              <div>
                <h3 className="font-semibold mb-2">💳 Payment</h3>
                <p className="text-sm">
                  Method:{" "}
                  <span className="font-medium">
                    {order.paymentMethod}
                  </span>
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-semibold
                      ${
                        order.paymentStatus === "PAID"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                disabled={order.status !== "PENDING"}
                onClick={() => updateStatus(order.id, "ACCEPTED")}
                className={`px-4 py-2 text-sm rounded
                  ${
                    order.status === "PENDING"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Accept
              </button>

              <button
                disabled={order.status !== "ACCEPTED"}
                onClick={() => updateStatus(order.id, "DELIVERED")}
                className={`px-4 py-2 text-sm rounded
                  ${
                    order.status === "ACCEPTED"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Delivered
              </button>

              <button
                disabled={order.status !== "PENDING"}
                onClick={() => updateStatus(order.id, "DECLINED")}
                className={`px-4 py-2 text-sm rounded
                  ${
                    order.status === "PENDING"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Decline
              </button>
            </div>
          </div>
        ))}

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
