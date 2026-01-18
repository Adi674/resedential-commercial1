import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { submitLeadQuery } from '@/services/api';
import { Loader2, Send, AlertCircle, CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15, 'Phone must be at most 15 digits'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  source?: string;
  compact?: boolean;
  onSuccess?: () => void;
  listingId?: string | null; // <--- NEW PROP
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  source = 'Website', 
  compact = false,
  onSuccess,
  listingId = null // Default to null (General Query)
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    // Pass listingId to the backend (it will handle the rest)
    const response = await submitLeadQuery({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      message: data.message || undefined,
      query_source: source,
      listing_id: listingId || undefined, // Hidden from user, sent to DB
    });

    setIsSubmitting(false);

    if (response.success) {
      setSuccess(true);
      reset();
      onSuccess?.();
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setError(response.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Thank you! We'll get back to you soon.</AlertDescription>
        </Alert>
      )}

      <div className={compact ? 'space-y-3' : 'grid sm:grid-cols-2 gap-4'}>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm">Name *</Label>
          <Input id="name" placeholder="Your name" {...register('name')} className={errors.name ? 'border-destructive' : ''} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm">Phone *</Label>
          <Input id="phone" type="tel" placeholder="Your phone number" {...register('phone')} className={errors.phone ? 'border-destructive' : ''} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      {!compact && (
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm">Email (Optional)</Label>
          <Input id="email" type="email" placeholder="your@email.com" {...register('email')} className={errors.email ? 'border-destructive' : ''} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm">Message {compact ? '(Optional)' : ''}</Label>
        <Textarea id="message" placeholder="Tell us about your requirements..." rows={compact ? 2 : 4} {...register('message')} />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;