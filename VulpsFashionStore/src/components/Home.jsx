
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import heroVideo from './assets/hero-video.mp4';
import '../App.css';
import './Footer.css';
import './CustomDesign.css';
import axios from "axios";

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
        <img src={item.imageUrl} alt={item.title} />

        <h3>{item.title}</h3>

        <div className="meta">
        <span className="category">{item.description}</span>


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
  loadLatestCollections();
}, []);

const loadLatestCollections = async () => {
  try {
    const res = await axios.get(
      "https://vulps-fashion-store.onrender.com/api/latest-collections"
    );

    console.log("Latest collections:", res.data); // 👈 IMPORTANT
    setLatestCollections(res.data);
  } catch (err) {
    console.error("API error:", err);
  }
};

const LatestCarousel = ({ items }) => {
  const sliderRef = useRef(null);

  const CARD_WIDTH = 260; // must match CSS
  const GAP = 24;
  const SCROLL_AMOUNT = CARD_WIDTH + GAP;

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <div className="latest-carousel-wrapper">
      {/* LEFT ARROW */}
      <button onClick={() => scroll("left")} className="carousel-arrow left">
        ❮
      </button>

      {/* SLIDER */}
      <div className="latest-carousel" ref={sliderRef}>
        {items.map((item) => (
          <div key={item.id} className="carousel-item">
            <ProductCard item={item} />
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button onClick={() => scroll("right")} className="carousel-arrow right">
        ❯
      </button>
    </div>
  );
};


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
      <h5 className="hero-eyebrow">EST. 2024 — CLOVRA </h5>
      <h1 className="hero-title">REDEFINE <br /> <span className="outline-text">EXISTENCE</span></h1>
      <p className="hero-desc">Clovra is a modern fashion house creating refined, contemporary clothing designed for effortless style and lasting impact.</p>

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
            <img src="https://plus.unsplash.com/premium_photo-1675183690347-662b2f9f3cf7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a2lkcyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D" alt="Accessories" />
            <div className="bento-content">
              <h3>KIDS</h3>
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
          <LatestCarousel items={latestCollections} />
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
              <Link to="/about">Contact</Link>
            </div>
            <div className="footer-bottom-slim">
              <p style={{color:'white'}}>Powered by <a href="https://wordlanetech.com/" target="_blank">Word Lane Tech</a></p>
              <p style={{color:'white'}}>© 2026 Clovra Studios. All Rights Reserved.</p>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;