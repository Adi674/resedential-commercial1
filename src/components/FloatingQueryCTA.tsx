import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadCaptureModal from '@/components/property/LeadCaptureModal';
import { useLocation } from 'react-router-dom';

const FloatingQueryCTA: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation(); // Hook to get current URL

  // Logic to determine if we are on a Property Detail page
  // URL Format: /property/123-abc-456
  const isPropertyPage = location.pathname.startsWith('/property/');
  
  // Extract Listing ID if we are on a property page
  const listingId = isPropertyPage 
    ? location.pathname.split('/')[2] 
    : null;

  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {isOpen ? (
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg bg-destructive hover:bg-destructive/90"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            className="h-12 rounded-full shadow-lg gap-2 px-4 animate-bounce-subtle"
            onClick={() => setIsOpen(true)}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="hidden sm:inline">Enquire Now</span>
          </Button>
        )}
      </div>

      <LeadCaptureModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        // If on property page, pass the ID. Else pass null.
        listingId={listingId}
        propertyName={isPropertyPage ? "this property" : undefined}
        type="query"
      />
    </>
  );
};

export default FloatingQueryCTA;