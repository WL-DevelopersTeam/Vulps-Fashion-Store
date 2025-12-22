import SalesChart from "../component/SalesChart";
import OrdersChart from "../component/OrdersChart";
import DashboardQuickForm from "../component/DashboardQuickForm";
export default function Dashboard() {
    return (

            <div className="flex-1 p-6">
                <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <p className="text-gray-500 text-sm">Total Sales</p>
                        <h2 className="text-2xl font-bold">₹1,25,000</h2>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <p className="text-gray-500 text-sm">Orders</p>
                        <h2 className="text-2xl font-bold">40</h2>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <p className="text-gray-500 text-sm">Products</p>
                        <h2 className="text-2xl font-bold">18</h2>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-2 gap-6">
                    <SalesChart />
                    <OrdersChart />
                     <DashboardQuickForm />
                </div>
            </div>
        // </div>
    );
}
