import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import heroVideo from './assets/hero-video.mp4';
import '../App.css';
import './Footer.css';
import './CustomDesign.css';

// --- 1. Helper Components ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const mouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.interactive')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", mouseOver);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", mouseOver);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: mousePosition.x - (isHovered ? 25 : 7),
        y: mousePosition.y - (isHovered ? 25 : 7),
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? "white" : "transparent",
        mixBlendMode: isHovered ? "difference" : "normal"
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
    />
  );
};

const Marquee = ({ text }) => {
  return (
    <div className="marquee-container">
      <motion.div
        className="marquee-track"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <h1 className="marquee-text">{text} • {text} • {text} • {text} • </h1>
      </motion.div>
    </div>
  );
};

const ProductCard = ({ item }) => {
  return (
    <motion.div
      className="product-card interactive"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="image-wrapper">
        <img src={item.imageUrl || item.img} alt={item.title} />
        <div className="overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>
      <div className="info">
        <h3>{item.title}</h3>
        <div className="meta">
          <span className="category">{item.category || item.label}</span>
          <span className="price">₹{item.price || "1,999"}</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- 2. Main Home Component ---

function Home() {
  // A. State & Hooks for Page Logic
  const [latestCollections, setLatestCollections] = useState([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // B. Mock Data Effect
  useEffect(() => {
    const mockData = [
      { id: 1, title: "Oversized Graphic Tee", category: "Streetwear", price: 1299, imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80" },
      { id: 2, title: "Cargo Parachute Pants", category: "Bottoms", price: 2499, imageUrl: "https://images.unsplash.com/photo-1552160753-117159d7419f?w=800&q=80" },
      { id: 3, title: "Heavyweight Hoodie", category: "Essentials", price: 3499, imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80" },
      { id: 4, title: "Utility Vest", category: "Outerwear", price: 1899, imageUrl: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80" },
    ];
    setLatestCollections(mockData);
  }, []);

  // C. Video Auto-Play Logic (Must be INSIDE the Home component)
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; 
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked by browser. User interaction needed.", err);
      });
    }
  }, []);

  // D. The JSX Return
  return (
    <div className="home-page-advanced">
      <CustomCursor />

      {/* Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Hero Section */}
      {/* Hero Section */}
<section className="hero-modern">

  {/* --- BACKGROUND LAYER --- */}
  <div className="hero-bg">
    
    {/* 1. The Video with a POSTER image (Fallback) */}
    <video
  className="hero-video"
  autoPlay
  loop
  muted
  playsInline
 
>
  {/* NEW: Walking in City (Matches the Streetwear vibe) */}
  <source src={heroVideo} type="video/mp4" />
</video>
    {/* 2. Texture Overlay (Darkens the video) */}
    <div className="noise-overlay"></div>
  </div>

  {/* --- CONTENT LAYER --- */}
  <div className="hero-content-modern container">

    {/* Glow Animation */}
    <motion.div
      className="hero-glow-circle"
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Text */}
    <motion.div
      className="hero-text-wrapper"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h5 className="hero-eyebrow">EST. 2026 — CLOVRA STUDIOS</h5>
      <h1 className="hero-title">REDEFINE <br /> <span className="outline-text">EXISTENCE</span></h1>
      <p className="hero-desc">Premium streetwear crafted for the modern individual.</p>

      <div className="hero-btns">
        <Link to="/shop" className="btn-primary interactive">
          Shop Collection <FaArrowRight className="icon" />
        </Link>
      </div>
    </motion.div>

  </div>
</section>

      <Marquee text="NEW ARRIVALS • SUMMER DROP • LIMITED EDITION" />

      {/* Categories Grid */}
      <section className="bento-section container">
        <motion.h2
          className="section-header"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        >
          CURATED CATEGORIES
        </motion.h2>

        <div className="bento-grid">
          <motion.div className="bento-item large" whileHover={{ scale: 0.98 }}>
            <img src="https://plus.unsplash.com/premium_photo-1687989650785-7edeaaddc7a7?w=600&auto=format&fit=crop&q=60" alt="Men" />
            <div className="bento-content">
              <h3>MEN'S EDIT</h3>
              <Link to="/shop?cat=men" className="underline-btn">Explore</Link>
            </div>
          </motion.div>
          <motion.div className="bento-item tall" whileHover={{ scale: 0.98 }}>
            <img src="https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800" alt="Women" />
            <div className="bento-content">
              <h3>WOMEN'S</h3>
              <Link to="/shop?cat=women" className="underline-btn">Explore</Link>
            </div>
          </motion.div>
          <motion.div className="bento-item wide" whileHover={{ scale: 0.98 }}>
            <img src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800" alt="Accessories" />
            <div className="bento-content">
              <h3>ACCESSORIES</h3>
              <Link to="/shop?cat=acc" className="underline-btn">Explore</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Slider */}
      <section className="latest-modern container">
        <div className="header-flex">
          <h2>LATEST DROPS</h2>
          <Link to="/shop" className="view-all interactive">View All</Link>
        </div>
        <div className="product-grid-modern">
          {latestCollections.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Custom Design (Split Scroll) */}
      <section className="custom-split">
        <div className="split-image">
          <img src="https://images.unsplash.com/photo-1618331835717-801e976710b2?w=1000" alt="Custom" />
        </div>
        <div className="split-content">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2>YOUR VISION.<br />OUR CANVAS.</h2>
            <p>Don't just wear the brand. Be the brand. Use our custom studio to print your art on premium heavy-weight cotton.</p>
            <Link to="/CustomShirtForm">
              <button className="btn-outline interactive">Start Designing</button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-slim">
        <div className="container-slim">
          <div className="footer-top-row">
            <div className="footer-brand">
              <h2>Clovra<span>.</span></h2>
            </div>
            <div className="social-links-slim">
              <a href="#" className="social-icon-box" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon-box" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon-box" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom-container">
            <div className="footer-links-slim">
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
            <div className="footer-bottom-slim">
              <p>© 2024 Clovra Studios. All Rights Reserved.</p>
              <span className="separator">|</span>
              <p>Patna City, Bihar - 800001</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;