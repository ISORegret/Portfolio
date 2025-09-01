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
    slug: 'Morning Motor Events',
    title: 'Morning Motor Events',
    category: 'Automotive',
    date: '2025-08-23',
    cover: 'https://images.pixieset.com/32995689/d861118a57dc9048fc001b78e24f7b52-large.jpg',
    album: 'https://isoregret.pixieset.com/morningmotorevent/',
    blurb: 'Sunrise rollers and chrome for days.'
  },
  {
  slug: 'Opening of the Beaches',
  title: 'Ooening of the Beaches',
  category: 'Automotive',  // must match one of: 'Automotive' | 'Real Estate' | 'Street'
  date: '2025-09-01',  // use YYYY-MM-DD
  cover: 'https://images.pixieset.com/09906689/eb66a76e5bd0a204ea4f344b0b1cafbe-large.jpg',  // thumbnail image
  album: 'https://isoregret.pixieset.com/OpeningoftheBeaches/',  // link to full album
  blurb: 'Golden hour portraits and skyline views in downtown Jacksonville.',
}
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
