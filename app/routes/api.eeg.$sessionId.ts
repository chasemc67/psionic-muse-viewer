import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/db.server';

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

    // Parse CSV data
    const lines = csvText.trim().split('\n');
    const electrodeData = lines.slice(1).reduce(
      (acc, line) => {
        const [timestamp, electrode, s1, s2, s3, s4, s5] = line
          .split(',')
          .map(Number);
        const avgSignal = (s1 + s2 + s3 + s4 + s5) / 5;

        const electrodeName = `Electrode ${electrode}`;
        if (!acc[electrodeName]) {
          acc[electrodeName] = [];
        }
        acc[electrodeName].push([timestamp, avgSignal]);
        return acc;
      },
      {} as Record<string, [number, number][]>,
    );

    return json(electrodeData);
  } catch (error) {
    console.error('Error downloading/parsing CSV:', error);
    throw new Response('Error processing CSV file', { status: 500 });
  }
}
