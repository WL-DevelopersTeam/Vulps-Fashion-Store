import { useState } from "react";
import Layout from "./layout/Layout";
import {
    products,
    categories,
    colors,
    sizes,
} from "../data/product";
import { cn } from "../lib/utils";
import {
    ChevronDown,
    Grid,
    List,
    Search,
    X,
} from "lucide-react";

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("Featured");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    // Filtering Products
    const filteredProducts = products
        .filter((product) =>
        (!searchQuery ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .filter((product) =>
            selectedCategory === "All Products" ||
            product.category === selectedCategory
        )
        .filter((product) =>
            selectedColors.length ? selectedColors.includes(product.category) : true
        )
        .filter((product) =>
            selectedSizes.length ? selectedSizes.includes(product.category) : true
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
            {/* Search + Hero */}
            <div className="h-48 bg-gradient-to-r from-muted to-background flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-bold">Shop</h1>
            </div>

            <div className="container mx-auto py-8 flex gap-8">
                {/* Sidebar Filters */}
                <aside className="w-60 space-y-6">
                    {/* Categories */}
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

                    {/* Colors */}
                    <div>
                        <h3 className="font-semibold mb-2">Colors</h3>
                        <div className="flex flex-wrap gap-2">
                            {colors.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => setSelectedColors([c.name])}
                                    className="w-6 h-6 rounded-full"
                                    style={{ backgroundColor: c.value }}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Sizes */}
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

                {/* Product Area */}
                <div className="flex-1 space-y-6">
                    {/* Sort & Search Bar */}
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

                    {/* Products Grid */}
                    <div
                        className={cn(
                            "grid gap-6",
                            viewMode === "grid"
                                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                : "grid-cols-1"
                        )}
                    >
                        {/* {paginatedProducts.map((product) => (
                            <div key={product.id} className="border p-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <h3 className="mt-3 font-semibold">{product.name}</h3>
                                <div className="text-lg font-bold">
                                    ₹ {product.price.toLocaleString()}
                                </div>
                                {product.originalPrice && (
                                    <div className="text-sm line-through text-gray-500">
                                        ₹ {product.originalPrice.toLocaleString()}
                                    </div>
                                )}
                            </div>
                        ))} */}

                        {paginatedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border p-4 flex flex-col justify-between hover:shadow-lg transition"
                            >
                                {/* Image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded"
                                />

                                {/* Info */}
                                <div className="mt-3">
                                    <h3 className="font-semibold">{product.name}</h3>

                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-lg font-bold">
                                            ₹ {product.price.toLocaleString()}
                                        </span>

                                        {product.originalPrice && (
                                            <span className="text-sm line-through text-gray-500">
                                                ₹ {product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-4 grid grid-cols-2 gap-3">

                                    {/* Add to Cart */}
                                    <button
                                        onClick={() => console.log("Add to cart", product)}
                                        className="
      flex items-center justify-center gap-2
      border-2 border-[#d59f35]
      text-[#00053f] font-bold
      py-2 text-sm
      rounded-xl
      bg-white
      transition-all duration-300 ease-in-out
      hover:bg-[#26ffb6]
      hover:scale-[1.03]
      hover:shadow-md
      active:scale-95
    "
                                    >
                                        Add to Cart
                                    </button>

                                    {/* Buy Now */}
                                    <button
                                        onClick={() => console.log("Buy now", product)}
                                        className="
      flex items-center justify-center gap-2
      bg-[#d59f35]
      text-black font-bold
      py-2 text-sm
      rounded-xl
      transition-all duration-300 ease-in-out
      hover:bg-[#ff0062]
      hover:text-white
      hover:scale-[1.03]
      hover:shadow-lg
      active:scale-95
    "
                                    >
                                        Buy Now
                                    </button>

                                </div>



                            </div>
                        ))}

                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-3">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={cn("px-3 py-1 border", page === i + 1 && "bg-gray-200")}
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
