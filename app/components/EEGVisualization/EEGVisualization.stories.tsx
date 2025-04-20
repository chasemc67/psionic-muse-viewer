import type { Meta, StoryObj } from '@storybook/react';
import { EEGVisualization } from './EEGVisualization';

const sampleData: Record<string, [number, number][]> = {
  'Electrode 0': Array.from(
    { length: 100 },
    (_, i) =>
      [Date.now() + i * 1000, Math.sin(i * 0.1) * 10] as [number, number],
  ),
  'Electrode 1': Array.from(
    { length: 100 },
    (_, i) =>
      [Date.now() + i * 1000, Math.cos(i * 0.1) * 10] as [number, number],
  ),
  'Electrode 2': Array.from(
    { length: 100 },
    (_, i) =>
      [Date.now() + i * 1000, Math.sin(i * 0.2) * 5] as [number, number],
  ),
  'Electrode 3': Array.from(
    { length: 100 },
    (_, i) =>
      [Date.now() + i * 1000, Math.cos(i * 0.2) * 5] as [number, number],
  ),
};

const meta: Meta<typeof EEGVisualization> = {
  title: 'Components/EEGVisualization',
  component: EEGVisualization,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'The EEG data to visualize',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EEGVisualization>;

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const LongSession: Story = {
  args: {
    data: Object.fromEntries(
      Object.keys(sampleData).map(key => [
        key,
        Array.from(
          { length: 1000 },
          (_, i) =>
            [Date.now() + i * 1000, Math.sin(i * 0.05) * 10] as [
              number,
              number,
            ],
        ),
      ]),
    ) as Record<string, [number, number][]>,
  },
};
