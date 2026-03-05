// Simple data source for your projects (events/listings/sets)
export type Project = {
  slug: string
  title: string
  category: 'Automotive' | 'Real Estate' | 'Street'
  date: string            // ISO like '2025-08-31'
  cover: string           // image URL (Imgur/Cloudinary) or /public path
  album: string           // Pixieset (or other) album URL
  blurb?: string
  /** Optional extra image URLs — all show in Gallery grid and on album page (cover + these) */
  images?: string[]
};

export function getProjectBySlug(slug: string): Project | undefined {
  const decoded = decodeURIComponent(slug);
  return projects.find((p) => p.slug === decoded);
}

export const projects: Project[] = [
  {
    slug: 'Morning Motor Events',
    title: 'Morning Motor Events',
    category: 'Automotive',
    date: '2025-08-23',
    cover: 'https://images.pixieset.com/32995689/d861118a57dc9048fc001b78e24f7b52-large.jpg',
    album: 'https://isoregret.pixieset.com/morningmotorevent/',
    blurb: 'Sunrise shots and chrome for days.',
    images: [
      'https://images.pixieset.com/32995689/8992941593fac515aed5e5ce58625385-xlarge.jpg',
      'https://images.pixieset.com/32995689/cf6ab53f238a5d2a2d123088bf5ad1cd-xlarge.jpg',
      'https://images.pixieset.com/32995689/f9ea64ee6b0ad24ddc085f0af790dec-xlarge.jpg',
      'https://images.pixieset.com/32995689/61917a076dd1c01862141f4a0b1b5273-xlarge.jpg',
      'https://images.pixieset.com/32995689/fefc5a98024889aeb94f76970859ed3c-xlarge.jpg',
    ],
  },
  
  {
  slug: 'Opening of the Beaches',
  title: 'Opening of the Beaches',
  category: 'Automotive',
  date: '2025-09-01',
  cover: 'https://images.pixieset.com/09906689/eb66a76e5bd0a204ea4f344b0b1cafbe-large.jpg',
  album: 'https://isoregret.pixieset.com/OpeningoftheBeaches/',
  blurb: 'Golden hour portraits and skyline views in downtown Jacksonville Beach.',
  images: [
    'https://images.pixieset.com/09906689/8af3f437c24d8d79f1b6ac67a45e2761-xlarge.jpg',
    'https://images.pixieset.com/09906689/71690fa40c92a8e6177b1557ada5ba8c-xlarge.jpg',
    'https://images.pixieset.com/09906689/3ef3261df04ffdd43a3f2f5b9649c893-xlarge.jpg',
  ],
  },
  
  {
    slug: 'Candid Randoms',
    title: 'Candid Moments',
    category: 'Street',
    date: '2025-08-10',
    cover: 'https://images.pixieset.com/78529689/df0fea87d96794c5ea15cb958efff59a-large.jpg',
    album: 'https://isoregret.pixieset.com/candidrandoms/',
    blurb: 'Neon reflections and candid moments.',
    images: [
      'https://images.pixieset.com/78529689/3ea443a596c6d3de125fa88091766591-xlarge.jpg',
      'https://images.pixieset.com/78529689/8a302f7b0fbf869901d114e6cea6f1dc-xlarge.jpg',
      'https://images.pixieset.com/78529689/bde89bee922fa90b7128289765c83123-xlarge.jpg',
      'https://images.pixieset.com/78529689/1e00542434967a5f361a9358e60e5871-xlarge.jpg',
      'https://images.pixieset.com/78529689/1ec90b041bf1b11feedfa708399f58be-xlarge.jpg',
    ],
  },

  {
    slug: 'damespoint',
    title: 'Dames Point',
    category: 'Automotive',
    date: '2025-10-01',
    cover: 'https://images.pixieset.com/929953011/9976c46a33e5f7611dc4ea5823c55046-cover-large.jpg',
    album: 'https://isoregret.pixieset.com/damespoint/',
    blurb: 'Dames Point shoot.',
  },
  {
    slug: 'wingsanwheels',
    title: 'Wings and Wheels',
    category: 'Automotive',
    date: '2025-09-15',
    cover: 'https://images.pixieset.com/343953011/a8ba15af67e8933e6a9c6d3d22421632-cover-large.jpg',
    album: 'https://isoregret.pixieset.com/wingsanwheels/',
    blurb: 'Wings and Wheels event.',
  },
  {
    slug: 'turkeyrodrun',
    title: 'Turkey Rod Run',
    category: 'Automotive',
    date: '2025-11-28',
    cover: 'https://images.pixieset.com/905463011/8c03ce04216aa4d8da0541a648430f73-xlarge.jpg',
    album: 'https://isoregret.pixieset.com/turkeyrodrun/',
    blurb: 'Turkey Rod Run automotive event.',
  },
  {
    slug: 'justin-blennis',
    title: 'Justin Blennis',
    category: 'Street',
    date: '2025-12-01',
    cover: 'https://images.pixieset.com/160723601/63d3625635716a20098701eb8729a129-cover-large.jpg',
    album: 'https://isoregret.pixieset.com/blenniscaddy/',
    blurb: 'Justin Blennis shoot.',
    images: [
      'https://images.pixieset.com/160723601/9d0207c34387d2864417f2e5523f5f8d-xlarge.jpg',
      'https://images.pixieset.com/160723601/ec922b709afbd164bb59d6f60c94137c-xlarge.jpg',
    ],
  },
];
