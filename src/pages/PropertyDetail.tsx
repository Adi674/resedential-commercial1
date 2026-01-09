import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Download, 
  Phone, 
  ArrowLeft,
  CheckCircle,
  Building,
  Calendar
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import LeadCaptureModal from '@/components/property/LeadCaptureModal';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { properties, Property } from '@/data/mockData';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalType, setModalType] = useState<'brochure' | 'query' | null>(null);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = properties.find((p) => p.id === id);
      setProperty(found || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="aspect-[16/9] bg-muted rounded-xl" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
              <div className="h-64 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!property) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-8">The property you're looking for doesn't exist.</p>
          <Link to="/listings">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Button>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-8">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex gap-2 mb-3">
              <Badge className={property.type === 'Residential' ? 'bg-primary' : 'bg-accent text-accent-foreground'}>
                {property.type}
              </Badge>
              <Badge variant="secondary" className="bg-card/90 text-foreground">
                {property.status}
              </Badge>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-card mb-2">
              {property.name}
            </h1>
            <div className="flex items-center gap-1 text-card/80">
              <MapPin className="w-5 h-5" />
              {property.location}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Details */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-semibold text-xl mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.bedrooms && (
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="font-semibold">{property.bedrooms} Bedrooms</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <Bath className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="font-semibold">{property.bathrooms} Bathrooms</div>
                  </div>
                )}
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Square className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold">{property.area}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Building className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold">{property.developer}</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-semibold text-xl mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <div className="mb-4">
                <div className="text-sm text-muted-foreground">Price Range</div>
                <div className="text-2xl font-bold text-primary">{property.price}</div>
                <div className="text-sm text-muted-foreground">
                  ₹{property.pricePerSqFt.toLocaleString()}/sq.ft
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full btn-hero"
                  onClick={() => setModalType('brochure')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setModalType('query')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Any Query?
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {property.status === 'Ready to Move' 
                      ? 'Immediate Possession' 
                      : 'Expected by Dec 2025'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {modalType && (
        <LeadCaptureModal
          isOpen={!!modalType}
          onClose={() => setModalType(null)}
          type={modalType}
          propertyName={property.name}
        />
      )}
    </PublicLayout>
  );
};

export default PropertyDetail;
