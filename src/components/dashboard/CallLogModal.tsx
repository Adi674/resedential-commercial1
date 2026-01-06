import React, { useState } from 'react';
import { Phone, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface CallLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (log: any) => void;
  prefilledData?: {
    clientName?: string;
    phone?: string;
    clientId?: string;
  };
}

const CallLogModal: React.FC<CallLogModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  prefilledData,
}) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phone: prefilledData?.phone || '',
    clientName: prefilledData?.clientName || '',
    notes: '',
    budget: '',
    siteVisitDiscussed: false,
    siteVisitTime: '',
    customQuestions: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newLog = {
      id: Date.now().toString(),
      clientId: prefilledData?.clientId || Date.now().toString(),
      ...formData,
      createdBy: user?.id,
      createdByName: user?.name,
      createdAt: new Date().toISOString(),
    };

    onSubmit(newLog);
    toast({
      title: 'Call Log Added',
      description: 'The call log has been saved successfully.',
    });

    setIsSubmitting(false);
    onClose();
    setFormData({
      phone: '',
      clientName: '',
      notes: '',
      budget: '',
      siteVisitDiscussed: false,
      siteVisitTime: '',
      customQuestions: '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Phone className="w-5 h-5 text-primary" />
            Add Call Log
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Call Notes *</Label>
            <Textarea
              id="notes"
              placeholder="Enter detailed notes from the call..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              placeholder="e.g., ₹1.5 Cr"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <Label htmlFor="siteVisit">Site Visit Discussed?</Label>
              <p className="text-xs text-muted-foreground">Toggle if site visit was discussed</p>
            </div>
            <Switch
              id="siteVisit"
              checked={formData.siteVisitDiscussed}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, siteVisitDiscussed: checked })
              }
            />
          </div>

          {formData.siteVisitDiscussed && (
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="siteVisitTime">Scheduled Site Visit Time</Label>
              <Input
                id="siteVisitTime"
                type="datetime-local"
                value={formData.siteVisitTime}
                onChange={(e) => setFormData({ ...formData, siteVisitTime: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="customQuestions">Custom Questions/Notes</Label>
            <Textarea
              id="customQuestions"
              placeholder="Any additional questions or specific requirements..."
              value={formData.customQuestions}
              onChange={(e) => setFormData({ ...formData, customQuestions: e.target.value })}
              rows={3}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full btn-primary-gradient" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 mr-2" />
                  Save Call Log
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CallLogModal;
