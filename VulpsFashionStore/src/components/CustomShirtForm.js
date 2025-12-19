import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomShirtForm = () => {
  const navigate = useNavigate();
  
  // Initial state for easy resetting
  const initialState = {
    name: '',
    size: 'M',
    placement: 'Front Side',
    shirtColor: '', // Text input for color
    text: ''
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Submission:', formData);
    alert('Design Submitted successfully!');
  };

  return (
    // pt-24 ensures the form starts below a standard navbar height
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gradient-to-br from-[#6a82fb] to-[#fc5c7d] p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl w-full max-w-md text-white">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Design Form ✨</h2>
          <p className="text-white/70 text-sm mt-2">Enter your custom details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              placeholder="e.g. Alex Smith"
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none transition-all placeholder-white/40"
              onChange={handleChange}
            />
          </div>

          {/* Size Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Size</label>
            <div className="flex gap-2">
              {['M', 'L', 'XL', 'XXL'].map(s => (
                <button 
                  type="button"
                  key={s} 
                  onClick={() => setFormData({...formData, size: s})}
                  className={`flex-1 py-2 rounded-lg border transition-all ${formData.size === s ? 'bg-white text-indigo-600 font-bold' : 'border-white/20 hover:bg-white/10'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Placement */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Print Placement</label>
            <select 
              name="placement" 
              value={formData.placement}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 outline-none appearance-none cursor-pointer"
            >
              <option value="Front Side" className="text-black">Front Side</option>
              <option value="Back Side" className="text-black">Back Side</option>
            </select>
          </div>

          {/* Color Input (Text based) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Color (Name or Hex)</label>
            <input 
              type="text" 
              name="shirtColor" 
              value={formData.shirtColor}
              placeholder="e.g. Royal Blue or #0000FF"
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none transition-all placeholder-white/40"
              onChange={handleChange}
            />
          </div>

          {/* Custom Text */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Text on Shirt</label>
            <textarea 
              name="text" 
              value={formData.text}
              rows="2" 
              placeholder="Your custom message..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none resize-none placeholder-white/40"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit"
              className="w-full py-4 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:shadow-white/20 hover:scale-[1.02] transition-all"
            >
              Submit Design
            </button>
            
            <button 
              type="button"
              onClick={handleReset}
              className="w-full py-3 bg-transparent border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomShirtForm;