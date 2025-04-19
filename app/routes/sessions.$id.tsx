import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { createClient } from '@supabase/supabase-js';
import { EEGNotes } from '~/components/EEGNotes';
import { EEGVisualization } from '~/components/EEGVisualization';
import { Button } from '~/components/ui/button';
import type { Database } from '~/types/supabase';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Error('Session ID is required');
  }

  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );

  const { data: session, error } = await supabase
    .from('eeg_sessions')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !session) {
    throw new Error('Session not found');
  }

  return json({ session });
}

export default function SessionView() {
  const { session } = useLoaderData<typeof loader>();

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Button variant="ghost" asChild className="mb-2">
            <a href="/sessions">← Back to Sessions</a>
          </Button>
          <h1 className="text-3xl font-bold">
            {session.title || 'Untitled Session'}
          </h1>
          <p className="text-muted-foreground">
            Created {new Date(session.created_at!).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <EEGVisualization sessionId={session.id} />
        </div>
        <div>
          <EEGNotes sessionId={session.id} />
        </div>
      </div>
    </div>
  );
}
