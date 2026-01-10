import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: ""
  });

  // ✅ handle missing state safely
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      setOrderData(location.state);
    }
  }, [location, navigate]);

  if (!orderData) return null;

  const {
    productId,
    productName,
    price,
    imageUrl,
    size,
    color,
    quantity
  } = orderData;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    try {
      await axios.post(
        "https://vulps-fashion-store.onrender.com/api/orders",
        {
          productId,
          productName,
          price,
          size,
          color,
          quantity,
          ...form
        }
      );

      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">

        {/* PRODUCT SUMMARY */}
        <div className="border rounded-xl p-6">
          <img
            src={imageUrl}
            alt={productName}
            className="rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold">{productName}</h2>
          <p>Size: {size}</p>
          <p>Color: {color}</p>
          <p>Quantity: {quantity}</p>
          <p className="font-bold mt-2">
            ₹ {price * quantity}
          </p>
        </div>

        {/* CUSTOMER FORM */}
        <div className="border rounded-xl p-6 space-y-4">
          <input name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="mobile" placeholder="Mobile Number" onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full rounded" />
          <textarea name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="city" placeholder="City" onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-2 w-full rounded" />

          <button
            onClick={placeOrder}
            className="bg-black text-white w-full py-3 rounded-xl"
          >
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
