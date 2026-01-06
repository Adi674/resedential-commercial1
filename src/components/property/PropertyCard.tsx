import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/data/mockData';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link
      to={`/property/${property.id}`}
      className="card-property group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={property.type === 'Residential' ? 'bg-primary' : 'bg-accent text-accent-foreground'}>
            {property.type}
          </Badge>
          <Badge variant="secondary" className="bg-card/90 text-foreground">
            {property.status}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          {property.location}
        </div>
        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
          {property.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">by {property.developer}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              {property.bathrooms} Baths
            </span>
          )}
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            {property.area}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground">Starting from</div>
            <div className="text-lg font-bold text-primary">{property.price}</div>
          </div>
          <div className="text-xs text-muted-foreground">
            ₹{property.pricePerSqFt.toLocaleString()}/sq.ft
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
