import { useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Men T-Shirt",
            price: 799,
            stock: 20,
            image: null,
        },
        {
            id: 2,
            name: "Women Dress",
            price: 1499,
            stock: 10,
            image: null,
        },
    ]);

    // Add / Edit product state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);

    // Latest product state
    const [latestName, setLatestName] = useState("");
    const [latestPrice, setLatestPrice] = useState("");
    const [latestStock, setLatestStock] = useState("");
    const [latestImage, setLatestImage] = useState(null);

    const addProduct = () => {
        if (!name || !price || !stock) return;

        setProducts([
            ...products,
            {
                id: Date.now(),
                name,
                price,
                stock,
                image,
            },
        ]);

        setName("");
        setPrice("");
        setStock("");
        setImage(null);
    };

    const addLatestProduct = () => {
        if (!latestName || !latestPrice || !latestStock) return;

        setProducts([
            {
                id: Date.now(),
                name: latestName,
                price: latestPrice,
                stock: latestStock,
                image: latestImage,
            },
            ...products, // add on top
        ]);

        setLatestName("");
        setLatestPrice("");
        setLatestStock("");
        setLatestImage(null);
    };

    const deleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const editProduct = (id) => {
        const product = products.find((p) => p.id === id);
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setImage(product.image);
        deleteProduct(id);
    };

    return (

            <div className="flex-1 p-6">
                <h1 className="text-2xl font-semibold mb-6">Products</h1>

                {/* Add / Edit Product */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <h2 className="font-semibold mb-4">Add / Edit Product</h2>

                    <div className="grid grid-cols-4 gap-4">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Product name"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            type="number"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="Stock"
                            type="number"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(URL.createObjectURL(e.target.files[0]))
                            }
                            className="border rounded px-3 py-2"
                        />
                    </div>

                    {image && (
                        <img
                            src={image}
                            alt="preview"
                            className="mt-4 h-24 rounded-lg object-cover"
                        />
                    )}

                    <button
                        onClick={addProduct}
                        className="mt-4 bg-black text-white px-4 py-2 rounded"
                    >
                        Save Product
                    </button>
                </div>

                {/* Add Latest Product */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <h2 className="font-semibold mb-4">Add Latest Product</h2>

                    <div className="grid grid-cols-4 gap-4">
                        <input
                            value={latestName}
                            onChange={(e) => setLatestName(e.target.value)}
                            placeholder="Latest product name"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            value={latestPrice}
                            onChange={(e) => setLatestPrice(e.target.value)}
                            placeholder="Price"
                            type="number"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            value={latestStock}
                            onChange={(e) => setLatestStock(e.target.value)}
                            placeholder="Stock"
                            type="number"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setLatestImage(URL.createObjectURL(e.target.files[0]))
                            }
                            className="border rounded px-3 py-2"
                        />
                    </div>

                    {latestImage && (
                        <img
                            src={latestImage}
                            alt="preview"
                            className="mt-4 h-24 rounded-lg object-cover"
                        />
                    )}

                    <button
                        onClick={addLatestProduct}
                        className="mt-4 bg-black text-white px-4 py-2 rounded"
                    >
                        Add Latest Product
                    </button>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="p-3 text-left">Image</th>
                                <th className="text-left">Product</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-t">
                                    <td className="p-3">
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-12 w-12 object-cover rounded"
                                            />
                                        )}
                                    </td>
                                    <td>{product.name}</td>
                                    <td className="text-center">₹{product.price}</td>
                                    <td className="text-center">{product.stock}</td>
                                    <td className="text-center space-x-3">
                                        <button
                                            onClick={() => editProduct(product.id)}
                                            className="text-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    );
}
