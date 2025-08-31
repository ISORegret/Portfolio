'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, Button } from './ui';

type Props = {
  title: string;
  category: 'Automotive' | 'Real Estate' | 'Street';
  cover: string;
  album: string;
  blurb?: string;
};

export default function ProjectCard({ title, category, cover, album, blurb }: Props) {
  return (
    <a href={album} target="_blank" rel="noreferrer">
      <Card className="overflow-hidden hover:border-neutral-700 transition">
        <div className="relative h-56">
          {/* next/image for perf; works with remote hosts allowed in next.config.js */}
          <Image src={cover} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" style={{ objectFit: 'cover' }} />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span className="truncate">{title}</span>
            <span className="text-xs font-normal text-neutral-400 ml-3 shrink-0">{category}</span>
          </CardTitle>
        </CardHeader>
        {blurb && (
          <CardContent className="pt-0">
            <p className="text-sm text-neutral-300 line-clamp-2">{blurb}</p>
            <Button className="mt-3" variant="secondary">View Album</Button>
          </CardContent>
        )}
      </Card>
    </a>
  );
}
