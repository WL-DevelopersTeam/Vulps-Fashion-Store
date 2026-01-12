import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Loader from "../components/Loader";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const colorMap = {
    black: "#000000",
    blue: "#2563eb",
    white: "#ffffff",
    red: "#dc2626",
    green: "#16a34a",
    gray: "#6b7280",
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://vulps-fashion-store.onrender.com/api/products/${id}`
      );
      const data = res.data;

      const sizes = Array.isArray(data.sizes) ? data.sizes : JSON.parse(data.sizes || "[]");
      const colors = Array.isArray(data.colors) ? data.colors : JSON.parse(data.colors || "[]");

      setProduct({ ...data, sizes, colors });
      setSelectedSize(sizes[0] || "");
      setSelectedColor(colors[0] || "");
    } catch (err) {
      console.error("Failed to fetch product", err);
    } finally {
      setLoading(false);
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
          
          {/* LEFT: SYMMETRICAL IMAGE SECTION */}
          <div className="product-image-section">
            <div className="zoom-container" onMouseMove={handleMouseMove}>
              <img src={product.imageUrl} alt={product.name} className="main-product-image" />
            </div>
          </div>

          {/* RIGHT: PREMIUM INFO CARD */}
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

              <p className="description-text">{product.description || "Experience unmatched comfort and style with our premium cotton blend, designed for daily wear and durability."}</p>

              <div className="specs-grid">
                <div className="spec-item"><span>✔</span> Premium Cotton</div>
                <div className="spec-item"><span>✔</span> Skin-friendly</div>
                <div className="spec-item"><span>✔</span> Fade-resistant</div>
                <div className="spec-item"><span>✔</span> Made in India</div>
              </div>

              {/* SIZE SELECTION */}
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

              {/* COLOR SELECTION */}
              <div className="selection-area">
                <label className="section-label">Select Color</label>
                <div className="options-flex">
                  {product.colors.map(color => (
                    <button 
                      key={color} 
                      className={`color-pill ${selectedColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: colorMap[color.toLowerCase()] || color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              <div className="delivery-note">
                🚚 Free delivery within 4–6 working days | 🔄 7-day returns
              </div>

              {/* ACTION ROW */}
              <div className="action-row">
                <div className="quantity-toggle">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                
                <button className="btn-add">Add to Cart</button>
                
                <button 
                  className="btn-buy"
                  onClick={() => navigate("/checkout", {
                    state: {
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.imageUrl,
                      size: selectedSize,
                      color: selectedColor,
                      quantity: quantity,
                    },
                  })}
                >
                  Buy Now
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