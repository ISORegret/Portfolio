export type Film = {
  slug: string
  title: string
  src: string
  poster: string
}

/** Construction films already on the site. No dates are on file for these. */
export const films: Film[] = [
  {
    slug: 'tilt-time',
    title: 'Tilt Time',
    src: '/films/tilt-time.mp4',
    poster: '/films/tilt-time-poster.jpg',
  },
  {
    slug: 'panel-pours',
    title: 'Panel Pours',
    src: '/films/panel-pours.mp4',
    poster: '/films/panel-pours-poster.jpg',
  },
]
