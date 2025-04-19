import type { Meta, StoryObj } from '@storybook/react';
import { MomentsOfInterest } from './MomentsOfInterest';

const meta = {
  title: 'Components/MomentsOfInterest',
  component: MomentsOfInterest,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MomentsOfInterest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sessionId: '123',
    initialMoments: [
      {
        id: '1',
        timestamp: '2024-04-20T12:00:00Z',
        note: 'Interesting alpha wave pattern',
      },
      {
        id: '2',
        timestamp: '2024-04-20T12:05:00Z',
        note: 'Beta wave spike during meditation',
      },
    ],
  },
};
