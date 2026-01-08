// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navigation from './components/Navigation';
// import Home from './components/Home';
// import Cart from './components/Cart';
// import Wishlist from './components/Wishlist';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// // Import the new components
// import About from './components/About';
// import Blog from './components/Blog';
// // import Shop from './components/Shop';
// import SuccessStories from './components/SuccessStories';
// import CustomShirtForm from './components/CustomShirtForm';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navigation />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />

//           {/* Added new routes */}
//           <Route path="/about" element={<About />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/shop" element={<Shop />} />
//           <Route path="/successstories" element={<SuccessStories />} />
//           <Route path="/customshirtform" element={<CustomShirtForm />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }


//////////////////////////////////////-------------------------------

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/Orders";
// import Products from "./pages/Products";
// import OrderDetails from "./pages/OrderDetails";



// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/admin" element={<Dashboard />} />
//         <Route path="/admin/orders" element={<Orders />} />
//         <Route path="/admin/products" element={<Products />} />
//         <Route path="/admin/orders/:id" element={<OrderDetails />} />


//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

///////////////////////////////////////////////////////////////---------------------------------------




// import { BrowserRouter, Routes, Route } from "react-router-dom";

// /* ---------- FRONTEND ---------- */
// import Navigation from "./components/Navigation";
// import Home from "./components/Home";
// import Cart from "./components/Cart";
// import Wishlist from "./components/Wishlist";
// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
// import About from "./components/About";
// import Blog from "./components/Blog";
// import Shop from "./components/Shop";
// import SuccessStories from "./components/SuccessStories";
// import CustomShirtForm from "./components/CustomShirtForm";

// /* ---------- ADMIN ---------- */
// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/Orders";
// import Products from "./pages/Products";
// import OrderDetails from "./pages/OrderDetails";

// function App() {
//   return (
//     <BrowserRouter>

//       {/* FRONTEND NAVBAR ONLY FOR USER */}
//       <Navigation />

//       <Routes>

//         {/* ---------- USER WEBSITE ---------- */}
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/successstories" element={<SuccessStories />} />
//         <Route path="/customshirtform" element={<CustomShirtForm />} />

//         {/* ---------- ADMIN PANEL ---------- */}
//         <Route path="/admin" element={<Dashboard />} />
//         <Route path="/admin/orders" element={<Orders />} />
//         <Route path="/admin/products" element={<Products />} />
//         <Route path="/admin/orders/:id" element={<OrderDetails />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
//////////////////////////////////////////////////////////////////////---------------------------




// import { BrowserRouter, Routes, Route } from "react-router-dom";

// /* Frontend */
// import FrontendLayout from "./layouts/FrontendLayout";
// import Home from "./components/Home";
// import Shop from "./components/Shop";
// import Blog from "./components/Blog";

// /* Admin */
// import AdminLayout from "./layouts/AdminLayout";
// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/Orders";
// import Products from "./pages/Products";
// import OrderDetails from "./pages/OrderDetails";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* FRONTEND ROUTES */}
//         <Route
//           path="/"
//           element={
//             <FrontendLayout>
//               <Home />
//             </FrontendLayout>
//           }
//         />
//         <Route
//           path="/shop"
//           element={
//             <FrontendLayout>
//               <Shop />
//             </FrontendLayout>
//           }
//         />
//         <Route
//           path="/blog"
//           element={
//             <FrontendLayout>
//               <Blog />
//             </FrontendLayout>
//           }
//         />

//         {/* ADMIN ROUTES */}
//         <Route
//           path="/admin"
//           element={
//             <AdminLayout>
//               <Dashboard />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path="/admin/orders"
//           element={
//             <AdminLayout>
//               <Orders />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path="/admin/products"
//           element={
//             <AdminLayout>
//               <Products />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path="/admin/orders/:id"
//           element={
//             <AdminLayout>
//               <OrderDetails />
//             </AdminLayout>
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navigation from "./components/Navigation";

/* Frontend */
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
// import Wishlist from './components/Wishlist';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
// Import the new components
import About from './components/About';
import Blog from './components/Blog';
// import Shop from './components/Shop';
import SuccessStories from './components/SuccessStories';
import CustomShirtForm from './components/CustomShirtForm';
 import AdressForm from './components/AdressForm';
import './App.css';

/* Admin */
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import OrderDetails from "./pages/OrderDetails";
// import AddressForm from "./components/AdressForm";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

import CustomOrders from "./pages/CustomOrders";



function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navigation />}

      <Routes>
        {/* FRONTEND */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />

        {/* ADMIN */}
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

        <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/wishlist" element={<Wishlist />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Added new routes */}
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/successstories" element={<SuccessStories />} />
          <Route path="/customshirtform" element={<CustomShirtForm />} />
          <Route path="/AdressForm" element={<AdressForm />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}