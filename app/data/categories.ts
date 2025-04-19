export interface Category {
  id: string;
  title: string;
  description: string;
  itemCount: number;
}

export const categories: Category[] = [
  {
    id: 'fretboard-tools',
    title: 'Online Fretboard Tools and Apps',
    description:
      'Interactive tools to help you learn the fretboard, find scales, and visualize chord shapes.',
    itemCount: 5,
  },
  {
    id: 'music-theory',
    title: 'Music Theory Tools and Apps',
    description:
      'Apps and resources to help you understand music theory concepts and apply them to guitar.',
    itemCount: 4,
  },
  {
    id: 'backing-tracks',
    title: 'Backing Tracks',
    description:
      'High-quality backing tracks in various styles and keys for practice and improvisation.',
    itemCount: 3,
  },
  {
    id: 'online-lessons',
    title: 'Online Lessons',
    description:
      'Structured online guitar courses and lesson platforms for all skill levels.',
    itemCount: 6,
  },
  {
    id: 'virtual-teachers',
    title: 'Zoom/Virtual Teachers',
    description:
      'Professional guitar instructors offering remote lessons via video chat.',
    itemCount: 2,
  },
  {
    id: 'local-teachers',
    title: 'Local Teachers',
    description: 'Find in-person guitar instructors in your area.',
    itemCount: 0,
  },
  {
    id: 'luthiers',
    title: 'Local Luthiers',
    description: 'Expert guitar repair and maintenance professionals.',
    itemCount: 0,
  },
  {
    id: 'guitar-stores',
    title: 'Guitar Stores',
    description:
      'Local and online guitar shops with great selection and service.',
    itemCount: 4,
  },
  {
    id: 'guitar-sellers',
    title: 'Guitar Sellers',
    description: 'Trusted sellers of new and used guitars.',
    itemCount: 3,
  },
  {
    id: 'lefty-guitars',
    title: 'Lefty Guitar Sellers',
    description: 'Specialized dealers and resources for left-handed guitars.',
    itemCount: 2,
  },
];
