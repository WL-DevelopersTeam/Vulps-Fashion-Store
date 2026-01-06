import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./layout/Layout";
import { cn } from "../lib/utils";
import { Search } from "lucide-react";
import Loader from "../components/Loader";
import CartConfigModal from "../components/CartConfigModal";

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
  const [loadingProducts, setLoadingProducts] = useState(false);
const [addingToCartId, setAddingToCartId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);


    const confirmAddToCart = async ({ product, size, color, quantity }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/signin");
    return;
  }

  try {
    setAddingToCartId(product.id);

    await axios.post(
      `https://vulps-fashion-store.onrender.com/api/cart/add?userId=${user.id}`,
      {
        productId: product.id,
        size,
        color,
        quantity,
      }
    );

    setShowCartModal(false);
    navigate("/cart");
  } catch (err) {
    console.error(err);
  } finally {
    setAddingToCartId(null);
  }
};


            useEffect(() => {
        setSelectedColor(null);     // ✅ reset color
        setSelectedSizes([]);       // ✅ reset sizes
        setPage(1);                 // ✅ reset pagination
        fetchProducts(selectedCategory);
      }, [selectedCategory]);

      useEffect(() => {
  setPage(1);
}, [selectedColor, selectedSizes, searchQuery]);


      const fetchProducts = async (category) => {
        try {
          setLoadingProducts(true);

          let url = "https://vulps-fashion-store.onrender.com/api/products";

          if (category && category !== "All Products") {
            const apiCategory = CATEGORY_API_MAP[category];
            url = `https://vulps-fashion-store.onrender.com/api/products/category/${apiCategory}`;
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
            image: p.imageUrl,
          }));

          setProducts(mappedProducts);
          setPage(1);
        } catch (err) {
          console.error("Failed to fetch products", err);
        } finally {
          setLoadingProducts(false);
        }
      };



  // Add to cart with login check
// const addToCart = async (product) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user) {
//     navigate("/signin");
//     return;
//   }

//   try {
//     setAddingToCartId(product.id);

//     const requestBody = {
//       productId: product.id,
//       size: product.sizes[0] || "M",
//       color: product.colors[0] || "Red",
//       quantity: 1,
//     };

//     await axios.post(
//       `https://vulps-fashion-store.onrender.com/api/cart/add?userId=${user.id}`,
//       requestBody
//     );

//     alert("Product added to cart!");
//   } catch (err) {
//     console.error("Failed to add product to cart", err);
//   } finally {
//     setAddingToCartId(null);
//   }
// };


  // Filtering products
  const filteredProducts = products
  // 🔍 SEARCH
  .filter(
    (product) =>
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 🎨 COLOR
  .filter(
    (product) =>
      !selectedColor ||
      product.colors?.some(
        (c) => c.toLowerCase() === selectedColor.toLowerCase()
      )
  )

  // 📏 SIZE
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

                  <div className="flex gap-3 flex-wrap">
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setSelectedColor(c.value)}
                        className={cn(
                          "w-7 h-7 rounded-full border-2",
                          selectedColor === c.value ? "border-black scale-110" : "border-gray-300"
                        )}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    ))}
            </div>

                  {selectedColor && (
                    <button
                      onClick={() => setSelectedColor(null)}
                      className="text-xs underline mt-2 text-gray-600"
                    >
                      Clear Color
                    </button>
                  )}
                </div>




          <div>
            <h3 className="font-semibold mb-2">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() =>
  setSelectedSizes((prev) =>
    prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
  )
}

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

            {/* <div className="flex items-center gap-3">
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
            </div> */}
          </div>

            
          {loadingProducts ? (
  <div className="flex justify-center items-center h-64">
    <Loader />
  </div>
) : (
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

        <div className="mt-3 space-y-1">
          <h3 className="font-semibold">{product.name}</h3>

          {/* CATEGORY */}
          <p className="text-xs text-gray-500">
            Category:{" "}
            <span className="font-medium">{product.category}</span>
          </p>

          {/* SIZES */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="border px-2 py-0.5 text-xs rounded bg-gray-100"
                >
                  {size}
                </span>
              ))}
            </div>
          )}

          <span className="block text-lg font-bold mt-2">
            ₹ {product.price.toLocaleString()}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
                                setSelectedProduct(product);
                                setShowCartModal(true);
                    }}

            disabled={addingToCartId === product.id}
            className="flex items-center justify-center gap-2 border-2 border-[#d59f35] text-[#00053f] font-bold py-2 text-sm rounded-xl bg-white transition-all duration-300 ease-in-out hover:bg-[#26ffb6] hover:scale-[1.03] hover:shadow-md active:scale-95 disabled:opacity-50"
          >
            {addingToCartId === product.id ? <Loader /> : "Add to Cart"}
          </button>

          <button className="flex items-center justify-center gap-2 bg-[#d59f35] text-black font-bold py-2 text-sm rounded-xl transition-all duration-300 ease-in-out hover:bg-[#ff0062] hover:text-white hover:scale-[1.03] hover:shadow-lg active:scale-95">
            Buy Now
          </button>
        </div>
      </div>
    ))}
  </div>
)}


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
      {showCartModal && selectedProduct && (
  <CartConfigModal
    product={selectedProduct}
    loading={addingToCartId === selectedProduct.id}
    onClose={() => setShowCartModal(false)}
    onConfirm={confirmAddToCart}
  />
)}

    </Layout>
  );
};

export default Shop;
