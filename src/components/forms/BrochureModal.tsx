import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { submitBrochureRequest } from '@/services/api';
import { Loader2, Download, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const brochureSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15, 'Phone must be at most 15 digits'),
});

type BrochureFormData = z.infer<typeof brochureSchema>;

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  propertyName: string;
}

const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  listingId,
  propertyName,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrochureFormData>({
    resolver: zodResolver(brochureSchema),
  });

  const onSubmit = async (data: BrochureFormData) => {
    setIsSubmitting(true);
    setError(null);

    const response = await submitBrochureRequest({
      name: data.name,
      phone: data.phone,
      listing_id: listingId,
    });

    setIsSubmitting(false);

    if (response.success && response.brochure_url) {
      // Open brochure in new tab
      window.open(response.brochure_url, '_blank');
      toast.success('Brochure is downloading...');
      reset();
      onClose();
    } else {
      setError(response.message || 'Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    setError(null);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Download Brochure</DialogTitle>
          <DialogDescription>
            Get the complete brochure for <span className="font-semibold text-foreground">{propertyName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="brochure-name">Name *</Label>
            <Input
              id="brochure-name"
              placeholder="Your name"
              {...register('name')}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="brochure-phone">Phone *</Label>
            <Input
              id="brochure-phone"
              type="tel"
              placeholder="Your phone number"
              {...register('phone')}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Brochure
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrochureModal;
