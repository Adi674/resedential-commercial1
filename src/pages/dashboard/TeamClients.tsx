import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientTable, { Client } from '@/components/dashboard/ClientTable';
import CallLogModal from '@/components/dashboard/CallLogModal';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { fetchLeads } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

const TeamClients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLeads();
      const formatted = data.map((l: any) => ({
        id: l.user_id,
        name: l.name || 'Unknown',
        phone: l.phone,
        email: l.email,
        source: l.lead_source || 'Website',
        status: l.lead_status || 'New',
        temperature: l.lead_temperature || 'Warm',
        createdAt: l.created_at,
      }));
      setClients(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadLeads(); }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleAddCallLog = (client: Client) => {
    setSelectedClient(client);
    setIsCallLogModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Leads</h1>

        <div className="flex items-center gap-4 bg-card p-4 rounded-lg border">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <ClientTable
            clients={filteredClients}
            onAddCallLog={handleAddCallLog}
          />
        )}
      </div>

      <CallLogModal
        isOpen={isCallLogModalOpen}
        onClose={() => setIsCallLogModalOpen(false)}
        onSuccess={() => {
          setIsCallLogModalOpen(false);
          toast({ title: 'Success', description: 'Log saved.' });
        }}
        prefilledData={selectedClient ? {
          clientId: selectedClient.id,
          clientName: selectedClient.name,
          phone: selectedClient.phone
        } : undefined}
      />
    </DashboardLayout>
  );
};

export default TeamClients;