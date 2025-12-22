export default function OrdersTable() {
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
                    <tr className="border-t">
                        <td>#390561</td>
                        <td>James Miller</td>
                        <td>
                            <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                                Paid
                            </span>
                        </td>
                        <td>$1620</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
