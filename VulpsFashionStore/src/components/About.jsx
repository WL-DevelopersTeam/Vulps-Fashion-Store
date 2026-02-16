import React from "react";
import Layout from "./layout/Layout";
import { Link } from "react-router-dom";
import { Users, Target, Heart, Sparkles } from "lucide-react";
import "./About.css"; 

const values = [
    {
        icon: Heart,
        title: "Quality First",
        description: "We source only the finest materials to ensure comfort and durability in every piece.",
    },
    {
        icon: Users,
        title: "Customer Focus",
        description: "Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.",
    },
    {
        icon: Target,
        title: "Innovation",
        description: "Constantly pushing boundaries in design and sustainability to bring you the best.",
    },
    {
        icon: Sparkles,
        title: "Sustainability",
        description: "Committed to eco-friendly practices and reducing our environmental footprint.",
    },
];

const About = () => {
    return (
        <Layout>
            {/* --- Hero Section --- */}
            <section className="about-hero-section">
                <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Clovra Fashion"
                    className="about-bg-img"
                />
                <div className="about-overlay"></div>
                <div className="about-hero-content animate-fade-up">
                    <h1 className="about-main-title">CLOVRA</h1>
                    <p className="about-subtitle">Stylish • Soft • Memorable</p>
                </div>
            </section>

            {/* --- Brand Story Section --- */}
            <section className="about-container">
                <div className="about-grid-split">
                    <div className="animate-slide-left">
                        <h2 className="about-section-header">The Clovra Standard</h2>
                        
                        <p className="about-text-body">
                            Clovra is a modern fashion house creating refined, contemporary clothing designed for 
                            effortless style and lasting impact. Founded with a vision to redefine fashion, 
                            we craft elevated essentials where sophistication, comfort, and modern design come together.
                        </p>
                        
                        <p className="about-text-body">
                            At Clovra, modern elegance meets thoughtful design. We create timeless pieces 
                            for those who value modern style and quiet confidence. Every stitch represents 
                            our commitment to high-fashion and premium quality.
                        </p>

                        <p className="about-text-body" style={{ borderLeft: '3px solid #d4af37', paddingLeft: '15px', fontStyle: 'italic' }}>
                            "Clean design. Elevated detail. This is Clovra."
                        </p>
                    </div>

                    <div className="about-image-rounded">
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop"
                            alt="Clovra Aesthetic"
                        />
                    </div>
                </div>
            </section>

            {/* --- Values Section --- */}
            <section className="about-container" style={{ backgroundColor: '#0f0f0f' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 className="about-section-header">Our Values</h2>
                    <p className="about-text-body" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        The core principles that drive Clovra's mission to bring you the best.
                    </p>
                </div>

                <div className="about-values-grid">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div key={value.title} className="about-value-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="about-icon-wrapper">
                                    <Icon size={32} />
                                </div>
                                <h3 className="about-value-title">{value.title}</h3>
                                <p className="about-text-body" style={{ fontSize: '0.9rem' }}>{value.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* --- Contact Info Section --- */}
            <section className="about-container">
                <div style={{ textAlign: 'center' }}>
                    <h2 className="about-section-header">Get in Touch</h2>
                    <p className="about-text-body">We'd love to hear from you.</p>
                    
                    <div className="about-contact-grid">
                        <div className="about-contact-item">
                            <span className="about-contact-label">Address</span>
                            <span className="about-contact-value">Patna City, Bihar - 800001</span>
                        </div>
                        <div className="about-contact-item">
                            <span className="about-contact-label">Email</span>
                            <span className="about-contact-value">info@clovra.com</span>
                        </div>
                        <div className="about-contact-item">
                            <span className="about-contact-label">Phone</span>
                            <span className="about-contact-value">+91 9950309343</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="about-container" style={{ textAlign: 'center', paddingBottom: '100px' }}>
                <h2 style={{ color: '#d4af37', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                    Ready to Explore?
                </h2>
                <p className="about-text-body">Experience the new standard in fashion.</p>
                
                <Link to="/shop" className="about-cta-btn">
                    Shop Collection
                </Link>
            </section>
        </Layout>
    );
};

export default About;