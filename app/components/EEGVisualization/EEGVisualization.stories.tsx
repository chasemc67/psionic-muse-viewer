import type { Meta, StoryObj } from '@storybook/react';
import { EEGVisualization } from './EEGVisualization';

const meta: Meta<typeof EEGVisualization> = {
  title: 'Components/EEGVisualization',
  component: EEGVisualization,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EEGVisualization>;

export const Default: Story = {
  args: {},
};
