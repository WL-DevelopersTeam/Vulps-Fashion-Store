import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install lucide-react for icons
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for mobile toggle

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 🔹 MOBILE TOP BAR (Only visible on Mobile) */}
      <div className="mobile-header">
        <h2 className="logo">CLOVRA</h2>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 OVERLAY (Blurs background when menu is open on mobile) */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}

      {/* 🔹 SIDEBAR */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="logo pc-only">Admin Panel</h2>

        <nav className="nav-links">
          <NavLink to="/admin" end onClick={() => setIsOpen(false)}>Dashboard</NavLink>
          <NavLink to="/admin/orders" onClick={() => setIsOpen(false)}>Orders</NavLink>
          <NavLink to="/admin/products" onClick={() => setIsOpen(false)}>Products</NavLink>
          <NavLink to="/admin/custom-orders" onClick={() => setIsOpen(false)}>Custom Orders</NavLink>
          <NavLink to="/admin/returns" onClick={() => setIsOpen(false)}>Return Orders</NavLink>
          
        </nav>

        {user?.role === "ADMIN" && (
          <button
            className="user-dashboard-btn"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            User Dashboard
          </button>
        )}
      </div>
    </>
  );
}