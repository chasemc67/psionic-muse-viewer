import { useRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useFetcher } from '@remix-run/react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type {
  Options as HighchartsOptions,
  SelectEventObject,
} from 'highcharts';

// EEG frequency bands with their typical ranges and colors
const EEG_BANDS = [
  { name: 'Delta', range: [0.5, 4], color: '#6366f1' }, // Indigo
  { name: 'Theta', range: [4, 8], color: '#8b5cf6' }, // Violet
  { name: 'Alpha', range: [8, 13], color: '#ec4899' }, // Pink
  { name: 'Beta', range: [13, 30], color: '#f97316' }, // Orange
  { name: 'Gamma', range: [30, 100], color: '#22c55e' }, // Green
];

interface EEGVisualizationProps {
  sessionId: string;
}

type EEGData = Record<string, [number, number][]>;

export function EEGVisualization({ sessionId }: EEGVisualizationProps) {
  const [isClient, setIsClient] = useState(false);
  const chartRef = useRef(null);
  const fetcher = useFetcher();
  const [data, setData] = useState<EEGData>({
    Delta: [],
    Theta: [],
    Alpha: [],
    Beta: [],
    Gamma: [],
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch data when component mounts
  useEffect(() => {
    fetcher.load(`/api/eeg/${sessionId}`);
  }, [sessionId, fetcher]);

  // Update data when fetcher returns
  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data as EEGData);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (!isClient || Object.keys(data).length === 0) return;

    // Dynamically import Highcharts only on the client side
    const initChart = async () => {
      const Highcharts = (await import('highcharts')).default;

      // Enable selection without zooming
      Highcharts.setOptions({
        chart: {
          zooming: {
            type: 'x',
          },
        },
      });

      const HighchartsReact = (await import('highcharts-react-official'))
        .default;

      const chartOptions: HighchartsOptions = {
        chart: {
          type: 'line',
          zooming: {
            type: 'x',
          },
          backgroundColor: 'transparent',
          height: 400,
          selectionMarkerFill: 'rgba(51,92,173,0.25)',
          events: {
            selection: function (event: SelectEventObject) {
              if (event.xAxis) {
                const startTime = event.xAxis[0].min;
                const endTime = event.xAxis[0].max;
                console.log('Selected time range:', { startTime, endTime });
              }
              return false; // Prevent zoom
            },
          },
        },
        plotOptions: {
          series: {
            allowPointSelect: true,
          },
        },
        title: {
          text: undefined,
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Time',
            style: {
              color: '#ffffff',
            },
          },
          labels: {
            style: {
              color: '#ffffff',
            },
          },
          lineColor: '#ffffff',
          tickColor: '#ffffff',
        },
        yAxis: {
          title: {
            text: 'Power (dB)',
            style: {
              color: '#ffffff',
            },
          },
          labels: {
            style: {
              color: '#ffffff',
            },
          },
          lineColor: '#ffffff',
          tickColor: '#ffffff',
        },
        legend: {
          itemStyle: {
            color: '#ffffff',
          },
          itemHoverStyle: {
            color: '#cccccc',
          },
        },
        series: EEG_BANDS.map(band => ({
          type: 'spline',
          name: band.name,
          data: data[band.name] || [],
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
          options={chartOptions}
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
  }, [isClient, sessionId, data]);

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
          {isClient && fetcher.state === 'loading' && (
            <p className="text-muted-foreground">Loading data...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
