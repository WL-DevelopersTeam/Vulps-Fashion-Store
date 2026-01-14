import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";

// Components
import Navigation from "../components/Navigation";
import Loader from "../components/Loader";
import CartConfigModal from "../components/CartConfigModal";

// Utils & Styles
import { cn } from "../lib/utils";
import './Shop.css'; // Ensure this contains the Updated CSS I gave you

const categories = ["All Products", "Men", "Women", "Kids"];
const colors = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
];

const CATEGORY_API_MAP = {
    "All Products": null,
    "Men": "Mens",
    "Women": "Women",
    "Kids": "Kids",
};

const Shop = () => {
    const navigate = useNavigate();

    // State
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [addingToCartId, setAddingToCartId] = useState(null);

    // --- LOGIC: Add to Cart ---
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
                { productId: product.id, size, color, quantity }
            );
            setShowCartModal(false);
            navigate("/cart");
        } catch (err) {
            console.error(err);
        } finally {
            setAddingToCartId(null);
        }
    };

    // --- LOGIC: Reset Filters ---
    const resetFilters = () => {
        setSelectedCategory("All Products");
        setSelectedColor(null);
        setSelectedSizes([]);
        setSearchQuery("");
        setPage(1);
    };

    // --- LOGIC: Fetch Data ---
    useEffect(() => {
        fetchProducts(selectedCategory, selectedColor);
    }, [selectedCategory, selectedColor]);

    const fetchProducts = async (category, color) => {
        try {
            setLoadingProducts(true);
            let url = "https://vulps-fashion-store.onrender.com/api/products";
            if (category && category !== "All Products") {
                const apiCategory = CATEGORY_API_MAP[category];
                url = `https://vulps-fashion-store.onrender.com/api/products/category/${apiCategory}`;
            }
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

    // --- LOGIC: Filtering & Pagination ---
    const filteredProducts = products
        .filter((product) => !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => selectedSizes.length === 0 || product.sizes?.some((s) => selectedSizes.includes(s)));

    const itemsPerPage = 12;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        // Use 'bg-mesh' class for the whole page background
        <div className="bg-mesh min-h-screen">
            <Navigation />

            {/* Padding Top to account for Fixed Navbar */}
            <main className="pt-[80px]">
                
                {/* Header - Removed specific white backgrounds, using Glass style */}
                <div className="h-32 md:h-48 flex items-center justify-center border-b border-white/10 backdrop-blur-sm">
                    <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white tracking-widest uppercase">
                        Shop <span className="text-[#d4af37]">Collection</span>
                    </h1>
                </div>

                <div className="container mx-auto py-8 px-4">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* --- SIDEBAR --- */}
                        <aside className="w-full lg:w-64 flex-shrink-0">
                            <div className="sticky top-[100px] space-y-6">

                                {/* Category Filter */}
                                <div className="filter-box">
                                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 opacity-70">Categories</h3>
                                    <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                // Used 'sidebar-item' class from CSS
                                                className={cn(
                                                    "sidebar-item text-left text-sm px-2 py-1 rounded transition-all",
                                                    selectedCategory === cat ? "text-[#d4af37] font-bold" : ""
                                                )}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Filter */}
                                <div className="filter-box hidden md:block">
                                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 opacity-70">Color Filter</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {colors.map((c) => (
                                            <button
                                                key={c.name}
                                                onClick={() => setSelectedColor(c.value)}
                                                className={cn(
                                                    "w-8 h-8 rounded-full border border-white/20 transition-transform hover:scale-110",
                                                    selectedColor === c.value ? "ring-2 ring-[#d4af37] scale-110" : ""
                                                )}
                                                style={{ backgroundColor: c.value }}
                                                title={c.name}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Size Filter */}
                                <div className="filter-box">
                                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 opacity-70">Select Size</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSizes([size])}
                                                // Used 'size-chip' and 'active-size' from CSS
                                                className={cn(
                                                    "size-chip",
                                                    selectedSizes.includes(size) ? "active-size" : ""
                                                )}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Reset Button */}
                                <button
                                    onClick={resetFilters}
                                    className="w-full py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-[#d4af37] transition-all text-xs uppercase tracking-widest"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </aside>

                        {/* --- PRODUCT GRID --- */}
                        <div className="flex-1 space-y-6">
                            
                            {/* Search Bar - Glass Style */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for items..."
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all"
                                />
                            </div>

                            {loadingProducts ? (
                                <div className="flex justify-center items-center h-64">
                                    <Loader />
                                </div>
                            ) : (
                                // Used 'product-grid' class from CSS
                                <div className="product-grid">
                                    {paginatedProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            // Used 'product-card-animated' and 'filter-box' for styling
                                            className="product-card-animated filter-box p-0 overflow-hidden cursor-pointer group flex flex-col h-full hover:border-[#d4af37]/50"
                                        >
                                            {/* Image Container */}
                                            <div className="relative aspect-[3/4] overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white text-xs font-bold shadow-lg">
                                                    ₹ {product.price.toLocaleString()}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 flex flex-col flex-1">
                                                <h3 className="font-playfair font-bold text-white text-lg mb-1">{product.name}</h3>
                                                <p className="text-gray-400 text-xs mb-4 line-clamp-2">{product.description}</p>

                                                <div className="mt-auto grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedProduct(product);
                                                            setShowCartModal(true);
                                                        }}
                                                        className="flex items-center justify-center bg-[#d4af37] text-black font-bold py-2 rounded-lg text-xs uppercase tracking-wider hover:bg-white transition-colors"
                                                    >
                                                        Add
                                                    </button>
                                                    <button className="flex items-center justify-center border border-white/20 text-white font-bold py-2 rounded-lg text-xs uppercase tracking-wider hover:bg-white/10 transition-colors">
                                                        Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="flex justify-center gap-2 py-10">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={cn(
                                            "w-10 h-10 rounded-lg border font-bold transition-all text-sm",
                                            page === i + 1
                                                ? "bg-[#d4af37] text-black border-[#d4af37]"
                                                : "bg-transparent border-white/10 text-gray-400 hover:border-white/30"
                                        )}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
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
            </main>
        </div>
    );
};

export default Shop;