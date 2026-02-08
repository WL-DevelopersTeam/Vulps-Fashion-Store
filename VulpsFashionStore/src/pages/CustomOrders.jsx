import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCustomOrders();
  }, []);

  const fetchCustomOrders = async () => {
    try {
      const res = await axios.get(
        "https://vulps-fashion-store.onrender.com/api/custom-products"
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch custom orders", error);
    }
  };

  return (
    <div className="flex-1 p-6 text-gray-900"> {/* Added global text color for this section */}
      <h1 className="text-2xl font-bold mb-6 text-black">Custom Shirt Orders</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b bg-gray-100">
              <tr className="text-black font-bold">
                <th className="p-4">Client Name</th>
                <th className="p-4">Size</th>
                <th className="p-4">Color</th>
                <th className="p-4">Message</th>
                <th className="p-4">Created At</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-black">{o.clientName}</td>
                  <td className="p-4 text-gray-800">{o.size}</td>
                  <td className="p-4 text-gray-800">{o.color}</td>
                  <td className="p-4 text-gray-800 max-w-xs truncate">{o.message}</td>
                  <td className="p-4 text-gray-600 text-xs">
                    {o.createdAt
                      ? new Date(o.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-black font-bold text-lg bg-gray-50">
                    No custom orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}