export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  body: string
}

export const posts: Post[] = [
  {
    slug: 'blue-hour-at-the-bridge',
    title: 'Blue hour at the bridge',
    excerpt: 'How we got that Dames Point shot — timing, light, and one patient driver.',
    date: '2025-10-15',
    body: `That Dames Point shot wasn’t luck — it was a tight window and a lot of coordination.

**The setup**

We had about 25 minutes of useable blue hour. The bridge, the car, and the sky had to line up. We scouted the spot the day before and marked where the car needed to sit so the pillars framed the shot.

**Light and settings**

No flash. Just the last bit of daylight and the bridge lights coming on. I shot at f/2.8, ISO 800, and let the shutter drag a bit (1/30s) to get a hint of motion in the clouds. The car was static; the mood came from the sky and the water.

**What I’d do differently**

I’d add a single LED panel on the driver’s side next time — just a kiss of fill so the car doesn’t fall into shadow. Still happy with this one as a natural-light baseline.

*Behind the shot* is a short series on how select images were made. More soon.`,
  },
  {
    slug: 'morning-motors-and-coffee',
    title: 'Morning motors and coffee',
    excerpt: 'Why we show up before the sun for car events.',
    date: '2025-09-01',
    body: `Morning Motor Events has become a regular — and for good reason. The light at 6:30 a.m. is stupid good.

**Why early**

Most car events are midday. Harsh sun, flat light, blown highlights. We started showing up at dawn to get rollers and static shots before the crowd. The organizers were into it; now we’ve got a little window where the lot is full but the sun is still low.

**Gear and approach**

Sony body, 24–70 for most of it, and a CPL to kill reflections on glass and paint. For rollers we keep the rig simple: one car, one camera, one driver who can hold 35 mph. Communication is everything — a quick briefing and we get 3–4 useable passes.

**Takeaway**

If you’re shooting cars, find the golden hour. If the event doesn’t give it to you, create a separate “sunrise run” or “blue hour” add-on. Your portfolio will thank you.`,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
