import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";

// 1. Define initialState outside the component so it's globally accessible
const initialState = {
  clientName: '', // Changed from 'name'
  size: 'M',
  color: '',      // Changed from 'shirtColor' to match name="color"
  message: ''     // Changed from 'text' to match name="message"
};

const images = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
  "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=800",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800"
];

const CustomShirtForm = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState(initialState);

  // Background Rotation Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialState); // Now this will work!
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://vulps-fashion-store.onrender.com/api/custom-products", // SAME PC
      // "http://10.191.17.135:8080/api/custom-products", // OTHER PCs
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Saved successfully:", response.data);
    alert("Design submitted successfully!");
    setFormData(initialState);

  } catch (error) {
    console.error("Error saving design:", error);
    alert("Server error. Please try again.");
  }
};

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gradient-to-br from-[#6a82fb] to-[#fc5c7d] p-4 font-sans">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-white/20 p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md text-white"
      >
        
       

        {/* Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${images[index]})` }}
            />
          </AnimatePresence>
        </div>

        {/* Form Content */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Custom Order </h2>
            
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 ml-1 opacity-70">Client Name</label>
              <input 
                type="text" name="clientName" value={formData.clientName} required
                placeholder="Full Name"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 outline-none transition-all placeholder:text-white/30"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 ml-1 opacity-70">Size</label>
                <select 
                  name="size" value={formData.size}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none appearance-none cursor-pointer"
                  onChange={handleChange}
                >
                  {['M', 'L', 'XL', 'XXL'].map(s => <option key={s} value={s} className="text-black">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 ml-1 opacity-70">Color Preference</label>
                <input 
                  type="text" name="color" value={formData.color} required
                  placeholder="e.g. Navy Blue"
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none placeholder:text-white/30"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 ml-1 opacity-70">Print Message</label>
              <textarea 
                name="message" value={formData.message} rows="2"
                placeholder="Write your text here..."
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none resize-none placeholder:text-white/30"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-white/90 text-indigo-900 font-extrabold rounded-full shadow-xl transition-colors"
              >
                SUBMIT DESIGN
              </motion.button>
              
              <button 
                type="button"
                onClick={handleReset}
                className="text-white/40 text-[10px] uppercase font-bold tracking-tighter hover:text-white transition-colors py-2"
              >
                Reset Information
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomShirtForm;