import type { MetaFunction } from '@remix-run/node';
import { CategoryCard } from '~/components/CategoryCard';
import { categories } from '~/data/categories';

export const meta: MetaFunction = () => {
  return [
    { title: 'Cool Guitar Tools - Guitar Learning Tools' },
    {
      name: 'description',
      content: 'The best directory of guitar tools and learning resources',
    },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background dark">
      <div className="container mx-auto flex flex-1 flex-col items-center gap-8 p-4 pb-20 md:pb-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Cool Guitar Tools
          </h1>
          <p className="text-xl text-muted-foreground">
            Your directory for the best guitar learning resources and tools
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}
