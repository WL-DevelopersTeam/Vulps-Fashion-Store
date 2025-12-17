import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook, Home } from "lucide-react";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Shop Now", href: "/shop" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Forum", href: "/forum" },
  { label: "Contact us", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="gradient-gold-soft">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Menu */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Menu</h3>
            <nav className="flex flex-col gap-3">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact to us</h3>
            <div className="flex flex-col gap-4">
              <Link
                to="/contact"
                className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact us
              </Link>

              <a
                href="mailto:vulpsfashion@gmail.com"
                className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
                vulpsfashion@gmail.com
              </a>

              <a
                href="tel:+919591388806"
                className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                +91 9591388806
              </a>

              <a
                href="tel:+917756915814"
                className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                +91 7756915814
              </a>

              <a
                href="tel:+919767290677"
                className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                +91 9767290677
              </a>
            </div>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Connect with us :</h3>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
              >
                <Home className="w-5 h-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} Vulps Fashion. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
