import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, LogIn, Home, Building, Map, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Residential', path: '/residential', icon: <Home className="w-4 h-4" /> },
    { name: 'Commercial', path: '/commercial', icon: <Building className="w-4 h-4" /> },
    { name: 'Plots', path: '/plots', icon: <Map className="w-4 h-4" /> },
    { name: 'Villas', path: '/villas', icon: <Star className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-foreground">PrimeEstates</span>
              <span className="text-xs text-muted-foreground -mt-1">Greater Noida</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'nav-link text-sm flex items-center gap-1.5',
                  isActive(link.path) && 'text-primary font-semibold'
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="gap-2">
                <LogIn className="w-4 h-4" />
                Company Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'nav-link py-2 flex items-center gap-2',
                    isActive(link.path) && 'text-primary font-semibold'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <LogIn className="w-4 h-4" />
                  Company Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
