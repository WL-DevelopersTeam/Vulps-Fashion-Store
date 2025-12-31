import { useState } from "react";
import axios from "axios";

export default function Products() {

  const [products, setProducts] = useState([]);

  // Add / Edit product state (ADMIN → BACKEND)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [image, setImage] = useState(null);

  // Latest product state (❌ DO NOT TOUCH – AS REQUESTED)
  const [latestName, setLatestName] = useState("");
  const [latestPrice, setLatestPrice] = useState("");
  const [latestDescription, setLatestDescription] = useState("");
  const [latestImage, setLatestImage] = useState(null);

  // ✅ ADD PRODUCT → BACKEND
  const addProduct = async () => {
    if (!name || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("sizes", sizes);
      formData.append("colors", colors);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8080/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Add product to UI table
      setProducts([...products, response.data]);

      alert("Product added successfully");

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setSizes("");
      setColors("");
      setImage(null);

    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  // Add Latest Product 
  const addLatestProduct = async () => {
  if (!latestName || !latestImage) {
    alert("Please fill all fields");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("title", latestName);
    formData.append("description", latestDescription);
    formData.append("image", latestImage);

    await axios.post(
      "http://localhost:8080/api/latest-collections",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Latest product added successfully");

    // reset fields
    setLatestName("");
    setLatestPrice("");
    setLatestDescription("");
    setLatestImage(null);

  } catch (error) {
    console.error(error);
    alert("Failed to add latest product");
  }
};


  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      {/* Add / Edit Product (ADMIN → BACKEND) */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold mb-4">Add / Edit Product</h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="border rounded px-3 py-2"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border rounded px-3 py-2"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            className="border rounded px-3 py-2"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="border rounded px-3 py-2"
          />

          <input
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            placeholder="Sizes (S,M,L)"
            className="border rounded px-3 py-2"
          />

          <input
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            placeholder="Colors (Red,Blue)"
            className="border rounded px-3 py-2"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border rounded px-3 py-2"
          />
        </div>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="mt-4 h-24 rounded-lg object-cover"
          />
        )}

        <button
          onClick={addProduct}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Save Product
        </button>
      </div>

      {/* Add Latest Product (UNCHANGED) */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold mb-4">Add Latest Product</h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            value={latestName}
            onChange={(e) => setLatestName(e.target.value)}
            placeholder="Latest product name"
            className="border rounded px-3 py-2"
          />
          <input
            value={latestPrice}
            onChange={(e) => setLatestPrice(e.target.value)}
            placeholder="Price"
            type="number"
            className="border rounded px-3 py-2"
          />
        <input
            value={latestDescription}
            onChange={(e) => setLatestDescription(e.target.value)}
            placeholder="Description"
            className="border rounded px-3 py-2"
            />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLatestImage(e.target.files[0])}
            className="border rounded px-3 py-2"
          />
        </div>

        {latestImage && (
            <img
                src={URL.createObjectURL(latestImage)}
                alt="preview"
                className="mt-4 h-24 rounded-lg object-cover"
            />
        )}


        <button
          onClick={addLatestProduct}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Add Latest Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="text-left">Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">
                  <img
                    src={`http://localhost:8080${product.imageUrl}`}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td>{product.name}</td>
                <td className="text-center">₹{product.price}</td>
                <td className="text-center">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
