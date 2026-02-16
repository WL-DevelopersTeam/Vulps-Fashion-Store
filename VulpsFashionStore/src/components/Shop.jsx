import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";
import api from "../api/axios";

// Components
import Layout from "../components/layout/Layout";
import Loader from "./Loader";
import CartConfigModal from "../components/CartConfigModal";

// Utils & Styles
import { cn } from "../lib/utils";
import './Shop.css'; 

const categories = ["All Products", "Men", "Women", "Kids"];
const colors = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    {name: "white", value: "white"},
    {name: "black", value: "black"},
    {name : "orange", value: "orange"}
];

const CATEGORY_API_MAP = {
    "All Products": null,
    "Men": "Mens",
    "Women": "Womens",
    "Kids": "Kids",
};

const Shop = () => {
    const navigate = useNavigate();

    // State
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [addingToCartId, setAddingToCartId] = useState(null);

    // --- FETCH DATA ---
    useEffect(() => {
        fetchProducts(selectedCategory, selectedColor);
    }, [selectedCategory, selectedColor]);

    const fetchProducts = async (category, color) => {
        try {
            setLoadingProducts(true);
            let url = "https://vulps-fashion-store.onrender.com/api/products";
            
            if (color) {
                url = `https://vulps-fashion-store.onrender.com/api/products/color/${color}`;
            } else if (category && category !== "All Products") {
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
                sizes: p.sizes, // Passing raw data to Modal for normalization
                image: p.imageUrl,
            }));
            setProducts(mappedProducts);
            setPage(1);
        } catch (err) {
            console.error("Failed to fetch products", err);
            setProducts([]);
        } finally {
            setLoadingProducts(false);
        }
    };

    // --- ADD TO CART (UPDATED WITH SYNC TRIGGER) ---
    const confirmAddToCart = async ({ product, size, color, quantity }) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/signin");
            return;
        }

        try {
            setAddingToCartId(product.id);

            await api.post(
                `/api/cart/add?userId=${user.id}`,
                { productId: product.id, size, color, quantity }
            );

            // SYNC: Shout to the Navigation component to refresh the badge!
            window.dispatchEvent(new Event('cartUpdated')); 

            setShowCartModal(false);
            // Optional: Redirect to cart or stay on shop
            navigate("/cart");

        } catch (err) {
            console.error("Failed to add to cart", err);
        } finally {
            setAddingToCartId(null);
        }
    };

    const resetFilters = () => {
        setSelectedCategory("All Products");
        setSelectedColor(null);
        setSelectedSizes([]);
        setSearchQuery("");
        setPage(1);
    };

    // --- FILTERING LOGIC ---
    const filteredProducts = products.filter((p) => {
        const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Fix: Robust array check
        const pSizes = Array.isArray(p.sizes) 
            ? p.sizes 
            : typeof p.sizes === 'string' 
            ? p.sizes.split(',').map(s => s.trim()) 
            : [];

        const matchesSize = selectedSizes.length === 0 || 
            pSizes.some((s) => selectedSizes.includes(s));

        return matchesSearch && matchesSize;
    });

    const itemsPerPage = 12;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Layout>
            <div className="bg-mesh min-h-screen">
                <div className="py-12 flex flex-col items-center justify-center border-b border-white/10 backdrop-blur-sm">
                    <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white tracking-widest uppercase text-center">
                        Shop <span className="text-[#d4af37]">Collection</span>
                    </h1>
                    <p className="text-gray-400 text-xs mt-2 tracking-[3px]">PREMIUM APPAREL</p>
                </div>

                <div className="container mx-auto py-8 px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* SIDEBAR */}
                        <aside className="w-full lg:w-64 flex-shrink-0">
                            <div className="sticky top-24 space-y-6">
                                <div className="filter-box p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#d4af37]">Categories</h3>
                                    <div className="flex lg:flex-col gap-2 overflow-x-auto">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => { setSelectedCategory(cat); setSelectedColor(null); }}
                                                className={cn(
                                                    "text-left text-sm px-3 py-2 rounded-lg transition-all",
                                                    selectedCategory === cat ? "bg-[#d4af37] text-black font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                                                )}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="filter-box p-4 bg-white/5 rounded-xl border border-white/10 hidden md:block">
                                    <h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#d4af37]">Color</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {colors.map((c) => (
                                            <button
                                                key={c.name}
                                                onClick={() => setSelectedColor(selectedColor === c.value ? null : c.value)}
                                                className={cn(
                                                    "w-8 h-8 rounded-full border border-white/20 transition-transform hover:scale-110",
                                                    selectedColor === c.value ? "ring-2 ring-[#d4af37] scale-110" : ""
                                                )}
                                                style={{ backgroundColor: c.value }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="filter-box p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#d4af37]">Size</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSizes(prev => prev.includes(size) ? [] : [size])}
                                                className={cn(
                                                    "py-2 text-xs border border-white/10 rounded-md transition-all",
                                                    selectedSizes.includes(size) ? "bg-white text-black border-white" : "text-gray-400 hover:border-[#d4af37]"
                                                )}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={resetFilters} className="w-full py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-[#d4af37] transition-all text-[10px] uppercase tracking-widest">
                                    Reset Filters
                                </button>
                            </div>
                        </aside>

                        {/* PRODUCT GRID */}
                        <div className="flex-1 space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-[#d4af37] transition-all"
                                />
                            </div>

                            {loadingProducts ? (
                                <div className="flex justify-center items-center h-64"><Loader /></div>
                            ) : paginatedProducts.length === 0 ? (
                                <div className="text-center py-20 text-gray-500">
                                    No products found matching your filters.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {paginatedProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="group bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-[#d4af37]/30 transition-all duration-500"
                                        >
                                            <div className="relative aspect-[3/4] overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[#d4af37] text-sm font-bold border border-white/10">
                                                    ₹{product.price.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-playfair font-bold text-white text-lg mb-1">{product.name}</h3>
                                                <p className="text-gray-500 text-xs line-clamp-2 mb-4">{product.description}</p>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedProduct(product);
                                                            setShowCartModal(true);
                                                        }}
                                                        className="bg-[#d4af37] text-black text-[10px] font-bold py-3 rounded-xl uppercase tracking-widest hover:bg-white transition-colors"
                                                    >
                                                        Add to Bag
                                                    </button>
                                                    <button 
                                                        onClick={() => navigate(`/product/${product.id}`)}
                                                        className="border border-white/10 text-white text-[10px] font-bold py-3 rounded-xl uppercase tracking-widest hover:bg-white/5 transition-colors"
                                                    >
                                                        Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
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
            </div>
        </Layout>
    );
};

export default Shop;