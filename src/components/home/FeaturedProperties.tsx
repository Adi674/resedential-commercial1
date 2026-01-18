import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Home, Building, Map, Star, Ruler, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
// IMPORT REAL API
import { fetchListings, Listing } from '@/services/api';

type CategoryType = 'all' | 'Residential' | 'Commercial' | 'Plot' | 'Villa';

const categories = [
  { id: 'Residential' as CategoryType, label: 'Residential', icon: <Home className="w-4 h-4" />, path: '/listings?type=residential' },
  { id: 'Commercial' as CategoryType, label: 'Commercial', icon: <Building className="w-4 h-4" />, path: '/listings?type=commercial' },
  { id: 'Plot' as CategoryType, label: 'Plots', icon: <Map className="w-4 h-4" />, path: '/listings?type=plots' },
  { id: 'Villa' as CategoryType, label: 'Villas', icon: <Star className="w-4 h-4" />, path: '/listings?type=villas' },
];

const FeaturedProperties: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Residential');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH REAL DATA
  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      try {
        // Fetch all listings (or filter by category if your API supports it directly)
        // Ideally, fetch all and filter client-side for the "Featured" section responsiveness
        const data = await fetchListings();
        setListings(data);
      } catch (error) {
        console.error("Failed to load featured properties", error);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  // Filter listings based on active tab
  // Note: Since backend doesn't have a "featured" flag yet, we just show the newest items
  const filteredProperties = listings.filter((p) => {
    if (activeCategory === 'all') return true;
    // Match the exact string 'Residential', 'Commercial', 'Plot', 'Villa' from backend
    return p.property_type === activeCategory;
  }).slice(0, 3);

  // Fallback: If no matches for a category, show any listings to avoid empty space
  const displayProperties = filteredProperties.length > 0 
    ? filteredProperties 
    : listings.slice(0, 3);

  if (loading) {
    return (
      <section className="py-24 bg-muted/30 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  // If database is empty, don't crash, just show nothing or a placeholder
  if (listings.length === 0) return null;

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
              key={property.listing_id} // USE REAL ID
              to={`/property/${property.listing_id}`}
              className="card-property group block h-full"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  {property.image ? (
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
                    <Badge className="text-xs bg-primary text-primary-foreground">
                      {property.property_type}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 text-black text-xs backdrop-blur-sm">
                      {property.status}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm mb-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>
                  
                  <h3 className="font-semibold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {property.title}
                  </h3>
                  
                  {/* Since Backend doesn't have developer yet, we hide or show generic */}
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                    {property.listing_category || 'Premium Listing'}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                    <div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">Size</div>
                      <div className="flex items-center gap-1 font-medium text-sm">
                        <Ruler className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        {property.size}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">Price</div>
                      <div className="text-base sm:text-lg font-bold text-primary">{property.price}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View More Link Mobile */}
        <div className="text-center mt-8 md:hidden">
          <Link to="/listings">
            <Button variant="outline" className="w-full gap-2">
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;