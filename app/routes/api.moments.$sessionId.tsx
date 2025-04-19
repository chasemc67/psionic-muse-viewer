import { json, LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/db.server';
import type { Database } from '~/types/database.types';

type MomentRow = Database['public']['Tables']['moments_of_interest']['Row'];

export async function loader({ params }: LoaderFunctionArgs) {
  const { sessionId } = params;
  if (!sessionId) {
    throw new Response('Session ID is required', { status: 400 });
  }

  const { data, error } = await db
    .from('moments_of_interest')
    .select('*')
    .eq('session_id', sessionId)
    .order('timestamp', { ascending: true });

  if (error) {
    console.error('Error fetching moments:', error);
    throw new Response('Error fetching moments', { status: 500 });
  }

  return json(data || []);
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { sessionId } = params;
  if (!sessionId) {
    throw new Response('Session ID is required', { status: 400 });
  }

  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'create') {
    const timestamp = formData.get('timestamp') as string;
    const note = formData.get('note') as string;

    const { data, error } = await db
      .from('moments_of_interest')
      .insert({
        session_id: sessionId,
        timestamp,
        note,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating moment:', error);
      throw new Response('Error creating moment', { status: 500 });
    }

    return json(data);
  }

  if (intent === 'update') {
    const id = formData.get('id') as string;
    const note = formData.get('note') as string;

    const { error } = await db
      .from('moments_of_interest')
      .update({ note })
      .eq('id', id);

    if (error) {
      console.error('Error updating moment:', error);
      throw new Response('Error updating moment', { status: 500 });
    }

    return json({ success: true });
  }

  throw new Response('Invalid intent', { status: 400 });
}
