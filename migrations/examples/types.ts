/**
 * TypeScript types representing the database schema
 */

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
};

export type TagType =
  | 'format'
  | 'platform'
  | 'pricing'
  | 'skill-level'
  | 'guitar-type';

export type Tag = {
  id: string;
  name: string;
  slug: string;
  type: TagType;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type GuitarItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  url: string | null;
  image_url: string | null;
  pros: string[];
  cons: string[];
  rating: number | null;
  affiliate_link: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;

  // These would be populated by joins
  categories?: Category[];
  primary_category?: Category;
  tags?: Tag[];
};

export type Review = {
  id: string;
  item_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;

  // Would be populated by a join
  item?: GuitarItem;
};

/**
 * Example usage of filtering and querying
 */
export type FilterOptions = {
  categories?: string[];
  tags?: string[];
  searchTerm?: string;
  featured?: boolean;
  minRating?: number;
};
