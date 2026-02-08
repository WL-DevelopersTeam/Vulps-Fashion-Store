import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from "../api/axios"; 

const initialState = {
  clientName: '',
  size: 'M',
  color: '',
  message: ''
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
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setFormData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

<<<<<<< HEAD:VulpsFashionStore/src/components/CustomShirtForm.js
  try {
    const response = await api.post(
      "/api/custom-products",
      formData
    );

    console.log("Saved successfully:", response.data);
    alert("Design submitted successfully!");
    setFormData(initialState);

  } catch (error) {
    console.error("Error saving design:", error);
    alert("Server error. Please try again.");
  }
};
=======
    try {
      await axios.post(
        "https://vulps-fashion-store.onrender.com/api/custom-products",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setShowModal(true);
      setFormData(initialState);
    } catch (error) {
      console.error("Error saving design:", error);
      alert("Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
>>>>>>> 183ced6316916ca66f33d747a80246b4cc618e76:VulpsFashionStore/src/components/CustomShirtForm.jsx

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gradient-to-br from-[#6a82fb] to-[#fc5c7d] p-4 font-sans">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md text-white"
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
            <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">Custom Order</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 ml-1 opacity-70">Client Name</label>
              <input 
                type="text" name="clientName" value={formData.clientName} required
                placeholder="Full Name"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 outline-none transition-all"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 ml-1 opacity-70">Size</label>
                <select 
                  name="size" value={formData.size}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none cursor-pointer text-white"
                  onChange={handleChange}
                >
                  {['M', 'L', 'XL', 'XXL'].map(s => <option key={s} value={s} className="text-black">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 ml-1 opacity-70">Color</label>
                <input 
                  type="text" name="color" value={formData.color} required
                  placeholder="e.g. Navy Blue"
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 ml-1 opacity-70">Message</label>
              <textarea 
                name="message" value={formData.message} rows="2"
                placeholder="Design text..."
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none resize-none"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className={`w-full py-4 font-black rounded-full shadow-xl transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-white text-indigo-900'}`}
              >
                {isSubmitting ? "SENDING..." : "SUBMIT DESIGN"}
              </motion.button>
              
              <button 
                type="button" onClick={handleReset}
                className="text-white/40 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* 🔹 CUSTOM POPUP MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white text-indigo-900 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center z-10"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Success!</h3>
              <p className="text-gray-600 mb-6 text-sm font-medium">Your design has been received. Our team will contact you soon.</p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all"
              >
                GOT IT
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomShirtForm;