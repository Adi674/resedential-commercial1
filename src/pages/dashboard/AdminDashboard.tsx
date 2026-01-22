import React, { useState, useEffect } from 'react';
import { Users, Phone, Plus, TrendingUp, Thermometer, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientTable, { Client } from '@/components/dashboard/ClientTable';
import CallLogModal from '@/components/dashboard/CallLogModal';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { fetchLeads } from '@/services/api';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLeads();
      
      const formattedClients: Client[] = data.map((lead: any) => ({
        id: lead.user_id,
        name: lead.name || 'Unknown',
        phone: lead.phone,
        email: lead.email || 'N/A',
        source: lead.lead_source || 'Website',
        status: lead.lead_status || 'New',
        temperature: lead.lead_temperature || 'Cold',
        createdAt: lead.created_at,
        assignedTo: 'Unassigned'
      }));
      
      setClients(formattedClients);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
      toast({ title: "Error", description: "Failed to load leads", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddCallLog = (client?: Client) => {
    setSelectedClient(client || null);
    setIsCallLogModalOpen(true);
  };

  const handleCallLogSuccess = () => {
    setIsCallLogModalOpen(false);
    loadData(); // Refresh data
    toast({ title: "Success", description: "Call log added successfully" });
  };

  // Stats Logic
  const stats = [
    {
      label: 'Total Leads',
      value: clients.length,
      icon: Users,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Hot Leads',
      value: clients.filter((c) => c.temperature === 'Hot').length,
      icon: Thermometer,
      color: 'bg-red-100 text-red-600',
    },
    {
      label: 'New Leads',
      value: clients.filter((c) => c.status === 'New').length,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Warm Leads',
      value: clients.filter((c) => c.temperature === 'Warm').length,
      icon: Phone,
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Overview of all leads and team performance</p>
          </div>
          <Button className="btn-primary-gradient" onClick={() => handleAddCallLog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Call Log
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{isLoading ? "-" : stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Table - REMOVED onUpdateTemperature PROP */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Lead Master List</h2>
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <ClientTable
              clients={clients}
              showTeamMember={true} 
              onAddCallLog={handleAddCallLog}
              isAdmin={true}
            />
          )}
        </div>
      </div>

      {/* Call Log Modal */}
      <CallLogModal
        isOpen={isCallLogModalOpen}
        onClose={() => setIsCallLogModalOpen(false)}
        onSuccess={handleCallLogSuccess}
        prefilledData={selectedClient ? {
            clientId: selectedClient.id,
            clientName: selectedClient.name,
            phone: selectedClient.phone,
          } : undefined
        }
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;