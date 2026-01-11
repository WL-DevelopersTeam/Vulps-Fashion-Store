import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";


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

      const sizes = Array.isArray(data.sizes)
        ? data.sizes
        : JSON.parse(data.sizes || "[]");

      const colors = Array.isArray(data.colors)
        ? data.colors
        : JSON.parse(data.colors || "[]");

      setProduct({ ...data, sizes, colors });

      setSelectedSize(sizes[0] || "");
      setSelectedColor(colors[0] || "");
    } catch (err) {
      console.error("Failed to fetch product", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-20 text-gray-500">
          Product not found
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-14">

        {/* LEFT: PRODUCT IMAGE */}
        <div className="flex justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-lg rounded-3xl shadow-2xl"
          />
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div>
          {/* TITLE */}
          <h1 className="text-4xl font-extrabold mb-2">
            {product.name}
          </h1>

          {/* CATEGORY */}
          <p className="text-gray-500 mb-3">
            {product.category}
          </p>

          {/* RATING */}
          <div className="flex items-center gap-2 mb-4">
            ⭐⭐⭐⭐☆
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>

          {/* PRICE */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-black">
              ₹ {product.price}
            </span>
            <span className="ml-3 text-gray-400 line-through">
              ₹ {product.price + 300}
            </span>
            <span className="ml-3 text-green-600 font-semibold">
              30% OFF
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* HIGHLIGHTS */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Why you’ll love it</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✔ Premium cotton fabric</li>
              <li>✔ Soft, breathable & skin-friendly</li>
              <li>✔ Fade-resistant colors</li>
              <li>✔ Made in India 🇮🇳</li>
            </ul>
          </div>

          {/* SIZE */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Select Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-lg border font-medium
                      ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "hover:border-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COLOR */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Select Color</h3>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`w-10 h-10 rounded-full border-2
                      ${
                        selectedColor === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    style={{
                      backgroundColor:
                        colorMap[color.toLowerCase()] ||
                        color.toLowerCase(),
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="mb-8">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-3 py-1 border rounded text-lg"
              >
                −
              </button>
              <span className="font-semibold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* DELIVERY INFO */}
          <div className="mb-8 text-sm text-gray-600">
            🚚 Free delivery within 4–6 working days  
            <br />
            🔄 Easy 7-day return & exchange
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button className="bg-black text-white px-7 py-3 rounded-xl hover:bg-[#ff0062] transition">
              Add to Cart
            </button>

            <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.imageUrl,
                      size: selectedSize,
                      color: selectedColor,
                      quantity: quantity,
                    },
                  })
                }
                className="bg-gray-900 text-white px-7 py-3 rounded-xl hover:bg-black transition"
              >
                Buy Now
              </button>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
