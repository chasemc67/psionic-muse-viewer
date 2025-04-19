import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ChevronLeft, ExternalLink, Star } from 'lucide-react';
import { ItemCard } from '~/components/ItemCard';
import { categories } from '~/data/categories';
import { getItemById, getRelatedItems } from '~/data/items';

export async function loader({ params }: LoaderFunctionArgs) {
  const item = getItemById(params.id);
  if (!item) {
    throw new Response('Item not found', { status: 404 });
  }

  const category = categories.find(c => c.id === item.categoryId);
  if (!category) {
    throw new Response('Category not found', { status: 404 });
  }

  const relatedItems = getRelatedItems(item);
  return json({ item, category, relatedItems });
}

export default function ItemPage() {
  const { item, category, relatedItems } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen flex-col bg-background dark">
      <div className="container mx-auto flex flex-1 flex-col gap-8 p-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Link
              to={`/category/${category.id}`}
              className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to {category.title}
            </Link>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {item.title}
              </h1>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              >
                Visit Website
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-8">
              {/* Main Content */}
              <div className="flex flex-col gap-4 rounded-lg border p-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.reviewCount} reviews
                  </span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">
                    {item.pricing}
                  </span>
                  {item.priceRange && (
                    <>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {item.priceRange}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-lg">{item.description}</p>

                {item.fullReview && (
                  <div className="mt-4">
                    <h2 className="mb-2 text-2xl font-semibold">Full Review</h2>
                    <p className="text-muted-foreground">{item.fullReview}</p>
                  </div>
                )}
              </div>

              {/* Features */}
              {item.features && (
                <div className="flex flex-col gap-4 rounded-lg border p-6">
                  <h2 className="text-2xl font-semibold">Key Features</h2>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {item.features.map(feature => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-8">
              {/* Pros & Cons */}
              {(item.pros || item.cons) && (
                <div className="flex flex-col gap-6 rounded-lg border p-6">
                  {item.pros && (
                    <div>
                      <h2 className="mb-2 text-xl font-semibold text-green-500 dark:text-green-400">
                        Pros
                      </h2>
                      <ul className="grid gap-2">
                        {item.pros.map(pro => (
                          <li
                            key={pro}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.cons && (
                    <div>
                      <h2 className="mb-2 text-xl font-semibold text-red-500 dark:text-red-400">
                        Cons
                      </h2>
                      <ul className="grid gap-2">
                        {item.cons.map(con => (
                          <li
                            key={con}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Last Updated */}
              {item.lastUpdated && (
                <div className="text-sm text-muted-foreground">
                  Last updated:{' '}
                  {new Date(item.lastUpdated).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Related Items</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedItems.map(relatedItem => (
                  <ItemCard key={relatedItem.id} {...relatedItem} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
