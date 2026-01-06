import React, { useState } from 'react';
import { Users, Phone, Plus, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientTable from '@/components/dashboard/ClientTable';
import CallLogModal from '@/components/dashboard/CallLogModal';
import { Button } from '@/components/ui/button';
import { clients as mockClients, callLogs as mockCallLogs, Client, CallLog } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const TeamDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [callLogs, setCallLogs] = useState<CallLog[]>(mockCallLogs);

  // Filter clients assigned to this team member
  const assignedClients = mockClients.filter((c) => c.assignedTo === user?.id);
  
  // Filter call logs created by this team member
  const myCallLogs = callLogs.filter((log) => log.createdBy === user?.id);

  const handleAddCallLog = (client?: Client) => {
    setSelectedClient(client || null);
    setIsCallLogModalOpen(true);
  };

  const handleCallLogSubmit = (log: CallLog) => {
    setCallLogs([log, ...callLogs]);
  };

  const stats = [
    {
      label: 'Assigned Clients',
      value: assignedClients.length,
      icon: Users,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Hot Leads',
      value: assignedClients.filter((c) => c.temperature === 'Hot').length,
      icon: TrendingUp,
      color: 'bg-red-100 text-red-600',
    },
    {
      label: 'My Call Logs',
      value: myCallLogs.length,
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
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Here's an overview of your assigned clients</p>
          </div>
          <Button className="btn-primary-gradient" onClick={() => handleAddCallLog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Call Log
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Assigned Clients */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Assigned Clients</h2>
          {assignedClients.length > 0 ? (
            <ClientTable
              clients={assignedClients}
              onAddCallLog={handleAddCallLog}
            />
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No clients assigned yet</h3>
              <p className="text-muted-foreground">Clients will appear here once assigned to you</p>
            </div>
          )}
        </div>

        {/* My Call Logs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Recent Call Logs</h2>
          {myCallLogs.length > 0 ? (
            <div className="bg-card rounded-xl border border-border divide-y divide-border">
              {myCallLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{log.clientName}</div>
                      <div className="text-sm text-muted-foreground">{log.phone}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{log.notes}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No call logs yet</h3>
              <p className="text-muted-foreground mb-4">Start logging your client calls</p>
              <Button onClick={() => handleAddCallLog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Call Log
              </Button>
            </div>
          )}
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

export default TeamDashboard;
