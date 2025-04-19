import { Link } from '@remix-run/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '~/components/ui/card';
import { Star } from 'lucide-react';

export interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  pricing: 'free' | 'freemium' | 'paid';
  priceRange?: string;
  url: string;
}

export function ItemCard({
  id,
  title,
  description,
  rating,
  reviewCount,
  pricing,
  priceRange,
  url,
}: ItemCardProps) {
  return (
    <Link
      to={`/item/${id}`}
      className="block transition-all hover:scale-[1.02]"
    >
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">
                {pricing}
              </span>
              {priceRange && (
                <span className="text-sm text-muted-foreground">
                  {priceRange}
                </span>
              )}
            </div>
            <span className="text-sm text-muted-foreground underline">
              {url}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
