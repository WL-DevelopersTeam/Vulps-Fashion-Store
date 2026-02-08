import React from "react";
import Navigation from "../components/Navigation";

export default function ShopLayout({ children }) {
  return (
    /* Apply 'bg-mesh' here so it affects all shop pages */
    <div className="bg-mesh min-h-screen text-white">
      <Navigation />
      {/* 80px padding top ensures content starts below the fixed navbar */}
      <main className="pt-[80px]">
        {children}
      </main>
    </div>
  );
}