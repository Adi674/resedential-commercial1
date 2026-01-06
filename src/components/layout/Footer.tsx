import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Youtube, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold">PrimeEstates</span>
                <span className="text-xs text-background/60 -mt-1">Greater Noida</span>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Your trusted partner for premium Residential and Commercial properties in Greater Noida. 
              We help you find your dream property with expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-background/70 hover:text-primary transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/listings?type=residential" className="text-background/70 hover:text-primary transition-colors">
                  Residential
                </Link>
              </li>
              <li>
                <Link to="/listings?type=commercial" className="text-background/70 hover:text-primary transition-colors">
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">Sector 78, Greater Noida, UP 201310</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">info@primeestates.in</span>
              </li>
            </ul>
          </div>

          {/* YouTube & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <p className="text-background/70 text-sm mb-4">
              Watch our property tours and market insights on YouTube!
            </p>
            <div className="flex gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60 text-sm">
          <p>© {new Date().getFullYear()} PrimeEstates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
