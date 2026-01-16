// export default function OrdersTable() {
//     return (
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//             <h2 className="font-semibold mb-4">Recent Orders</h2>

//             <table className="w-full text-sm">
//                 <thead className="text-gray-500">
//                     <tr>
//                         <th className="text-left">Order</th>
//                         <th className="text-left">Customer</th>
//                         <th>Status</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     <tr className="border-t">
//                         <td>#390561</td>
//                         <td>James Miller</td>
//                         <td>
//                             <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
//                                 Paid
//                             </span>
//                         </td>
//                         <td>$1620</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// }





export default function OrdersTable({ orders }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold mb-4">Recent Orders</h2>

            <table className="w-full text-sm">
                <thead className="text-gray-500">
                    <tr>
                        <th className="text-left">Order</th>
                        <th className="text-left">Customer</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-400">
                                No orders found
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td>#{order.id}</td>
                                <td>{order.customer}</td>
                                <td>
                                    <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                                        {order.status}
                                    </span>
                                </td>
                                <td>₹{order.total}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
