import { useParams, Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";

export default function OrderDetails() {
    const { id } = useParams();

    // Dummy order data (later comes from backend)
    const order = {
        id,
        customer: "Rahul Sharma",
        email: "rahul@gmail.com",
        address: "Kolhapur, Maharashtra, India",
        items: [
            { name: "Men T-Shirt", price: 799, qty: 2 },
            { name: "Shoes", price: 1499, qty: 1 },
        ],
    };

    const total = order.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6">
                <Link
                    to="/admin/orders"
                    className="text-blue-600 text-sm mb-4 inline-block"
                >
                    ← Back to Orders
                </Link>

                <h1 className="text-2xl font-semibold mb-6">
                    Order Details #{order.id}
                </h1>

                {/* Customer Info */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <h2 className="font-semibold mb-2">Customer Info</h2>
                    <p><strong>Name:</strong> {order.customer}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="p-3 text-left">Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">{item.name}</td>
                                    <td className="text-center">₹{item.price}</td>
                                    <td className="text-center">{item.qty}</td>
                                    <td className="text-center">
                                        ₹{item.price * item.qty}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="p-4 text-right font-semibold">
                        Grand Total: ₹{total}
                    </div>
                </div>
            </div>
        </div>
    );
}
