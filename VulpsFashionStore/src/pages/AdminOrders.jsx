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
      if (status === "SHIPPED") endpoint = "ship"; // future ready

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

  const statusBadge = (status) => {
    const map = {
      PENDING: "bg-yellow-100 text-yellow-700",
      ACCEPTED: "bg-blue-100 text-blue-700",
      SHIPPED: "bg-purple-100 text-purple-700",
      DELIVERED: "bg-green-100 text-green-700",
      DECLINED: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">📦 Orders Dashboard</h1>

      {orders.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No orders found
        </div>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <h2 className="font-bold text-xl">
                  Order #{order.id}
                </h2>
                <p className="text-xs text-gray-500">
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-xs font-bold ${statusBadge(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              {/* CUSTOMER */}
              <div>
                <h3 className="font-semibold mb-2">👤 Customer</h3>
                <p>{order.fullName}</p>
                <p className="text-sm text-gray-600">{order.mobile}</p>
                <p className="text-sm text-gray-600">{order.email}</p>
                <p className="text-sm text-gray-600">
                  {order.address}, {order.city} - {order.pincode}
                </p>
              </div>

              {/* PRODUCT */}
              <div>
                <h3 className="font-semibold mb-2">🛍 Product</h3>
                <p className="font-medium">{order.productName}</p>
                <p className="text-sm">Size: {order.size}</p>
                <p className="text-sm">Color: {order.color}</p>
                <p className="text-sm">Qty: {order.quantity}</p>
                <p className="font-bold mt-2">
                  ₹ {order.price * order.quantity}
                </p>
              </div>

              {/* PAYMENT */}
              <div>
                <h3 className="font-semibold mb-2">💳 Payment</h3>
                <p>Method: {order.paymentMethod}</p>
                <p
                  className={`font-semibold ${
                    order.paymentStatus === "PAID"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {order.paymentStatus}
                </p>
              </div>

              {/* TRACKING */}
              <div>
                <h3 className="font-semibold mb-2">🚚 Order Progress</h3>
                <ul className="text-sm space-y-1">
                  <li>✔ Order Placed</li>
                  <li className={order.status !== "PENDING" ? "text-green-600" : ""}>
                    ✔ Accepted
                  </li>
                  <li className={order.status === "SHIPPED" || order.status === "DELIVERED" ? "text-green-600" : ""}>
                    ✔ Shipped
                  </li>
                  <li className={order.status === "DELIVERED" ? "text-green-600" : ""}>
                    ✔ Delivered
                  </li>
                </ul>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                disabled={order.status !== "PENDING"}
                onClick={() => updateStatus(order.id, "ACCEPTED")}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Accept
              </button>

              <button
                disabled={order.status !== "ACCEPTED"}
                onClick={() => updateStatus(order.id, "SHIPPED")}
                className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
              >
                Ship Order
              </button>

              <button
                disabled={order.status !== "SHIPPED"}
                onClick={() => updateStatus(order.id, "DELIVERED")}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
              >
                Mark Delivered
              </button>

              <button
                disabled={order.status !== "PENDING"}
                onClick={() => updateStatus(order.id, "DECLINED")}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
