import React, { useState } from 'react';
import { Download, Phone, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sources } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'brochure' | 'query';
  propertyName: string;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  type,
  propertyName,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    propertyType: '',
    userType: '',
    source: '',
    preferredTime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.budget || !formData.propertyType || !formData.userType) {
      toast({
        title: 'Please fill all required fields',
        description: 'Name, Mobile Number, Budget, Property Type, and User Type are mandatory.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (type === 'brochure') {
      // Simulate file download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${propertyName.replace(/\s+/g, '-')}-brochure.pdf`;
      // In real app, this would trigger actual download
      toast({
        title: 'Brochure Download Started',
        description: 'Your brochure is being downloaded.',
      });
    } else {
      toast({
        title: 'Query Submitted Successfully',
        description: 'We will connect with you soon!',
      });
    }

    setIsSubmitting(false);
    onClose();
    setFormData({
      name: '',
      phone: '',
      budget: '',
      propertyType: '',
      userType: '',
      source: '',
      preferredTime: '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            {type === 'brochure' ? (
              <>
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Download Brochure
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Have a Query?
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="name" className="text-sm">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="phone" className="text-sm">Mobile Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="budget" className="text-sm">Budget *</Label>
              <Input
                id="budget"
                placeholder="e.g., ₹50 L - ₹1 Cr"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label className="text-sm">Type of Property *</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              >
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label className="text-sm">Type of User *</Label>
              <Select
                value={formData.userType}
                onValueChange={(value) => setFormData({ ...formData, userType: value })}
              >
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="end-user">End User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-sm">How did you hear about us?</Label>
            <Select
              value={formData.source}
              onValueChange={(value) => setFormData({ ...formData, source: value })}
            >
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {type === 'query' && (
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="preferredTime" className="text-sm">Preferred Time to Call</Label>
              <Input
                id="preferredTime"
                placeholder="e.g., Weekdays 2-5 PM"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="text-sm sm:text-base"
              />
            </div>
          )}

          <div className="pt-4">
            <Button type="submit" className="w-full btn-hero" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : type === 'brochure' ? (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 mr-2" />
                  Submit Query
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
