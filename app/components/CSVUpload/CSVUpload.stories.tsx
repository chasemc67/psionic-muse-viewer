import type { Meta, StoryObj } from '@storybook/react';
import { CSVUpload } from './CSVUpload';

const meta = {
  title: 'Components/CSVUpload',
  component: CSVUpload,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CSVUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onUpload: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('File uploaded');
    },
    isUploading: false,
    hasExistingFile: false,
  },
};

export const WithExistingFile: Story = {
  args: {
    onUpload: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('File uploaded');
    },
    isUploading: false,
    hasExistingFile: true,
  },
};

export const Uploading: Story = {
  args: {
    onUpload: async () => {},
    isUploading: true,
    hasExistingFile: false,
  },
};
