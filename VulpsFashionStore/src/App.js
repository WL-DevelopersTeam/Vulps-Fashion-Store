import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

/* ---------- COMMON ---------- */
import Navigation from "./components/Navigation";
import "./App.css";

/* ---------- FRONTEND ---------- */
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Blog from "./components/Blog";
import SuccessStories from "./components/SuccessStories";
import CustomShirtForm from "./components/CustomShirtForm";
import AdressForm from "./components/AdressForm";
import ProductDetails from "./pages/ProductDetails";

/* ---------- ADMIN ---------- */
import AdminLayout from "./layouts/AdminLayout";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import OrderDetails from "./pages/OrderDetails";
import CustomOrders from "./pages/CustomOrders";

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/successstories" element={<SuccessStories />} />
        <Route path="/customshirtform" element={<CustomShirtForm />} />
        <Route path="/adressform" element={<AdressForm />} />

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
