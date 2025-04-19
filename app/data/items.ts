export interface Item {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  url: string;
  rating: number;
  reviewCount: number;
  pricing: 'free' | 'freemium' | 'paid';
  priceRange?: string;
  fullReview?: string;
  pros?: string[];
  cons?: string[];
  features?: string[];
  lastUpdated?: string;
  screenshots?: string[];
}

export const items: Item[] = [
  {
    id: 'fretastic',
    categoryId: 'fretboard-tools',
    title: 'Fretastic',
    description:
      'Interactive fretboard visualization tool with scales, modes, and chord diagrams.',
    url: 'https://fretastic.com',
    rating: 4.8,
    reviewCount: 245,
    pricing: 'freemium',
    fullReview:
      'Fretastic is one of the most comprehensive fretboard visualization tools available. The interface is clean and intuitive, making it easy to understand complex scale patterns and chord shapes. The interactive nature of the tool helps reinforce learning through visual and practical application.',
    pros: [
      'Intuitive interface',
      'Comprehensive scale library',
      'Interactive learning features',
      'Works on mobile and desktop',
      'Regular updates with new features',
    ],
    cons: [
      'Some advanced features require subscription',
      'No offline mode',
      'Limited custom scale creation in free version',
    ],
    features: [
      'Interactive fretboard display',
      'Scale and mode visualization',
      'Chord library with inversions',
      'Custom practice routines',
      'Progress tracking',
      'Mobile-friendly interface',
    ],
    lastUpdated: '2024-02-15',
  },
  {
    id: 'guitar-scales',
    categoryId: 'fretboard-tools',
    title: 'Guitar Scales & Patterns',
    description:
      'Comprehensive scale library with interactive exercises and practice tools.',
    url: 'https://guitarscales.com',
    rating: 4.6,
    reviewCount: 189,
    pricing: 'free',
  },
  {
    id: 'music-theory-net',
    categoryId: 'music-theory',
    title: 'musictheory.net',
    description:
      'Comprehensive music theory lessons and exercises, perfect for guitarists.',
    url: 'https://musictheory.net',
    rating: 4.9,
    reviewCount: 1250,
    pricing: 'free',
  },
  {
    id: 'teoria',
    categoryId: 'music-theory',
    title: 'Teoria',
    description:
      'Advanced music theory exercises and ear training specifically for guitarists.',
    url: 'https://teoria.com',
    rating: 4.7,
    reviewCount: 823,
    pricing: 'freemium',
  },
  {
    id: 'youtube-backing',
    categoryId: 'backing-tracks',
    title: 'YouTube Jam Tracks',
    description:
      'Huge collection of high-quality backing tracks in all styles and keys.',
    url: 'https://youtube.com/backing-tracks',
    rating: 4.5,
    reviewCount: 3200,
    pricing: 'free',
  },
  {
    id: 'justin-guitar',
    categoryId: 'online-lessons',
    title: 'JustinGuitar',
    description:
      'Structured beginner to advanced guitar courses with excellent teaching methodology.',
    url: 'https://justinguitar.com',
    rating: 4.9,
    reviewCount: 15000,
    pricing: 'freemium',
    fullReview:
      "JustinGuitar has set the standard for online guitar education. Justin's teaching style is clear, patient, and methodical, making complex concepts accessible to beginners while offering enough depth for intermediate players. The course structure is well-thought-out, taking students from absolute beginner to advanced techniques in a logical progression.",
    pros: [
      'Comprehensive beginner to advanced curriculum',
      'Clear, patient teaching style',
      'High-quality video production',
      'Active community support',
      'Regular new content updates',
    ],
    cons: [
      'Some newer content requires subscription',
      'Practice tools are basic',
      'Can be overwhelming for complete beginners',
    ],
    features: [
      'Structured course pathways',
      'Song tutorials',
      'Theory lessons',
      'Practice routines',
      'Mobile app access',
      'Progress tracking',
    ],
    lastUpdated: '2024-03-01',
  },
  {
    id: 'marty-schwartz',
    categoryId: 'online-lessons',
    title: 'Marty Schwartz Guitar',
    description:
      'In-depth song tutorials and technique lessons for all skill levels.',
    url: 'https://martyschwartz.com',
    rating: 4.8,
    reviewCount: 8500,
    pricing: 'paid',
    priceRange: '$19.99/month',
  },
];

export const getItemsByCategory = (categoryId: string): Item[] => {
  return items.filter(item => item.categoryId === categoryId);
};

export const getItemById = (id: string): Item | undefined => {
  return items.find(item => item.id === id);
};

export const getRelatedItems = (item: Item): Item[] => {
  return items
    .filter(i => i.categoryId === item.categoryId && i.id !== item.id)
    .slice(0, 3);
};
