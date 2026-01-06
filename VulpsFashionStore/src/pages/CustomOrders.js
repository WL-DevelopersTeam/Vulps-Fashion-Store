import { useEffect, useState } from "react";
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
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-6">Custom Shirt Orders</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-left">Client Name</th>
              <th className="text-left">Size</th>
              <th className="text-left">Color</th>
              <th className="text-left">Message</th>
              <th className="text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.clientName}</td>
                <td>{o.size}</td>
                <td>{o.color}</td>
                <td className="max-w-xs truncate">{o.message}</td>
                <td>
                  {o.createdAt
                    ? new Date(o.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No custom orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
