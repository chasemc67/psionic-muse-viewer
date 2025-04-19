import type { MetaFunction } from '@remix-run/node';
import { EEGVisualization } from '~/components/EEGVisualization';
import { EEGNotes } from '~/components/EEGNotes';

export const meta: MetaFunction = () => {
  return [
    { title: 'Psionic Muse Viewer - EEG Data Visualization' },
    {
      name: 'description',
      content: 'Visualize and annotate EEG data from Muse S headbands',
    },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background dark">
      <div className="container mx-auto flex flex-1 flex-col items-center gap-8 p-4 pb-20 md:pb-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Psionic Muse Viewer
          </h1>
          <p className="text-xl text-muted-foreground">
            Visualize and annotate EEG data from your Muse S headband
          </p>
        </div>
        <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2">
          <div className="w-full">
            <EEGVisualization />
          </div>
          <div className="w-full">
            <EEGNotes />
          </div>
        </div>
      </div>
    </div>
  );
}
