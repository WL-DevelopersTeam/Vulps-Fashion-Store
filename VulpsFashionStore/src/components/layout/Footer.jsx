import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  // Animation variant for the icons
  const iconVariants = {
    hover: { 
      scale: 1.1, 
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <footer className="bg-[#0a0f1c] text-white py-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Row: Brand, Nav, and Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          
          {/* Logo / Brand */}
          <div className="text-left w-full md:w-auto">
            <h3 className="text-2xl font-bold tracking-tight uppercase italic">
              Clovra<span className="text-red-600">.</span>
            </h3>
            <p className="text-gray-400 text-xs mt-1">Elevating your style, every day.</p>
          </div>

          {/* Minimal Menu */}
          <ul className="flex items-center gap-8 text-sm text-gray-300">
            <li className="hover:text-white transition-colors"><Link to="/">Home</Link></li>
            <li className="hover:text-white transition-colors"><Link to="/About">About</Link></li>
            <li className="hover:text-white transition-colors"><Link to="/Blog">Blog</Link></li>
            <li className="hover:text-white transition-colors"><a href="#contact">Contact</a></li>
          </ul>

          {/* Animated Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { Icon: Instagram, href: "#", color: "hover:text-pink-500" },
              { Icon: Facebook, href: "#", color: "hover:text-blue-500" },
              { Icon: MessageCircle, href: "#", color: "hover:text-green-500" }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className={`p-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transition-colors ${item.color}`}
              >
                <item.Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
            <p style={{ color: 'white', fontWeight: 'revert' ,fontSize: '11px'}}>ADDERSS - PATNA CITY ,BIHAR - 800001.</p> <br />
                         <p style={{ color: 'white', fontWeight: 'revert' ,fontSize: '11px'}}>CONTACT - 9950309343.</p>
        {/* Divider Line */}
        <hr className="border-white/10 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] text-white-500 tracking-wide">
          <p>© {new Date().getFullYear()} CLOVRA. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a 
              href="https://wordlanetech.com/" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              WordLaneTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;