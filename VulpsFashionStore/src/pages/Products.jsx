import React, { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";
import "./Products.css"; 

export default function Products() {
  const [products, setProducts] = useState([]);

  // Add / Edit product state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);

  // Latest product state
  const [latestName, setLatestName] = useState("");
  const [latestPrice, setLatestPrice] = useState("");
  const [latestDescription, setLatestDescription] = useState("");
  const [latestImage, setLatestImage] = useState(null);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);
  const [addingLatest, setAddingLatest] = useState(false);
  
  // Deletion State
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Popup State
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  
  // Refs
  const imageInputRef = useRef(null);
  const latestImageInputRef = useRef(null);

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

  // --- HELPERS ---
  const showPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setSizes([]);
    setColors([]);
    setImage(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleColorChange = (color) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSizeChange = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // --- API CALLS ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const addProduct = async () => {
    if (!name || !price || !image) {
      showPopup("Please fill all required fields", "error");
      return;
    }

    try {
      setAddingProduct(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("sizes", sizes.join(","));
      formData.append("colors", colors.join(","));
      formData.append("image", image);

      await api.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showPopup("Product added successfully!", "success");
      resetForm();
      fetchProducts();
    } catch (error) {
      showPopup("Failed to add product", "error");
    } finally {
      setAddingProduct(false);
    }
  };

  const addLatestProduct = async () => {
    if (!latestName || !latestImage) {
      showPopup("Please fill all fields", "error");
      return;
    }

    try {
      setAddingLatest(true);
      const formData = new FormData();
      formData.append("title", latestName);
      formData.append("price", latestPrice);
      formData.append("description", latestDescription);
      formData.append("image", latestImage);

      await api.post("/api/latest-collections", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showPopup("Latest product added successfully!", "success");
      setLatestName("");
      setLatestPrice("");
      setLatestDescription("");
      setLatestImage(null);
      if (latestImageInputRef.current) latestImageInputRef.current.value = "";

    } catch (error) {
      showPopup("Failed to add latest product", "error");
    } finally {
      setAddingLatest(false);
    }
  };

  // --- DELETE HANDLERS ---
  const initiateDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setDeletingId(productToDelete.id);
      await api.delete(`/api/products/${productToDelete.id}`);
      await fetchProducts();
      showPopup("Product deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showPopup("Failed to delete product", "error");
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="products-container relative">
      
      {/* --- CUSTOM POPUP NOTIFICATION --- */}
      {popup.show && (
        <div className={`popup-notification ${popup.type}`}>
          <div className="popup-content">
            {popup.type === "success" ? "✅" : "⚠️"} {popup.message}
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete <b>{productToDelete?.name}</b>?</p>
            <p className="warning-text">This action cannot be undone.</p>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn" 
                onClick={() => setShowDeleteModal(false)}
                disabled={deletingId !== null}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn" 
                onClick={confirmDelete}
                disabled={deletingId !== null}
              >
                {deletingId ? <Loader /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="page-title">Products</h1>

      {/* Add Product Form */}
      <div className="card">
        <h2 className="card-title">Add / Edit Product</h2>
        <div className="form-grid">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" className="input-field" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="input-field" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" className="input-field" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="input-field" />

          <div className="selection-group">
            <p className="label">Sizes</p>
            <div className="options-container">
              {AVAILABLE_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={`size-btn ${sizes.includes(size) ? "selected" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="selection-group">
            <p className="label">Colors</p>
            <div className="options-container flex-wrap">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleColorChange(color.name)}
                  className={`color-btn ${colors.includes(color.name) ? "selected" : ""}`}
                  style={{ backgroundColor: color.value }}
                >
                  {colors.includes(color.name) && <span className="checkmark"></span>}
                </button>
              ))}
            </div>
          </div>

          <input type="file" accept="image/*" ref={imageInputRef} onChange={(e) => setImage(e.target.files[0])} className="input-field file-input" />
        </div>
        {image && <img src={URL.createObjectURL(image)} alt="preview" className="image-preview" />}
        <button onClick={addProduct} disabled={addingProduct} className="primary-btn">
          {addingProduct ? <Loader /> : "Save Product"}
        </button>
      </div>

      {/* Add Latest Product Form */}
      <div className="card">
        <h2 className="card-title">Add Latest Product</h2>
        <div className="form-grid">
          <input value={latestName} onChange={(e) => setLatestName(e.target.value)} placeholder="Latest product name" className="input-field" />
          <input value={latestPrice} onChange={(e) => setLatestPrice(e.target.value)} placeholder="Price" type="number" className="input-field" />
          <input value={latestDescription} onChange={(e) => setLatestDescription(e.target.value)} placeholder="Description" className="input-field" />
          <input type="file" accept="image/*" ref={latestImageInputRef} onChange={(e) => setLatestImage(e.target.files[0])} className="input-field file-input" />
        </div>
        {latestImage && <img src={URL.createObjectURL(latestImage)} alt="preview" className="image-preview" />}
        <button onClick={addLatestProduct} disabled={addingLatest} className="primary-btn">
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
              <tr><td colSpan="4" className="loader-cell"><div className="loader-wrapper"><Loader /></div></td></tr>
            )}
            {products.map((product) => (
              <tr key={product.id}>
                <td><img src={product.imageUrl} alt={product.name} className="table-img" /></td>
                <td>{product.name}</td>
                <td className="align-center">₹{product.price}</td>
                <td className="align-center">
                  <button 
                    onClick={() => initiateDelete(product)} 
                    className="delete-btn"
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