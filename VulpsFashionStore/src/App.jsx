import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

/* ---------- COMMON ---------- */
/* Update your imports to include .jsx where necessary */
import Navigation from "./components/Navigation.jsx";
import Home from "./components/Home.jsx";
// ... repeat for all other components and pages
import "./App.css"; // Import global styles if needed

/* ---------- FRONTEND ---------- */

import Shop from "./components/Shop.jsx";
import Cart from "./components/Cart.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import About from "./components/About.jsx";
import Blog from "./components/Blog.jsx";
import SuccessStories from "./components/SuccessStories.jsx";
import CustomShirtForm from "./components/CustomShirtForm.jsx";
import AdressForm from "./components/AdressForm.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

/* ---------- ADMIN ---------- */
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminProtectedRoute from "./routes/AdminProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Orders from "./pages/AdminOrders.jsx";
import Products from "./pages/Products.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import CustomOrders from "./pages/CustomOrders.jsx";
import Checkout from "./pages/Checkout.jsx";
import CustomerProfile from "./pages/CustomerProfile";
import MyOrders from "./pages/MyOrders.jsx";
import AdminReturns from "./pages/admin/AdminReturns";

/* ---------- MAIN LAYOUT ---------- */
function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Navigation ONLY for frontend */}
      {!isAdminRoute && <Navigation />}

      <Routes>
        {/* ================= FRONTEND ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/successstories" element={<SuccessStories />} />
        <Route path="/customshirtform" element={<CustomShirtForm />} />
        <Route path="/adressform" element={<AdressForm />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/custom-orders"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <CustomOrders />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Orders />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Products />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <OrderDetails />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
            path="/admin/returns"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminReturns />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
      </Routes>
    </>
  );
}

/* ---------- APP ROOT ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
