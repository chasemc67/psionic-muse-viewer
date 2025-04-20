import { readFile } from 'fs/promises';
import { join } from 'path';

export interface EEGDataPoint {
  timestamp: number;
  electrode: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  intuitive: number;
}

export async function parseEEGCSV(filename: string): Promise<EEGDataPoint[]> {
  const filePath = join(process.cwd(), 'app', 'data', filename);
  const fileContent = await readFile(filePath, 'utf-8');

  const lines = fileContent.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    const values = line.split(',').map(Number);
    return {
      timestamp: values[0],
      electrode: values[1],
      s1: values[2],
      s2: values[3],
      s3: values[4],
      s4: values[5],
      s5: values[6],
      intuitive: values[7],
    };
  });
}
