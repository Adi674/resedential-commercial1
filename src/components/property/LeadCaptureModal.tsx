import React, { useState } from 'react';
import { X, Download, Phone, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
    email: '',
    gender: '',
    profession: '',
    source: '',
    preferredTime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      email: '',
      gender: '',
      profession: '',
      source: '',
      preferredTime: '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {type === 'brochure' ? (
              <>
                <Download className="w-5 h-5 text-primary" />
                Download Brochure
              </>
            ) : (
              <>
                <Phone className="w-5 h-5 text-primary" />
                Have a Query?
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gender *</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="font-normal">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="font-normal">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="font-normal">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profession *</Label>
            <Input
              id="profession"
              placeholder="e.g., Software Engineer, Doctor, Business Owner"
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>How did you hear about us? *</Label>
            <Select
              value={formData.source}
              onValueChange={(value) => setFormData({ ...formData, source: value })}
            >
              <SelectTrigger>
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
            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Time to Call *</Label>
              <Input
                id="preferredTime"
                placeholder="e.g., Weekdays 2-5 PM"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                required
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
