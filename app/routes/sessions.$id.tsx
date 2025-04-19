import { json, LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { useLoaderData, Form, useNavigation } from '@remix-run/react';
import { EEGNotes } from '~/components/EEGNotes';
import { EEGVisualization } from '~/components/EEGVisualization';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { db } from '~/utils/db.server';

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
  const title = formData.get('title');

  // Prepare update object based on what was submitted
  const updateData: { notes?: string; title?: string; updated_at: string } = {
    updated_at: new Date().toISOString(),
  };

  if (typeof notes === 'string') {
    updateData.notes = notes;
  }

  if (typeof title === 'string') {
    updateData.title = title;
  }

  const { error } = await db
    .from('eeg_sessions')
    .update(updateData)
    .eq('id', params.id);

  if (error) {
    console.error('Error updating session:', error);
    throw new Response('Error updating session', { status: 500 });
  }

  return json({ success: true });
}

export default function SessionView() {
  const { session } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSaving = navigation.state === 'submitting';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <Button variant="ghost" asChild className="mb-2">
            <a href="/sessions">← Back to Sessions</a>
          </Button>
          <Form method="post" className="space-y-2">
            <Input
              type="text"
              name="title"
              defaultValue={session.title || ''}
              placeholder="Enter session title"
              className="text-3xl font-bold h-12 px-0 border-0 bg-transparent focus-visible:ring-0 rounded-none"
            />
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Title'}
              </Button>
            </div>
          </Form>
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
