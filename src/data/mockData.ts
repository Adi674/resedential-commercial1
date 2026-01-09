export interface Property {
  id: string;
  name: string;
  developer: string;
  location: string;
  type: 'Residential' | 'Commercial';
  price: string;
  pricePerSqFt: number;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  image: string;
  featured: boolean;
  status: 'Ready to Move' | 'Under Construction' | 'New Launch';
  amenities: string[];
  category?: string;
  subcategory?: string;
}

export interface ListingItem {
  id: string;
  title: string;
  location?: string;
  specs?: string;
  category: 'featured-project' | 'retail-shops' | 'generic' | 'villas-apartments' | 'plots';
  subcategory?: string;
  type: 'Commercial' | 'Residential';
  image?: string;
  hasDetailPage?: boolean;
  propertyId?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  profession: string;
  source: string;
  temperature: 'Hot' | 'Warm' | 'Cold';
  assignedTo: string;
  createdAt: string;
  property?: string;
}

export interface CallLog {
  id: string;
  clientId: string;
  clientName: string;
  phone: string;
  notes: string;
  budget: string;
  siteVisitDiscussed: boolean;
  siteVisitTime?: string;
  customQuestions?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'team';
  avatar?: string;
}

export const properties: Property[] = [
  {
    id: '1',
    name: 'Mahagun Moderne',
    developer: 'Mahagun Group',
    location: 'Sector 78, Greater Noida',
    type: 'Residential',
    price: '₹1.2 Cr - ₹2.5 Cr',
    pricePerSqFt: 6500,
    area: '1850 - 3500 sq.ft',
    bedrooms: 3,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: true,
    status: 'Ready to Move',
    amenities: ['Swimming Pool', 'Gym', 'Club House', 'Power Backup', 'Security'],
  },
  {
    id: '2',
    name: 'ATS Pristine',
    developer: 'ATS Infrastructure',
    location: 'Sector 150, Greater Noida',
    type: 'Residential',
    price: '₹95 L - ₹1.8 Cr',
    pricePerSqFt: 5800,
    area: '1650 - 3100 sq.ft',
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    featured: true,
    status: 'Under Construction',
    amenities: ['Garden', 'Parking', 'Gym', 'Kids Play Area'],
  },
  {
    id: '3',
    name: 'Supertech Ecociti',
    developer: 'Supertech Limited',
    location: 'Sector 137, Greater Noida',
    type: 'Residential',
    price: '₹65 L - ₹1.1 Cr',
    pricePerSqFt: 4200,
    area: '1550 - 2600 sq.ft',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    featured: false,
    status: 'Ready to Move',
    amenities: ['Swimming Pool', 'Tennis Court', 'Club House'],
  },
  {
    id: '4',
    name: 'Galaxy Business Hub',
    developer: 'Galaxy Group',
    location: 'Sector 62, Greater Noida',
    type: 'Commercial',
    price: '₹45 L - ₹2.2 Cr',
    pricePerSqFt: 8500,
    area: '500 - 2500 sq.ft',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    featured: true,
    status: 'New Launch',
    amenities: ['Cafeteria', 'Conference Rooms', 'Parking', 'Power Backup'],
  },
  {
    id: '5',
    name: 'Gaur City Mall',
    developer: 'Gaursons India',
    location: 'Sector 16C, Greater Noida',
    type: 'Commercial',
    price: '₹35 L - ₹1.5 Cr',
    pricePerSqFt: 7200,
    area: '450 - 2000 sq.ft',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    featured: false,
    status: 'Under Construction',
    amenities: ['Food Court', 'Multiplex', 'Parking'],
  },
  {
    id: '6',
    name: 'Ace Divino',
    developer: 'ACE Group',
    location: 'Sector 1, Greater Noida',
    type: 'Residential',
    price: '₹55 L - ₹95 L',
    pricePerSqFt: 4800,
    area: '1150 - 1980 sq.ft',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    featured: false,
    status: 'Ready to Move',
    amenities: ['Swimming Pool', 'Gym', 'Jogging Track'],
  },
  {
    id: '7',
    name: 'Nirala Gateway',
    developer: 'Nirala Group',
    location: 'Sector 16, Greater Noida West',
    type: 'Commercial',
    price: '₹40 L - ₹1.8 Cr',
    pricePerSqFt: 7500,
    area: '500 - 2400 sq.ft',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    featured: true,
    status: 'Under Construction',
    amenities: ['Food Court', 'ATM', 'Parking', 'Power Backup'],
  },
  {
    id: '8',
    name: 'Diadem',
    developer: 'Diadem Developers',
    location: 'Sector 10, Greater Noida',
    type: 'Commercial',
    price: '₹55 L - ₹2 Cr',
    pricePerSqFt: 8000,
    area: '650 - 2500 sq.ft',
    image: 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80',
    featured: true,
    status: 'New Launch',
    amenities: ['Cafeteria', 'Conference Halls', 'Parking', 'Security'],
  },
  {
    id: '9',
    name: 'Bhutani Astrathum',
    developer: 'Bhutani Infra',
    location: 'Sector 12, Noida Extension',
    type: 'Commercial',
    price: '₹60 L - ₹3 Cr',
    pricePerSqFt: 9000,
    area: '700 - 3500 sq.ft',
    image: 'https://images.unsplash.com/photo-1464938050520-ef2571e2d2dc?w=800&q=80',
    featured: true,
    status: 'Under Construction',
    amenities: ['Rooftop Restaurant', 'Multiplex', 'Premium Parking', 'Sky Lounge'],
  },
];

