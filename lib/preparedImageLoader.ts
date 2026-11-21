import type { ImageLoaderProps } from 'next/image'

const WIDTHS = [640, 1080, 1280, 2048]

export function preparedImageUrl(src: string, width: number): string {
  if (!src.startsWith('/gallery/')) return src
  const size = WIDTHS.find((candidate) => width <= candidate) ?? WIDTHS[WIDTHS.length - 1]
  return `/prepared${src}/${size}.webp`
}

export default function preparedImageLoader({ src, width }: ImageLoaderProps): string {
  return preparedImageUrl(src, width)
}
