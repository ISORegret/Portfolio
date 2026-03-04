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
    <a href={album} target="_blank" rel="noreferrer" className="block group">
      <Card className="overflow-hidden border-border/60 bg-bg-card hover:border-accent/30 hover:shadow-glow transition-all duration-300 h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <Image src={cover} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-500" />
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
    </a>
  );
}
