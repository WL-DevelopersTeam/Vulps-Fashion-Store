import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon } from './Icons';
import './Navigation.css';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();
  const [cartCount] = useState(2);

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
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
    setUser(null);
    setDropdownOpen(false);
    navigate('/signin');
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="logo">
            <span className="logo-text">CLOVRA</span>
            <span className="logo-subtitle">fashion store</span>
          </Link>

          {/* Hamburger Menu Icon */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
          </button>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
             <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            {/* <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>  */}
          </ul>

          <div className="nav-icons">
            <button
              className="nav-icon-btn cart-ion-btn"
              onClick={() => navigate('/cart')}
              title="Shopping Cart"
            >
              <CartIcon className="icon-svg" />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>

           {user ? (
  <div className="user-dropdown-wrapper" ref={dropdownRef}>
    <button
      className="user-btn"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      {/* Circle with first letter ONLY */}
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
    </button>

    {dropdownOpen && (
      <div className="user-dropdown">
        <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Profile</Link>
        <Link to="/my-orders" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Orders</Link>
        {user?.role === "ADMIN" && (
            <button
              className="admin-dashboard-btn"
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
            </button>
          )}

        <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    )}
  </div>
) : (
              <button
                className="sign-in-btn"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

     
    </>
  );
}

export default Navigation;