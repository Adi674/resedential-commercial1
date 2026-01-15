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
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import BrochureModal from '@/components/forms/BrochureModal';
import LeadCaptureModal from '@/components/property/LeadCaptureModal';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { properties, Property } from '@/data/mockData';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock images array for gallery
  const propertyImages = property ? [
    property.image,
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  ] : [];

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

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
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Button */}
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>

        {/* Image Gallery */}
        <div className="mb-6 sm:mb-8">
          {/* Main Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden mb-3">
            <img
              src={propertyImages[currentImageIndex]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 hover:bg-card transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 hover:bg-card transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex gap-2 mb-2 sm:mb-3">
                <Badge className={`text-xs ${property.type === 'Residential' ? 'bg-primary' : 'bg-accent text-accent-foreground'}`}>
                  {property.type}
                </Badge>
                <Badge variant="secondary" className="bg-card/90 text-foreground text-xs">
                  {property.status}
                </Badge>
              </div>
              <h1 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-card mb-1 sm:mb-2">
                {property.name}
              </h1>
              <div className="flex items-center gap-1 text-card/80 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                {property.location}
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {propertyImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Key Details */}
            <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
              <h2 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {property.bedrooms && (
                  <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/50">
                    <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                    <div className="font-semibold text-sm sm:text-base">{property.bedrooms} Bedrooms</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/50">
                    <Bath className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                    <div className="font-semibold text-sm sm:text-base">{property.bathrooms} Bathrooms</div>
                  </div>
                )}
                <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/50">
                  <Square className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                  <div className="font-semibold text-sm sm:text-base">{property.area}</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/50">
                  <Building className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                  <div className="font-semibold text-sm sm:text-base">{property.developer}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
              <h2 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Description</h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {property.name} by {property.developer} is a premium {property.type.toLowerCase()} project 
                located in {property.location}. This {property.status.toLowerCase()} property offers 
                modern amenities and excellent connectivity. With {property.area} of living space, 
                this property is perfect for families looking for quality living in Greater Noida.
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
              <h2 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Price Card */}
            <div className="bg-card rounded-xl border border-border p-4 sm:p-6 lg:sticky lg:top-24">
              <div className="mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm text-muted-foreground">Price Range</div>
                <div className="text-xl sm:text-2xl font-bold text-primary">{property.price}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  ₹{property.pricePerSqFt.toLocaleString()}/sq.ft
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Button
                  className="w-full btn-hero text-sm sm:text-base"
                  onClick={() => setShowBrochureModal(true)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-sm sm:text-base"
                  onClick={() => setShowQueryModal(true)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Any Query?
                </Button>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
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

      {/* Brochure Modal */}
      <BrochureModal
        isOpen={showBrochureModal}
        onClose={() => setShowBrochureModal(false)}
        listingId={property.id}
        propertyName={property.name}
      />

      {/* Query Modal */}
      {showQueryModal && (
        <LeadCaptureModal
          isOpen={showQueryModal}
          onClose={() => setShowQueryModal(false)}
          type="query"
          propertyName={property.name}
        />
      )}
    </PublicLayout>
  );
};

export default PropertyDetail;
