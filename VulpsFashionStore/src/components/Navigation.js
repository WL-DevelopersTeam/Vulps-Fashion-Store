import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon } from './Icons';
import '../App.css';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [cartCount] = useState(2);

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown if clicked outside
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
    navigate('/signin');
  };

  return (
    <>
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
          </ul>

          <div className="nav-icons">
            <button
              className="nav-icon-btn cart-icon-btn"
              onClick={() => navigate('/cart')}
              title="Shopping Cart"
            >
              <CartIcon className="icon-svg" />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>

            {/* User Button / Dropdown */}
            {user ? (
              <div className="user-dropdown-wrapper" ref={dropdownRef}>
                <button
                  className="user-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user.name} ⌄
                </button>
                {dropdownOpen && (
                  <div className="user-dropdown">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <Link to="/orders" className="dropdown-item">Orders</Link>
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

      {/* ----- CSS styles ----- */}
      <style>{`
        .user-dropdown-wrapper { position: relative; display: inline-block; }
        .user-btn {
          background-color: #00053f;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }
        .user-btn:hover { background-color: #d59f35; }
        .user-dropdown {
          position: absolute;
          right: 0;
          top: 120%;
          background: white;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          border-radius: 6px;
          min-width: 150px;
          z-index: 1000;
          overflow: hidden;
        }
        .dropdown-item {
          display: block;
          padding: 0.5rem 1rem;
          color: #00053f;
          text-decoration: none;
          cursor: pointer;
        }
        .dropdown-item:hover {
          background-color: #f0f0f0;
        }
        .logout-btn {
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
      `}</style>
    </>
  );
}

export default Navigation;
