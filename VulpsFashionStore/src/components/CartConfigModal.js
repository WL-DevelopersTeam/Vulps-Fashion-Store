import { useState, useEffect } from "react";
import Loader from "./Loader";
import { cn } from "../lib/utils";

const COLOR_MAP = {
  Black: "#000000",
  White: "#ffffff",
  Red: "#ef4444",
  Blue: "#3b82f6",
  Green: "#22c55e",
  Yellow: "#eab308",
  Purple: "#a855f7",
  Gray: "#9ca3af",
};

const SIZE_SET = ["XS", "S", "M", "L", "XL", "XXL"];

export default function CartConfigModal({
  product,
  onClose,
  onConfirm,
  loading,
}) {
  /* ---------------- SAFE NORMALIZATION ---------------- */

  const rawSizes = Array.isArray(product?.sizes) ? product.sizes : [];
  const rawColors = Array.isArray(product?.colors) ? product.colors : [];

  // Detect swapped data
  const sizes = rawSizes.every((v) => SIZE_SET.includes(v))
    ? rawSizes
    : rawColors.filter((v) => SIZE_SET.includes(v));

  const colors = rawColors.some((v) => SIZE_SET.includes(v))
    ? rawSizes.filter((v) => !SIZE_SET.includes(v))
    : rawColors;

  /* ---------------- STATE ---------------- */

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  /* ---------------- DEFAULTS ---------------- */

  useEffect(() => {
    if (sizes.length > 0) setSelectedSize(sizes[0]);
    if (colors.length > 0) setSelectedColor(colors[0]);
  }, [product]);

  /* ---------------- UI ---------------- */

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Configure your product
        </h2>

        <div className="flex gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-40 h-56 object-cover rounded"
          />

          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-xl font-bold">₹ {product.price}</p>

            {/* SIZE */}
            {sizes.length > 0 && (
              <div>
                <p className="font-medium mb-2">Size</p>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={cn(
                        "w-10 h-10 border rounded",
                        selectedSize === s
                          ? "bg-black text-white"
                          : "border-gray-300"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* COLOR */}
            {colors.length > 0 && (
              <div>
                <p className="font-medium mb-2">Color</p>
                <div className="flex gap-3">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        selectedColor === c
                          ? "border-black scale-110"
                          : "border-gray-300"
                      )}
                      style={{
                        backgroundColor:
                          COLOR_MAP[c] || c.toLowerCase(),
                      }}
                      title={c}
                    >
                      {selectedColor === c && (
                        <span className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div>
              <p className="font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="border px-3 py-1"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="border px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <span className="text-lg font-semibold">
            Total: ₹ {product.price * quantity}
          </span>

          <button
            onClick={() =>
              onConfirm({
                product,
                size: selectedSize,
                color: selectedColor,
                quantity,
              })
            }
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded"
          >
            {loading ? <Loader /> : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
