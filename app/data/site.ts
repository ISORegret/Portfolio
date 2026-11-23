/**
 * Site-wide marketing copy, hero, pricing, and featured strip.
 * Edit here — no code changes needed for most updates.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://isoregretmedia.com';

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
    'Jacksonville, FL photographer for automotive events, MLS-ready real estate, and street work. Cinematic photos & video — online galleries, high-res delivery.',
  /** Short line under the hero headline (your “look”) */
  colorStory:
    'True-to-life color for listings, punch and atmosphere for cars and events, and mood when the story calls for it—graded for wherever your images live.',
  hero: {
    /** Poster still. Shown on its own when video is off or motion is reduced. */
    imageSrc: '/gallery/blue-mustang/blue-mustang-roller.jpg',
    imageAlt: 'S650 Mustang GT Premium roller — ISO.Regret',
    /**
     * Muted full-bleed loop. H.264, 1080p, faststart, no audio.
     * Set to '' to use the poster only. Homepage hero is a still roller
     * (design mock), so this stays empty.
     */
    videoSrc: '',
  },
  /** Slugs of projects to show in the horizontal “selected work” strip (order preserved) */
  featuredStripSlugs: [
    'blue-mustang',
    'green-macan',
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
  /**
   * Published rates, exactly as in the approved design mock
   * (Nov 23, 2026 — these three tiers replace the old four packages).
   */
  packages: [
    {
      name: 'Essential',
      price: '$150',
      priceNote: 'from',
      bullets: [
        'Short session, up to 1 hour',
        '15 edited photos',
        'Online gallery delivery',
        'Suits listings, meets & single-car shoots',
      ],
      cta: 'Book Essential',
      href: '/#contact',
      featured: false,
    },
    {
      name: 'Signature',
      price: '$650',
      priceNote: 'from',
      bullets: [
        'Half day, up to 4 hours',
        '40 edited photos',
        '60-second highlight film',
        'Suits full listings & event coverage',
      ],
      cta: 'Book Signature',
      href: '/#contact',
      featured: true,
    },
    {
      name: 'Cinematic',
      price: '$2,500',
      priceNote: 'from',
      bullets: [
        'Full-day coverage',
        'Complete edited gallery',
        'Feature film + social cuts',
        'Raw footage included',
      ],
      cta: 'Book Cinematic',
      href: '/#contact',
      featured: false,
    },
  ],
} as const;
