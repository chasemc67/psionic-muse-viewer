import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface EEGDataPoint {
  timestamp: number;
  channels: {
    TP9: number;
    AF7: number;
    AF8: number;
    TP10: number;
  };
}

// Mock data generator function
function generateMockEEGData(duration: number = 5): EEGDataPoint[] {
  const sampleRate = 256; // Hz
  const numSamples = duration * sampleRate;
  const data: EEGDataPoint[] = [];

  for (let i = 0; i < numSamples; i++) {
    const timestamp = i * (1000 / sampleRate); // Convert to milliseconds
    data.push({
      timestamp,
      channels: {
        // Generate realistic-looking EEG waves using sine waves of different frequencies
        TP9:
          Math.sin(2 * Math.PI * 10 * (i / sampleRate)) * 50 +
          Math.random() * 10,
        AF7:
          Math.sin(2 * Math.PI * 8 * (i / sampleRate)) * 45 +
          Math.random() * 10,
        AF8:
          Math.sin(2 * Math.PI * 12 * (i / sampleRate)) * 55 +
          Math.random() * 10,
        TP10:
          Math.sin(2 * Math.PI * 9 * (i / sampleRate)) * 48 +
          Math.random() * 10,
      },
    });
  }

  return data;
}

interface EEGVisualizationProps {
  sessionId: string;
}

export function EEGVisualization({ sessionId }: EEGVisualizationProps) {
  // Generate 5 seconds of mock data
  const mockData = generateMockEEGData(5);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>EEG Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Implement EEG visualization with mockData */}
        <div className="h-[400px] flex items-center justify-center bg-muted rounded-md">
          <p className="text-muted-foreground">
            EEG visualization coming soon... ({mockData.length} samples
            generated)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
