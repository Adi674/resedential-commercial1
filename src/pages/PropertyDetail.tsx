import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Square, Download, Phone, ArrowLeft, CheckCircle, Building, 
  Calendar, ChevronLeft, ChevronRight, Loader2 
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import BrochureModal from '@/components/forms/BrochureModal';
import LeadCaptureModal from '@/components/property/LeadCaptureModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchListingById, Listing } from '@/services/api';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadDetail = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await fetchListingById(id);
        setProperty(data);
      } catch (error) {
        console.error("Error loading property", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  // Use API images or fallback
  const propertyImages = property?.images && property.images.length > 0 
    ? property.images 
    : ['/placeholder.svg'];

  const nextImage = () => setCurrentImageIndex((p) => (p + 1) % propertyImages.length);
  const prevImage = () => setCurrentImageIndex((p) => (p - 1 + propertyImages.length) % propertyImages.length);

  if (isLoading) return <PublicLayout><div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div></PublicLayout>;
  if (!property) return <PublicLayout><div className="text-center py-20">Property Not Found</div></PublicLayout>;

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/listings" className="inline-flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Listings
        </Link>

        {/* Gallery Section */}
        <div className="mb-8">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-3 bg-gray-100">
            <img src={propertyImages[currentImageIndex]} alt={property.title} className="w-full h-full object-cover" />
            
            {propertyImages.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"><ChevronLeft className="w-5 h-5"/></button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"><ChevronRight className="w-5 h-5"/></button>
              </>
            )}

            <div className="absolute bottom-6 left-6">
              <Badge className="mb-2 bg-primary">{property.property_type}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white shadow-black drop-shadow-md">{property.title}</h1>
              <div className="flex items-center gap-2 text-white/90 mt-1">
                <MapPin className="w-5 h-5" /> {property.location}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-xl border p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Square className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-semibold">{property.size}</div>
                <div className="text-xs text-muted-foreground">Size</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Building className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-semibold">{property.property_type}</div>
                <div className="text-xs text-muted-foreground">Type</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-semibold">{property.status}</div>
                <div className="text-xs text-muted-foreground">Status</div>
              </div>
            </div>

            <div className="bg-card rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description || "No description available for this property."}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <div className="mb-4">
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="text-3xl font-bold text-primary">{property.price}</div>
              </div>
              
              <div className="space-y-3">
                {/* FIXED: Button is now ALWAYS visible to capture the lead */}
                <Button className="w-full" onClick={() => setShowBrochureModal(true)}>
                  <Download className="w-4 h-4 mr-2" /> Download Brochure
                </Button>
                
                <Button variant="outline" className="w-full" onClick={() => setShowQueryModal(true)}>
                  <Phone className="w-4 h-4 mr-2" /> Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brochure Modal connects to Backend API */}
      <BrochureModal
        isOpen={showBrochureModal}
        onClose={() => setShowBrochureModal(false)}
        listingId={property.listing_id} // Pass the real ID
        propertyName={property.title}
      />

      {showQueryModal && (
        <LeadCaptureModal
          isOpen={showQueryModal}
          onClose={() => setShowQueryModal(false)}
          type="query"
          propertyName={property.title}
          listingId={property.listing_id}
        />
      )}
    </PublicLayout>
  );
};

export default PropertyDetail;