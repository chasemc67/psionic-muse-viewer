import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { parseEEGCSV } from '~/utils/csv.server';

export async function loader({ params }: LoaderFunctionArgs) {
  // For now, we'll always return the sample data
  // Later, this will be replaced with a DB query using the sessionId
  const data = await parseEEGCSV('sample-eeg.csv');

  // Transform the data into the format expected by the visualization
  const formattedData = {
    Delta: data.map(point => [point.timestamp, point.delta]),
    Theta: data.map(point => [point.timestamp, point.theta]),
    Alpha: data.map(point => [point.timestamp, point.alpha]),
    Beta: data.map(point => [point.timestamp, point.beta]),
    Gamma: data.map(point => [point.timestamp, point.gamma]),
  };

  return json(formattedData);
}
