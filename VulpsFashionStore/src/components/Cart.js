import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- GET LOGGED IN USER ---------------- */
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  /* ---------------- FETCH CART ---------------- */
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

  /* ---------------- REMOVE ITEM ---------------- */
const removeItem = async (cartItemId) => {
  await fetch(
    `https://vulps-fashion-store.onrender.com/api/cart/remove/${cartItemId}`,
    { method: "DELETE" }
  );
  fetchCart();
};


  /* ---------------- CALCULATIONS ---------------- */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 100 : 0;
  const total = subtotal + shipping;

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading cart...</h2>;
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <button className="cta-button" onClick={() => navigate("/shop")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {/* CART ITEMS */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.productId} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-image"
                      />

                  </div>

                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color}</p>
                    <p className="item-price">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="item-quantity">
                    <span>Qty: {item.quantity}</span>
                  </div>

                  <div className="item-total">
                    <p>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.cartItemId)}
                          >
                         Remove
                    </button>

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

              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <button className="checkout-btn" >
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
