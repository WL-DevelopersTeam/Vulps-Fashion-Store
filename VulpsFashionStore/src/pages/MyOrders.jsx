import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

const fetchOrders = async () => {
  try {
    const res = await api.get(`/api/orders/user/${userId}`);

    setOrders(res.data);
  } catch (err) {
    console.error("Failed to fetch orders", err);
  } finally {
    setLoading(false);
  }
};


  const cancelOrder = async (orderId) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this order?"
  );
  if (!confirmCancel) return;

  try {
    await api.put(`/api/orders/${orderId}/cancel`);


    // update UI without refetch
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "CANCELLED" } : o
      )
    );
  } catch (err) {
    console.error("Failed to cancel order", err);
    alert("Unable to cancel order");
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

    const getTrackingUrl = (courierName, trackingNumber) => {
    if (!courierName || !trackingNumber) return null;

    const courier = courierName.toLowerCase();

    if (courier.includes("delhivery")) {
      return `https://www.delhivery.com/track/package/${trackingNumber}`;
    }

    if (courier.includes("bluedart")) {
      return `https://www.bluedart.com/web/guest/trackdartresult?trackFor=0&trackNo=${trackingNumber}`;
    }

    if (courier.includes("dtdc")) {
      return `https://www.dtdc.in/tracking/tracking_results.asp?strCnno=${trackingNumber}`;
    }

    if (courier.includes("amazon")) {
      return `https://track.amazon.in/tracking/${trackingNumber}`;
    }

    // fallback – Google search
    return `https://www.google.com/search?q=${courierName}+tracking+${trackingNumber}`;
  };


  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-[#FFD700] mb-6">
        📦 My Orders
      </h1>

      {orders.length === 0 && (
        <div className="text-center text-gray-400 text-xl">
          You have not placed any orders yet.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-gray-800 to-black text-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* ORDER HEADER */}
            <div className="flex items-center p-6 gap-6">
              <img
                src={order.imageUrl || "https://via.placeholder.com/120"}
                alt={order.productName}
                className="w-28 h-28 object-cover rounded-lg shadow-xl"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-semibold">
                  {order.productName}
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                  Size: <b>{order.size}</b> | Color: <b>{order.color}</b>
                </p>
                <p className="text-lg font-bold mt-2">
                  ₹ {(order.price * order.quantity).toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Ordered on: {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <span
                  className={`px-4 py-1 text-sm font-semibold rounded-full
                    ${
                      order.status === "PENDING"
                        ? "bg-yellow-500 text-black"
                        : order.status === "ACCEPTED"
                        ? "bg-blue-500"
                        : order.status === "SHIPPED"
                        ? "bg-purple-500"
                        : order.status === "DELIVERED"
                        ? "bg-green-500"
                        : order.status === "CANCELLED"
                        ? "bg-red-600"
                        : "bg-red-500"

                    }`}
                >
                  {order.status}
                </span>

                <p className="text-xs text-gray-300 mt-2">
                  Payment: {order.paymentMethod} ({order.paymentStatus})
                </p>
              </div>
            </div>

            {/* SHIPMENT DETAILS (UPDATED WITH TRACK BUTTON) */}
            {(order.status === "SHIPPED" ||
              order.status === "DELIVERED") && (
              <div className="mx-6 mb-4 bg-gray-900 p-4 rounded-xl text-sm">
                <h4 className="font-semibold text-[#FFD700] mb-2">
                  🚚 Shipment Details
                </h4>

                <p>
                  <b>Courier:</b>{" "}
                  {order.courierName || "Not available"}
                </p>

                <p>
                  <b>Tracking ID:</b>{" "}
                  {order.trackingNumber || "Not available"}
                </p>

                {order.courierName && order.trackingNumber && (
                  <a
                    href={getTrackingUrl(
                      order.courierName,
                      order.trackingNumber
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 bg-[#FFD700] text-black font-semibold rounded-lg hover:opacity-90 transition"
                  >
                    📍 Track Package
                  </a>
                )}
              </div>
            )}

            {/* CANCEL ORDER BUTTON */}
              {order.status === "PENDING" && (
                <div className="px-6 pb-2">
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                  >
                    ❌ Cancel Order
                  </button>
                </div>
              )}



            {/* PROGRESS TRACKER */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-400">Placed</span>
                <span className="text-gray-400">Accepted</span>
                <span className="text-gray-400">Shipped</span>
                <span className="text-gray-400">Delivered</span>
              </div>

              <div className="relative h-1 bg-gray-700 rounded-full mt-2">
                <motion.div
                  className="absolute h-1 bg-[#FFD700] rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      order.status === "PENDING"
                        ? "25%"
                        : order.status === "ACCEPTED"
                        ? "50%"
                        : order.status === "SHIPPED"
                        ? "75%"
                        : "100%",
                  }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
