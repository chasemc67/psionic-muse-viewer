import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ChevronLeft } from 'lucide-react';
import { ItemCard } from '~/components/ItemCard';
import { categories } from '~/data/categories';
import { getItemsByCategory } from '~/data/items';

export async function loader({ params }: LoaderFunctionArgs) {
  const category = categories.find(c => c.id === params.id);
  if (!category) {
    throw new Response('Category not found', { status: 404 });
  }

  const items = getItemsByCategory(category.id);
  return json({ category, items });
}

export default function CategoryPage() {
  const { category, items } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen flex-col bg-background dark">
      <div className="container mx-auto flex flex-1 flex-col gap-8 p-4">
        <div className="flex flex-col gap-8">
          <Link
            to="/"
            className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Categories
          </Link>

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {category.title}
            </h1>
            <p className="mt-2 text-xl text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
            <p className="text-lg text-muted-foreground">
              No items in this category yet.
            </p>
            <p className="text-sm text-muted-foreground">
              Check back soon for updates!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map(item => (
              <ItemCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
