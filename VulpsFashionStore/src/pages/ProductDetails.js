import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams(); // 👈 product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (err) {
      console.error("Failed to load product", err);
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

  if (!product) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT: IMAGE */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* RIGHT: DETAILS */}
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
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border rounded-lg hover:bg-black hover:text-white"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-[#ff0062] transition">
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
