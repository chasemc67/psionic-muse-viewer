import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { SessionList } from '~/components/SessionList';
import { Button } from '~/components/ui/button';
import { db } from '~/utils/db.server';

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
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">EEG Sessions</h1>
        <Form method="post">
          <Button type="submit">New Session</Button>
        </Form>
      </div>
      <SessionList sessions={sessions} />
    </div>
  );
}
