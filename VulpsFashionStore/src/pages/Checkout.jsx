import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import './Checkout.css'; 

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // States
  const [dbItems, setDbItems] = useState([]);
  const [isFetchingCart, setIsFetchingCart] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const passedItems = state?.items;
  const orderItems = (passedItems && passedItems.length > 0) ? passedItems : dbItems;

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "", // Changed to lowercase for consistent validation
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [totals, setTotals] = useState({ subtotal: 0, total: 0 });

  // Fetch Cart Fallback
  useEffect(() => {
    if (passedItems && passedItems.length > 0) {
      setIsFetchingCart(false); 
      return;
    }
    if (!userId) {
      setIsFetchingCart(false);
      return;
    }

    const fetchCart = async () => {
      try {
        setIsFetchingCart(true);
        const res = await fetch(`https://vulps-fashion-store.onrender.com/api/cart?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setDbItems(data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsFetchingCart(false);
      }
    };
    fetchCart();
  }, [userId, passedItems]);

  // Totals calculation
  useEffect(() => {
    const sub = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = orderItems.length > 0 ? 100 : 0; 
    setTotals({ subtotal: sub, total: sub + shipping });
  }, [orderItems]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation: Button will enable once all fields are filled AND payment is selected
  const isFormValid = 
    form.fullName.trim() && 
    form.mobile.trim() && 
    form.email.trim() && 
    form.address.trim() && 
    form.city.trim() && 
    form.state.trim() && 
    form.pincode.trim() && 
    paymentMethod !== "";

  const placeOrder = async () => {
    if (!isFormValid || !userId) return;

    try {
      setLoading(true);
      for (const item of orderItems) {
        // Handle array color data
        const cleanColor = Array.isArray(item.color) ? item.color[0] : item.color;

        const orderPayload = {
          userId,
          productId: item.productId || item.id,
          productName: item.productName || item.name || item.title,
          size: item.size,
          color: cleanColor,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl || item.image,
          fullName: form.fullName,
          mobile: form.mobile,
          email: form.email,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          paymentMethod
        };

        const res = await fetch("https://vulps-fashion-store.onrender.com/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        if (!res.ok) throw new Error("Order failed");
      }
      setShowSuccessModal(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="checkout-container">
        <div className="checkout-grid">
          
          {/* LEFT: ORDER SUMMARY */}
          <div className="checkout-card">
            <h2 className="checkout-title">Order Summary ({orderItems.length})</h2>
            <div className="order-items-scroll">
              {orderItems.map((item, index) => {
                const displayColor = Array.isArray(item.color) ? item.color[0] : item.color;
                return (
                  <div key={index} className="order-item">
                    <img src={item.imageUrl || item.image} alt="product" className="order-img" />
                    <div className="order-details">
                      <h3>{item.name || item.title}</h3>
                      <p className="order-meta">Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="order-meta">
                        Color: <span style={{ color: displayColor }}>{displayColor}</span>
                      </p>
                      <p className="order-price">₹ {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className="order-divider" />
            <div className="summary-row"><span>Subtotal</span><span>₹ {totals.subtotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>₹ {totals.total > 0 ? 100 : 0}</span></div>
            <div className="order-total"><span>Total</span><span>₹ {totals.total.toLocaleString()}</span></div>
          </div>

          {/* RIGHT: SHIPPING DETAILS */}
          <div className="checkout-card">
            <h2 className="checkout-title">Shipping Details</h2>
            <div className="form-grid">
              <input name="fullName" value={form.fullName} placeholder="Full Name" className="checkout-input" onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <input name="mobile" value={form.mobile} placeholder="Mobile" className="checkout-input" onChange={handleChange} />
                <input name="email" value={form.email} placeholder="Email" className="checkout-input" onChange={handleChange} />
              </div>
              <textarea name="address" value={form.address} placeholder="Full Address" className="checkout-input" onChange={handleChange} />
              <input name="state" value={form.state} placeholder="State" className="checkout-input" onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <input name="city" value={form.city} placeholder="City" className="checkout-input" onChange={handleChange} />
                <input name="pincode" value={form.pincode} placeholder="Pincode" className="checkout-input" onChange={handleChange} />
              </div>
            </div>

            <div className="payment-section">
              <h3 className="payment-title">Payment Method</h3>
              <div className="payment-options">
                <div onClick={() => setPaymentMethod("COD")} className={`payment-card ${paymentMethod === "COD" ? "selected" : ""}`}>
                  <span>Cash on Delivery</span> <span>💵</span>
                </div>
                <div onClick={() => setPaymentMethod("ONLINE")} className={`payment-card ${paymentMethod === "ONLINE" ? "selected" : ""}`}>
                  <span>Online Payment</span> <span>💳</span>
                </div>
              </div>
            </div>

           <button 
  onClick={placeOrder} 
  // Added: paymentMethod === "ONLINE" to the disabled conditions
  disabled={!isFormValid || loading || paymentMethod === "ONLINE" || orderItems.length === 0} 
  className="place-order-btn"
>
  {loading ? "Processing..." : paymentMethod === "ONLINE" ? "Online Pay is not available" : `Pay ₹ ${totals.total.toLocaleString()}`}
</button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">✔</div>
            <h2>Order Placed Successfully!</h2>
            <p>Your style is on the way. Check your orders for updates.</p>
            <div className="modal-actions">
              <button onClick={() => navigate("/my-orders")} className="modal-btn-primary">View Orders</button>
              <button onClick={() => navigate("/")} className="modal-btn-secondary">Back to Home</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Checkout;