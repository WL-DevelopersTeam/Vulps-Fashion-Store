import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon } from './Icons';
import '../App.css';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
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
            {/* <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li> */}
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
                    <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Profile</Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Orders</Link>
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

      <style>{`
        /* --- Existing Styles --- */
        .nav-container { display: flex; justify-content: space-between; align-items: center; padding: 1rem 5%; }
        .nav-menu { display: flex; list-style: none; gap: 2rem; }
        .nav-menu a { text-decoration: none; color: #333; font-weight: 500; }
        .nav-icons { display: flex; align-items: center; gap: 1rem; }

        /* --- Mobile Toggle Button --- */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 1001;
        }

        .hamburger {
          display: block;
          width: 25px;
          height: 3px;
          background: #00053f;
          position: relative;
          transition: all 0.3s ease;
        }

        .hamburger::before, .hamburger::after {
          content: '';
          position: absolute;
          width: 25px;
          height: 3px;
          background: #00053f;
          left: 0;
          transition: all 0.3s ease;
        }

        .hamburger::before { top: -8px; }
        .hamburger::after { top: 8px; }

        /* Hamburger Animation */
        .hamburger.open { background: transparent; }
        .hamburger.open::before { transform: rotate(45deg); top: 0; }
        .hamburger.open::after { transform: rotate(-45deg); top: 0; }

        /* --- Responsive Queries --- */
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block; order: 1; }
          .logo { order: 2; }
          .nav-icons { order: 3; }

          .nav-menu {
            position: fixed;
            top: 0;
            left: -100%;
            flex-direction: column;
            background: white;
            width: 80%;
            height: 100vh;
            padding-top: 80px;
            transition: 0.3s;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            z-index: 1000;
          }

          .nav-menu.active { left: 0; }
          
          .nav-menu li { margin: 1.5rem 2rem; }
          
          .user-dropdown { right: auto; left: 0; }
        }

        /* User Dropdown Styles from original */
        .user-dropdown-wrapper { position: relative; display: inline-block; }
        .user-btn { background-color: #00053f; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: bold; }
        .user-dropdown { position: absolute; right: 0; top: 120%; background: white; border: 1px solid #ddd; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 6px; min-width: 150px; z-index: 1000; }
        .dropdown-item { display: block; padding: 0.5rem 1rem; color: #00053f; text-decoration: none; }
        .dropdown-item:hover { background-color: #f0f0f0; }
      `}</style>
    </>
  );
}

export default Navigation;