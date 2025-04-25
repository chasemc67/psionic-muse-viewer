import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/db.server';
import { processEEGData } from '~/utils/csv.server';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.sessionId) {
    throw new Response('Session ID is required', { status: 400 });
  }

  // Get the session to find the CSV file path
  const { data: session, error } = await db
    .from('eeg_sessions')
    .select('csv_file_path')
    .eq('id', params.sessionId)
    .single();

  if (error) {
    console.error('Error fetching session:', error);
    throw new Response('Error fetching session', { status: 500 });
  }

  if (!session?.csv_file_path) {
    throw new Response('No CSV file found for this session', { status: 404 });
  }

  // Download and parse the CSV file
  try {
    const response = await fetch(session.csv_file_path);
    if (!response.ok) {
      throw new Error('Failed to fetch CSV file');
    }
    const csvText = await response.text();

    // Process the CSV data using our new utility function
    const processedData = processEEGData(csvText);

    return json(processedData);
  } catch (error) {
    console.error('Error downloading/parsing CSV:', error);
    throw new Response('Error processing CSV file', { status: 500 });
  }
}
