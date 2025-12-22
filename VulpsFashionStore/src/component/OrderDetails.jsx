export default function OrderDetails() {
    return (
        <div className="w-80 bg-white rounded-xl p-6">
            <h3 className="font-semibold mb-4">Order #390561</h3>

            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div>
                    <p className="font-medium">James Miller</p>
                    <p className="text-xs text-gray-400">Paid • Jan 8</p>
                </div>
            </div>

            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <span>Ryobi ONE+ drill</span>
                    <span>$409</span>
                </div>
                <div className="flex justify-between">
                    <span>Dyson V12</span>
                    <span>$1190</span>
                </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$1620</span>
            </div>

            <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-black text-white py-2 rounded-lg">
                    Track
                </button>
                <button className="flex-1 bg-gray-200 py-2 rounded-lg">
                    Refund
                </button>
            </div>
        </div>
    );
}