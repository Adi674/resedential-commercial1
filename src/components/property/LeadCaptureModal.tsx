import React, { useState } from 'react';
import { Download, Phone, Loader2, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sources } from '@/data/mockData'; // Keep this for the dropdown options
import { toast } from '@/components/ui/use-toast'; // Ensure correct import path
import { Alert, AlertDescription } from '@/components/ui/alert';

// IMPORT REAL API
import { submitBrochureRequest, submitLeadQuery } from '@/services/api';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'brochure' | 'query';
  propertyName: string;
  listingId?: string | null; // <--- NEW REQUIRED PROP
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  type,
  propertyName,
  listingId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    propertyType: '',
    userType: '',
    source: 'Website',
    preferredTime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // 1. Basic Validation
    if (!formData.name || !formData.phone) {
      setError("Name and Phone are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      let response;

      // 2. LOGIC SWITCH: Brochure vs Query
      if (type === 'brochure') {
        // A. BROCHURE: Simple payload, expects URL back
        if (!listingId) {
          throw new Error("Property ID is missing. Cannot download brochure.");
        }
        
        response = await submitBrochureRequest({
          name: formData.name,
          phone: formData.phone,
          listing_id: listingId,
          email: formData.email
        });

        if (response.success && response.brochure_url) {
          // Success: Open PDF
          window.open(response.brochure_url, '_blank');
          toast({ title: 'Success', description: 'Brochure is downloading...' });
          handleClose();
        } else {
          setError(response.message || 'Failed to get brochure.');
        }

      } else {
        // B. QUERY: Full payload
        response = await submitLeadQuery({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          query_source: formData.source,
          // Optional fields mapping
          budget: formData.budget,
          property_type: formData.propertyType,
          user_type: formData.userType,
          listing_id: listingId || undefined // Can be null for general queries
        });

        if (response.success) {
          toast({ title: 'Success', description: 'We will connect with you soon!' });
          handleClose();
        } else {
          setError(response.message || 'Submission failed.');
        }
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setFormData({
      name: '', phone: '', email: '', budget: '', 
      propertyType: '', userType: '', source: 'Website', preferredTime: ''
    });
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            {type === 'brochure' ? (
              <>
                <Download className="w-5 h-5 text-primary" />
                Download Brochure for {propertyName}
              </>
            ) : (
              <>
                <Phone className="w-5 h-5 text-primary" />
                Enquire about {propertyName || "us"}
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* COMMON FIELDS */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Mobile Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          {/* HIDE EXTRA FIELDS IF DOWNLOADING BROCHURE (Keep it fast) */}
          {type === 'query' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    placeholder="e.g., ₹50 L - ₹1 Cr"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Type of Property</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type of User</Label>
                  <Select
                    value={formData.userType}
                    onValueChange={(value) => setFormData({ ...formData, userType: value })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="end-user">End User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => setFormData({ ...formData, source: value })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                    <SelectContent>
                      {sources.map((source) => (
                        <SelectItem key={source} value={source}>{source}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait...
                </>
              ) : type === 'brochure' ? (
                <>
                  <Download className="w-4 h-4 mr-2" /> Download Now
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 mr-2" /> Submit Query
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;