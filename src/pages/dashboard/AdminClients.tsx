import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientTable from '@/components/dashboard/ClientTable';
import CallLogModal from '@/components/dashboard/CallLogModal';
import { clients as mockClients, callLogs as mockCallLogs, teamMembers, Client, CallLog } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const AdminClients: React.FC = () => {
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [callLogs, setCallLogs] = useState<CallLog[]>(mockCallLogs);

  const handleAddCallLog = (client: Client) => {
    setSelectedClient(client);
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">All Clients</h1>
          <p className="text-muted-foreground">Manage all clients across the organization</p>
        </div>

        <ClientTable
          clients={enrichedClients}
          showTeamMember
          onAddCallLog={handleAddCallLog}
          onUpdateTemperature={handleUpdateTemperature}
          isAdmin
        />
      </div>

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

export default AdminClients;
