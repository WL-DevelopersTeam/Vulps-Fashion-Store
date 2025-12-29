import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon, WishlistIcon } from './Icons';
import '../App.css';
// import './About.jsx';
// import './Blog.jsx';
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [cartCount] = useState(2); // This would come from context/state management
  const [wishlistCount] = useState(3); // This would come from context/state management

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">vulps</span>
          <span className="logo-subtitle">fashion store</span>
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/successstories">Success Stories</Link></li>
        </ul>

        <div className="nav-icons">
          {/* <button
            className="nav-icon-btn wishlist-icon-btn"
            onClick={() => navigate('/wishlist')}
            title="Wishlist"
            aria-label="Wishlist"
          >
            <WishlistIcon className="icon-svg" />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button> */}
          <button
            className="nav-icon-btn cart-icon-btn"
            onClick={() => navigate('/cart')}
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <CartIcon className="icon-svg" />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <button
            className="sign-in-btn"
            onClick={() => navigate('/signin')}
          >
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

