import { useRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { Options, SelectEventObject } from 'highcharts';

// Electrode colors
const ELECTRODE_COLORS = {
  'Electrode 0': '#6366f1', // Indigo
  'Electrode 1': '#8b5cf6', // Violet
  'Electrode 2': '#ec4899', // Pink
  'Electrode 3': '#f97316', // Orange
};

export interface EEGVisualizationProps {
  data: Record<string, [number, number][]>;
}

export function EEGVisualization({ data }: EEGVisualizationProps) {
  const [isClient, setIsClient] = useState(false);
  const chartRef = useRef(null);

  // Set isClient on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize and update chart when data changes
  useEffect(() => {
    if (!isClient || !data) return;

    const initChart = async () => {
      const Highcharts = (await import('highcharts')).default;

      const HighchartsReact = (await import('highcharts-react-official'))
        .default;

      const chartOptions: Options = {
        chart: {
          type: 'line',
          backgroundColor: 'transparent',
          height: 400,
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
            text: 'Signal Strength',
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
        series: Object.entries(data).map(([electrode, points]) => ({
          type: 'spline',
          name: electrode,
          data: points,
          color: ELECTRODE_COLORS[electrode as keyof typeof ELECTRODE_COLORS],
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

      const container = document.getElementById('chart-container');
      if (container) {
        const root = createRoot(container);
        root.render(<ChartComponent />);
      }
    };

    initChart();
  }, [isClient, data]);

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
