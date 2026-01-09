import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Building, Home, MapPin, Ruler, Phone } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import LeadCaptureModal from '@/components/property/LeadCaptureModal';
import { commercialListings, residentialListings, ListingItem } from '@/data/mockData';

interface ListingCardProps {
  item: ListingItem;
  onContactClick: (title: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ item, onContactClick }) => {
  const buttonText = item.category === 'plots' 
    ? 'Enquire Now' 
    : item.category === 'generic' 
      ? 'Contact Us for Availability' 
      : item.category === 'villas-apartments'
        ? 'Contact Us for More'
        : 'View Details';

  const showContactButton = !item.hasDetailPage;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {item.image && (
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {item.subcategory && (
            <Badge className="absolute top-3 left-3 bg-primary/90">
              {item.subcategory}
            </Badge>
          )}
        </div>
      )}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
        {item.location && (
          <p className="text-muted-foreground text-sm flex items-center gap-1 mb-2">
            <MapPin className="w-4 h-4" />
            {item.location}
          </p>
        )}
        {item.specs && (
          <p className="text-muted-foreground text-sm flex items-center gap-1 mb-3">
            <Ruler className="w-4 h-4" />
            {item.specs}
          </p>
        )}
        {item.hasDetailPage && item.propertyId ? (
          <Link to={`/property/${item.propertyId}`}>
            <Button className="w-full">{buttonText}</Button>
          </Link>
        ) : showContactButton ? (
          <Button 
            className="w-full gap-2" 
            onClick={() => onContactClick(item.title)}
          >
            <Phone className="w-4 h-4" />
            {buttonText}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};

const Listings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('type') === 'residential' ? 'residential' : 'commercial';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');

  const handleContactClick = (title: string) => {
    setSelectedProperty(title);
    setIsModalOpen(true);
  };

  // Group commercial listings
  const featuredProjects = commercialListings.filter(item => item.category === 'featured-project');
  const retailShops = commercialListings.filter(item => item.category === 'retail-shops');
  const genericCommercial = commercialListings.filter(item => item.category === 'generic');

  // Group residential listings
  const villasApartments = residentialListings.filter(item => item.category === 'villas-apartments');
  const plots = residentialListings.filter(item => item.category === 'plots');

  return (
    <PublicLayout>
      <div className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Explore Properties
          </h1>
          <p className="text-primary-foreground/80 text-center max-w-2xl mx-auto">
            Find your perfect property in Greater Noida from our extensive collection of residential and commercial spaces
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="commercial" className="gap-2">
              <Building className="w-4 h-4" />
              Commercial
            </TabsTrigger>
            <TabsTrigger value="residential" className="gap-2">
              <Home className="w-4 h-4" />
              Residential
            </TabsTrigger>
          </TabsList>

          {/* Commercial Tab */}
          <TabsContent value="commercial" className="space-y-10">
            {/* Featured Projects */}
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-accent rounded-full"></span>
                Featured Projects
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((item) => (
                  <ListingCard key={item.id} item={item} onContactClick={handleContactClick} />
                ))}
              </div>
            </section>

            {/* Retail Shops & Society Shops */}
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-accent rounded-full"></span>
                Retail Shops & Society Shops
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {retailShops.map((item) => (
                  <ListingCard key={item.id} item={item} onContactClick={handleContactClick} />
                ))}
              </div>
            </section>

            {/* Generic Categories */}
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-accent rounded-full"></span>
                Other Commercial Spaces
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {genericCommercial.map((item) => (
                  <ListingCard key={item.id} item={item} onContactClick={handleContactClick} />
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Residential Tab */}
          <TabsContent value="residential" className="space-y-10">
            {/* Villas & Apartments */}
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-accent rounded-full"></span>
                Villas & Apartments
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {villasApartments.map((item) => (
                  <ListingCard key={item.id} item={item} onContactClick={handleContactClick} />
                ))}
              </div>
            </section>

            {/* Plots */}
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-accent rounded-full"></span>
                Plots
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plots.map((item) => (
                  <ListingCard key={item.id} item={item} onContactClick={handleContactClick} />
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="query"
        propertyName={selectedProperty}
      />
    </PublicLayout>
  );
};

export default Listings;
