import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import LeadCaptureModal from '@/components/property/LeadCaptureModal';

const FloatingQueryCTA: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group animate-pulse hover:animate-none"
        aria-label="Query Us"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="query"
        propertyName="General Inquiry"
      />
    </>
  );
};

export default FloatingQueryCTA;
