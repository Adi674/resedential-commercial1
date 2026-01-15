import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createListing } from '@/services/api';
import { Loader2, Upload, AlertCircle, CheckCircle, ArrowLeft, Image, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const listingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(3, 'Location is required'),
  type: z.enum(['Residential', 'Commercial', 'Plot', 'Villa']),
  price: z.string().min(1, 'Price is required'),
  area: z.string().min(1, 'Area is required'),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  developer: z.string().optional(),
  status: z.string().min(1, 'Status is required'),
});

type ListingFormData = z.infer<typeof listingSchema>;

const AddListing: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [brochure, setBrochure] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      type: 'Residential',
      status: 'Under Construction',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBrochure(e.target.files[0]);
    }
  };

  const onSubmit = async (data: ListingFormData) => {
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    
    // Append form fields
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    // Append images
    images.forEach((image) => {
      formData.append('images', image);
    });

    // Append brochure if present
    if (brochure) {
      formData.append('brochure', brochure);
    }

    const response = await createListing(formData);

    setIsSubmitting(false);

    if (response.success) {
      toast.success('Listing created successfully!');
      navigate('/admin/dashboard');
    } else {
      setError(response.message || 'Failed to create listing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Listing</CardTitle>
            <CardDescription>
              Create a new property listing with images and brochure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Property name"
                    {...register('title')}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-xs text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Property description"
                    rows={4}
                    {...register('description')}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  {errors.description && (
                    <p className="text-xs text-destructive">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Sector 78, Greater Noida"
                    {...register('location')}
                    className={errors.location ? 'border-destructive' : ''}
                  />
                  {errors.location && (
                    <p className="text-xs text-destructive">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    onValueChange={(value) => setValue('type', value as ListingFormData['type'])}
                    defaultValue="Residential"
                  >
                    <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Plot">Plot</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-xs text-destructive">{errors.type.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    placeholder="₹1.2 Cr - ₹2.5 Cr"
                    {...register('price')}
                    className={errors.price ? 'border-destructive' : ''}
                  />
                  {errors.price && (
                    <p className="text-xs text-destructive">{errors.price.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area *</Label>
                  <Input
                    id="area"
                    placeholder="1850 - 3500 sq.ft"
                    {...register('area')}
                    className={errors.area ? 'border-destructive' : ''}
                  />
                  {errors.area && (
                    <p className="text-xs text-destructive">{errors.area.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    placeholder="3"
                    {...register('bedrooms')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    placeholder="2"
                    {...register('bathrooms')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="developer">Developer</Label>
                  <Input
                    id="developer"
                    placeholder="Developer name"
                    {...register('developer')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    onValueChange={(value) => setValue('status', value)}
                    defaultValue="Under Construction"
                  >
                    <SelectTrigger className={errors.status ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                      <SelectItem value="Under Construction">Under Construction</SelectItem>
                      <SelectItem value="New Launch">New Launch</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-xs text-destructive">{errors.status.message}</p>
                  )}
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="images">Property Images *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <Image className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload images
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 10MB each
                      </p>
                    </label>
                  </div>
                  {images.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      {images.length} image(s) selected
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brochure">Brochure (PDF)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Input
                      id="brochure"
                      type="file"
                      accept=".pdf"
                      onChange={handleBrochureChange}
                      className="hidden"
                    />
                    <label htmlFor="brochure" className="cursor-pointer">
                      <FileText className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload brochure
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF up to 50MB
                      </p>
                    </label>
                  </div>
                  {brochure && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      {brochure.name}
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Listing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Create Listing
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddListing;
