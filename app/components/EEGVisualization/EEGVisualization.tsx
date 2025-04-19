import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

export function EEGVisualization() {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const dummyData = generateDummyData();

  const options: Highcharts.Options = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
      height: 500,
    },
    title: {
      text: 'EEG Data Visualization',
      style: {
        color: '#ffffff',
      },
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
    },
    legend: {
      itemStyle: {
        color: '#ffffff',
      },
    },
    series: EEG_BANDS.map(band => ({
      name: band.name,
      data: dummyData[band.name],
      color: band.color,
      lineWidth: 2,
    })),
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="w-full rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
}
