import { useState, useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { Database } from '~/types/supabase';

type EEGSession = Database['public']['Tables']['eeg_sessions']['Row'];

export function EEGSessionManager() {
  const [sessions, setSessions] = useState<EEGSession[]>([]);
  const navigate = useNavigate();
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from('eeg_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sessions:', error);
        return;
      }

      setSessions(data || []);
    };

    fetchSessions();
  }, []);

  const createNewSession = async () => {
    const { data, error } = await supabase
      .from('eeg_sessions')
      .insert([{ title: 'New Session' }])
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      return;
    }

    if (data) {
      navigate(`/sessions/${data.id}`);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>EEG Sessions</CardTitle>
        <Button onClick={createNewSession}>New Session</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map(session => (
            <Card
              key={session.id}
              className="cursor-pointer hover:bg-accent"
              onClick={() => navigate(`/sessions/${session.id}`)}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-medium">
                    {session.title || 'Untitled Session'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(session.created_at!).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost">View</Button>
              </CardContent>
            </Card>
          ))}
          {sessions.length === 0 && (
            <p className="text-center text-muted-foreground">
              No sessions yet. Create your first one!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
