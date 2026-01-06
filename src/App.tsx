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
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

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
            <Route path="/login" element={<Login />} />

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
              path="/admin"
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
