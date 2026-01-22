import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createCallLog } from '@/services/api'; // Import Real API
import { Loader2, Save, Phone } from 'lucide-react';

// Validation Schema
const callLogSchema = z.object({
  phone: z.string().min(10, 'Phone number is required'),
  interaction_type: z.string(),
  notes: z.string().min(1, 'Notes are required'),
  next_action: z.string().optional(),
  next_follow_up_date: z.string().optional(),
  site_visit_status: z.string().optional(),
});

type CallLogFormData = z.infer<typeof callLogSchema>;

// Corrected Interface matching AdminClients usage
interface CallLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // <--- This fixes the TypeScript error
  prefilledData?: {
    clientId?: string;
    clientName?: string;
    phone?: string;
  };
}

const CallLogModal: React.FC<CallLogModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  prefilledData 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    setValue, 
    reset, 
    formState: { errors } 
  } = useForm<CallLogFormData>({
    resolver: zodResolver(callLogSchema),
    defaultValues: {
      interaction_type: 'Call',
    }
  });

  // Prefill data when modal opens
  useEffect(() => {
    if (isOpen && prefilledData) {
      if (prefilledData.phone) setValue('phone', prefilledData.phone);
    } else if (!isOpen) {
      reset();
      setError(null);
    }
  }, [isOpen, prefilledData, setValue, reset]);

  const onSubmit = async (data: CallLogFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Call Real API
      const response = await createCallLog({
        phone: data.phone,
        interaction_type: data.interaction_type,
        notes: data.notes,
        next_action: data.next_action,
        next_follow_up_date: data.next_follow_up_date || undefined,
        site_visit_status: data.site_visit_status
      });

      if (response.success) {
        onSuccess(); // Trigger parent refresh
      } else {
        setError(response.message || 'Failed to save log.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Log Interaction {prefilledData?.clientName ? `- ${prefilledData.clientName}` : ''}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone *</Label>
              <Input 
                {...register('phone')} 
                placeholder="9876543210" 
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label>Type</Label>
              <Select onValueChange={(val) => setValue('interaction_type', val)} defaultValue="Call">
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Call">Call</SelectItem>
                  <SelectItem value="Site Visit">Site Visit</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes *</Label>
            <Textarea 
              {...register('notes')} 
              placeholder="What was discussed?" 
              rows={3} 
              className={errors.notes ? "border-red-500" : ""}
            />
            {errors.notes && <p className="text-xs text-red-500">{errors.notes.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Next Action</Label>
              <Input {...register('next_action')} placeholder="e.g. Call back" />
            </div>
            <div className="space-y-2">
              <Label>Follow-up Date</Label>
              <Input type="date" {...register('next_follow_up_date')} />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full btn-primary-gradient" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save Log
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