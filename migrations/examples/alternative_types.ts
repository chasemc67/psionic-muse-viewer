/**
 * TypeScript types for the alternative schema (categories as special tags)
 */

export type TagType =
  | 'category'
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
  icon: string | null;
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
  primary_category_id: string | null;
  created_at: string;
  updated_at: string;

  // These would be populated by joins
  tags?: Tag[];

  // Helper getters that could be implemented as computed properties
  get categories(): Tag[];

  get primaryCategory(): Tag | undefined;
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
  categories?: string[]; // Tag IDs of type 'category'
  tags?: string[]; // Tag IDs of other types
  searchTerm?: string;
  featured?: boolean;
  minRating?: number;
};
