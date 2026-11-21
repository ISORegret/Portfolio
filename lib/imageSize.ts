import table from './image-meta.json'

export type ImageSize = { width: number; height: number }

const dimensions = table as Record<string, ImageSize>

/** Intrinsic pixel size from the build-time manifest. Falls back to 3:2. */
export function imageSize(src: string): ImageSize {
  return dimensions[src] ?? { width: 3, height: 2 }
}
