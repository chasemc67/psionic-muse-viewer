import type { MetaFunction } from '@remix-run/node';
import { CategoryCard } from '~/components/CategoryCard';
import { categories } from '~/data/categories';

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
      </div>
    </div>
  );
}
