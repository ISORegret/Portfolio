// Simple data source for your projects (events/listings/sets)
export type Project = {
  slug: string
  title: string
  category: 'Automotive' | 'Real Estate' | 'Street'
  date: string            // ISO like '2025-08-31'
  cover: string           // image URL (Imgur/Cloudinary) or /public path
  album: string           // Pixieset (or other) album URL
  blurb?: string
};

export const projects: Project[] = [
  {
    slug: 'cars-and-coffee-aug-2025',
    title: 'Cars & Coffee — Aug 2025',
    category: 'Automotive',
    date: '2025-08-23',
    cover: 'https://i.imgur.com/your-automotive-cover.jpg',
    album: 'https://yourstudio.pixieset.com/cars-and-coffee-aug-2025/',
    blurb: 'Sunrise rollers and chrome for days.'
  },
  {
    slug: '123-oak-lane-listing',
    title: '123 Oak Lane Listing',
    category: 'Real Estate',
    date: '2025-08-18',
    cover: 'https://i.imgur.com/your-realestate-cover.jpg',
    album: 'https://yourstudio.pixieset.com/123-oak-lane/',
    blurb: 'Blue-hour exteriors and bright kitchen vignettes.'
  },
  {
    slug: 'riverside-night-walk',
    title: 'Riverside Night Walk',
    category: 'Street',
    date: '2025-08-10',
    cover: 'https://i.imgur.com/your-street-cover.jpg',
    album: 'https://yourstudio.pixieset.com/riverside-night-walk/',
    blurb: 'Neon reflections and candid moments.'
  }
];
