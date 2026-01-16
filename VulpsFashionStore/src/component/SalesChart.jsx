import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { name: "Mon", sales: 4000 },
    { name: "Tue", sales: 3000 },
    { name: "Wed", sales: 5000 },
    { name: "Thu", sales: 2780 },
    { name: "Fri", sales: 6890 },
    { name: "Sat", sales: 8390 },
    { name: "Sun", sales: 4490 },
];

export default function SalesChart({ data }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4">Sales</h2>

            {data.length === 0 ? (
                <p className="text-center text-grey-400">
                    Select Day / Week / Month
                </p>
            ) : (
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="#0f0f0fff" />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

