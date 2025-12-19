import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Added Link for navigation
import '../App.css';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Removed: import './About.jsx'; (Not needed here)
const premiumBgImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1500&q=80"
];
function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [premiumBgIndex, setPremiumBgIndex] = useState(0);

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
              <button className="cta-button">Shop Now</button>
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
                <span className="text-xl font-bold mb-2">YOUR ART<br/>OUR PRINT</span>
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
              <div className="step-item slide-left">
                <span className="step-number">1</span>
                <p>Fill out the form</p>
              </div>
              <div className="step-item slide-left">
                <span className="step-number">2</span>
                <p>Upload your design & submit it</p>
              </div>
            </div>
            <a href="/CustomShirtForm"><button className="cta-button">Fill the Form</button></a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title fade-in">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card slide-right">
              <div className="stars">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="testimonial-text">"Inviting and vibrant, just like the vibe at Vulps. The atmosphere is great, but it's the clothing that truly stands out — especially the organic cotton tees. They're breathable, premium, and feel like they were made for me."</p>
              <p className="testimonial-author">- Prasad. Kale</p>
              <p className="testimonial-role">Founder & CEO of Rayfit Brand</p>
            </div>
            <div className="testimonial-card slide-right">
              <div className="stars">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="testimonial-text">"This collection is perfect for casual outings or special events."</p>
              <p className="testimonial-author">- Sudhir Siddheshware</p>
              <p className="testimonial-role">Graphic Designer</p>
            </div>
            <div className="testimonial-card slide-right">
              <div className="stars">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="testimonial-text">"A truly exquisite fashion experience. I highly recommend the Eco-Friendly Collection, it's simply stunning."</p>
              <p className="testimonial-author">- Iris DOE</p>
              <p className="testimonial-role">Manager of FashionBrand</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title fade-in">Our process in four easy steps</h2>
          <div className="process-steps">
            <div className="process-step slide-up">
              <div className="step-number-large">1</div>
              <h3>Add to cart</h3>
              <p>Select your <strong>size and quantity</strong>, then click <strong>"Add to Cart"</strong>.</p>
            </div>
            <div className="process-step slide-up">
              <div className="step-number-large">2</div>
              <h3>Sign in</h3>
              <p>New here? Click <strong>"Create an Account"</strong> to sign up and track your orders.</p>
            </div>
            <div className="process-step slide-up">
              <div className="step-number-large">3</div>
              <h3>Pay</h3>
              <p>Choose your preferred <strong>payment method</strong> (UPI, Credit/Debit Card, etc.).</p>
            </div>
            <div className="process-step slide-up">
              <div className="step-number-large">4</div>
              <h3>Get Delivered</h3>
              <p>Once payment is confirmed, we process and ship your order.</p>
            </div>
          </div>
        </div>
      </section>

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
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Menu</h4>
              <ul>
                {/* 2. Updated Links to use React Router */}
                <li><Link to="/">Home</Link></li>
                <li><a href="/About">About us</a></li>
               <li><a href="/Blog">Blog</a></li>
                <li><a href="#shop">Shop Now</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#forum">Forum</a></li>
                <li><a href="#contact">Contact us</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact to us</h4>
              <ul>
                <li><a href="#contact">Contact us</a></li>
                <li><a href="mailto:vulpsfashion@gmail.com">vulpsfashion@gmail.com</a></li>
                <li>+91 </li>
                <li>+91 </li>
                <li>+91 </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect with us</h4>
              <div className="social-links">
                <a href="#" className="social-icon"> <FaInstagram size={30} style={{ color: '#E1306C' }} /></a>
                <a href="#" className="social-icon"><FaFacebookF size={30} style={{ color: '#1877F2' }} /></a>
                <a href="#" className="social-icon"><FaWhatsapp size={30} style={{ color: '#25D366' }} /></a>
              </div>
              <h4 className="follow-title">Follow us</h4>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright - ©Vulps</p>
            <p>Powered by <b><a href="https://wordlanetech.com/">WordLaneTech</a></b> -</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;