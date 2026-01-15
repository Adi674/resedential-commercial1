// API Base URL - Update this to your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

export interface Listing {
  id: string;
  title: string;
  description?: string;
  location: string;
  type: 'Residential' | 'Commercial' | 'Plot' | 'Villa';
  price: string;
  price_per_sqft?: number;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  image: string;
  images?: string[];
  status: string;
  amenities?: string[];
  developer?: string;
  brochure_url?: string;
}

export interface LeadQueryPayload {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  query_source: string;
}

export interface BrochureLeadPayload {
  name: string;
  phone: string;
  listing_id: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  brochure_url?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  access_token?: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Helper to strip non-digits from phone
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^0-9]/g, '');
};

// Fetch listings by type
export const fetchListings = async (type?: string): Promise<Listing[]> => {
  try {
    const url = type 
      ? `${API_BASE_URL}/listings/?type=${encodeURIComponent(type)}`
      : `${API_BASE_URL}/listings/`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch listings');
    
    const data = await response.json();
    return data.data || data || [];
  } catch (error) {
    console.error('Error fetching listings:', error);
    // Return mock data for development
    return [];
  }
};

// Fetch single listing by ID
export const fetchListingById = async (id: string): Promise<Listing | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`);
    if (!response.ok) throw new Error('Failed to fetch listing');
    
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
};

// Submit contact/query form
export const submitLeadQuery = async (payload: LeadQueryPayload): Promise<ApiResponse> => {
  try {
    const sanitizedPayload = {
      ...payload,
      phone: sanitizePhone(payload.phone),
    };
    
    const response = await fetch(`${API_BASE_URL}/leads/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedPayload),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

// Submit brochure download request
export const submitBrochureRequest = async (payload: BrochureLeadPayload): Promise<ApiResponse> => {
  try {
    const sanitizedPayload = {
      ...payload,
      phone: sanitizePhone(payload.phone),
    };
    
    const response = await fetch(`${API_BASE_URL}/leads/brochure`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedPayload),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error requesting brochure:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

// Auth login
export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

// Create listing (admin)
export const createListing = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating listing:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};
