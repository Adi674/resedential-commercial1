import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import CategoryListings from "./pages/CategoryListings";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AddListing from "./pages/admin/AddListing";

// Dashboard Pages
import TeamDashboard from "./pages/dashboard/TeamDashboard";
import TeamClients from "./pages/dashboard/TeamClients";
import TeamCallLogs from "./pages/dashboard/TeamCallLogs";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminClients from "./pages/dashboard/AdminClients";
import AdminCallLogs from "./pages/dashboard/AdminCallLogs";
import AdminSegmentation from "./pages/dashboard/AdminSegmentation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Category Routes */}
            <Route path="/residential" element={<CategoryListings />} />
            <Route path="/commercial" element={<CategoryListings />} />
            <Route path="/plots" element={<CategoryListings />} />
            <Route path="/villas" element={<CategoryListings />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AddListing />} />
            <Route path="/admin/add-listing" element={<AddListing />} />

            {/* Team Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="team">
                  <TeamDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/clients"
              element={
                <ProtectedRoute requiredRole="team">
                  <TeamClients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/call-logs"
              element={
                <ProtectedRoute requiredRole="team">
                  <TeamCallLogs />
                </ProtectedRoute>
              }
            />

            {/* Admin Dashboard Routes */}
            <Route
              path="/admin/overview"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/clients"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminClients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/call-logs"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCallLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/segmentation"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminSegmentation />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
