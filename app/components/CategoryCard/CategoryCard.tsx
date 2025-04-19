import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '~/components/ui/card';
import { Link } from '@remix-run/react';

export interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  itemCount: number;
}

export function CategoryCard({
  id,
  title,
  description,
  itemCount,
}: CategoryCardProps) {
  return (
    <Link
      to={`/category/${id}`}
      className="block transition-all hover:scale-[1.02]"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            <span className="text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
