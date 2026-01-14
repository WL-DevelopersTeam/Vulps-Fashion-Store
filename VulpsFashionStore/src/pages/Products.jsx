import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import "./Products.css"; // Make sure to create this file

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

  const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

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
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
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
      setLatestPrice("");
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
    <div className="products-container">
      <h1 className="page-title">Products</h1>

      {/* Add / Edit Product (ADMIN → BACKEND) */}
      <div className="card">
        <h2 className="card-title">Add / Edit Product</h2>

        <div className="form-grid">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="input-field"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="input-field"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            className="input-field"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="input-field"
          />

          <div className="selection-group">
            <p className="label">Sizes</p>
            <div className="options-container">
              {AVAILABLE_SIZES.map((size) => {
                const isSelected = sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeChange(size)}
                    className={`size-btn ${isSelected ? "selected" : ""}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="selection-group">
            <p className="label">Colors</p>
            <div className="options-container flex-wrap">
              {AVAILABLE_COLORS.map((color) => {
                const isSelected = colors.includes(color.name);
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorChange(color.name)}
                    className={`color-btn ${isSelected ? "selected" : ""}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {isSelected && <span className="checkmark"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="input-field file-input"
          />
        </div>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="image-preview"
          />
        )}

        <button
          onClick={addProduct}
          disabled={addingProduct}
          className="primary-btn"
        >
          {addingProduct ? <Loader /> : "Save Product"}
        </button>
      </div>

      {/* Add Latest Product (UNCHANGED) */}
      <div className="card">
        <h2 className="card-title">Add Latest Product</h2>

        <div className="form-grid">
          <input
            value={latestName}
            onChange={(e) => setLatestName(e.target.value)}
            placeholder="Latest product name"
            className="input-field"
          />
          <input
            value={latestPrice}
            onChange={(e) => setLatestPrice(e.target.value)}
            placeholder="Price"
            type="number"
            className="input-field"
          />
          <input
            value={latestDescription}
            onChange={(e) => setLatestDescription(e.target.value)}
            placeholder="Description"
            className="input-field"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLatestImage(e.target.files[0])}
            className="input-field file-input"
          />
        </div>

        {latestImage && (
          <img
            src={URL.createObjectURL(latestImage)}
            alt="preview"
            className="image-preview"
          />
        )}

        <button
          onClick={addLatestProduct}
          disabled={addingLatest}
          className="primary-btn"
        >
          {addingLatest ? <Loader /> : "Add Latest Product"}
        </button>
      </div>

      {/* Products Table */}
      <div className="table-card">
        <table className="products-table">
          <thead>
            <tr>
              <th className="align-left">Image</th>
              <th className="align-left">Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loadingProducts && (
              <tr>
                <td colSpan="4" className="loader-cell">
                  <div className="loader-wrapper">
                    <Loader />
                  </div>
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="table-img"
                  />
                </td>
                <td>{product.name}</td>
                <td className="align-center">₹{product.price}</td>
                <td className="align-center">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    disabled={deletingId === product.id}
                    className="delete-btn"
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