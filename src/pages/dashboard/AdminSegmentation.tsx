import React, { useState } from 'react';
import { Thermometer, Flame, Sun, Snowflake } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientTable from '@/components/dashboard/ClientTable';
import CallLogModal from '@/components/dashboard/CallLogModal';
import { clients as mockClients, teamMembers, Client, CallLog, callLogs as mockCallLogs } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const AdminSegmentation: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
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

  // Enrich and segment clients
  const enrichedClients = clients.map((c) => ({
    ...c,
    assignedTo: getTeamMemberName(c.assignedTo),
  }));

  const hotLeads = enrichedClients.filter((c) => c.temperature === 'Hot');
  const warmLeads = enrichedClients.filter((c) => c.temperature === 'Warm');
  const coldLeads = enrichedClients.filter((c) => c.temperature === 'Cold');

  const segments = [
    {
      id: 'hot',
      label: 'Hot Leads',
      icon: Flame,
      color: 'text-red-500',
      count: hotLeads.length,
      clients: hotLeads,
    },
    {
      id: 'warm',
      label: 'Warm Leads',
      icon: Sun,
      color: 'text-amber-500',
      count: warmLeads.length,
      clients: warmLeads,
    },
    {
      id: 'cold',
      label: 'Cold Leads',
      icon: Snowflake,
      color: 'text-blue-500',
      count: coldLeads.length,
      clients: coldLeads,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Thermometer className="w-6 h-6 text-primary" />
            Lead Segmentation
          </h1>
          <p className="text-muted-foreground">View and manage clients by their temperature status</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {segments.map((segment) => (
            <div
              key={segment.id}
              className="bg-card rounded-xl border border-border p-6 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center`}>
                <segment.icon className={`w-6 h-6 ${segment.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{segment.count}</div>
                <div className="text-sm text-muted-foreground">{segment.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Segmented Tabs */}
        <Tabs defaultValue="hot" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {segments.map((segment) => (
              <TabsTrigger key={segment.id} value={segment.id} className="flex items-center gap-2">
                <segment.icon className={`w-4 h-4 ${segment.color}`} />
                {segment.label} ({segment.count})
              </TabsTrigger>
            ))}
          </TabsList>

          {segments.map((segment) => (
            <TabsContent key={segment.id} value={segment.id}>
              {segment.clients.length > 0 ? (
                <ClientTable
                  clients={segment.clients}
                  showTeamMember
                  onAddCallLog={handleAddCallLog}
                  onUpdateTemperature={handleUpdateTemperature}
                  isAdmin
                />
              ) : (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <segment.icon className={`w-12 h-12 mx-auto mb-4 ${segment.color}`} />
                  <h3 className="font-semibold mb-2">No {segment.label}</h3>
                  <p className="text-muted-foreground">
                    Clients with {segment.id} status will appear here
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
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

export default AdminSegmentation;
