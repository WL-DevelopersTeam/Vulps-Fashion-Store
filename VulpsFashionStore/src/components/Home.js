import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // 1. Added Link for navigation
import '../App.css';
import './Footer.css';
import './CustomDesign.css';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Removed: import './About.jsx'; (Not needed here)
const premiumBgImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1500&q=80"
];
const testimonials = [
  {
    id: 1,
    stars: "⭐⭐⭐⭐⭐",
    text: "Inviting and vibrant, just like the vibe at Vulps. The clothing truly stands out — especially the organic cotton tees.",
    author: "Prasad Kale",
    role: "Founder & CEO, Rayfit",
    image: "https://i.pravatar.cc/150?u=prasad" // Replace with real image paths
  },
  {
    id: 2,
    stars: "⭐⭐⭐⭐⭐",
    text: "This collection is perfect for casual outings or special events. The fit is impeccable.",
    author: "Sudhir Siddheshware",
    role: "Graphic Designer",
    image: "https://i.pravatar.cc/150?u=sudhir"
  },
  {
    id: 3,
    stars: "⭐⭐⭐⭐⭐",
    text: "A truly exquisite fashion experience. I highly recommend the Eco-Friendly Collection.",
    author: "Iris Doe",
    role: "Manager, FashionBrand",
    image: "https://i.pravatar.cc/150?u=iris"
  },
  {
    id: 4,
    stars: "⭐⭐⭐⭐⭐",
    text: "The best premium streetwear in the market. Quality and sustainability combined.",
    author: "Rahul Sharma",
    role: "Content Creator",
    image: "https://i.pravatar.cc/150?u=rahul"
  }
];
// We define this separately so it's easy to manage
const ProcessSection = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
        } else {
          // Reset the animation when the user scrolls away
          setIsAnimated(false);
        }
      },
      { threshold: 0.2 } // Starts when 20% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);
  const steps = [
    { title: "Sign in", desc: "Create an account to track." },
    { title: "Add to cart", desc: "Select size and quantity." },
    { title: "Pay", desc: "UPI, Cards, or Net Banking." },
    { title: "Delivered", desc: "Quick shipping to your door." }
  ];

  return (
    <section className="process-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="process-container">
          <div className="road-line">
            <div className={`truck-icon ${isAnimated ? 'drive' : ''}`}>🚚</div>
          </div>
          <div className="process-steps">
            {steps.map((step, index) => (
              <div key={index} className={`process-step ${isAnimated ? 'fade-up' : ''}`}
                style={{ transitionDelay: `${index * 0.4}s` }}>
                <div className="step-circle">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [premiumBgIndex, setPremiumBgIndex] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef(null);
  // Hero carousel timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Premium Background slideshow timer (3 seconds)
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setPremiumBgIndex((prev) => (prev + 1) % premiumBgImages.length);
    }, 3000);
    return () => clearInterval(bgInterval);
  }, []);
  // Hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );


    const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };


  }, []);



  return (
    <div className="home-page">
      {/* Hero Section with Carousel */}
      <section id="home" className="hero-section">
        <div className="hero-carousel">
          <div className={`hero-slide ${currentSlide === 0 ? 'active' : ''}`} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1950&q=80')` }}>
            <div className="hero-content fade-in">
              <h1>Elevate Your Everyday Style</h1>
              <p>Effortless Fashion for Every Occasion</p>
              <p className="hero-subtitle">At Vulps, we believe your wardrobe should work as hard as you do. Our collection of premium T-shirts and hoodies is designed to seamlessly transition from casual outings to relaxed evenings.</p>
              <a href="/Shop"><button className="cta-button">Shop Now</button></a>
            </div>
          </div>
          <div className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`} style={{ backgroundImage: `url('https://unsplash.com/photos/person-leaning-on-wall-while-holding-gray-hat-qnKhZJPKFD8')` }}>
            <div className="hero-content fade-in">
              <h1>Premium Quality</h1>
              <p>Organic Cotton & Sustainable Fashion</p>
              <p className="hero-subtitle">Experience the comfort and quality of our organic cotton collection. Breathable, premium, and made for you.</p>
              <button className="cta-button">Explore Collection</button>
            </div>
          </div>
          <div className={`hero-slide ${currentSlide === 2 ? 'active' : ''}`} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1950&q=80')` }}>
            <div className="hero-content fade-in">
              <h1>Custom Designs</h1>
              <p>Your Design, Our Print</p>
              <p className="hero-subtitle">Turn your ideas into custom T-shirts & Hoodies. Upload your design and make it reality.</p>
              <button className="cta-button">Get Started</button>
            </div>
          </div>
        </div>
        <div className="carousel-controls">
          <button className="prev-btn" onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}>❮</button>
          <button className="next-btn" onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}>❯</button>
        </div>
        <div className="carousel-dots">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Premium Collections Section */}
      <section className="collections-section relative py-24 bg-gray-900">
        {/* ENHANCED BACKGROUND ANIMATION */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={premiumBgIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.8, scale: 1 }} // Increased opacity for better visibility
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${premiumBgImages[premiumBgIndex]})` }}
            />
          </AnimatePresence>
          {/* Darker Overlay to make images visible but keep text sharp */}
          <div className="absolute inset-0 bg-black/40 backdrop-brightness-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-white mb-16 tracking-tight"
          >
            Our Premium Collections
          </motion.h2>

          {/* GRID SYSTEM: Aligns all cards to the same height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">

            {/* 1. Custom Shirt Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] text-white shadow-2xl transition-all hover:border-white/40"
            >
              <div className="h-50 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center text-center p-6 mb-6">
                <span className="text-xl font-bold mb-2">YOUR ART<br />OUR PRINT</span>
              </div>
              <div className="flex flex-col flex-grow text-center">
                <h3 className="text-xl font-bold mb-2">Custom Shirt Design</h3>
                <p className="text-sm text-white/60 mb-6 flex-grow">Create a look that is uniquely yours with our high-quality printing service.</p>
                <Link to="/CustomShirtForm" className="mt-auto">
                  <button className="w-full py-3 bg-white text-indigo-900 font-bold rounded-full hover:bg-indigo-50 transition-colors">Fill the Form</button>
                </Link>
              </div>
            </motion.div>

            {/* Standard Collection Cards */}
            {[
              { title: "Premium Unisex Hoodie", label: "Hoodie" },
              { title: "Printed Men T-shirt", label: "Men T-shirt" },
              { title: "Printed Women T-shirt", label: "Women T-shirt" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] text-white shadow-2xl transition-all hover:border-white/40"
              >
                <div className="h-50 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center text-center p-6 mb-6">
                  <span className="text-white-100 italic font-medium">{item.label}</span>
                </div>
                <div className="flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-bold mb-2 text-white-900">{item.title}</h3>
                  <p className="text-sm text-white/60 mb-6 flex-grow">Experience ultimate comfort with our premium {item.label.toLowerCase()} collection.</p>
                  <button className="w-full py-3 bg-white text-indigo-900 font-bold rounded-full hover:bg-indigo-50 transition-colors">
                    Shop Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Latest Collections */}
      <section className="latest-section">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Our latest Collections</h2>
            <a href="#shop" className="see-all-link">See all →</a>
          </div>
          <div className="products-grid">
            {['Unisex Printed Hoodie', 'Plain Men Hoodie', 'Printed Men Over Size -T', 'Men Plain Casual & Over Size -T', 'Women\'s Printed -T', 'Women\'s Casual Plain -T'].map((product, index) => (
              <div key={index} className="product-card slide-up">
                <div className="product-image">
                  <div className="image-placeholder">{product}</div>
                </div>
                <h4>{product}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="custom-design-section">
        <div className="container">
          <div className="custom-design-content fade-in">
            <h2> Your Design, Our Print </h2>
            <p className="custom-subtitle">Turn your ideas into custom T-shirts & Hoodies</p>

            <div className="custom-steps">
              {/* Step 1 */}
              <div className="step-item">
                <span className="step-number">1</span>
                <p className="text-gray-300">Fill out the form</p>
              </div>

              {/* Step 2 */}
              <div className="step-item">
                <span className="step-number">2</span>
                <p className="text-gray-300">Upload your design Information & submit</p>
              </div>
            </div>

            <Link to="/CustomShirtForm">
              <button className="cta-button">Fill the Form Now</button>
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>

          <div className="marquee-wrapper">
            <div className="marquee-content">
              {/* Render two sets of items for seamless looping */}
              {[...testimonials, ...testimonials].map((t, index) => (
                <div key={index} className="testimonial-card">
                  <div className="card-header">
                    <img src={t.image} alt={t.author} className="author-img" />
                    <div className="stars">{t.stars}</div>
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="author-info">
                    <h4 className="author-name">{t.author}</h4>
                    <p className="author-role">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* {<ProcessSection />} */}
      <ProcessSection />

      {/* Classified Collection */}
      <section className="classified-section">
        <div className="container">
          <h2 className="section-title fade-in">Our Classified Collection</h2>
          <div className="classified-content slide-up">
            <p className="classified-subtitle">Experience the finest in fashion with our carefully curated collections. Whether you're looking for casual wear, formal attire, or accessories, our offerings are sure to impress.</p>
            <p className="classified-subtitle">Discover the difference in every piece.</p>
            <button className="cta-button">Shop Now</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-slim">
        <div className="container-slim">
          <div className="footer-top-row">
            {/* Logo or Brand Name */}
            <div className="footer-brand">
              <h3>Vulps<span>.</span></h3>
            </div>

            {/* Minimal Menu */}
            <ul className="footer-links-slim">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/About">About</Link></li>
              <li><Link to="/Blog">Blog</Link></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

            {/* Animated Social Icons */}
            <div className="social-links-slim">
              <a href="#" className="social-icon-box ig"><FaInstagram /></a>
              <a href="#" className="social-icon-box fb"><FaFacebookF /></a>
              <a href="#" className="social-icon-box wa"><FaWhatsapp /></a>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom-slim">
            <p>© {new Date().getFullYear()} Vulps. All rights reserved.</p>
            <p>Powered by <a href="https://wordlanetech.com/" target="_blank" rel="noreferrer">WordLaneTech</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;