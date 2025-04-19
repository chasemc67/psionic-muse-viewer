import type { Meta, StoryObj } from '@storybook/react';
import { EEGNotes } from './EEGNotes';

const meta: Meta<typeof EEGNotes> = {
  title: 'Components/EEGNotes',
  component: EEGNotes,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EEGNotes>;

export const Default: Story = {
  args: {},
};
