import React from "react";
import { useState, useEffect } from "react";
import { X, Minus, Plus, Check } from "lucide-react"; 
import { cn } from "../lib/utils";
import Loader from "./Loader";

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
  // --- DATA NORMALIZATION ---
  const rawSizes = Array.isArray(product?.sizes) ? product.sizes : [];
  const rawColors = Array.isArray(product?.colors) ? product.colors : [];

  const sizes = rawSizes.every((v) => SIZE_SET.includes(v))
    ? rawSizes
    : rawColors.filter((v) => SIZE_SET.includes(v));

  const colors = rawColors.some((v) => SIZE_SET.includes(v))
    ? rawSizes.filter((v) => !SIZE_SET.includes(v))
    : rawColors;

  // --- STATE ---
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (sizes.length > 0) setSelectedSize(sizes[0]);
    if (colors.length > 0) setSelectedColor(colors[0]);
  }, [product]);

  return (
    // OVERLAY
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* MODAL BOX: Changed max-w-4xl to max-w-2xl for smaller size */}
      <div 
        className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 z-10 p-1.5 bg-black/60 rounded-full text-white/70 hover:text-white hover:bg-[#d4af37] transition-all"
        >
          <X size={18} />
        </button>

        {/* LEFT: Image (Reduced width on desktop) */}
        <div className="w-full md:w-5/12 bg-zinc-900 h-48 md:h-auto relative group">
          <img 
            src={product?.image} 
            alt={product?.name} 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* RIGHT: Form (Reduced padding) */}
        <div className="w-full md:w-7/12 p-5 flex flex-col gap-4">
          
          {/* Header */}
          <div>
            <h2 className="text-xl font-playfair font-bold text-white leading-tight">{product?.name}</h2>
            <p className="text-lg font-bold text-[#d4af37] mt-1">₹ {(product?.price * quantity).toLocaleString()}</p>
          </div>

          <div className="h-px bg-white/10 w-full" />

          {/* SCROLLABLE AREA for smaller screens if content is long */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[40vh] md:max-h-none pr-1 custom-scrollbar">
            
            {/* SIZE */}
            {sizes.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Size</span>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={cn(
                        "w-9 h-9 rounded-md border flex items-center justify-center text-xs font-bold transition-all",
                        selectedSize === s
                          ? "bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/50 hover:text-white"
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
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Color</span>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                        selectedColor === c
                          ? "border-[#d4af37] scale-110"
                          : "border-transparent hover:scale-105"
                      )}
                      style={{ backgroundColor: COLOR_MAP[c] || c.toLowerCase() }}
                      title={c}
                    >
                      {selectedColor === c && (
                        <Check size={14} className={['White', 'white', '#ffffff'].includes(c) ? 'text-black' : 'text-white'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Quantity</span>
              <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-md p-0.5">
                <button 
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-bold text-white text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-auto pt-2">
            <button 
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-white/10 text-gray-400 font-bold uppercase tracking-wider text-[10px] hover:bg-white/5 hover:text-white transition-all"
            >
              Cancel
            </button>
            
            <button
              onClick={() => onConfirm({ product, size: selectedSize, color: selectedColor, quantity })}
              disabled={loading}
              className="flex-[2] py-3 rounded-lg bg-[#d4af37] text-black font-bold uppercase tracking-wider text-[10px] hover:bg-white hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader /> : "Add to Cart"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}