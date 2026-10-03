'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { albumHrefWithFrom } from '../lib/albumBackNavigation';
import { thumbnailLoader } from '../lib/preparedImageLoader';
type Props = { slug: string; title: string; category: 'Automotive' | 'Real Estate' | 'Street'; cover: string; album?: string; blurb?: string; fromPath?: string };
export default function ProjectCard({ slug, title, category, cover, fromPath }: Props) {
  return <Link href={fromPath ? albumHrefWithFrom(slug, fromPath) : `/gallery/${encodeURIComponent(slug)}`} className="iso-album-card">
    <div className="iso-album-image"><Image loader={thumbnailLoader} src={cover} alt={title} fill sizes="(min-width: 1024px) 36vw, (min-width: 640px) 50vw, 100vw" className="object-cover" unoptimized={cover.includes('pixieset.com')} referrerPolicy="no-referrer" /></div>
    <h3>{title}<ArrowUpRight size={20} aria-hidden /></h3><p>{category} · View album</p>
  </Link>;
}
