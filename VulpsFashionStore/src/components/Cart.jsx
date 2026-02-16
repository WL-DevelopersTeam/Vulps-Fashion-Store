import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import api from "../api/axios";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState(""); 

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      navigate("/SignIn");
      return;
    }
    fetchCart();
  }, [userId, navigate]);

  const fetchCart = async () => {
    try {
      const res = await api.get(`/api/cart?userId=${userId}`);
      setCartItems(res.data);
      
      // SYNC: Tell Navbar to update count when page loads
      window.dispatchEvent(new Event('cartUpdated')); 
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await api.delete(`/api/cart/remove/${cartItemId}`);
      
      setPopupMessage("Product has been removed from your cart");
      setTimeout(() => setPopupMessage(""), 3000);

      // Refresh local list
      fetchCart(); 

      // SYNC: Shout to the Navbar that the count has changed!
      window.dispatchEvent(new Event('cartUpdated')); 

    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 100 : 0;
  const total = subtotal + shipping;

  const handleBuyNow = (item) => navigate('/checkout', { state: { items: [item] } });
  const handleCheckoutAll = () => navigate('/checkout', { state: { items: cartItems } });

  if (loading) return <div className="cart-loading"><h2>Loading your selection...</h2></div>;

  return (
    <div className="cart-page">
      {/* POPUP NOTIFICATION */}
      {popupMessage && <div className="cart-notification"><span>{popupMessage}</span></div>}

      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart ({cartItems.length})</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your bag is empty</h2>
            <button className="cta-button" onClick={() => navigate("/shop")}>Explore Collection</button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.cartItemId || item.productId} className="cart-item">
                  <div className="item-image-wrapper">
                    <img src={item.imageUrl} alt={item.name} className="cart-image" />
                  </div>
                  
                  <div className="item-info-group">
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-meta">Size: <span>{item.size || "—"}</span></p>
                      
                      {/* ADDED COLOR FIELD BACK HERE */}
                      <p className="item-meta">Color: <span>{item.color || "—"}</span></p>
                      
                      <p className="item-price">₹{item.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="item-quantity">
                      <span className="qty-label">Qty:</span>
                      <span className="qty-val">{item.quantity}</span>
                    </div>
                  </div>

                  <div className="item-actions-wrapper">
                    <p className="item-subtotal">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <div className="action-buttons">
                      <button className="buy-now-btn" onClick={() => handleBuyNow(item)}>Buy Now</button>
                      <button className="remove-btn" onClick={() => removeItem(item.cartItemId)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="summary-row"><span>Shipping</span><span>₹{shipping}</span></div>
              <div className="divider"></div>
              <div className="summary-row total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              <button className="checkout-btn" onClick={handleCheckoutAll}>Proceed to Checkout</button>
              
              <button className="continue-shopping-btn" onClick={() => navigate("/shop")}>
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