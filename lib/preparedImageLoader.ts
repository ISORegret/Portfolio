import type { ImageLoaderProps } from 'next/image';

export function preparedImageUrl(src: string, width: number): string {
  if (!src.startsWith('/gallery/')) return src;
  const size = width <= 640 ? 640 : width <= 1280 ? 1280 : 2048;
  return `/prepared${src}/${size}.webp`;
}

export function thumbnailLoader({ src, width }: ImageLoaderProps): string {
  return preparedImageUrl(src, Math.min(width, 1280));
}

export default function preparedImageLoader({ src, width }: ImageLoaderProps): string {
  return preparedImageUrl(src, width);
}
