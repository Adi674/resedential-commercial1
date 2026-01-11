import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Youtube, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold">PrimeEstates</span>
                <span className="text-[10px] sm:text-xs text-background/60 -mt-1">Greater Noida</span>
              </div>
            </div>
            <p className="text-background/70 text-xs sm:text-sm leading-relaxed">
              Your trusted partner for premium Residential and Commercial properties in Greater Noida. 
              We help you find your dream property with expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-background/70 hover:text-primary transition-colors text-sm">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/listings?type=residential" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Residential
                </Link>
              </li>
              <li>
                <Link to="/listings?type=commercial" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">Sector 78, Greater Noida, UP 201310</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm">info@primeestates.in</span>
              </li>
            </ul>
          </div>

          {/* YouTube & Social */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Follow Us</h3>
            <p className="text-background/70 text-xs sm:text-sm mb-4">
              Watch our property tours and market insights on YouTube!
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-background/60 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} PrimeEstates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
