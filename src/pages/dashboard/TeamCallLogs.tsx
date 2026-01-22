import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Phone, Calendar, Clock, Loader2 } from 'lucide-react';
import { fetchLeads, fetchCallLogs } from '@/services/api';

const TeamCallLogs: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // 1. Load Leads (To select from)
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLeads(); // Fetch leads visible to this team member
        setLeads(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingLeads(false);
      }
    };
    load();
  }, []);

  // 2. Load Logs (When a lead is clicked)
  useEffect(() => {
    const loadLogs = async () => {
      if (!selectedLeadId) return;
      setLoadingLogs(true);
      try {
        const data = await fetchCallLogs(selectedLeadId);
        setLogs(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingLogs(false);
      }
    };
    loadLogs();
  }, [selectedLeadId]);

  const filteredLeads = leads.filter(l => 
    (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-100px)] flex flex-col">
        <h1 className="text-2xl font-bold mb-6">My Call History</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* LEFT: Lead Selector */}
          <Card className="col-span-1 flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search Lead..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              {loadingLeads ? (
                <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary"/></div>
              ) : (
                <div className="divide-y">
                  {filteredLeads.map(lead => (
                    <div 
                      key={lead.user_id}
                      onClick={() => setSelectedLeadId(lead.user_id)}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${selectedLeadId === lead.user_id ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
                    >
                      <div className="font-medium truncate">{lead.name || 'Unknown User'}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {lead.phone}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </Card>

          {/* RIGHT: Logs Viewer */}
          <Card className="col-span-1 md:col-span-2 flex flex-col h-full overflow-hidden">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="text-lg">
                {selectedLeadId 
                  ? `History: ${leads.find(l => l.user_id === selectedLeadId)?.name || 'Lead'}`
                  : "Select a Lead to view history"
                }
              </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1 p-6">
              {!selectedLeadId ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Phone className="w-12 h-12 mb-4 opacity-20" />
                  <p>Select a lead to see what you discussed.</p>
                </div>
              ) : loadingLogs ? (
                <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : logs.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No logs found for this lead.</div>
              ) : (
                <div className="space-y-6">
                  {logs.map((log) => (
                    <div key={log.call_id} className="relative pl-8 border-l-2 border-border pb-6 last:pb-0">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                      <div className="bg-muted/30 rounded-lg p-4 -mt-2">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold text-primary">{log.interaction_type}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {new Date(log.created_at).toLocaleDateString()}
                            <Clock className="w-3 h-3 ml-2" /> {new Date(log.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                        <p className="text-sm mb-3">{log.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamCallLogs;