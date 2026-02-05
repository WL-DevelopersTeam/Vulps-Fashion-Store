import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  // 🔹 Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      <NavLink to="/admin" end>Dashboard</NavLink>
      <NavLink to="/admin/orders">Orders</NavLink>
      <NavLink to="/admin/products">Products</NavLink>
      <NavLink to="/admin/custom-orders">Custom Orders</NavLink>

      {/* 🔹 USER DASHBOARD BUTTON (ADMIN ONLY) */}
      {user?.role === "ADMIN" && (
        <button
          className="user-dashboard-btn"
          onClick={() => navigate("/")}
        >
          User Dashboard
        </button>
      )}
    </div>
  );
}
