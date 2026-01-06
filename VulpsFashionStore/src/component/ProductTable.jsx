export default function ProductTable() {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Products</h2>
        <button className="bg-black text-white px-4 py-2 rounded">
          + Add Product
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="py-2">T-Shirt</td>
            <td>₹999</td>
            <td>24</td>
            <td className="space-x-2">
              <button className="text-blue-600">Edit</button>
              <button className="text-red-600">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
