import { useRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

// EEG frequency bands with their typical ranges and colors
const EEG_BANDS = [
  { name: 'Delta', range: [0.5, 4], color: '#6366f1' }, // Indigo
  { name: 'Theta', range: [4, 8], color: '#8b5cf6' }, // Violet
  { name: 'Alpha', range: [8, 13], color: '#ec4899' }, // Pink
  { name: 'Beta', range: [13, 30], color: '#f97316' }, // Orange
  { name: 'Gamma', range: [30, 100], color: '#22c55e' }, // Green
];

// Generate dummy data for each band
const generateDummyData = () => {
  const data: { [key: string]: [number, number][] } = {};
  const now = Date.now();

  EEG_BANDS.forEach(band => {
    data[band.name] = Array.from({ length: 100 }, (_, i) => {
      const time = now - (100 - i) * 100; // 100ms intervals
      const value =
        Math.random() * (band.range[1] - band.range[0]) + band.range[0];
      return [time, value];
    });
  });

  return data;
};

interface EEGVisualizationProps {
  sessionId: string; // Will be used in future implementations
}

export function EEGVisualization({ sessionId }: EEGVisualizationProps) {
  const [isClient, setIsClient] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Dynamically import Highcharts only on the client side
    const initChart = async () => {
      const Highcharts = (await import('highcharts')).default;
      const HighchartsReact = (await import('highcharts-react-official'))
        .default;

      const dummyData = generateDummyData();

      const options = {
        chart: {
          type: 'spline',
          backgroundColor: 'transparent',
          height: 400,
        },
        title: {
          text: undefined, // Remove title since we're using CardTitle
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Time',
            style: {
              color: 'var(--foreground)',
            },
          },
          labels: {
            style: {
              color: 'var(--foreground)',
            },
          },
        },
        yAxis: {
          title: {
            text: 'Power (dB)',
            style: {
              color: 'var(--foreground)',
            },
          },
          labels: {
            style: {
              color: 'var(--foreground)',
            },
          },
        },
        legend: {
          itemStyle: {
            color: 'var(--foreground)',
          },
        },
        series: EEG_BANDS.map(band => ({
          type: 'spline',
          name: band.name,
          data: dummyData[band.name],
          color: band.color,
          lineWidth: 2,
        })),
        credits: {
          enabled: false,
        },
      };

      const ChartComponent = () => (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
        />
      );

      // Find the container and render the chart
      const container = document.getElementById('chart-container');
      if (container) {
        const root = createRoot(container);
        root.render(<ChartComponent />);
      }
    };

    initChart();
  }, [isClient]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>EEG Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          id="chart-container"
          className="h-[400px] flex items-center justify-center bg-muted rounded-md"
        >
          {!isClient && (
            <p className="text-muted-foreground">Loading visualization...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
