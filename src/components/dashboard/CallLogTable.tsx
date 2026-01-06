import React from 'react';
import { Phone, Calendar, User, CheckCircle, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CallLog } from '@/data/mockData';

interface CallLogTableProps {
  logs: CallLog[];
  showCreatedBy?: boolean;
}

const CallLogTable: React.FC<CallLogTableProps> = ({ logs, showCreatedBy = false }) => {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Client</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Site Visit</TableHead>
            {showCreatedBy && <TableHead>Logged By</TableHead>}
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id} className="hover:bg-muted/30">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-medium">{log.clientName}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  {log.phone}
                </div>
              </TableCell>
              <TableCell className="max-w-xs">
                <p className="text-sm truncate">{log.notes}</p>
                {log.customQuestions && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    Q: {log.customQuestions}
                  </p>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{log.budget || 'Not specified'}</Badge>
              </TableCell>
              <TableCell>
                {log.siteVisitDiscussed ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Yes</span>
                    </div>
                    {log.siteVisitTime && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.siteVisitTime).toLocaleString()}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm">No</span>
                  </div>
                )}
              </TableCell>
              {showCreatedBy && (
                <TableCell>
                  <span className="text-sm">{log.createdByName}</span>
                </TableCell>
              )}
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(log.createdAt).toLocaleDateString()}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CallLogTable;
