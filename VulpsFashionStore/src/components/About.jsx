import React from "react";
import  Layout  from "./layout/Layout";
import { Link } from "react-router-dom";
import { Users, Target, Heart, Sparkles } from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Quality First",
        description:
            "We source only the finest materials to ensure comfort and durability in every piece.",
    },
    {
        icon: Users,
        title: "Customer Focus",
        description:
            "Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.",
    },
    {
        icon: Target,
        title: "Innovation",
        description:
            "Constantly pushing boundaries in design and sustainability to bring you the best.",
    },
    {
        icon: Sparkles,
        title: "Sustainability",
        description:
            "Committed to eco-friendly practices and reducing our environmental footprint.",
    },
];

const About = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative h-[50vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop"
                    alt="About Vulps"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white animate-fade-up">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                            About Us
                        </h1>
                        <p className="text-xl opacity-90">
                            Redefining Fashion Since 2020
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-slide-in-left">
                            <h2 className="section-title mb-6">Our Story</h2>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                Vulps was born from a simple idea: fashion should be both
                                comfortable and stylish. Founded in 2020, we set out to create
                                clothing that makes you feel confident without compromising on
                                comfort.
                            </p>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                What started as a small passion project has grown into a beloved
                                brand, serving thousands of customers who share our vision of
                                effortless style.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Every piece in our collection is carefully designed and crafted
                                with attention to detail, ensuring that you receive nothing but
                                the best.
                            </p>
                        </div>

                        <div className="animate-slide-in-right">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop"
                                    alt="Our story"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center animate-fade-up">
                        <h2 className="section-title mb-6">Our Mission</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            To empower individuals to express themselves through fashion
                            that's accessible, comfortable, and stylish. We believe everyone
                            deserves to look and feel their best, and we're committed to
                            making that possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto">
                    <h2 className="section-title text-center mb-16 animate-fade-up">
                        Our Values
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={value.title}
                                    className="text-center animate-fade-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-accent" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto">
                    <div className="text-center mb-16 animate-fade-up">
                        <h2 className="section-title mb-4">Meet the Team</h2>
                        <p className="text-muted-foreground">
                            The passionate people behind Vulps Fashion
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                name: "Vinod Kumar",
                                role: "Founder & CEO",
                                image:
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
                            },
                            {
                                name: "Priya Sharma",
                                role: "Head of Design",
                                image:
                                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
                            },
                            {
                                name: "Rahul Patel",
                                role: "Operations Manager",
                                image:
                                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
                            },
                        ].map((member, index) => (
                            <div
                                key={member.name}
                                className="text-center animate-fade-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-muted-foreground">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
           <section style={{ padding: '80px 20px', textAlign: 'center' }}>
  <h2 style={{ 
    color: '#d4af37', 
    fontSize: '2.2rem', 
    fontWeight: 'bold', 
    marginBottom: '30px' 
  }}>
    Ready to Explore?
  </h2>
  
  <Link to="/shop" style={{
    display: 'inline-block',
    backgroundColor: 'white',
    color: '#0f172a',
    padding: '14px 45px',
    borderRadius: '50px',
    
    textDecoration: 'none',
    boxShadow: '0 0 20px rgba(34, 211, 238, 0.7)', // Cyan Glow
    border: '1px solid rgba(34, 211, 238, 0.3)',
    transition: 'transform 0.2s ease-in-out',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  }}
  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    Shop Now
  </Link>
</section>
        </Layout>
    );
};

export default About;
