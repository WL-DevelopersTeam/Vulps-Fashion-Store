import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 GET USER ID FROM LOCAL STORAGE
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

const fetchOrders = async () => {
  try {
    const res = await fetch(
      `https://vulps-fashion-store.onrender.com/api/orders/user/${userId}`
    );
    const data = await res.json();
    setOrders(data);
  } catch (err) {
    console.error("Failed to fetch orders", err);
  } finally {
    setLoading(false);
  }
};


  if (!userId) {
    return (
      <div className="text-center py-20 text-gray-600">
        Please login to view your orders
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📦 My Orders</h1>

      {orders.length === 0 && (
        <div className="text-center text-gray-500">
          You have not placed any orders yet.
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6"
          >
            {/* PRODUCT INFO */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">
                {order.productName}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Size: {order.size} | Color: {order.color}
              </p>

              <p className="text-sm mt-1">
                Quantity: {order.quantity}
              </p>

              <p className="font-bold mt-2">
                ₹ {order.price * order.quantity}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Ordered on:{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>

            {/* STATUS */}
            <div className="flex flex-col justify-center items-start md:items-end">
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "ACCEPTED"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "SHIPPED"
                      ? "bg-purple-100 text-purple-700"
                      : order.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {order.status}
              </span>

              <p className="text-xs mt-2 text-gray-500">
                Payment: {order.paymentMethod} (
                {order.paymentStatus})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
