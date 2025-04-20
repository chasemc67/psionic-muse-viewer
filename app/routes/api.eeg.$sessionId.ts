import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { parseEEGCSV } from '~/utils/csv.server';

export async function loader({ params }: LoaderFunctionArgs) {
  // For now, we'll always return the sample data
  // Later, this will be replaced with a DB query using the sessionId
  const data = await parseEEGCSV('muse_data_1745103171242.csv');

  // Group data by electrode
  const electrodeData = data.reduce(
    (acc, point) => {
      const electrode = `Electrode ${point.electrode}`;
      if (!acc[electrode]) {
        acc[electrode] = [];
      }
      // Average the signal values
      const avgSignal =
        (point.s1 + point.s2 + point.s3 + point.s4 + point.s5) / 5;
      acc[electrode].push([point.timestamp, avgSignal]);
      return acc;
    },
    {} as Record<string, [number, number][]>,
  );

  return json(electrodeData);
}
