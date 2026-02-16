import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon } from './Icons';
import './Navigation.css';
import api from "../api/axios";

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0); 

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to fetch total items from API
  const fetchCartCount = async (userId) => {
    try {
      const res = await api.get(`/api/cart?userId=${userId}`);
      const totalItems = res.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Helper function to sync user data from localStorage
  const syncUserAuth = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchCartCount(storedUser.id);
    } else {
      setUser(null);
      setCartCount(0);
    }
  };

  useEffect(() => {
    // Initial sync on load
    syncUserAuth();

    // Listener for Cart updates
    const handleCartUpdate = () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser) fetchCartCount(currentUser.id);
    };

    // --- NEW LISTENER: Syncs Navbar immediately on Login/Logout ---
    const handleAuthChange = () => {
      syncUserAuth();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
    // Trigger signal so navbar updates to "Sign In" button immediately
    window.dispatchEvent(new Event('authChange'));
    
    setDropdownOpen(false);
    navigate('/signin');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">CLOVRA</span>
          <span className="logo-subtitle">fashion store</span>
        </Link>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
        </ul>

        <div className="nav-icons">
          <button className="nav-icon-btn cart-ion-btn" onClick={() => navigate('/cart')}>
            <CartIcon className="icon-svg" />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>

          {user ? (
            <div className="user-dropdown-wrapper" ref={dropdownRef}>
              <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
              </button>
              {dropdownOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Profile</Link>
                  <Link to="/my-orders" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Orders</Link>
                  {user.role === "ADMIN" && (
                    <Link to="/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
                  )}
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button className="sign-in-btn" onClick={() => navigate('/signin')}>Sign In</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;