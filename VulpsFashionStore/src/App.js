import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
// Import the new components
import About from './components/About';
import Blog from './components/Blog';
import Shop from './components/Shop';
import SuccessStories from './components/SuccessStories';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Added new routes */}
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/successstories" element={<SuccessStories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;