import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Added Link for navigation
import '../App.css';
import './Footer.css';
import './CustomDesign.css';
// import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';


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
  
  const steps = [
    { title: "Sign in", desc: "Create an account to track." },
    { title: "Add to cart", desc: "Select size and quantity." },
    { title: "Pay", desc: "UPI, Cards, or Net Banking." },
    { title: "Delivered", desc: "Quick shipping to your door." }
  ];

  return (
    <section className="process-section">

      <div className="container">
        <h1 style={{ color: 'white', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '4rem' }}>Process ...!</h1>
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
  // const [premiumBgIndex, setPremiumBgIndex] = useState(0);
  // const [isAnimated, setIsAnimated] = useState(false);
  // const sectionRef = useRef(null);
  const [latestCollections, setLatestCollections] = useState([]);


 useEffect(() => {
  fetchLatestCollections();
}, []);

const fetchLatestCollections = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/latest-collections");

    if (!res.ok) {
      throw new Error("Failed to fetch latest collections");
    }

    const data = await res.json();
    console.log("Latest collections data:", data); // 🔍 DEBUG
    setLatestCollections(data);
  } catch (error) {
    console.error(error);
  }
};

  // Hero carousel timer
 

  // Premium Background slideshow timer (3 seconds)
  // useEffect(() => {
  //   const bgInterval = setInterval(() => {
  //     setPremiumBgIndex((prev) => (prev + 1) % premiumBgImages.length);
  //   }, 3000);
  //   return () => clearInterval(bgInterval);
  // }, []);

  
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
          <div className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1950&q=80')` }}>
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
              <a href='/SignIn'><button className="cta-button">Get Started</button></a>
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
<section className="py-28 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl font-semibold text-center mb-20 text-[#00053f]"
    >
      Our Premium Collections
    </motion.h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      {[
        {
          title: "Custom Shirt Design",
          label: "YOUR ART, OUR PRINT",
          img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8gYYxOkQkYT2L4avx1LXd55kg2pPTa5g4DEQkUHFwLbhzlVXTcqFYbs1vpYQLBjA2AyyRqyUTj1oCYBW0JMsTDghSEmCq_m1fDCap2CTEmON9PLkC3TG2iA",
          btn: "Fill the Form",
          link: "/CustomShirtForm"
        },
        {
          title: "Premium Unisex Hoodie",
          label: "HOODIE",
          img: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg"
        },
        {
          title: "Printed Men T-shirt",
          label: "MEN T-SHIRT",
          img: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg"
        },
        {
          title: "Printed Women T-shirt",
          label: "WOMEN T-SHIRT",
          img: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg"
        }
      ].map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="bg-[#f9f9fc] rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition"
        >
          {/* Fixed image height */}
          <div className="h-56 bg-gradient-to-br from-[#eaeaf5] to-[#ffffff]">
            <img
              src={item.img}
              alt={item.title}
              onError={(e)=> e.target.style.display='none'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 text-center">
            <p className="text-xs tracking-widest text-[#d59f35] mb-2">{item.label}</p>
            <h3 className="text-lg font-semibold text-[#00053f] mb-4">{item.title}</h3>

            {item.link ? (
              <Link to={item.link}>
                <button className="px-8 py-2 rounded-full bg-[#00053f] text-white hover:bg-[#d59f35] transition">
                  {item.btn}
                </button>
              </Link>
            ) : (
              <button className="px-8 py-2 rounded-full bg-[#00053f] text-white hover:bg-[#d59f35] transition">
                Shop Now
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Latest Collections */}
      {/* Latest Collections */}
<section className="latest-section">
  <div className="container">
    <div className="section-header fade-in">
      <h2>Our Latest Collections</h2>
      <Link to="/shop" className="see-all-link">See all →</Link>
    </div>

    <div className="products-grid">
      {latestCollections.length === 0 ? (
        <p style={{ textAlign: "center" }}>No latest collections found</p>
      ) : (
        latestCollections.map((item) => (
          <div key={item.id} className="product-card slide-up animate-in">

            
            <div className="product-image">
              <img
                src={`http://localhost:8080${item.imageUrl}`}
                alt={item.title}
                onError={(e) => {
                  e.target.src = "/placeholder.png"; // optional fallback
                }}
              />
            </div>

            <h4>{item.title}</h4>
            <p className="text-sm text-gray-500">{item.description}</p>

          </div>
        ))
      )}
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
          <h2 style={{ color: 'black', fontSize: '2rem', textAlign: 'center' }}>What Our Customers Say</h2>
           
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
            {/* <div className="social-links-slim">
              <a href="#" className="social-icon-box ig"><FaInstagram /></a>
              <a href="#" className="social-icon-box fb"><FaFacebookF /></a>
              <a href="#" className="social-icon-box wa"><FaWhatsapp /></a>
            </div> */}
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom-slim">
            <p>Powered by <a href="https://wordlanetech.com/" target="_blank" rel="noreferrer">WordLaneTech</a></p>
            <p>© {new Date().getFullYear()} Vulps. All rights reserved.</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;