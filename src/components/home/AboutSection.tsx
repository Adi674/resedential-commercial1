import React from 'react';
import { Award, Clock, Users, Building2 } from 'lucide-react';

const stats = [
  { icon: Building2, value: '500+', label: 'Properties Listed' },
  { icon: Users, value: '1000+', label: 'Happy Clients' },
  { icon: Clock, value: '15+', label: 'Years Experience' },
  { icon: Award, value: '50+', label: 'Awards Won' },
];

const AboutSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">About Us</span>
            <h2 className="section-title mt-2 text-2xl sm:text-3xl md:text-4xl">
              Your Trusted Real Estate Partner in Greater Noida
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              With over 15 years of experience in the Greater Noida real estate market, PrimeEstates has 
              established itself as a trusted name for both residential and commercial property solutions. 
              Our deep understanding of the local market, combined with our commitment to transparency and 
              customer satisfaction, makes us the preferred choice for property seekers.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              We partner with leading developers like Mahagun, ATS, Supertech, and Galaxy to bring you 
              verified properties with clear documentation. Whether you're looking for your dream home or 
              a strategic commercial investment, our expert team is here to guide you every step of the way.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 sm:p-4 rounded-lg bg-muted/50">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Real estate team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
