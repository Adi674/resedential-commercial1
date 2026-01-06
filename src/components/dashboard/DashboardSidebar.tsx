import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  LogOut, 
  Building2,
  Thermometer,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isAdmin = user?.role === 'admin';
  const basePath = isAdmin ? '/admin' : '/dashboard';

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: basePath },
    { icon: Users, label: 'Clients', path: `${basePath}/clients` },
    { icon: Phone, label: 'Call Logs', path: `${basePath}/call-logs` },
    ...(isAdmin ? [{ icon: Thermometer, label: 'Segmentation', path: `${basePath}/segmentation` }] : []),
  ];

  return (
    <div className="w-64 bg-sidebar h-screen flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-sidebar-foreground">PrimeEstates</span>
            <span className="text-xs text-sidebar-foreground/60 -mt-1">CRM Portal</span>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sidebar-accent-foreground font-semibold">
              {user?.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-sidebar-foreground">{user?.name}</div>
            <div className="text-xs text-sidebar-foreground/60 capitalize">{user?.role} Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
