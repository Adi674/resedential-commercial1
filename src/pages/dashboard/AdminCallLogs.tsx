import React, { useState } from 'react';
import { Phone, Plus } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CallLogTable from '@/components/dashboard/CallLogTable';
import CallLogModal from '@/components/dashboard/CallLogModal';
import { Button } from '@/components/ui/button';
import { callLogs as mockCallLogs, CallLog } from '@/data/mockData';

const AdminCallLogs: React.FC = () => {
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [callLogs, setCallLogs] = useState<CallLog[]>(mockCallLogs);

  const handleCallLogSubmit = (log: CallLog) => {
    setCallLogs([log, ...callLogs]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">All Call Logs</h1>
            <p className="text-muted-foreground">View call logs from all team members</p>
          </div>
          <Button className="btn-primary-gradient" onClick={() => setIsCallLogModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Call Log
          </Button>
        </div>

        {callLogs.length > 0 ? (
          <CallLogTable logs={callLogs} showCreatedBy />
        ) : (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No call logs yet</h3>
            <p className="text-muted-foreground">Call logs from team will appear here</p>
          </div>
        )}
      </div>

      <CallLogModal
        isOpen={isCallLogModalOpen}
        onClose={() => setIsCallLogModalOpen(false)}
        onSubmit={handleCallLogSubmit}
      />
    </DashboardLayout>
  );
};

export default AdminCallLogs;
