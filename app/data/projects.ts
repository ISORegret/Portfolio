// Simple data source for your projects (events/listings/sets)
// Option 2: Images are stored in public/gallery/[folder]/ and served from your site (no Pixieset 403).

export type Project = {
  slug: string
  title: string
  category: 'Automotive' | 'Real Estate' | 'Street'
  date: string
  cover: string           // path under public, e.g. /gallery/turkeyrodrun/cover.jpg
  album: string           // Pixieset (or other) album URL — for "View full album" link
  blurb?: string
  images?: string[]       // paths under public, e.g. /gallery/turkeyrodrun/1.jpg, 2.jpg, ...
};

/** URL-safe folder name from project slug (e.g. "Morning Motor Events" -> "morning-motor-events") */
export function slugToFolder(slug: string): string {
  return slug.toLowerCase().replace(/\s+/g, '-');
}

/** Build local image paths for a project. Put cover.jpg and 1.jpg, 2.jpg, ... in public/gallery/[folder]/ */
function albumPaths(folder: string, imageCount: number): { cover: string; images: string[] } {
  const base = `/gallery/${folder}`;
  return {
    cover: `${base}/cover.jpg`,
    images: Array.from({ length: imageCount }, (_, i) => `${base}/${i + 1}.jpg`),
  };
}

export function getProjectBySlug(slug: string): Project | undefined {
  const decoded = decodeURIComponent(slug);
  return projects.find((p) => p.slug === decoded);
}

const projects: Project[] = [
  {
    slug: 'Morning Motor Events',
    title: 'Morning Motor Events',
    category: 'Automotive',
    date: '2025-08-23',
    ...albumPaths('morning-motor-events', 5),
    album: 'https://isoregret.pixieset.com/morningmotorevent/',
    blurb: 'Sunrise shots and chrome for days.',
  },
  {
    slug: 'Opening of the Beaches',
    title: 'Opening of the Beaches',
    category: 'Automotive',
    date: '2025-09-01',
    ...albumPaths('opening-of-the-beaches', 31),
    album: 'https://isoregret.pixieset.com/OpeningoftheBeaches/',
    blurb: 'Golden hour portraits and skyline views in downtown Jacksonville Beach.',
  },
  {
    slug: 'Candid Randoms',
    title: 'Candid Moments',
    category: 'Street',
    date: '2025-08-10',
    ...albumPaths('candid-randoms', 30),
    album: 'https://isoregret.pixieset.com/candidrandoms/',
    blurb: 'Neon reflections and candid moments.',
  },
  {
    slug: 'damespoint',
    title: 'Dames Point',
    category: 'Automotive',
    date: '2025-10-01',
    ...albumPaths('damespoint', 32),
    album: 'https://isoregret.pixieset.com/damespoint/',
    blurb: 'Dames Point shoot.',
  },
  {
    slug: 'wingsanwheels',
    title: 'Wings and Wheels',
    category: 'Automotive',
    date: '2025-09-15',
    ...albumPaths('wingsanwheels', 12),
    album: 'https://isoregret.pixieset.com/wingsanwheels/',
    blurb: 'Wings and Wheels event.',
  },
  {
    slug: 'turkeyrodrun',
    title: 'Turkey Rod Run',
    category: 'Automotive',
    date: '2025-11-28',
    ...albumPaths('turkeyrodrun', 28),
    album: 'https://isoregret.pixieset.com/turkeyrodrun/',
    blurb: 'Turkey Rod Run automotive event.',
  },
  {
    slug: 'car-show',
    title: 'Car Show',
    category: 'Automotive',
    date: '2025-12-15',
    ...albumPaths('car-show', 12),
    album: 'https://pixies.et/QTnOVcfQ',
    blurb: 'Car show event.',
  },
  {
    slug: 'st-johns-county-permit-center',
    title: 'St Johns County Permit Center',
    category: 'Real Estate',
    date: '2025-12-20',
    ...albumPaths('st-johns-county-permit-center', 14),
    album: 'https://isoregret.pixieset.com/stjohnscountypermitcenter/',
    blurb: 'St Johns County Permit Center.',
  },
  {
    slug: 'justin-blennis',
    title: 'Justin Blennis',
    category: 'Street',
    date: '2025-12-01',
    ...albumPaths('justin-blennis', 23),
    album: 'https://isoregret.pixieset.com/blenniscaddy/',
    blurb: 'Justin Blennis shoot.',
  },
];

export { projects };
