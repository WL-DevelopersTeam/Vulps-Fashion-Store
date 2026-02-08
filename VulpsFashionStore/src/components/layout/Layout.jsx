import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#000] text-white">
      {/* Universal Minimal Header */}
      <header className="border-b border-white/10 py-5 px-6 md:px-12 bg-[#000]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          
          
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-zinc-600 text-[10px] tracking-widest uppercase">
        © 2026 CLOVRA Fashion Store. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;