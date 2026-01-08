import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FrontendLayout from "../layouts/FrontendLayout";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams(); // product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

            useEffect(() => {
            const fetchProduct = async () => {
                try {
                setLoading(true);
                const res = await axios.get(
                    `https://vulps-fashion-store.onrender.com/api/products/${id}`
                );
                setProduct(res.data);
                setSelectedSize(res.data.sizes?.[0]);
                setSelectedColor(res.data.colors?.[0]);
                } catch (err) {
                console.error("Failed to load product", err);
                } finally {
                setLoading(false);
                }
            };

            fetchProduct();
            }, [id]);


  if (loading) {
    return (
      <FrontendLayout>
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </FrontendLayout>
    );
  }

  if (!product) return null;

  return (
    <FrontendLayout>
      <div className="container mx-auto py-10 grid md:grid-cols-2 gap-10">
        
        {/* LEFT: IMAGE */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-xl font-semibold text-gray-800">
            ₹ {product.price}
          </p>

          <p className="text-gray-600">{product.description}</p>

          {/* COLORS */}
          <div>
            <h3 className="font-semibold mb-1">Color</h3>
            <div className="flex gap-2">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border ${
                    selectedColor === color && "ring-2 ring-black"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <h3 className="font-semibold mb-1">Size</h3>
            <div className="flex gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1 ${
                    selectedSize === size && "bg-black text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-6">
            <button className="bg-black text-white px-6 py-3 rounded">
              Add to Cart
            </button>
            <button className="border px-6 py-3 rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
};

export default ProductDetails;
