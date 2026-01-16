import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// Removed Axios to match your Cart.js implementation
import Layout from "../components/layout/Layout";
import './Checkout.css'; 

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 1. Local state for database items & loading status
  const [dbItems, setDbItems] = useState([]);
  const [isFetchingCart, setIsFetchingCart] = useState(true); // Starts true to show loading initially
  
  // 2. Get User ID
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // 3. Determine items: Use "Buy Now" items (state) OR "Database Cart" items (dbItems)
  const passedItems = state?.items;
  const orderItems = (passedItems && passedItems.length > 0) ? passedItems : dbItems;

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    Pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [totals, setTotals] = useState({ subtotal: 0, total: 0 });

  // 4. FETCH CART FALLBACK (Uses 'fetch' like Cart.js)
  useEffect(() => {
    // If we already have items passed from the previous page, don't fetch.
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
        // Using standard fetch exactly like Cart.js
        const res = await fetch(`https://vulps-fashion-store.onrender.com/api/cart?userId=${userId}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        
        const data = await res.json();
        setDbItems(data || []);
      } catch (error) {
        console.error("Error fetching cart for checkout:", error);
        setDbItems([]); // Ensure it's an array even on error
      } finally {
        setIsFetchingCart(false); // Stop loading regardless of success/failure
      }
    };

    fetchCart();
  }, [userId, passedItems]);

  // 5. Calculate Totals
  useEffect(() => {
    const sub = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = orderItems.length > 0 ? 100 : 0; 
    setTotals({ subtotal: sub, total: sub + shipping });
  }, [orderItems]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.fullName &&
    form.mobile &&
    form.email &&
    form.address &&
    form.city &&
    form.state &&
    form.Pincode &&
    paymentMethod;

  const placeOrder = async () => {
  if (!isFormValid) {
    alert("Please fill all details");
    return;
  }

  if (!userId) {
    alert("User not logged in");
    return;
  }

  try {
    setLoading(true);

    for (const item of orderItems) {
      const orderPayload = {
        userId: userId, // ✅ VERY IMPORTANT

        productId: item.productId || item.id,
        productName: item.name || item.title,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl || item.image, // ✅ VERY IMPORTANT

        fullName: form.fullName,
        mobile: form.mobile,
        email: form.email,
        address: form.address,
        city: form.city,
        pincode: form.Pincode,

        paymentMethod: paymentMethod
        
      };

      const res = await fetch(
        "https://vulps-fashion-store.onrender.com/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        }
      );

      if (!res.ok) {
        throw new Error("Order failed");
      }
    }

    alert("Order placed successfully!");
    navigate("/orders");

  } catch (err) {
    console.error(err);
    alert("Order failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
      <div className="checkout-container">
        <div className="checkout-grid">

          {/* LEFT - ORDER SUMMARY */}
          <div className="checkout-card">
            <h2 className="checkout-title">Order Summary ({orderItems.length})</h2>

            {/* LOGIC FIX: Show Loading OR Empty OR Items */}
            {isFetchingCart ? (
                <div className="text-gray-500 text-center py-8">
                   Loading your items...
                </div>
            ) : orderItems.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                   <p>Your bag is currently empty.</p>
                   <button onClick={() => navigate('/shop')} className="mt-4 text-[#d4af37] underline">Return to Shop</button>
                </div>
            ) : (
                <div className="order-items-scroll">
                    {orderItems.map((item, index) => (
                        <div key={index} className="order-item">
                            <img
                                src={item.imageUrl || item.image}
                                alt={item.name}
                                className="order-img"
                            />
                            <div className="order-details">
                                <h3>{item.name || item.title}</h3>
                                <p className="order-meta">Size: {item.size} | Qty: {item.quantity}</p>
                                <p className="order-meta">Color: <span style={{color: item.color, fontWeight:'bold', textTransform:'capitalize'}}>{item.color}</span></p>
                                <p className="order-price">₹ {(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <hr className="order-divider" />

            <div className="summary-row">
                <span>Subtotal</span>
                <span>₹ {totals.subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
                <span>Shipping</span>
                <span>₹ {totals.total > 0 ? 100 : 0}</span>
            </div>
            
            <div className="order-total">
              <span>Total</span>
              <span>₹ {totals.total.toLocaleString()}</span>
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
                name="state"
                placeholder="State"
                className="checkout-input"
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                    name="city"
                    placeholder="City"
                    className="checkout-input"
                    onChange={handleChange}
                />
                <input
                    name="Pincode"
                    placeholder="Pincode"
                    className="checkout-input"
                    onChange={handleChange}
                />
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="payment-section">
              <h3 className="font-semibold mb-3 text-white">Payment Method</h3>

              <div className="payment-options">
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`payment-card ${paymentMethod === "COD" ? "selected" : ""}`}
                >
                  <span>Cash on Delivery</span>
                  <span>💵</span>
                </div>

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
              disabled={!isFormValid || loading || orderItems.length === 0}
              className="place-order-btn"
            >
              {loading ? "Processing..." : `Pay ₹ ${totals.total.toLocaleString()}`}
            </button>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;