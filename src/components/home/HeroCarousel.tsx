import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    title: 'Find Your Dream Home',
    subtitle: 'Premium Residential Properties',
    location: 'Greater Noida',
    propertyId: '1',
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    title: 'Prime Commercial Spaces',
    subtitle: 'Invest in the Future',
    location: 'Greater Noida',
    propertyId: '4',
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    title: 'Luxury Living Awaits',
    subtitle: 'Modern Architecture & Design',
    location: 'Greater Noida',
    propertyId: '2',
  },
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <Link
          key={index}
          to={`/property/${slide.propertyId}`}
          className={`absolute inset-0 transition-opacity duration-1000 cursor-pointer ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </Link>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl text-card animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-accent font-medium">{slides[currentSlide].location}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-card/80 mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/listings?type=residential">
              <Button className="btn-hero gap-2">
                <Home className="w-5 h-5" />
                Residential
              </Button>
            </Link>
            <Link to="/listings?type=commercial">
              <Button variant="outline" className="bg-transparent border-card text-card hover:bg-card hover:text-foreground gap-2">
                <Building className="w-5 h-5" />
                Commercial
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-card hover:bg-card/40 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-card hover:bg-card/40 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-accent w-8'
                : 'bg-card/50 hover:bg-card/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
