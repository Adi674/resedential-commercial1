import React, { useState } from 'react';
import { Users, Phone, Plus, TrendingUp, Thermometer } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientTable from '@/components/dashboard/ClientTable';
import CallLogModal from '@/components/dashboard/CallLogModal';
import { Button } from '@/components/ui/button';
import { clients as mockClients, callLogs as mockCallLogs, teamMembers, Client, CallLog } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [callLogs, setCallLogs] = useState<CallLog[]>(mockCallLogs);

  const handleAddCallLog = (client?: Client) => {
    setSelectedClient(client || null);
    setIsCallLogModalOpen(true);
  };

  const handleCallLogSubmit = (log: CallLog) => {
    setCallLogs([log, ...callLogs]);
  };

  const handleUpdateTemperature = (clientId: string, temperature: 'Hot' | 'Warm' | 'Cold') => {
    setClients(
      clients.map((c) => (c.id === clientId ? { ...c, temperature } : c))
    );
    toast({
      title: 'Status Updated',
      description: `Client status changed to ${temperature}`,
    });
  };

  // Get team member name by ID
  const getTeamMemberName = (id: string) => {
    const member = teamMembers.find((m) => m.id === id);
    return member?.name || id;
  };

  // Enrich clients with team member names
  const enrichedClients = clients.map((c) => ({
    ...c,
    assignedTo: getTeamMemberName(c.assignedTo),
  }));

  const stats = [
    {
      label: 'Total Clients',
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
      label: 'Warm Leads',
      value: clients.filter((c) => c.temperature === 'Warm').length,
      icon: TrendingUp,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      label: 'Total Call Logs',
      value: callLogs.length,
      icon: Phone,
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Overview of all clients and team performance</p>
          </div>
          <Button className="btn-primary-gradient" onClick={() => handleAddCallLog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Call Log
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* All Clients */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Client Master List</h2>
          <ClientTable
            clients={enrichedClients}
            showTeamMember
            onAddCallLog={handleAddCallLog}
            onUpdateTemperature={handleUpdateTemperature}
            isAdmin
          />
        </div>

        {/* Recent Call Logs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Call Logs (All Team)</h2>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            {callLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{log.clientName}</div>
                    <div className="text-sm text-muted-foreground">{log.phone}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{log.createdByName}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{log.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call Log Modal */}
      <CallLogModal
        isOpen={isCallLogModalOpen}
        onClose={() => {
          setIsCallLogModalOpen(false);
          setSelectedClient(null);
        }}
        onSubmit={handleCallLogSubmit}
        prefilledData={
          selectedClient
            ? {
                clientId: selectedClient.id,
                clientName: selectedClient.name,
                phone: selectedClient.phone,
              }
            : undefined
        }
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;
