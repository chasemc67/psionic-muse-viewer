import { json, redirect } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { SessionList } from '~/components/SessionList';
import { Button } from '~/components/ui/button';
import { db } from '~/utils/db.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'Psionic Muse Viewer - Sessions' },
    {
      name: 'description',
      content:
        'View and manage your EEG recording sessions from Muse S headbands',
    },
  ];
};

export async function loader() {
  const { data: sessions, error } = await db
    .from('eeg_sessions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Failed to load sessions');
  }

  return json({ sessions: sessions || [] });
}

export async function action() {
  const { data, error } = await db
    .from('eeg_sessions')
    .insert([{ title: 'New Session' }])
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create session');
  }

  return redirect(`/sessions/${data.id}`);
}

export default function SessionsIndex() {
  const { sessions } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen flex-col bg-background dark">
      <div className="container mx-auto flex flex-1 flex-col gap-8 p-8">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">EEG Sessions</h1>
            <p className="text-lg text-muted-foreground">
              View and manage your EEG recording sessions
            </p>
          </div>
          <Form method="post">
            <Button type="submit">New Session</Button>
          </Form>
        </div>
        <SessionList sessions={sessions} />
      </div>
    </div>
  );
}
