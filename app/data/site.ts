/**
 * Site-wide marketing copy, hero, pricing, and featured strip.
 * Edit here — no code changes needed for most updates.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.isoregret.com';

/** Used in <meta name="keywords"> and for internal consistency — search engines weigh content & titles more, but this helps focus. */
export const seoKeywords = [
  'Jacksonville photographer',
  'Florida automotive photography',
  'car show photographer Jacksonville',
  'real estate photographer Jacksonville',
  'MLS photography Florida',
  'architecture photography',
  'street photography Jacksonville',
  'cinematic photography',
  'event photographer Jacksonville',
  'ISO.Regret',
  'Northeast Florida photographer',
] as const;

export const siteConfig = {
  brandName: 'ISO.Regret',
  /**
   * Default meta description (~155–160 chars is ideal for Google snippets).
   * Location + services + outcome + trust signal.
   */
  defaultDescription:
    'Jacksonville, FL photographer for automotive events, MLS-ready real estate, and street work. Cinematic photos & video—online galleries, high-res delivery, typically 48–72 hr turnaround.',
  /** Short line under the hero headline (your “look”) */
  colorStory:
    'True-to-life color for listings, punch and atmosphere for cars and events, and mood when the story calls for it—graded for wherever your images live.',
  hero: {
    /** Your image in /public — swap anytime */
    imageSrc: '/gallery/waterfront-auto-show-2026/cover.jpg',
    imageAlt:
      'Automotive and car show photography at a waterfront event in Jacksonville, Florida — ISO.Regret photographer',
    /**
     * Step 5 — Optional hero loop (plays under the still image).
     * 1) Export: H.264 .mp4, muted, ~1080p, short loop (e.g. 10–30s), keep file size reasonable for web.
     * 2) Save as: public/hero-reel.mp4
     * 3) Path below must stay `/hero-reel.mp4`. If the file is missing, the hero uses the still only (no broken UI).
     * To disable video entirely, set to ''.
     */
    videoSrc: '/hero-reel.mp4',
    headline: 'Cinematic photography & videography in Jacksonville',
    subline:
      'Automotive events, MLS-ready real estate, and street work—with the same eye for light, color, and story. On-site shoots, polished galleries, files ready for web, print, or social.',
  },
  /** Slugs of projects to show in the horizontal “selected work” strip (order preserved) */
  featuredStripSlugs: [
    'waterfront-auto-show-2026',
    'caffeine-octane-jacksonville',
    'opening-of-the-beaches',
    'candid-randoms',
    'damespoint',
    'morning-motor-events',
    'wingsanwheels',
    'turkeyrodrun',
  ] as const,
  /** Optional “as seen in” — name + link; leave empty to hide */
  press: [] as { name: string; href: string }[],
  packages: [
    {
      name: 'Short session (1–2 hrs)',
      price: 'Roughly $150–$500+',
      description: 'Personal work, portfolio, or a single vehicle—price depends on deliverables and editing.',
      bullets: [
        'Great for one car, small meet, or tight creative set',
        'Web / social files + gallery options',
        'Add high-res or extended time as needed',
        'Quote after scope',
      ],
      cta: 'Request a quote',
      href: '/#contact',
      featured: false,
    },
    {
      name: 'Half-day (3–4 hrs)',
      price: 'Roughly $400–$1,000+',
      description: 'Small events, multi-car setups, or a longer real-estate run in one window.',
      bullets: [
        'Enough time for variety and key moments',
        'Consistent look across the set',
        'Optional short video add-ons',
        'Final quote based on location & deliverables',
      ],
      cta: 'Request a quote',
      href: '/#contact',
      featured: true,
    },
    {
      name: 'Full-day event / show',
      price: 'Roughly $800–$2,500+',
      description: 'Car shows, long events, or coverage that needs breadth from open to close (big spread by scale).',
      bullets: [
        'Full event narrative and hero moments',
        'High volume, organized delivery',
        'Reels / vertical clips available',
        'Scoped to venue, hours, and usage',
      ],
      cta: 'Book event coverage',
      href: '/#contact',
      featured: false,
    },
    {
      name: 'Real estate — single listing (stills)',
      price: 'Roughly $150–$500+ per listing',
      description: 'MLS-ready stills; luxury or larger homes / more rooms usually land higher in the range.',
      bullets: [
        'Interiors, exteriors, and key details',
        'Sized for MLS and marketing',
        'Blue-hour or twilight add-ons optional',
        'Turnaround aligned with your closing needs',
      ],
      cta: 'Request a quote',
      href: '/#contact',
      featured: false,
    },
  ],
} as const;
