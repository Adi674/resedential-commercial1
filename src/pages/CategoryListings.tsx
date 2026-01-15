import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Home, Building, Map, Star, MapPin, Square, ArrowLeft } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchListings, Listing } from '@/services/api';
import { properties } from '@/data/mockData';

const categoryConfig: Record<string, { 
  title: string; 
  apiType: string; 
  icon: React.ReactNode;
  description: string;
}> = {
  residential: {
    title: 'Residential Properties',
    apiType: 'Residential',
    icon: <Home className="w-5 h-5" />,
    description: 'Find your perfect home in Greater Noida',
  },
  commercial: {
    title: 'Commercial Properties',
    apiType: 'Commercial',
    icon: <Building className="w-5 h-5" />,
    description: 'Premium office spaces and retail shops',
  },
  plots: {
    title: 'Plots & Land',
    apiType: 'Plot',
    icon: <Map className="w-5 h-5" />,
    description: 'Build your dream on premium plots',
  },
  villas: {
    title: 'Luxury Villas',
    apiType: 'Villa',
    icon: <Star className="w-5 h-5" />,
    description: 'Exclusive villa communities',
  },
};

const CategoryListings: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.replace('/', '') || 'residential';
  const config = categoryConfig[category] || categoryConfig.residential;

  const { data: apiListings, isLoading } = useQuery({
    queryKey: ['listings', config.apiType],
    queryFn: () => fetchListings(config.apiType),
  });

  const mockListings = properties.filter(p => {
    if (category === 'residential') return p.type === 'Residential';
    if (category === 'commercial') return p.type === 'Commercial';
    return p.type === 'Residential';
  });

  const listings = apiListings?.length ? apiListings : mockListings;

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Link to="/listings" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to All Listings
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">{config.icon}</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">{config.title}</h1>
          </div>
          <p className="text-muted-foreground">{config.description}</p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden">
                <Skeleton className="aspect-[4/3]" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {listings.map((listing: Listing | typeof properties[0]) => (
              <Link key={listing.id} to={`/property/${listing.id}`} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={listing.image} alt={'name' in listing ? listing.name : ''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary text-primary-foreground">{listing.type}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm mb-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    {listing.location}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors">
                    {'name' in listing ? listing.name : ''}
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                    <Square className="w-3 h-3 sm:w-4 sm:h-4" />
                    {listing.area}
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="text-lg font-bold text-primary">{listing.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default CategoryListings;
