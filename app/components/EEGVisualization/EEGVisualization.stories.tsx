import type { Meta, StoryObj } from '@storybook/react';
import { EEGVisualization } from './EEGVisualization';

const meta: Meta<typeof EEGVisualization> = {
  title: 'Components/EEGVisualization',
  component: EEGVisualization,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sessionId: {
      description: 'The ID of the EEG session to visualize',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EEGVisualization>;

export const Default: Story = {
  args: {
    sessionId: 'mock-session-123',
  },
};

export const LongSession: Story = {
  args: {
    sessionId: 'mock-long-session-456',
  },
};
