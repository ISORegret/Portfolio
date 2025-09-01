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
    blurb: 'Sunrise shots and chrome for days.'
  },
  
  {
  slug: 'Opening of the Beaches',
  title: 'Opening of the Beaches',
  category: 'Automotive',  // must match one of: 'Automotive' | 'Real Estate' | 'Street'
  date: '2025-09-01',  // use YYYY-MM-DD
  cover: 'https://images.pixieset.com/09906689/eb66a76e5bd0a204ea4f344b0b1cafbe-large.jpg',  // thumbnail image
  album: 'https://isoregret.pixieset.com/OpeningoftheBeaches/',  // link to full album
  blurb: 'Golden hour portraits and skyline views in downtown Jacksonville Beach.',
  },
  
  {
    slug: 'Candid Randoms',
    title: 'Candid Moments',
    category: 'Street',
    date: '2025-08-10',
    cover: 'https://images.pixieset.com/78529689/df0fea87d96794c5ea15cb958efff59a-large.jpg',
    album: 'https://isoregret.pixieset.com/candidrandoms/',
    blurb: 'Neon reflections and candid moments.'
  },
];
