'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Button } from './ui';

// Minimal blur placeholder for image loading (tiny gray gradient)
const BLUR_DATA =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8QDu/9k=';

type Props = {
  slug: string;
  title: string;
  category: 'Automotive' | 'Real Estate' | 'Street';
  cover: string;
  album: string;
  blurb?: string;
};

export default function ProjectCard({ slug, title, category, cover, blurb }: Props) {
  const albumPath = `/gallery/${encodeURIComponent(slug)}`;
  return (
    <Link href={albumPath} className="block group">
      <Card className="overflow-hidden border-border/60 bg-bg-card hover:border-accent/30 hover:shadow-glow transition-all duration-300 h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500 ease-out"
            placeholder="blur"
            blurDataURL={BLUR_DATA}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/90 text-neutral-900 px-4 py-2 text-sm font-semibold shadow-lg">
              View album
            </span>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-[rgb(var(--text))]">
            <span className="truncate font-display font-semibold">{title}</span>
            <span className="text-xs font-normal text-[rgb(var(--text-muted))] ml-3 shrink-0">{category}</span>
          </CardTitle>
        </CardHeader>
        {blurb && (
          <CardContent className="pt-0 mt-auto">
            <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-2">{blurb}</p>
            <Button className="mt-3" variant="secondary">View Album</Button>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
