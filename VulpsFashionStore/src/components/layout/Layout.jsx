// src/components/layout/Layout.jsx
import React from 'react';
// import Footer from '../Footer'; // Uncomment if you have a footer

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header is removed from here as requested */}
      
      <main className="flex-grow">
        {children}
      </main>

      {/* <Footer /> */} 
    </div>
  );
};

export default Layout;