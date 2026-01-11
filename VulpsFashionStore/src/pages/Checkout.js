import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";

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

  if (!state) {
    return (
      <Layout>
        <div className="text-center py-20 text-gray-500">
          Invalid checkout session
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
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT - ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-5">
            Order Summary
          </h2>

          <div className="flex gap-4">
            <img
              src={state.image}
              alt={state.name}
              className="w-28 rounded-xl"
            />

            <div>
              <h3 className="font-semibold text-lg">
                {state.name}
              </h3>

              <p className="text-sm text-gray-500">
                Size: {state.size} | Color: {state.color}
              </p>

              <p className="mt-2 font-semibold">
                ₹ {state.price} × {state.quantity}
              </p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>
              ₹ {state.price * state.quantity}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            🚚 Free delivery in 4–6 working days
          </p>
        </div>

        {/* RIGHT - CUSTOMER DETAILS */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Shipping Details
          </h2>

          <input
            name="fullName"
            placeholder="Full Name"
            className="input"
            onChange={handleChange}
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            className="input"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email Address"
            className="input"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Address"
            className="input"
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            className="input"
            onChange={handleChange}
          />

          {/* PAYMENT METHOD */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">
              Payment Method
            </h3>

            <div className="space-y-3">
              {/* COD */}
              <div
                onClick={() => setPaymentMethod("COD")}
                className={`p-4 border rounded-xl cursor-pointer flex justify-between
                  ${
                    paymentMethod === "COD"
                      ? "border-black bg-gray-50"
                      : "hover:border-gray-400"
                  }`}
              >
                <span>Cash on Delivery</span>
                <span>💵</span>
              </div>

              {/* ONLINE */}
              <div
                onClick={() => setPaymentMethod("ONLINE")}
                className={`p-4 border rounded-xl cursor-pointer flex justify-between
                  ${
                    paymentMethod === "ONLINE"
                      ? "border-black bg-gray-50"
                      : "hover:border-gray-400"
                  }`}
              >
                <span>Online Payment</span>
                <span>💳</span>
              </div>
            </div>

            {paymentMethod === "ONLINE" && (
              <p className="text-sm text-gray-500 mt-2">
                Online payment integration coming soon
              </p>
            )}
          </div>

          {/* PLACE ORDER */}
          <button
            onClick={placeOrder}
            disabled={!isFormValid || loading}
            className={`w-full mt-6 py-3 rounded-xl text-white transition
              ${
                isFormValid
                  ? "bg-black hover:bg-[#ff0062]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
