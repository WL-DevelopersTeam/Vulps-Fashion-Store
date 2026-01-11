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

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://vulps-fashion-store.onrender.com/api/products/${id}`
      );

      setProduct(res.data);

      // set defaults
      setSelectedSize(res.data.sizes?.[0] || "");
      setSelectedColor(res.data.colors?.[0] || "");
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
  navigate("/checkout", {
    state: {
      productId: product.id,
      productName: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    }
  });
};


  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
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
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT SIDE - IMAGE */}
        <div className="flex justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>

          <p className="text-2xl font-extrabold mb-4">
            ₹ {product.price}
          </p>

          <p className="text-gray-700 mb-6">
            {product.description}
          </p>

          {/* SIZE */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg
                      ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "hover:bg-black hover:text-white"
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
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`w-8 h-8 rounded-full border-2
                      ${
                        selectedColor === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 border rounded text-xl"
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-3 py-1 border rounded text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-[#ff0062] transition">
              Add to Cart
            </button>

            <button
                    onClick={handleBuyNow}
                    className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-black transition"
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
