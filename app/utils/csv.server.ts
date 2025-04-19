import { readFile } from 'fs/promises';
import { join } from 'path';

export interface EEGDataPoint {
  timestamp: number;
  delta: number;
  theta: number;
  alpha: number;
  beta: number;
  gamma: number;
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
      delta: values[1],
      theta: values[2],
      alpha: values[3],
      beta: values[4],
      gamma: values[5],
    };
  });
}
