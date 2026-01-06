import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      <NavLink to="/admin" end>Dashboard</NavLink>
      <NavLink to="/admin/orders">Orders</NavLink>
      <NavLink to="/admin/products">Products</NavLink>
      <NavLink to="/admin/custom-orders">Custom Orders</NavLink>
    </div>
  );
}
