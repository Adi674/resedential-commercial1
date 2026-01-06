import React from 'react';
import { Phone, Mail, User, MoreHorizontal, Eye, PhoneCall } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Client } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ClientTableProps {
  clients: Client[];
  showTeamMember?: boolean;
  onViewDetails?: (client: Client) => void;
  onAddCallLog?: (client: Client) => void;
  onUpdateTemperature?: (clientId: string, temperature: 'Hot' | 'Warm' | 'Cold') => void;
  isAdmin?: boolean;
}

const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  showTeamMember = false,
  onViewDetails,
  onAddCallLog,
  onUpdateTemperature,
  isAdmin = false,
}) => {
  const getTemperatureClass = (temp: string) => {
    switch (temp) {
      case 'Hot':
        return 'status-hot';
      case 'Warm':
        return 'status-warm';
      case 'Cold':
        return 'status-cold';
      default:
        return '';
    }
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Client</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Profession</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Temperature</TableHead>
            {showTeamMember && <TableHead>Assigned To</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="hover:bg-muted/30">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-xs text-muted-foreground">{client.gender}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    {client.phone}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    {client.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>{client.profession}</TableCell>
              <TableCell>
                <Badge variant="secondary">{client.source}</Badge>
              </TableCell>
              <TableCell>
                {isAdmin && onUpdateTemperature ? (
                  <Select
                    value={client.temperature}
                    onValueChange={(value: 'Hot' | 'Warm' | 'Cold') =>
                      onUpdateTemperature(client.id, value)
                    }
                  >
                    <SelectTrigger className={cn('w-24', getTemperatureClass(client.temperature))}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hot">Hot</SelectItem>
                      <SelectItem value="Warm">Warm</SelectItem>
                      <SelectItem value="Cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={getTemperatureClass(client.temperature)}>
                    {client.temperature}
                  </Badge>
                )}
              </TableCell>
              {showTeamMember && (
                <TableCell>
                  <span className="text-sm">{client.assignedTo}</span>
                </TableCell>
              )}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onViewDetails && (
                      <DropdownMenuItem onClick={() => onViewDetails(client)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                    )}
                    {onAddCallLog && (
                      <DropdownMenuItem onClick={() => onAddCallLog(client)}>
                        <PhoneCall className="w-4 h-4 mr-2" />
                        Add Call Log
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;
