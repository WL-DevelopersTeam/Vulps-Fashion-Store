import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

const COURIERS = [
  "Delhivery",
  "Blue Dart",
  "DTDC",
  "Ekart",
  "Amazon Logistics",
  "India Post",
];

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  DECLINED: "bg-red-100 text-red-700",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [courierName, setCourierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loadingAction, setLoadingAction] = useState({
        orderId: null,
        action: null,
      });


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
  const map = {
    ACCEPTED: "accept",
    DECLINED: "decline",
    DELIVERED: "deliver",
  };

  setLoadingAction({ orderId, action: status });

  try {
    await axios.put(
      `https://vulps-fashion-store.onrender.com/api/orders/${orderId}/${map[status]}`
    );

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status } : o
      )
    );
  } finally {
    setLoadingAction({ orderId: null, action: null });
  }
};


    const confirmShipment = async () => {
  if (!courierName || !trackingNumber) return;

  setLoadingAction({ orderId: selectedOrder.id, action: "SHIP" });

  try {
    await axios.put(
      `https://vulps-fashion-store.onrender.com/api/orders/${selectedOrder.id}/ship`,
      { courierName, trackingNumber }
    );

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, status: "SHIPPED", courierName, trackingNumber }
          : o
      )
    );

    setShowModal(false);
  } finally {
    setLoadingAction({ orderId: null, action: null });
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-gray-800">
        📦 Orders Management
      </h1>

      <div className="space-y-14">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Order #{order.id}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-bold ${statusColor[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* CUSTOMER */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gray-500 rounded-xl p-4 shadow"
              >
                <h3 className="font-semibold mb-2">👤 {order.fullName}</h3>
                <p className="font-large"><span className="font-semibold">Name:</span>{order.fullName}</p>
                <p className="text-base text-gray"><span className="font-semibold">Mob:</span>{order.mobile}</p>
                <p className="text-base text-gray-10"><span className="font-semibold">Email:</span>{order.email}</p>
                <p className="text-base text-gray"><span className="font-semibold">Pin code:</span>{order.pincode}</p>
                <p className="text-base text-gray-10"><span className="font-semibold">City:</span>{order.city}</p>
                <p className="text-base text-gray-10"><span className="font-semibold">Address:</span>{order.address}</p>
              </motion.div>

              {/* PRODUCT */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gray-500 rounded-xl p-4 shadow"
              >
                <h3 className="font-semibold mb-2">🛍 Product</h3>
                <div className="flex gap-3">
                  <img
                    src={order.imageUrl}
                    alt={order.product?.name || "Product"}
                    className="w-16 h-16 rounded-lg border"
                  />
                  <div>
                    <p className="font-medium"><span className="font-semibold">Name:</span>{order.product?.name || order.productName}</p>
                    <p className="text-base text-gray"> <span className="font-semibold">Size:</span>
                      {order.size} 
                    </p>

                    <p className="text-base text-gray"><span className="font-semibold">Color:</span>
                       {order.color}
                    </p>

                    <p className="text-base text-gray"><span className="font-semibold">Qunatity:</span>
                      {order.quantity}
                    </p>
                    <p className="font-bold mt-1 text-gray"><span className="font-semibold">Price:</span>
                      ₹ {order.price * order.quantity}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* PAYMENT */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gray-500 rounded-xl p-4 shadow"
              >
                <h3 className="font-black mb-2">💳 Payment</h3>
                <p className="text-sm">
                  Method: <b>{order.paymentMethod}</b>
                </p>
                <p
                  className={`font-bold mt-1 ${
                    order.paymentStatus === "PAID"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {order.paymentStatus}
                </p>
              </motion.div>

              {/* SHIPMENT */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gray-500 rounded-xl p-4 shadow"
              >
                <h3 className="font-semibold mb-2">🚚 Shipment</h3>
                {order.status === "SHIPPED" ||
                order.status === "DELIVERED" ? (
                  <>
                    <p className="text-sm">
                      Courier: <b>{order.courierName}</b>
                    </p>
                    <p className="text-sm">
                      Tracking: <b>{order.trackingNumber}</b>
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    Not shipped yet
                  </p>
                )}
              </motion.div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                  disabled={order.status !== "PENDING"}
                  onClick={() => updateStatus(order.id, "ACCEPTED")}
                  className="btn bg-blue-600 text-white flex items-center gap-2"
                >
                  {loadingAction.orderId === order.id &&
                  loadingAction.action === "ACCEPTED" ? (
                    <Loader />
                  ) : (
                    "Accept"
                  )}
              </button>

                <button
                    disabled={order.status !== "ACCEPTED"}
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                    className="btn bg-purple-600 text-white flex items-center gap-2"
                  >
                    {loadingAction.orderId === order.id &&
                    loadingAction.action === "SHIP" ? (
                      <Loader />
                    ) : (
                      "Ship Order"
                    )}
                </button> 

                <button
                    disabled={order.status !== "SHIPPED"}
                    onClick={() => updateStatus(order.id, "DELIVERED")}
                    className="btn bg-green-600 text-white flex items-center gap-2"
                  >
                    {loadingAction.orderId === order.id &&
                    loadingAction.action === "DELIVERED" ? (
                      <Loader />
                    ) : (
                      "Delivered"
                    )}
                </button>

                <button
                    disabled={order.status !== "PENDING"}
                    onClick={() => updateStatus(order.id, "DECLINED")}
                    className="btn bg-red-600 text-white flex items-center gap-2"
                  >
                    {loadingAction.orderId === order.id &&
                    loadingAction.action === "DECLINED" ? (
                      <Loader />
                    ) : (
                      "Decline"
                    )}
                </button>


            </div>
          </motion.div>
        ))}
      </div>

      {/* SHIPMENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-600 rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              🚚 Shipment Details
            </h2>

                <select
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="w-full border rounded px-3 py-2 bg-gray-600 mt-2"
                  >
                    <option value="">Select Courier</option>
                    {COURIERS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                
            <input
              type="text"
              placeholder="Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="bg-gray-600 w-full border rounded px-3 py-2 mt-3"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmShipment}
                className="px-4 py-2 bg-yellow-400 rounded font-semibold"
              >
                Confirm Shipment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
