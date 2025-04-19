import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Textarea } from '~/components/ui/textarea';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { Database } from '~/types/supabase';

interface EEGNotesProps {
  sessionId: string;
}

export function EEGNotes({ sessionId }: EEGNotesProps) {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('eeg_sessions')
        .select('notes')
        .eq('id', sessionId)
        .single();

      if (error) {
        console.error('Error fetching notes:', error);
        return;
      }

      if (data?.notes) {
        setNotes(data.notes);
      }
    };

    fetchNotes();
  }, [sessionId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('eeg_sessions')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('id', sessionId);

      if (error) {
        console.error('Error saving notes:', error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Session Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">Record your experience</Label>
          <Textarea
            id="notes"
            placeholder="Write your thoughts about this session..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="min-h-[200px]"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Notes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
