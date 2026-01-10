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

    if (status === "ACCEPTED") {
      endpoint = "accept";
    } else if (status === "DECLINED") {
      endpoint = "decline";
    } else if (status === "DELIVERED") {
      endpoint = "accept"; // or create delivered endpoint
    }

    await axios.put(
      `https://vulps-fashion-store.onrender.com/api/orders/${orderId}/${endpoint}`
    );

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status } : o
      )
    );
  } catch (err) {
    alert("Failed to update status");
  }
};

  if (loading) {
    return <div className="p-10">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td>
                  <div className="font-semibold">{order.fullName}</div>
                  <div className="text-gray-500 text-xs">
                    {order.mobile}
                  </div>
                </td>
                <td>{order.productName}</td>
                <td className="text-center">{order.quantity}</td>
                <td className="text-center">
                  ₹ {order.price * order.quantity}
                </td>

                {/* STATUS */}
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
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

                {/* ACTION BUTTONS */}
                <td className="text-center space-x-2">
                  <button
                    onClick={() =>
                      updateStatus(order.id, "ACCEPTED")
                    }
                    className="text-blue-600 text-xs"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(order.id, "DELIVERED")
                    }
                    className="text-green-600 text-xs"
                  >
                    Delivered
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(order.id, "DECLINED")
                    }
                    className="text-red-600 text-xs"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
