import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../components/Loader";



export default function Products() {

  const [products, setProducts] = useState([]);

  // Add / Edit product state (ADMIN → BACKEND)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);

  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);

  // Latest product state (❌ DO NOT TOUCH – AS REQUESTED)
  const [latestName, setLatestName] = useState("");
  const [latestPrice, setLatestPrice] = useState("");
  const [latestDescription, setLatestDescription] = useState("");
  const [latestImage, setLatestImage] = useState(null);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);
  const [addingLatest, setAddingLatest] = useState(false);
  const [deletingId, setDeletingId] = useState(null);


    const AVAILABLE_COLORS = [
    { name: "Red", value: "#ef4444" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#22c55e" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Purple", value: "#a855f7" },
    { name: "Yellow", value: "#eab308" },
  ];

  const AVAILABLE_SIZES = ["S", "M", "L", "XL"];


  // ✅ ADD PRODUCT → BACKEND
  const handleColorChange = (color) => {
  setColors((prevColors) =>
    prevColors.includes(color)
      ? prevColors.filter((c) => c !== color) // remove
      : [...prevColors, color] // add
  );
};

const handleSizeChange = (size) => {
  setSizes((prev) =>
    prev.includes(size)
      ? prev.filter((s) => s !== size)
      : [...prev, size]
  );
};

const addProduct = async () => {
  if (!name || !price || !image) {
    alert("Please fill all fields");
    return;
  }

  try {
    setAddingProduct(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("colors", JSON.stringify(colors));
    formData.append("image", image);

    await axios.post(
      "https://vulps-fashion-store.onrender.com/api/products",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Product added successfully");
    fetchProducts();

  } catch (error) {
    alert("Failed to add product");
  } finally {
    setAddingProduct(false);
  }
};


            useEffect(() => {
            fetchProducts();
          }, []);

        const fetchProducts = async () => {
          try {
            setLoadingProducts(true);
            const res = await axios.get(
              "https://vulps-fashion-store.onrender.com/api/products"
            );
            setProducts(res.data);
          } catch (err) {
            console.error("Fetch failed", err);
          } finally {
            setLoadingProducts(false);
          }
        };



  // Add Latest Product 
const addLatestProduct = async () => {
  if (!latestName || !latestImage) {
    alert("Please fill all fields");
    return;
  }

  try {
    setAddingLatest(true);

    const formData = new FormData();
    formData.append("title", latestName);
    formData.append("price", latestPrice); 
    formData.append("description", latestDescription);
    formData.append("image", latestImage);

    await axios.post(
      "https://vulps-fashion-store.onrender.com/api/latest-collections",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Latest product added successfully");
    setLatestName("");
    setLatestDescription("");
    setLatestDescription("");
    setLatestImage(null);

  } catch (error) {
    alert("Failed to add latest product");
  } finally {
    setAddingLatest(false);
  }
};



const deleteProduct = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    setDeletingId(id);

    await axios.delete(
      `https://vulps-fashion-store.onrender.com/api/products/${id}`
    );

    setProducts(products.filter((p) => p.id !== id));

  } catch (err) {
    alert("Failed to delete product");
  } finally {
    setDeletingId(null);
  }
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

          <div>
  <p className="text-sm font-medium mb-2">Sizes</p>

  <div className="flex gap-3">
    {AVAILABLE_SIZES.map((size) => {
      const isSelected = sizes.includes(size);

      return (
        <button
          key={size}
          type="button"
          onClick={() => handleSizeChange(size)}
          className={`w-10 h-10 rounded-lg border font-semibold transition
            ${
              isSelected
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:border-black"
            }
          `}
        >
          {size}
        </button>
      );
    })}
  </div>
</div>


          <div>
  <p className="text-sm font-medium mb-2">Colors</p>

  <div className="flex flex-wrap gap-3">
    {AVAILABLE_COLORS.map((color) => {
      const isSelected = colors.includes(color.name);

      return (
        <button
          key={color.name}
          type="button"
          onClick={() => handleColorChange(color.name)}
          className={`w-8 h-8 rounded-full border-2 transition
            ${isSelected ? "border-black scale-110" : "border-gray-300"}
          `}
          style={{ backgroundColor: color.value }}
          title={color.name}
        >
          {isSelected && (
            <span className="block w-full h-full rounded-full border-2 border-white"></span>
          )}
        </button>
      );
    })}
  </div>
</div>



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
                  disabled={addingProduct}
                  className="mt-4 bg-black text-white px-6 py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                         {addingProduct ? <Loader /> : "Save Product"}
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
                disabled={addingLatest}
                className="mt-4 bg-black text-white px-6 py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                      {addingLatest ? <Loader /> : "Add Latest Product"}
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

            {loadingProducts && (
            <tr>
                      <td colSpan="4" className="p-6">
                       <div className="flex justify-center">
                            <Loader />
                        </div>
                      </td>
                </tr>
                  )}

            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">
                  <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />

                </td>
                <td>{product.name}</td>
                <td className="text-center">₹{product.price}</td>
                <td className="text-center">
              <button
                      onClick={() => deleteProduct(product.id)}
                      disabled={deletingId === product.id}
                      className="text-red-500 flex justify-center items-center disabled:opacity-50"
                        >
                    {deletingId === product.id ? <Loader /> : "Delete"}
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
