// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
//     CartesianGrid,
// } from "recharts";

// const data = [
//     { name: "Pending", orders: 12 },
//     { name: "Shipped", orders: 8 },
//     { name: "Delivered", orders: 20 },
// ];

// export default function OrdersChart() {
//     return (
//         <div className="bg-white p-4 rounded-xl shadow-sm">
//             <h2 className="font-semibold mb-4">Order Status</h2>

//             <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={data}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="orders" fill="#000" />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }



import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function OrdersChart({ data }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4">Order Status</h2>

            {data.length === 0 ? (
                <p className="text-center text-gray-400">
                    Waiting for order data...
                </p>
            ) : (
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="orders" fill="#000" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

