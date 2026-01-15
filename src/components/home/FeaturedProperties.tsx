import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowRight, Home, Building, Map, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { properties } from '@/data/mockData';

type CategoryType = 'all' | 'Residential' | 'Commercial' | 'Plot' | 'Villa';

const categories = [
  { id: 'Residential' as CategoryType, label: 'Residential', icon: <Home className="w-4 h-4" />, path: '/residential' },
  { id: 'Commercial' as CategoryType, label: 'Commercial', icon: <Building className="w-4 h-4" />, path: '/commercial' },
  { id: 'Plot' as CategoryType, label: 'Plots', icon: <Map className="w-4 h-4" />, path: '/plots' },
  { id: 'Villa' as CategoryType, label: 'Villas', icon: <Star className="w-4 h-4" />, path: '/villas' },
];

const FeaturedProperties: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Residential');

  const filteredProperties = properties.filter((p) => {
    if (activeCategory === 'all') return p.featured;
    if (activeCategory === 'Plot' || activeCategory === 'Villa') {
      // Show residential properties for Plot/Villa as we don't have those types in mock data
      return p.type === 'Residential' && p.featured;
    }
    return p.type === activeCategory && p.featured;
  }).slice(0, 3);

  // Fallback to all featured if no match
  const displayProperties = filteredProperties.length > 0 
    ? filteredProperties 
    : properties.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">Featured</span>
            <h2 className="section-title mt-2 text-2xl sm:text-3xl md:text-4xl">Handpicked Properties</h2>
            <p className="text-muted-foreground max-w-lg text-sm sm:text-base">
              Explore our curated selection of premium properties in Greater Noida
            </p>
          </div>
          <Link to="/listings">
            <Button variant="outline" className="mt-4 md:mt-0 gap-2 text-sm sm:text-base">
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border hover:border-primary text-foreground'
              }`}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.label}</span>
              <span className="sm:hidden">{category.label.slice(0, 3)}</span>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayProperties.map((property) => (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              className="card-property group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
                  <Badge className={`text-xs ${property.type === 'Residential' ? 'bg-primary' : 'bg-accent text-accent-foreground'}`}>
                    {property.type}
                  </Badge>
                  <Badge variant="secondary" className="bg-card/90 text-foreground text-xs">
                    {property.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm mb-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  {property.location}
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors">
                  {property.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">by {property.developer}</p>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                  {property.bedrooms && (
                    <span className="flex items-center gap-1">
                      <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
                      {property.bedrooms} Beds
                    </span>
                  )}
                  {property.bathrooms && (
                    <span className="flex items-center gap-1">
                      <Bath className="w-3 h-3 sm:w-4 sm:h-4" />
                      {property.bathrooms} Baths
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Square className="w-3 h-3 sm:w-4 sm:h-4" />
                    {property.area}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                  <div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Starting from</div>
                    <div className="text-base sm:text-lg font-bold text-primary">{property.price}</div>
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    ₹{property.pricePerSqFt.toLocaleString()}/sq.ft
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-8">
          <Link to={categories.find(c => c.id === activeCategory)?.path || '/listings'}>
            <Button variant="outline" className="gap-2">
              View All {activeCategory === 'all' ? '' : categories.find(c => c.id === activeCategory)?.label}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
