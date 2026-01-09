import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingQueryCTA from '@/components/FloatingQueryCTA';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <FloatingQueryCTA />
    </div>
  );
};

export default PublicLayout;