// Commercial Listings Data
export const commercialListings: ListingItem[] = [
  // Featured Projects
  {
    id: 'c1',
    title: 'Nirala Gateway',
    location: 'Sector 16, Greater Noida West',
    category: 'featured-project',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    hasDetailPage: true,
    propertyId: '7',
  },
  {
    id: 'c2',
    title: 'Diadem',
    location: 'Sector 10, Greater Noida',
    category: 'featured-project',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80',
    hasDetailPage: true,
    propertyId: '8',
  },
  {
    id: 'c3',
    title: 'Bhutani Astrathum',
    location: 'Sector 12, Noida Extension',
    category: 'featured-project',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1464938050520-ef2571e2d2dc?w=800&q=80',
    hasDetailPage: true,
    propertyId: '9',
  },
  // Retail Shops
  {
    id: 'c4',
    title: 'Plaza near Techzone 5',
    location: 'Techzone 5, Greater Noida',
    category: 'retail-shops',
    type: 'Commercial',
    specs: '200 - 1500 sq.ft',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    hasDetailPage: true,
    propertyId: '5',
  },
  // Generic Categories
  {
    id: 'c5',
    title: 'Office Space',
    category: 'generic',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    hasDetailPage: false,
  },
  {
    id: 'c6',
    title: 'Studio Apartment',
    category: 'generic',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    hasDetailPage: false,
  },
  {
    id: 'c7',
    title: 'Food Court',
    category: 'generic',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    hasDetailPage: false,
  },
];

// Residential Listings Data
export const residentialListings: ListingItem[] = [
  // Villas & Apartments
  {
    id: 'r1',
    title: 'Independent House',
    location: 'Sector 78, Greater Noida',
    category: 'villas-apartments',
    subcategory: 'Independent House',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hasDetailPage: false,
  },
  {
    id: 'r2',
    title: 'Duplex Villa',
    location: 'Sector 150, Greater Noida',
    category: 'villas-apartments',
    subcategory: 'Duplex',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    hasDetailPage: false,
  },
  {
    id: 'r3',
    title: 'Pre-launch Projects',
    location: 'Greater Noida West',
    category: 'villas-apartments',
    subcategory: 'Pre-launch',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hasDetailPage: false,
  },
  {
    id: 'r4',
    title: 'Fresh Booking',
    location: 'Sector 1, Greater Noida',
    category: 'villas-apartments',
    subcategory: 'Fresh Booking',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hasDetailPage: false,
  },
  {
    id: 'r5',
    title: 'Ready to Move',
    location: 'Sector 137, Greater Noida',
    category: 'villas-apartments',
    subcategory: 'Ready-to-move',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hasDetailPage: false,
  },
  // Plots
  {
    id: 'r6',
    title: 'Gated Colony Plot',
    location: 'Sector-16B, Greater Noida',
    category: 'plots',
    subcategory: 'Gated Colony',
    specs: '60m - 2500m',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    hasDetailPage: false,
  },
  {
    id: 'r7',
    title: 'Authority Plot',
    location: 'Roza, Greater Noida',
    category: 'plots',
    subcategory: 'Authority Plots',
    specs: '100m - 1000m',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80',
    hasDetailPage: false,
  },
  {
    id: 'r8',
    title: 'Premium Authority Plot',
    location: 'Sector-16B, Greater Noida',
    category: 'plots',
    subcategory: 'Authority Plots',
    specs: '200m - 2500m',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80',
    hasDetailPage: false,
  },
];

