// src/services/api.ts
// ============================================
// API Configuration
// ============================================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get authentication headers with JWT token
 * Automatically includes token from localStorage if available
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

/**
 * Strip non-digit characters from phone number
 * Example: "+91 98765-43210" becomes "919876543210"
 */
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^0-9]/g, '');
};

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Listing {
  listing_id: string;
  title: string;
  description?: string;
  location: string;
  type: 'Residential' | 'Commercial' | 'Plot' | 'Villa';
  price: string;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  images?: string[];
  status: string;
  developer?: string;
  brochure_url?: string;
  created_at: string;
}

export interface LeadQueryPayload {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  query_source: string;
  budget?: string;
  property_type?: string;
  user_type?: string;
  listing_id?: string;
}

export interface BrochureLeadPayload {
  name: string;
  phone: string;
  listing_id: string;
  email?: string;
}

export interface CallLogPayload {
  phone: string;
  interaction_type?: string;
  notes: string;
  next_action?: string;
  next_follow_up_date?: string;
  site_visit_status?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  brochure_url?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  access_token?: string;
  token_type?: string;
}

export interface User {
  user_id: number;
  username: string;
  full_name: string;
  role: 'admin' | 'team';
  phone?: string;
  is_active: boolean;
}

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

/**
 * Login user and get JWT token
 * @param username - User's username/email
 * @param password - User's password
 * @returns AuthResponse with token if successful
 */
export const loginApi = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      return { 
        success: false, 
        message: error.detail || 'Invalid username or password' 
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      access_token: data.access_token,
      token_type: data.token_type,
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      message: 'Network error. Please check your connection.' 
    };
  }
};

/**
 * Get current authenticated user details
 * @returns User object or null if not authenticated
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get user info');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

// ============================================
// LISTINGS ENDPOINTS
// ============================================

/**
 * Fetch all listings with optional type filter
 * @param type - Optional property type filter (Residential, Commercial, etc.)
 * @returns Array of listings
 */
export const fetchListings = async (type?: string): Promise<Listing[]> => {
  try {
    const url = type 
      ? `${API_BASE_URL}/listings/?type=${encodeURIComponent(type)}`
      : `${API_BASE_URL}/listings/`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
};

/**
 * Fetch single listing by ID
 * @param id - Listing ID
 * @returns Listing object or null if not found
 */
export const fetchListingById = async (id: string): Promise<Listing | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch listing');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
};

/**
 * Create new listing (Admin only)
 * @param formData - FormData with listing details and files
 * @returns ApiResponse with created listing
 */
export const createListing = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`${API_BASE_URL}/listings/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData - browser sets it with boundary
      },
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      return { 
        success: false, 
        message: error.detail || error.message || 'Failed to create listing' 
      };
    }
    
    const data = await response.json();
    return { 
      success: true, 
      message: data.message || 'Listing created successfully',
      data 
    };
  } catch (error) {
    console.error('Error creating listing:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

// ============================================
// LEADS ENDPOINTS
// ============================================

/**
 * Submit contact/query form (Public endpoint)
 * @param payload - Lead query details
 * @returns ApiResponse with success/error message
 */
export const submitLeadQuery = async (payload: LeadQueryPayload): Promise<ApiResponse> => {
  try {
    // Sanitize phone before sending
    const sanitizedPayload = {
      ...payload,
      phone: sanitizePhone(payload.phone),
      email: payload.email || undefined, // Remove empty strings
    };
    
    const response = await fetch(`${API_BASE_URL}/leads/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedPayload),
    });
    
    if (!response.ok) {
      const error = await response.json();
      return { 
        success: false, 
        message: error.detail || error.message || 'Failed to submit query' 
      };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting query:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

/**
 * Submit brochure download request (Public endpoint)
 * @param payload - Brochure request details
 * @returns ApiResponse with brochure URL
 */
export const submitBrochureRequest = async (payload: BrochureLeadPayload): Promise<ApiResponse> => {
  try {
    const sanitizedPayload = {
      ...payload,
      phone: sanitizePhone(payload.phone),
      email: payload.email || undefined,
    };
    
    const response = await fetch(`${API_BASE_URL}/leads/brochure`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedPayload),
    });
    
    if (!response.ok) {
      const error = await response.json();
      return { 
        success: false, 
        message: error.detail || error.message || 'Failed to download brochure' 
      };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error requesting brochure:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

/**
 * Fetch all leads (Protected - requires authentication)
 * @param status - Optional status filter
 * @returns Array of leads
 */
export const fetchLeads = async (status?: string): Promise<any[]> => {
  try {
    const url = status 
      ? `${API_BASE_URL}/leads/?status=${encodeURIComponent(status)}`
      : `${API_BASE_URL}/leads/`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
};

/**
 * Fetch single lead by user ID
 * @param userId - User/Lead ID
 * @returns Lead object with all details
 */
export const fetchLeadById = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads/${userId}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch lead');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching lead:', error);
    return null;
  }
};

// ============================================
// CALL LOGS ENDPOINTS
// ============================================

/**
 * Create new call log (Protected)
 * @param payload - Call log details
 * @returns ApiResponse with created log
 */
export const createCallLog = async (payload: CallLogPayload): Promise<ApiResponse> => {
  try {
    const sanitizedPayload = {
      ...payload,
      phone: sanitizePhone(payload.phone),
    };
    
    const response = await fetch(`${API_BASE_URL}/logs/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(sanitizedPayload),
    });
    
    if (!response.ok) {
      const error = await response.json();
      return { 
        success: false, 
        message: error.detail || 'Failed to create call log' 
      };
    }
    
    const data = await response.json();
    return { 
      success: true, 
      message: 'Call log saved successfully',
      data 
    };
  } catch (error) {
    console.error('Error creating call log:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

/**
 * Fetch call logs for a specific user
 * @param userId - User/Lead ID
 * @returns Array of call logs
 */
export const fetchCallLogs = async (userId: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/logs/${userId}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch call logs');
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching call logs:', error);
    return [];
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if backend is healthy and reachable
 * @returns boolean indicating backend status
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};