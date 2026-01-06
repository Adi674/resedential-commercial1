import React from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import HeroCarousel from '@/components/home/HeroCarousel';
import SEOSection from '@/components/home/SEOSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import AboutSection from '@/components/home/AboutSection';

const Index: React.FC = () => {
  return (
    <PublicLayout>
      <HeroCarousel />
      <SEOSection />
      <FeaturedProperties />
      <AboutSection />
    </PublicLayout>
  );
};

export default Index;
