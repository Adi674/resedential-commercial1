import React, { useState } from 'react';
import { Users } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientTable from '@/components/dashboard/ClientTable';
import CallLogModal from '@/components/dashboard/CallLogModal';
import { clients as mockClients, callLogs as mockCallLogs, Client, CallLog } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const TeamClients: React.FC = () => {
  const { user } = useAuth();
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [callLogs, setCallLogs] = useState<CallLog[]>(mockCallLogs);

  // Filter clients assigned to this team member
  const assignedClients = mockClients.filter((c) => c.assignedTo === user?.id);

  const handleAddCallLog = (client: Client) => {
    setSelectedClient(client);
    setIsCallLogModalOpen(true);
  };

  const handleCallLogSubmit = (log: CallLog) => {
    setCallLogs([log, ...callLogs]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Clients</h1>
          <p className="text-muted-foreground">Manage your assigned clients</p>
        </div>

        {assignedClients.length > 0 ? (
          <ClientTable
            clients={assignedClients}
            onAddCallLog={handleAddCallLog}
          />
        ) : (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No clients assigned</h3>
            <p className="text-muted-foreground">Clients will appear here once assigned to you</p>
          </div>
        )}
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

export default TeamClients;
