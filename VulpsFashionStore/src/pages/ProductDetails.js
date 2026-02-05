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
  const [addingToCart, setAddingToCart] = useState(false); // Loading state for button

  const colorMap = {
    black: "#000000",
    blue: "#2563eb",
    white: "#ffffff",
    red: "#dc2626",
    green: "#16a34a",
    gray: "#6b7280",
    yellow: "#eab308"
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

      const sizes = Array.isArray(data.sizes)
  ? data.sizes
  : typeof data.sizes === "string"
  ? data.sizes.split(",").map(s => s.trim())
  : [];

const colors = Array.isArray(data.colors)
  ? data.colors
  : typeof data.colors === "string"
  ? data.colors.split(",").map(c => c.trim())
  : [];


      setProduct({ ...data, sizes, colors });
      setSelectedSize(sizes[0] || "");
      setSelectedColor(colors[0] || "");
    } catch (err) {
      console.error("Failed to fetch product", err);
    } finally {
      setLoading(false);
    }
  };

  /* --- 1. ADD TO CART FUNCTIONALITY --- */
  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    // Redirect if not logged in
    if (!user) {
      alert("Please login to add items to your cart.");
      navigate("/SignIn");
      return;
    }

    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color.");
      return;
    }

    try {
      setAddingToCart(true);
      
      const cartPayload = {
        userId: user.id,
        productId: product.id, // Ensure this matches your DB (id vs _id)
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
      };

      await axios.post(
        "https://vulps-fashion-store.onrender.com/api/cart/add",
        cartPayload
      );

      alert("Item added to cart successfully!");
      // Optional: Navigate to cart or stay here
      // navigate("/cart"); 
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
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
          
          {/* LEFT: IMAGE SECTION */}
          <div className="product-image-section">
            <div className="zoom-container" onMouseMove={handleMouseMove}>
              <img src={product.imageUrl} alt={product.name} className="main-product-image" />
            </div>
          </div>

          {/* RIGHT: INFO CARD */}
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
                  {product.colors.map(color => {
                    const bgColor = colorMap[color.toLowerCase()] || color;
                    return (
                      <button 
                        key={color} 
                        className={`color-pill ${selectedColor === color ? 'active' : ''}`}
                        /* --- 3. FIX: Add White Border so Black shows on Dark Background --- */
                        style={{ 
                            backgroundColor: bgColor,
                            border: '2px solid white', 
                            boxShadow: selectedColor === color ? '0 0 0 4px #d4af37' : 'none'
                        }}
                        onClick={() => setSelectedColor(color)}
                        title={color} // Shows color name on hover
                      />
                    );
                  })}
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
                
                {/* --- 2. UPDATED ADD TO CART BUTTON --- */}
                <button 
                    className="btn-add" 
                    onClick={addToCart}
                    disabled={addingToCart}
                    style={{ width: '100%' }} // Make it fill the space since Buy Now is gone
                >
                    {addingToCart ? "Adding..." : "Add to Cart"}
                </button>
                
                {/* Buy Now button Removed */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;