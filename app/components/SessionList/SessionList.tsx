import { useNavigate } from '@remix-run/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import type { Database } from '~/types/supabase';

type EEGSession = Database['public']['Tables']['eeg_sessions']['Row'];

interface SessionListProps {
  sessions: EEGSession[];
}

export function SessionList({ sessions }: SessionListProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map(session => (
            <TableRow
              key={session.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(`/sessions/${session.id}`)}
            >
              <TableCell className="font-medium">
                {session.title || 'Untitled Session'}
              </TableCell>
              <TableCell>
                {session.created_at
                  ? new Date(session.created_at).toLocaleDateString()
                  : 'N/A'}
              </TableCell>
              <TableCell>
                {session.updated_at
                  ? new Date(session.updated_at).toLocaleDateString()
                  : 'N/A'}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/sessions/${session.id}`);
                  }}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {sessions.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No sessions found. Create your first one!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
