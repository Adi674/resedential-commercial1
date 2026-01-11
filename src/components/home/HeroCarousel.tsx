import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80',
    title: 'Nirala Gateway',
    subtitle: 'Premium Commercial Hub in Greater Noida',
    location: 'Sector 16, Greater Noida West',
    propertyId: '7',
  },
  {
    image: 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=1920&q=80',
    title: 'Diadem',
    subtitle: 'Luxury Living Redefined',
    location: 'Sector 10, Greater Noida',
    propertyId: '8',
  },
  {
    image: 'https://images.unsplash.com/photo-1464938050520-ef2571e2d2dc?w=1920&q=80',
    title: 'Bhutani Astrathum',
    subtitle: 'Premium Commercial & Retail Space',
    location: 'Sector 12, Noida Extension',
    propertyId: '9',
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
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Link
            to={`/property/${slide.propertyId}`}
            className="block absolute inset-0 cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          </Link>
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 flex items-center">
        <div className="max-w-2xl text-card animate-slide-up">
          <div className="flex items-center gap-2 mb-2 sm:mb-4">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            <span className="text-accent font-medium text-sm sm:text-base">{slides[currentSlide].location}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-card/80 mb-4 sm:mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/listings?type=residential">
              <Button className="btn-hero gap-2 w-full sm:w-auto text-sm sm:text-base">
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                Residential
              </Button>
            </Link>
            <Link to="/listings?type=commercial">
              <Button variant="outline" className="bg-transparent border-card text-card hover:bg-card hover:text-foreground gap-2 w-full sm:w-auto text-sm sm:text-base">
                <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                Commercial
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-card hover:bg-card/40 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-card hover:bg-card/40 transition-colors"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-accent w-6 sm:w-8'
                : 'bg-card/50 hover:bg-card/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
