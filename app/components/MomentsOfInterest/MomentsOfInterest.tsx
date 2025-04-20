import { useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useVideoPlayer } from '~/contexts/VideoPlayerContext';
import type { Database } from '~/types/database.types';

type MomentRow = Database['public']['Tables']['moments_of_interest']['Row'];

interface MomentsOfInterestProps {
  sessionId: string;
  initialMoments?: MomentRow[];
}

export function MomentsOfInterest({
  sessionId,
  initialMoments = [],
}: MomentsOfInterestProps) {
  const [moments, setMoments] = useState<MomentRow[]>(initialMoments);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');
  const fetcher = useFetcher();
  const { getRealWorldTime } = useVideoPlayer();

  const addNewMoment = () => {
    const realWorldTime = getRealWorldTime();
    if (!realWorldTime) {
      alert(
        'Please start playing the video first to capture the correct timestamp',
      );
      return;
    }

    const formData = new FormData();
    formData.append('intent', 'create');
    formData.append('timestamp', realWorldTime.toISOString());
    formData.append('note', '');

    fetcher.submit(formData, {
      method: 'post',
      action: `/api/moments/${sessionId}`,
    });
  };

  useEffect(() => {
    if (fetcher.data && fetcher.state === 'idle') {
      const response = fetcher.data as MomentRow | { success: boolean };

      if ('id' in response) {
        // Handle create response
        const newMoment = response as MomentRow;
        setMoments(prev => [...prev, newMoment]);
        setEditingId(newMoment.id);
        setEditNote('');
      } else if ('success' in response) {
        // Handle update response
        const updatedNote = editNote;
        setMoments(prev =>
          prev.map(m =>
            m.id === editingId ? { ...m, notes: updatedNote } : m,
          ),
        );
        setEditingId(null);
      }
    }
  }, [fetcher.data, fetcher.state]);

  const startEditing = (moment: MomentRow) => {
    setEditingId(moment.id);
    setEditNote(moment.notes || '');
  };

  const saveMoment = (id: string) => {
    const formData = new FormData();
    formData.append('intent', 'update');
    formData.append('id', id);
    formData.append('note', editNote);

    fetcher.submit(formData, {
      method: 'post',
      action: `/api/moments/${sessionId}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Moments of Interest</h2>
        <Button onClick={addNewMoment}>Add Moment</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moments.map(moment => (
            <TableRow key={moment.id}>
              <TableCell>
                {new Date(moment.timestamp).toLocaleString()}
              </TableCell>
              <TableCell>
                {editingId === moment.id ? (
                  <Input
                    value={editNote}
                    onChange={e => setEditNote(e.target.value)}
                    placeholder="Enter note..."
                  />
                ) : (
                  moment.notes
                )}
              </TableCell>
              <TableCell>
                {editingId === moment.id ? (
                  <Button size="sm" onClick={() => saveMoment(moment.id)}>
                    Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(moment)}
                  >
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
