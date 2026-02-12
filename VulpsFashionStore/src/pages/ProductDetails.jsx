import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Loader from "../components/Loader";
import "./ProductDetails.css";
import api from "../api/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Expanded color map to ensure various common colors render correctly
  const colorMap = {
    black: "#000000",
    blue: "#2563eb",
    white: "#ffffff",
    red: "#dc2626",
    green: "#16a34a",
    gray: "#6b7280",
    yellow: "#eab308",
    navy: "#000080",
    pink: "#db2777",
    orange: "#ea580c"
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/products/${id}`);
     const data = res.data;

      // HELPER: Normalizes API data that might arrive as strings with literal brackets ["S"]
      const normalizeData = (input) => {
        if (Array.isArray(input)) {
          return input.map(item => String(item).replace(/[\[\]"]/g, "").trim());
        }
        if (typeof input === "string") {
          return input.replace(/[\[\]"]/g, "").split(",").map(s => s.trim());
        }
        return [];
      };

      const sizes = normalizeData(data.sizes);
      const colors = normalizeData(data.colors);

      setProduct({ ...data, sizes, colors });
      setSelectedSize(sizes[0] || "");
      setSelectedColor(colors[0] || "");
    } catch (err) {
      console.error("Failed to fetch product", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user || !user.id) {
        alert("Please login to add items to cart");
        navigate("/signin");
        return;
    }

    if (!selectedSize || !selectedColor) {
        alert("Please select a size and color");
        return;
    }

    try {
        setAddingToCart(true);
        // Corrected Payload: matching backend requirements for the fashion app
        const res = await api.post(
            `/api/cart/add?userId=${user.id}`,
            {
              productId: product.id,
              size: selectedSize,
              color: selectedColor,
              quantity: quantity
            }
          );


        if (res.status === 200 || res.status === 201) {
            navigate("/cart");
        }
    } catch (err) {
        console.error("Error adding to cart:", err);
        alert(err.response?.data?.message || "Failed to add to cart. Please try again.");
    } finally {
        setAddingToCart(false);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  if (loading) return <Layout><div className="loader-box"><Loader /></div></Layout>;
  if (!product) return <Layout><div className="not-found">Product not found</div></Layout>;

  return (
    <Layout>
      <div className="product-page-root">
        <div className="product-main-container">
          
          {/* LEFT: IMAGE SECTION WITH ZOOM */}
          <div className="product-image-section">
            <div className="zoom-container" onMouseMove={handleMouseMove}>
              <img src={product.imageUrl} alt={product.name} className="main-product-image" />
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO CARD */}
          <div className="product-info-section">
            <div className="info-card">
              <div className="badge-row">
                <span className="premium-badge">New Arrival</span>
                <span className="category-tag">{product.category}</span>
              </div>
              
              <h1 className="product-title">{product.name}</h1>
              
              <div className="rating-container">
                <span className="stars">★★★★☆</span>
                <span className="review-text">(128 Verified Reviews)</span>
              </div>

              <div className="price-box">
                <span className="current-price">₹{product.price}</span>
                <span className="original-price">₹{product.price + 300}</span>
                <span className="discount-pill">30% OFF</span>
              </div>

              <p className="description-text">{product.description || "Premium apparel designed for maximum comfort and lasting style."}</p>

              <div className="specs-grid">
                <div className="spec-item"><span>✔</span> Premium Cotton</div>
                <div className="spec-item"><span>✔</span> Fade-resistant</div>
                <div className="spec-item"><span>✔</span> Made in India</div>
              </div>

              {/* SIZE SELECTION AREA */}
              <div className="selection-area">
                <label className="section-label">Select Size</label>
                <div className="options-flex">
                  {product.sizes.map(size => (
                    <button 
                      key={size} 
                      className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR SELECTION AREA: Normalized for API formats */}
              <div className="selection-area">
                <label className="section-label">Select Color</label>
                <div className="options-flex">
                  {product.colors.map(color => {
                    const bgColor = colorMap[color.toLowerCase()] || color;
                    return (
                      <button 
                        key={color} 
                        className={`color-pill ${selectedColor === color ? 'active' : ''}`}
                        style={{ 
                            backgroundColor: bgColor,
                            border: selectedColor === color ? '3px solid #d4af37' : '1px solid #555'
                        }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="delivery-note">
                🚚 Free delivery within 4–6 working days | 🔄 7-day returns
              </div>

              {/* ACTION ROW: Quantity and Add to Cart */}
              <div className="action-row">
                <div className="quantity-toggle">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                
                <button 
                    className="btn-add" 
                    onClick={addToCart}
                    disabled={addingToCart}
                    style={{ flex: 1 }}
                >
                    {addingToCart ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;