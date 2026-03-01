import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- POPUP STATES ---
  const [cancelConfirm, setCancelConfirm] = useState({ show: false, orderId: null });
  const [returnFlow, setReturnFlow] = useState({
    show: false,
    orderId: null,
    step: "CHOOSE_ACTION", // "CHOOSE_ACTION" | "CHOOSE_REFUND" | "UPI_INPUT" | "BANK_INPUT"
    refundMethod: "", // "UPI" | "BANK"
    upiId: "",
    bankDetails: {
      accountName: "",
      accountNumber: "",
      ifsc: "",
    },
  });

const user = JSON.parse(localStorage.getItem("user")) || {};
const userId = user?.id;

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders/user");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  /* --- CANCEL LOGIC --- */
  const cancelOrder = (orderId) => {
    setCancelConfirm({ show: true, orderId });
  };

  const handleActualCancel = async () => {
    const orderId = cancelConfirm.orderId;
    try {
      await api.put(`/api/orders/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "CANCELLED" } : o))
      );
    } catch (err) {
      console.error("Failed to cancel order", err);
      alert("Unable to cancel order");
    } finally {
      setCancelConfirm({ show: false, orderId: null });
    }
  };

  /* --- RETURN LOGIC --- */
  const startReturnFlow = (orderId) => {
    setReturnFlow({
      show: true,
      orderId,
      step: "CHOOSE_ACTION",
      refundMethod: "",
      upiId: "",
      bankDetails: { accountName: "", accountNumber: "", ifsc: "" },
    });
  };

  const closeReturnFlow = () => {
    setReturnFlow((prev) => ({ ...prev, show: false }));
  };

  const submitReturnRequest = async () => {
    const { orderId, refundMethod, upiId, bankDetails } = returnFlow;
    
    // Validation
    if (refundMethod === "UPI" && !upiId.trim()) {
      return alert("Please enter a valid UPI ID");
    }
    if (refundMethod === "BANK") {
      if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.ifsc) {
        return alert("Please fill in all bank details");
      }
    }

    try {
      // Build payload dynamically based on user choice
      const payload = {
      refundMethod,
      upiId: refundMethod === "UPI" ? upiId : null,
      accountName: refundMethod === "BANK" ? bankDetails.accountName : null,
      accountNumber: refundMethod === "BANK" ? bankDetails.accountNumber : null,
      ifsc: refundMethod === "BANK" ? bankDetails.ifsc : null,
    };

      await api.post(`/api/orders/${orderId}/return`, payload);

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "RETURN PENDING" } : o
        )
      );

      alert("Return request submitted successfully!");
      closeReturnFlow();
    } catch (err) {
      console.error("Failed to process return", err);
      alert("Unable to submit return request");
    }
  };

  /* --- 7-DAY RETURN ELIGIBILITY CHECK --- */
  const isReturnEligible = (order) => {
    // If it's shipped but not delivered yet, we can allow return/replace early if you wish.
    // If you strictly only want it AFTER delivery, remove the 'SHIPPED' check.
    if (order.status === "SHIPPED") return true;

    if (order.status === "DELIVERED") {
      // Using 'deliveredAt' if your backend provides it. 
      // Falling back to 'orderDate' just so it doesn't break if 'deliveredAt' is missing.
      const referenceDateStr = order.deliveredAt || order.orderDate;
      if (!referenceDateStr) return false;

      const referenceDate = new Date(referenceDateStr);
      const currentDate = new Date();

      // Calculate the difference in days
      const diffTime = currentDate - referenceDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      // Return true if it has been 7 days or less
      return diffDays <= 7;
    }

    return false;
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
    if (courier.includes("delhivery")) return `https://www.delhivery.com/track/package/${trackingNumber}`;
    if (courier.includes("bluedart")) return `https://www.bluedart.com/web/guest/trackdartresult?trackFor=0&trackNo=${trackingNumber}`;
    if (courier.includes("dtdc")) return `https://www.dtdc.in/tracking/tracking_results.asp?strCnno=${trackingNumber}`;
    if (courier.includes("amazon")) return `https://track.amazon.in/tracking/${trackingNumber}`;
    return `https://www.google.com/search?q=${courierName}+tracking+${trackingNumber}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 relative">
      
      {/* --- CANCEL CONFIRMATION POPUP --- */}
      <AnimatePresence>
        {cancelConfirm.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl max-w-sm w-full text-center"
            >
              {/* X Close Button */}
              <button
                onClick={() => setCancelConfirm({ show: false, orderId: null })}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl font-bold"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-white mb-2">Are you sure?</h2>
              <p className="text-gray-400 mb-8">
                Do you really want to cancel this order? This cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setCancelConfirm({ show: false, orderId: null })}
                  className="flex-1 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition"
                >
                  No, Back
                </button>
                <button
                  onClick={handleActualCancel}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- RETURN / REPLACE POPUP --- */}
      <AnimatePresence>
        {returnFlow.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl max-w-md w-full"
            >
              {/* X Close Button */}
              <button
                onClick={closeReturnFlow}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl font-bold"
              >
                ✕
              </button>

              {/* STEP 1: Return or Replace */}
              {returnFlow.step === "CHOOSE_ACTION" && (
                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold text-white mb-2">What would you like to do?</h2>
                  <p className="text-gray-400 mb-8">Choose an option for your order.</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setReturnFlow({ ...returnFlow, step: "CHOOSE_REFUND" })}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      Return Order
                    </button>
                    
                  </div>
                </div>
              )}

              {/* STEP 2: Choose Refund Method */}
              {returnFlow.step === "CHOOSE_REFUND" && (
                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold text-white mb-2">Select Refund Method</h2>
                  <p className="text-gray-400 mb-8">How would you like to receive your money back?</p>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setReturnFlow({ ...returnFlow, step: "UPI_INPUT", refundMethod: "UPI" })}
                      className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                      UPI Cashback
                    </button>
                    <button
                      onClick={() => setReturnFlow({ ...returnFlow, step: "BANK_INPUT", refundMethod: "BANK" })}
                      className="w-full py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition"
                    >
                      Bank Account Details
                    </button>
                  </div>
                  <button
                    onClick={() => setReturnFlow({ ...returnFlow, step: "CHOOSE_ACTION" })}
                    className="mt-6 text-sm text-gray-400 hover:text-white"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* STEP 3A: Enter UPI Details */}
              {returnFlow.step === "UPI_INPUT" && (
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-white mb-2 text-center">Enter UPI ID</h2>
                  <p className="text-gray-400 mb-6 text-center">Please provide your UPI ID for the cashback.</p>

                  <input
                    type="text"
                    placeholder="e.g. yourname@oksbi"
                    value={returnFlow.upiId}
                    onChange={(e) => setReturnFlow({ ...returnFlow, upiId: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white mb-6 focus:outline-none focus:border-[#FFD700]"
                  />

                  <button
                    onClick={submitReturnRequest}
                    className="w-full py-3 bg-[#FFD700] text-black rounded-xl font-bold hover:bg-yellow-500 transition"
                  >
                    Submit Return Request
                  </button>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => setReturnFlow({ ...returnFlow, step: "CHOOSE_REFUND", refundMethod: "" })}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3B: Enter Bank Details */}
              {returnFlow.step === "BANK_INPUT" && (
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-white mb-2 text-center">Bank Details</h2>
                  <p className="text-gray-400 mb-6 text-center">Enter your account information below.</p>

                  <div className="space-y-4 mb-6">
                    <input
                      type="text"
                      placeholder="Account Holder Name"
                      value={returnFlow.bankDetails.accountName}
                      onChange={(e) => setReturnFlow({ 
                        ...returnFlow, 
                        bankDetails: { ...returnFlow.bankDetails, accountName: e.target.value } 
                      })}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#FFD700]"
                    />
                    <input
                      type="text"
                      placeholder="Account Number"
                      value={returnFlow.bankDetails.accountNumber}
                      onChange={(e) => setReturnFlow({ 
                        ...returnFlow, 
                        bankDetails: { ...returnFlow.bankDetails, accountNumber: e.target.value } 
                      })}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#FFD700]"
                    />
                    <input
                      type="text"
                      placeholder="IFSC Code"
                      value={returnFlow.bankDetails.ifsc}
                      onChange={(e) => setReturnFlow({ 
                        ...returnFlow, 
                        bankDetails: { ...returnFlow.bankDetails, ifsc: e.target.value.toUpperCase() } 
                      })}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <button
                    onClick={submitReturnRequest}
                    className="w-full py-3 bg-[#FFD700] text-black rounded-xl font-bold hover:bg-yellow-500 transition"
                  >
                    Submit Return Request
                  </button>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => setReturnFlow({ ...returnFlow, step: "CHOOSE_REFUND", refundMethod: "" })}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                <h2 className="text-2xl font-semibold">{order.productName}</h2>
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
                        : order.status === "RETURN PENDING"
                        ? "bg-orange-500 text-black"
                        : "bg-red-500"
                    }`}
                >
                  {order.status}
                </span>

                <p className="text-xs text-gray-300 mt-2 text-right">
                  Payment: {order.paymentMethod} <br/> ({order.paymentStatus})
                </p>
              </div>
            </div>

            {/* SHIPMENT DETAILS */}
            {(order.status === "SHIPPED" || order.status === "DELIVERED") && (
              <div className="mx-6 mb-4 bg-gray-900 p-4 rounded-xl text-sm">
                <h4 className="font-semibold text-[#FFD700] mb-2">
                  🚚 Shipment Details
                </h4>
                <p><b>Courier:</b> {order.courierName || "Not available"}</p>
                <p><b>Tracking ID:</b> {order.trackingNumber || "Not available"}</p>

                {order.courierName && order.trackingNumber && (
                  <a
                    href={getTrackingUrl(order.courierName, order.trackingNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 bg-[#FFD700] text-black font-semibold rounded-lg hover:opacity-90 transition"
                  >
                    📍 Track Package
                  </a>
                )}
              </div>
            )}

            {/* ACTION BUTTONS */}
            
            {/* 1. Cancel Option */}
            {["PENDING", "ACCEPTED"].includes(order.status) && (
              <div className="px-6 pb-2">
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  ❌ Cancel Order
                </button>
              </div>
            )}

            {/* 2. Return/Replace Option (Wrapped in the 7-day eligibility check) */}
            {["SHIPPED", "DELIVERED"].includes(order.status) && isReturnEligible(order) && (
              <div className="px-6 pb-2">
                <button
                  onClick={() => startReturnFlow(order.id)}
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  🔄 Return Order
                </button>
              </div>
            )}

            {/* PROGRESS TRACKER */}
            <div className="px-6 pb-6 mt-2">
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
                      order.status === "PENDING" ? "25%" : 
                      order.status === "ACCEPTED" ? "50%" : 
                      order.status === "SHIPPED" ? "75%" : 
                      order.status === "CANCELLED" ? "0%" : "100%",
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