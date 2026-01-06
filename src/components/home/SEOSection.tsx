import React from 'react';
import { Home, Building, MapPin, TrendingUp, Shield, Users } from 'lucide-react';

const SEOSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="section-title">
            Premium <span className="text-primary">Residential</span> & <span className="text-primary">Commercial</span> Properties in <span className="text-primary">Greater Noida</span>
          </h1>
          <h2 className="text-lg md:text-xl text-muted-foreground mt-4">
            Your trusted partner for finding the perfect property investment in NCR's most promising real estate destination
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* Feature Cards */}
          <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Residential Excellence</h3>
            <p className="text-muted-foreground text-sm">
              Discover premium apartments, villas, and plots from top developers in Greater Noida's prime sectors.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Commercial Spaces</h3>
            <p className="text-muted-foreground text-sm">
              Office spaces, retail shops, and commercial complexes for businesses looking to establish in Greater Noida.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Prime Locations</h3>
            <p className="text-muted-foreground text-sm">
              Strategic locations with excellent connectivity to Delhi, Noida, and upcoming Jewar Airport.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Investment Growth</h3>
            <p className="text-muted-foreground text-sm">
              Track market trends and make informed investment decisions with our expert analysis.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Verified Properties</h3>
            <p className="text-muted-foreground text-sm">
              All listed properties are verified with clear documentation and RERA compliance.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
            <p className="text-muted-foreground text-sm">
              Our experienced team provides personalized assistance throughout your property journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOSection;
