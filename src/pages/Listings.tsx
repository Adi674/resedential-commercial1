import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Building, Home, MapPin, Ruler, Phone, Map, Star, Loader2 } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import LeadCaptureModal from '@/components/property/LeadCaptureModal';
import { fetchListings, Listing } from '@/services/api';

// --- RESTORED: Dynamic Button Logic ---
const getButtonText = (category: string, propertyType: string) => {
  if (propertyType === 'Plot') return 'Enquire Now';
  if (category === 'generic') return 'Contact for Availability';
  if (category === 'villas-apartments') return 'Contact for More';
  return 'View Details';
};

interface ListingCardProps {
  item: Listing;
  onContactClick: (title: string, id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ item, onContactClick }) => {
  const buttonText = getButtonText(item.listing_category, item.property_type);
  // Logic: Plots usually don't have detailed pages in some designs, 
  // but if you want all to have details, keep this check simple.
  const showDetailButton = item.property_type !== 'Plot'; 

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
      <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">No Image</div>
        )}
        <Badge className="absolute top-2 left-2 bg-primary/90 text-xs">
          {item.listing_category || item.property_type}
        </Badge>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
        <div className="space-y-2 mb-4 flex-grow">
          {item.location && (
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {item.location}
            </p>
          )}
          {item.size && (
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Ruler className="w-4 h-4" /> {item.size}
            </p>
          )}
           {item.price && <p className="text-primary font-bold text-sm">{item.price}</p>}
        </div>

        <div className="mt-auto space-y-2">
          {showDetailButton && (
            <Link to={`/property/${item.listing_id}`} className="w-full block">
               <Button variant="outline" className="w-full">View Details</Button>
            </Link>
          )}
          <Button className="w-full gap-2" onClick={() => onContactClick(item.title, item.listing_id)}>
            <Phone className="w-4 h-4" /> {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Listings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'residential';
  const [activeTab, setActiveTab] = useState(initialType);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  useEffect(() => {
    const loadListings = async () => {
      setIsLoading(true);
      try {
        const apiType = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
        const data = await fetchListings(apiType);
        setListings(data);
      } catch (error) {
        console.error("Failed to load listings", error);
      } finally {
        setIsLoading(false);
      }
    };
    setSearchParams({ type: activeTab });
    loadListings();
  }, [activeTab, setSearchParams]);

  const handleContactClick = (title: string, id: string) => {
    setSelectedProperty(title);
    setSelectedListingId(id); // Store the ID
    setIsModalOpen(true);
  };

  // --- RESTORED: Client-Side Grouping Logic ---
  // This mimics your old mock data categorization
  const featuredProjects = listings.filter(i => i.listing_category?.toLowerCase().includes('featured'));
  const retailShops = listings.filter(i => i.listing_category?.toLowerCase().includes('retail'));
  const otherListings = listings.filter(i => 
    !i.listing_category?.toLowerCase().includes('featured') && 
    !i.listing_category?.toLowerCase().includes('retail')
  );

  const categories = [
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building },
    { id: 'plots', label: 'Plots', icon: Map },
    { id: 'villas', label: 'Villas', icon: Star },
  ];

  return (
    <PublicLayout>
      <div className="bg-primary py-10 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Explore Properties</h1>
          <p className="text-white/80">Find your perfect property in Greater Noida</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 sm:grid-cols-4 mb-8">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="gap-2">
                <cat.icon className="w-4 h-4" /> {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="min-h-[300px]">
            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
            ) : (
              <>
                {/* COMMERCIAL TAB SPECIAL LAYOUT */}
                {activeTab === 'commercial' && listings.length > 0 ? (
                  <div className="space-y-10">
                    {featuredProjects.length > 0 && (
                      <section>
                        <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                          <span className="w-1 h-8 bg-accent rounded-full"></span> Featured Projects
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {featuredProjects.map(item => <ListingCard key={item.listing_id} item={item} onContactClick={handleContactClick} />)}
                        </div>
                      </section>
                    )}
                    
                    {retailShops.length > 0 && (
                      <section>
                        <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                          <span className="w-1 h-8 bg-accent rounded-full"></span> Retail Shops
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {retailShops.map(item => <ListingCard key={item.listing_id} item={item} onContactClick={handleContactClick} />)}
                        </div>
                      </section>
                    )}

                    {otherListings.length > 0 && (
                      <section>
                         <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                          <span className="w-1 h-8 bg-accent rounded-full"></span> Commercial Spaces
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {otherListings.map(item => <ListingCard key={item.listing_id} item={item} onContactClick={handleContactClick} />)}
                        </div>
                      </section>
                    )}
                  </div>
                ) : (
                  // STANDARD GRID FOR OTHER TABS
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.length > 0 ? (
                      listings.map(item => <ListingCard key={item.listing_id} item={item} onContactClick={handleContactClick} />)
                    ) : (
                      <div className="col-span-full text-center py-12 text-gray-500">No properties found.</div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </Tabs>
      </div>
      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="query" 
        propertyName={selectedProperty}
        listingId={selectedListingId} // ADD THIS PROP
      />
    </PublicLayout>
  );
};

export default Listings;