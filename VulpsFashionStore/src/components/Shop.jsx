import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./layout/Layout";
import { cn } from "../lib/utils";
import { Grid, List, Search } from "lucide-react";

const categories = ["All Products", "Men", "Women", "Kids"];
const colors = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
];
const sizes = ["S", "M", "L", "XL"];

const CATEGORY_API_MAP = {
  "All Products": null,
  "Men": "Mens",
  "Women": "Women",
  "Kids": "Kids",
};


const Shop = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

 useEffect(() => {
  fetchProducts(selectedCategory, selectedColor);
}, [selectedCategory, selectedColor]);

;

  const fetchProducts = async (category, color) => {
  try {
    let url = "https://vulps-fashion-store.onrender.com/api/products";

    // CATEGORY FILTER
    if (category && category !== "All Products") {
      const apiCategory = CATEGORY_API_MAP[category];
      url = `https://vulps-fashion-store.onrender.com/api/products/category/${apiCategory}`;
    }

    // COLOR FILTER (overrides category if selected)
    if (color) {
      url = `https://vulps-fashion-store.onrender.com/api/products/color/${color}`;
    }

    const res = await axios.get(url);

    const mappedProducts = res.data.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      colors: p.colors,
      sizes: p.sizes,
      image: `https://vulps-fashion-store.onrender.com${p.imageUrl}`,
    }));

    setProducts(mappedProducts);
    setPage(1);
  } catch (err) {
    console.error("Failed to fetch products", err);
  }
};


  // Add to cart with login check
  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user")); // check login
    if (!user) {
      navigate("/signin"); // redirect to login page if not logged in
      return;
    }

    try {
      const requestBody = {
        productId: product.id,
        size: product.sizes[0] || "M",
        color: product.colors[0] || "Red",
        quantity: 1,
      };

      await axios.post(
        `https://vulps-fashion-store.onrender.com/api/cart/add?userId=${user.id}`,
        requestBody
      );

      alert("Product added to cart!");
    } catch (err) {
      console.error("Failed to add product to cart", err);
    }
  };

  // Filtering products
  const filteredProducts = products
    .filter((product) =>
      !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    .filter(
      (product) =>
        selectedSizes.length === 0 ||
        product.sizes?.some((s) => selectedSizes.includes(s))
    );

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Layout>
      <div className="h-48 bg-gradient-to-r from-muted to-background flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold">Shop</h1>
      </div>

      <div className="container mx-auto py-8 flex gap-8">
        <aside className="w-60 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            {categories.map((cat) => (
              <button
  key={cat}
  onClick={() => setSelectedCategory(cat)}
  className={cn(
    "block w-full text-left py-1 text-sm hover:text-primary",
    selectedCategory === cat && "font-bold text-primary"
  )}
>
  {cat}
</button>

            ))}
          </div>

          <div>
  <h3 className="font-semibold mb-2">Colors</h3>

  <div className="flex flex-wrap gap-2">
    {colors.map((c) => (
  <button
    key={c.name}
    onClick={() => setSelectedColor(c.value)} // ✅ FIXED
    className="w-6 h-6 rounded-full"
    style={{ backgroundColor: c.value }}
    title={c.name}
  />
))}

  </div>

  {/* ✅ CLEAR COLOR FILTER BUTTON */}
  {selectedColor && (
    <button
      onClick={() => setSelectedColor(null)}
      className="text-xs underline mt-2 text-gray-600 hover:text-black"
    >
      Clear Color Filter
    </button>
  )}
</div>


          <div>
            <h3 className="font-semibold mb-2">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSizes([s])}
                  className="border px-2 py-1 text-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="border px-3 py-2"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border px-2 py-1"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>

              <button onClick={() => setViewMode("grid")}>
                <Grid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode("list")}>
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className={cn(
              "grid gap-6",
              viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 flex flex-col justify-between hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <div className="mt-3">
                  <h3 className="font-semibold">{product.name}</h3>
                  <span className="text-lg font-bold">
                    ₹ {product.price.toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center gap-2 border-2 border-[#d59f35] text-[#00053f] font-bold py-2 text-sm rounded-xl bg-white transition-all duration-300 ease-in-out hover:bg-[#26ffb6] hover:scale-[1.03] hover:shadow-md active:scale-95"
                  >
                    Add to Cart
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-[#d59f35] text-black font-bold py-2 text-sm rounded-xl transition-all duration-300 ease-in-out hover:bg-[#ff0062] hover:text-white hover:scale-[1.03] hover:shadow-lg active:scale-95">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={cn(
                  "px-3 py-1 border",
                  page === i + 1 && "bg-gray-200"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
