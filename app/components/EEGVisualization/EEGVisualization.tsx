import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface EEGVisualizationProps {
  sessionId: string;
}

export function EEGVisualization({ sessionId }: EEGVisualizationProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>EEG Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Implement EEG visualization */}
        <div className="h-[400px] flex items-center justify-center bg-muted rounded-md">
          <p className="text-muted-foreground">
            EEG visualization coming soon...
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
