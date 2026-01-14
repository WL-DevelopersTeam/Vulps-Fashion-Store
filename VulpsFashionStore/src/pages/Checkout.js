import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import './Checkout.css'; // Import the new CSS

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if no product state passed
  if (!state) {
    return (
      <Layout>
        <div className="checkout-container text-center">
          <h2 className="text-gray-500">Invalid checkout session</h2>
          <button onClick={() => navigate('/shop')} className="mt-4 text-[#d4af37] underline">Return to Shop</button>
        </div>
      </Layout>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.fullName &&
    form.mobile &&
    form.email &&
    form.address &&
    form.city &&
    paymentMethod;

  const placeOrder = async () => {
    if (!isFormValid) {
      alert("Please fill all details and select payment method");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://vulps-fashion-store.onrender.com/api/orders",
        {
          fullName: form.fullName,
          mobile: form.mobile,
          email: form.email,
          address: form.address,
          city: form.city,

          productId: state.productId,
          productName: state.name,
          price: state.price,
          quantity: state.quantity,
          size: state.size,
          color: state.color,

          paymentMethod: paymentMethod,
          status: "PENDING",
        }
      );

      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Used 'bg-mesh' class globally in Layout or Shop, if not add it to a wrapper here */}
      <div className="checkout-container">
        <div className="checkout-grid">

          {/* LEFT - ORDER SUMMARY */}
          <div className="checkout-card">
            <h2 className="checkout-title">Order Summary</h2>

            <div className="order-item">
              <img
                src={state.image}
                alt={state.name}
                className="order-img"
              />

              <div className="order-details">
                <h3>{state.name}</h3>
                <p className="order-meta">Size: {state.size}</p>
                <p className="order-meta">Color: <span style={{color: state.color, fontWeight:'bold', textTransform:'capitalize'}}>{state.color}</span></p>
                <p className="order-price">₹ {state.price} × {state.quantity}</p>
              </div>
            </div>

            <hr className="order-divider" />

            <div className="order-total">
              <span>Total</span>
              <span>₹ {(state.price * state.quantity).toLocaleString()}</span>
            </div>

            <p className="delivery-note">
              🚚 Free delivery in 4–6 working days
            </p>
          </div>

          {/* RIGHT - CUSTOMER DETAILS */}
          <div className="checkout-card">
            <h2 className="checkout-title">Shipping Details</h2>

            <div className="form-grid">
              <input
                name="fullName"
                placeholder="Full Name"
                className="checkout-input"
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="mobile"
                  placeholder="Mobile Number"
                  className="checkout-input"
                  onChange={handleChange}
                />
                <input
                  name="email"
                  placeholder="Email Address"
                  className="checkout-input"
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="address"
                placeholder="Full Address (House No, Street, Area)"
                className="checkout-input"
                onChange={handleChange}
              />

              <input
                name="city"
                placeholder="City / Pincode"
                className="checkout-input"
                onChange={handleChange}
              />
            </div>

            {/* PAYMENT METHOD */}
            <div className="payment-section">
              <h3 className="font-semibold mb-3 text-white">Payment Method</h3>

              <div className="payment-options">
                {/* COD */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`payment-card ${paymentMethod === "COD" ? "selected" : ""}`}
                >
                  <span>Cash on Delivery</span>
                  <span>💵</span>
                </div>

                {/* ONLINE */}
                <div
                  onClick={() => setPaymentMethod("ONLINE")}
                  className={`payment-card ${paymentMethod === "ONLINE" ? "selected" : ""}`}
                >
                  <span>Online Payment</span>
                  <span>💳</span>
                </div>
              </div>

              {paymentMethod === "ONLINE" && (
                <p className="text-xs text-[#d4af37] mt-2 opacity-80">
                  * Secure Gateway (Razorpay/Stripe) integration pending.
                </p>
              )}
            </div>

            {/* PLACE ORDER */}
            <button
              onClick={placeOrder}
              disabled={!isFormValid || loading}
              className="place-order-btn"
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;