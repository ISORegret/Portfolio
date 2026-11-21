import type { MetadataRoute } from 'next'
import { posts } from './data/posts'
import { projects } from './data/projects'
import { SITE_URL } from './data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ['', '/files', '/films', '/blog', '/connect', '/collections/automotive', '/collections/real-estate', '/collections/street']

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path || '/'}`,
      lastModified: now,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/gallery/${encodeURIComponent(project.slug)}`,
      lastModified: new Date(`${project.date}T12:00:00`),
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: new Date(`${post.date}T12:00:00`),
    })),
  ]
}
