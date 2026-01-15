import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import ContactForm from '@/components/forms/ContactForm';

const Contact: React.FC = () => {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have questions about properties? Get in touch with our expert team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
            <ContactForm source="Contact Page" />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-sm text-muted-foreground">
                      Sector 78, Greater Noida,<br />
                      Uttar Pradesh 201310
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      info@primeestates.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Working Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Mon - Sat: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-muted rounded-xl h-48 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Map Integration</p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contact;
