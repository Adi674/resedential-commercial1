import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Calendar, User, MessageSquare } from 'lucide-react';

// Interface matching Real API Data
export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source?: string;
  status: string;
  temperature: string;
  createdAt: string;
  assignedTo?: string; 
}

interface ClientTableProps {
  clients: Client[];
  showTeamMember?: boolean;
  onAddCallLog: (client: Client) => void;
  onViewLogs?: (client: Client) => void; // New prop to view history
  isAdmin?: boolean;
}

const ClientTable: React.FC<ClientTableProps> = ({ 
  clients, 
  showTeamMember = false, 
  onAddCallLog,
  onViewLogs
}) => {
  
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'interested': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTempColor = (temp: string) => {
    switch (temp?.toLowerCase()) {
      case 'hot': return 'bg-red-100 text-red-700 border-red-200';
      case 'warm': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cold': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Source</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            {showTeamMember && <TableHead>Assigned To</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {client.phone}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-col gap-1 items-start">
                    <Badge variant="secondary" className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getTempColor(client.temperature)}`}>
                      {client.temperature}
                    </Badge>
                  </div>
                </TableCell>
                
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {client.source}
                </TableCell>
                
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(client.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
                
                {showTeamMember && (
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {client.assignedTo?.charAt(0) || <User className="w-3 h-3" />}
                      </div>
                      <span className="text-sm">{client.assignedTo}</span>
                    </div>
                  </TableCell>
                )}
                
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onViewLogs && (
                      <Button variant="ghost" size="icon" onClick={() => onViewLogs(client)}>
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => onAddCallLog(client)}>
                      <Phone className="w-4 h-4 mr-2" /> Log Call
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;