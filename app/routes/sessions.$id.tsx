import { json, LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';
import { EEGNotes } from '~/components/EEGNotes';
import { EEGVisualization } from '~/components/EEGVisualization';
import { Button } from '~/components/ui/button';
import { db } from '~/utils/db.server';
import type { Database } from '~/types/supabase';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Response('Session ID is required', { status: 400 });
  }

  const { data: session, error } = await db
    .from('eeg_sessions')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    console.error('Error fetching session:', error);
    throw new Response('Error fetching session', { status: 500 });
  }

  if (!session) {
    throw new Response('Session not found', { status: 404 });
  }

  return json({ session });
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) {
    throw new Response('Session ID is required', { status: 400 });
  }

  const formData = await request.formData();
  const notes = formData.get('notes');

  if (typeof notes !== 'string') {
    throw new Response('Notes must be a string', { status: 400 });
  }

  const { error } = await db
    .from('eeg_sessions')
    .update({
      notes,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.id);

  if (error) {
    console.error('Error updating notes:', error);
    throw new Response('Error updating notes', { status: 500 });
  }

  return json({ success: true });
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
          <EEGNotes sessionId={session.id} initialNotes={session.notes || ''} />
        </div>
      </div>
    </div>
  );
}