export const clients: Client[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    gender: 'Male',
    profession: 'Software Engineer',
    source: 'Google',
    temperature: 'Hot',
    assignedTo: 'team1',
    createdAt: '2024-01-15',
    property: 'Mahagun Moderne',
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    gender: 'Female',
    profession: 'Doctor',
    source: 'Referral',
    temperature: 'Warm',
    assignedTo: 'team1',
    createdAt: '2024-01-18',
    property: 'ATS Pristine',
  },
  {
    id: '3',
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 76543 21098',
    gender: 'Male',
    profession: 'Business Owner',
    source: 'Facebook',
    temperature: 'Cold',
    assignedTo: 'team2',
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    email: 'sneha.gupta@email.com',
    phone: '+91 65432 10987',
    gender: 'Female',
    profession: 'Teacher',
    source: 'YouTube',
    temperature: 'Hot',
    assignedTo: 'team2',
    createdAt: '2024-01-22',
    property: 'Galaxy Business Hub',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 54321 09876',
    gender: 'Male',
    profession: 'Lawyer',
    source: 'Website',
    temperature: 'Warm',
    assignedTo: 'team1',
    createdAt: '2024-01-25',
  },
];

export const callLogs: CallLog[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    notes: 'Very interested in 3BHK. Budget is flexible. Wants site visit this weekend.',
    budget: '₹1.5 Cr',
    siteVisitDiscussed: true,
    siteVisitTime: '2024-01-20 10:00 AM',
    createdBy: 'team1',
    createdByName: 'Neha Verma',
    createdAt: '2024-01-16 14:30',
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Priya Patel',
    phone: '+91 87654 32109',
    notes: 'Looking for investment property. Prefers ready-to-move.',
    budget: '₹1 Cr',
    siteVisitDiscussed: false,
    createdBy: 'team1',
    createdByName: 'Neha Verma',
    createdAt: '2024-01-19 11:15',
  },
  {
    id: '3',
    clientId: '4',
    clientName: 'Sneha Gupta',
    phone: '+91 65432 10987',
    notes: 'Interested in commercial property for clinic setup.',
    budget: '₹50 L',
    siteVisitDiscussed: true,
    siteVisitTime: '2024-01-25 02:00 PM',
    createdBy: 'team2',
    createdByName: 'Rajesh Kumar',
    createdAt: '2024-01-23 16:45',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'team1',
    name: 'Neha Verma',
    email: 'team@company.com',
    role: 'team',
  },
  {
    id: 'team2',
    name: 'Rajesh Kumar',
    email: 'team2@company.com',
    role: 'team',
  },
  {
    id: 'admin1',
    name: 'Suresh Mehta',
    email: 'admin@company.com',
    role: 'admin',
  },
];

export const marketTrendData = [
  { month: 'Jan', price: 4200, growth: 2.5 },
  { month: 'Feb', price: 4350, growth: 3.5 },
  { month: 'Mar', price: 4500, growth: 3.4 },
  { month: 'Apr', price: 4650, growth: 3.3 },
  { month: 'May', price: 4800, growth: 3.2 },
  { month: 'Jun', price: 5100, growth: 6.3 },
  { month: 'Jul', price: 5300, growth: 3.9 },
  { month: 'Aug', price: 5500, growth: 3.8 },
  { month: 'Sep', price: 5750, growth: 4.5 },
  { month: 'Oct', price: 6000, growth: 4.3 },
  { month: 'Nov', price: 6200, growth: 3.3 },
  { month: 'Dec', price: 6500, growth: 4.8 },
];

export const sources = [
  'Google',
  'Facebook',
  'Instagram',
  'YouTube',
  'Referral',
  'Website',
  'Walk-in',
  'Other',
];
