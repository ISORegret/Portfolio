export type Testimonial = {
  quote: string
  name: string
  role?: string
  project?: string
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Ryan nailed the vibe we wanted—moody, cinematic, and totally on-brand. The turnaround was fast and the shots were exactly what we needed.',
    name: 'Alex M.',
    role: 'Event organizer',
    project: 'Morning Motor Events',
  },
  {
    quote: 'Professional from start to finish. The blue-hour real estate set got us multiple showings in the first week. Couldn’t recommend more.',
    name: 'Jordan T.',
    role: 'Realtor',
    project: 'Jacksonville Beach listing',
  },
  {
    quote: 'Finally found someone who gets automotive photography. The rollers and rig shots are insane.',
    name: 'Marcus D.',
    role: 'Car enthusiast',
    project: 'Dames Point shoot',
  },
]
