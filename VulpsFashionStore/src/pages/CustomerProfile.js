import { useState } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import OrderStatusTimeline from "../components/OrderStatusTimeline";

const CustomerProfile = () => {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    if (!mobile || !email) {
      setError("Please enter mobile and email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `https://vulps-fashion-store.onrender.com/api/orders/customer`,
        {
          params: { mobile, email },
        }
      );

      setOrders(res.data);
    } catch {
      setError("No orders found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          👤 My Orders
        </h1>

        {/* SEARCH */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Mobile Number"
              className="input"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <input
              placeholder="Email Address"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={fetchOrders}
              className="bg-black text-white rounded-xl hover:bg-[#ff0062]"
            >
              View Orders
            </button>
          </div>
          {error && (
            <p className="text-red-500 mt-3 text-sm">
              {error}
            </p>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-gray-500">
            Loading orders...
          </div>
        )}

        {/* ORDERS */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow p-6"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-bold text-lg">
                    Order #{order.id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(order.orderDate).toDateString()}
                  </p>
                </div>

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

              {/* PRODUCT */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">
                    {order.productName}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    Size: {order.size} | Color: {order.color}
                  </p>

                  <p className="mt-2 font-semibold">
                    ₹ {order.price} × {order.quantity}
                  </p>

                  <p className="mt-1 text-sm">
                    💳 {order.paymentMethod} (
                    {order.paymentStatus})
                  </p>
                </div>

                {/* DELIVERY */}
                <div>
                  <h4 className="font-semibold mb-2">
                    Delivery Status
                  </h4>
                  <OrderStatusTimeline status={order.status} />

                  {order.status === "ACCEPTED" && (
                    <p className="text-sm text-blue-600 mt-2">
                      📦 Your order will be delivered in 4–6 days
                    </p>
                  )}

                  {order.status === "DELIVERED" && (
                    <p className="text-sm text-green-600 mt-2">
                      ✅ Delivered successfully
                    </p>
                  )}
                </div>
              </div>

              {/* ADDRESS */}
              <div className="mt-4 text-sm text-gray-600">
                📍 {order.address}, {order.city} –{" "}
                {order.pincode}
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && !loading && (
          <div className="text-center text-gray-500">
            No orders to show
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomerProfile;
