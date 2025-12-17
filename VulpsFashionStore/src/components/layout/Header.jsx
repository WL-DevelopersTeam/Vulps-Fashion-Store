import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  Instagram,
  Facebook,
} from "lucide-react";

// ❗ IMPORTANT: replace this alias import (CRA doesn't support @ by default)
import { cn } from "../../lib/utils"; // adjust path if needed

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Success Stories", href: "/success-stories" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-background"
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover-scale">
              <VulpsLogo className="h-12 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "nav-link-pill",
                    location.pathname === link.href && "active"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="icon-btn relative">
                <ShoppingCart className="w-5 h-5" />
              </button>

              <button className="icon-btn relative">
                <Heart className="w-5 h-5" />
                <span className="badge-count">0</span>
              </button>

              <button
                className="icon-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Social Icons */}
              <div className="hidden md:flex items-center gap-1 ml-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>

              <Link
                to="/signin"
                className="hidden sm:block ml-2 text-sm font-medium hover:text-muted-foreground transition-colors"
              >
                Sign in
              </Link>

              <Link
                to="/contact"
                className="hidden sm:block btn-vulps-primary ml-2 text-sm"
              >
                Contact Us
              </Link>

              <button
                className="lg:hidden icon-btn ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isSearchOpen ? "max-h-20 pb-4" : "max-h-0"
            )}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 rounded-full border border-border bg-muted/50 focus:outline-none focus:border-primary transition-colors"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background shadow-xl transition-transform duration-300",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-6 pt-24">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                    location.pathname === link.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-border">
              <Link
                to="/signin"
                className="block w-full text-center btn-vulps-outline mb-3"
              >
                Sign In
              </Link>
              <Link
                to="/contact"
                className="block w-full text-center btn-vulps-primary"
              >
                Contact Us
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </>
  );
};

const VulpsLogo = ({ className }) => {
  return (
    <svg viewBox="0 0 100 60" fill="currentColor" className={className}>
      <path d="M50 5 L20 35 L30 35 L25 55 L50 40 L75 55 L70 35 L80 35 Z" />
      <path d="M30 35 L35 15 L45 30 Z" />
      <path d="M70 35 L65 15 L55 30 Z" />
      <circle cx="40" cy="32" r="3" fill="white" />
      <circle cx="60" cy="32" r="3" fill="white" />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fontFamily="serif"
      >
        VULPS
      </text>
    </svg>
  );
};

export default Header;
