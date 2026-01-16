import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      navigate("/SignIn");
      return;
    }
    fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await fetch(
        `https://vulps-fashion-store.onrender.com/api/cart?userId=${userId}`
      );
      if (!res.ok) {
        setCartItems([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId) => {
    await fetch(
      `https://vulps-fashion-store.onrender.com/api/cart/remove/${cartItemId}`,
      { method: "DELETE" }
    );
    fetchCart();
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 100 : 0;
  const total = subtotal + shipping;

  /* --- NAVIGATION HANDLERS --- */
  
  // 1. Buy Now (Single Item)
  const handleBuyNow = (item) => {
    navigate('/checkout', { state: { items: [item] } });
  };

  // 2. Checkout (All Items)
  const handleCheckoutAll = () => {
    navigate('/checkout', { state: { items: cartItems } });
  };

  if (loading) {
    return (
      <div className="cart-loading">
        <h2>Loading your selection...</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart ({cartItems.length})</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your bag is empty</h2>
            <p>Looks like you haven't made your choice yet.</p>
            <button className="cta-button" onClick={() => navigate("/shop")}>
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {/* CART ITEMS */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.cartItemId || item.productId} className="cart-item">
                  <div className="item-image-wrapper">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-image"
                    />
                  </div>

                  <div className="item-info-group">
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-meta">Size: <span>{item.size}</span></p>
                      <p className="item-meta">Color: <span>{item.color}</span></p>
                      <p className="item-price">₹{item.price.toLocaleString()}</p>
                    </div>

                    <div className="item-quantity">
                      <span className="qty-label">Qty:</span>
                      <span className="qty-val">{item.quantity}</span>
                    </div>
                  </div>

                  <div className="item-actions-wrapper">
                    <p className="item-subtotal">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    
                    <div className="action-buttons">
                        <button 
                            className="buy-now-btn"
                            onClick={() => handleBuyNow(item)}
                        >
                            Buy Now
                        </button>
                        
                        <button
                            className="remove-btn"
                            onClick={() => removeItem(item.cartItemId)}
                        >
                            Remove
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              {/* FIXED: Added onClick to send ALL items */}
              <button className="checkout-btn" onClick={handleCheckoutAll}>
                Proceed to Checkout
              </button>

              <button
                className="continue-shopping-btn"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;