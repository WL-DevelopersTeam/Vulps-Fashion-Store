import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./layout/Layout";
import { cn } from "../lib/utils";
import { Grid, List, Search } from "lucide-react";
import './Shop.css';

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

    const resetFilters = () => {
        setSelectedCategory("All Products");
        setSelectedColor(null);
        setSelectedSizes([]);
        setSearchQuery("");
        setPage(1);
    };


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
                image: p.imageUrl,
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
            {/* Header: Responsive Height */}
            <div className="h-32 md:h-48 bg-gradient-to-r from-slate-50 to-slate-200 flex items-center justify-center border-b">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800">Shop</h1>
            </div>
            <div className="bg-mesh min-h-screen w-full">
                <div className="container mx-auto py-4 md:py-8 px-4">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* SIDEBAR: Horizontal Scroll on Mobile, Sticky Sidebar on Desktop */}
                        <aside className="w-full lg:w-64 flex-shrink-0">
                            <div className="sticky top-20 space-y-6">

                                {/* Categories: Row on Mobile, Column on Desktop */}
                                <div className="bg-white p-4 lg:p-6 rounded-2xl border shadow-sm">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4 hidden lg:block">Categories</h3>
                                    <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={cn(
                                                    "whitespace-nowrap px-4 py-2 rounded-xl text-sm transition-all duration-300",
                                                    selectedCategory === cat
                                                        ? "bg-[#1fc4e1] text-white font-bold shadow-md"
                                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                                )}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Filters: Grid on Mobile, Column on Desktop */}
                                <div className="bg-white p-4 lg:p-6 rounded-2xl border shadow-sm hidden md:block">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Color Filter</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {colors.map((c) => (
                                            <button
                                                key={c.name}
                                                onClick={() => setSelectedColor(c.value)}
                                                className={cn(
                                                    "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 active:scale-90",
                                                    selectedColor === c.value ? "border-black scale-110" : "border-transparent"
                                                )}
                                                style={{ backgroundColor: c.value }}
                                                title={c.name}
                                            />
                                        ))}

                                    </div>
                                </div>
                                <div className="filter-box p-6">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-black-400 mb-4 text-center">Select Size</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSizes([size])}
                                                className={cn(
                                                    "size-chip h-10 flex items-center justify-center rounded-xl text-xs font-black border border-slate-200 transition-all",
                                                    selectedSizes.includes(size) ? "active-size" : "bg-white/50 text-slate-600"
                                                )}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-6">
                                    <button
                                        onClick={resetFilters}
                                        className="w-full mt-4 py-3 rounded-xl bg-gray-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff0062] transition-all active:scale-95"
                                    >
                                        Reset Filters
                                    </button>
                                </div>

                            </div>
                        </aside>

                        {/* PRODUCT AREA */}
                        <div className="flex-1 space-y-6">
                            {/* Search Bar: Full Width */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1fc4e1] transition-colors" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for items..."
                                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#1fc4e1]/10 focus:border-[#1fc4e1] outline-none transition-all shadow-sm"
                                />
                            </div>

                            {/* The Animated Grid: 1 col mobile, 2 col tablet, 3-4 col desktop */}
                            <div
                                className={cn(
                                    "grid gap-4 md:gap-6",
                                    viewMode === "grid"
                                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                        : "grid-cols-1"
                                )}
                            >
                                {paginatedProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                        className="product-card-animated opacity-0 group bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                                    >
                                        <div className="relative aspect-square overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                                                ₹ {product.price.toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="font-bold text-gray-800 text-lg mb-4 line-clamp-1">{product.name}</h3>

                                            <div className="mt-auto grid grid-cols-2 gap-2">
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="flex items-center justify-center bg-[#1fc4e1] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-[#ff0062] transition-colors active:scale-95"
                                                >
                                                    Add
                                                </button>
                                                <button className="flex items-center justify-center bg-gray-900 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-[#ff0062] transition-colors active:scale-95">
                                                    Buy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination: Responsive sizing */}
                            <div className="flex justify-center gap-2 py-10">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={cn(
                                            "w-10 h-10 md:w-12 md:h-12 rounded-2xl border font-bold transition-all",
                                            page === i + 1
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-gray-400 hover:border-gray-300"
                                        )}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
