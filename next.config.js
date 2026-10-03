/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/preparedImageLoader.ts',
    deviceSizes: [640, 1280, 2048],
    imageSizes: [640],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.pixieset.com' },
      { protocol: 'https', hostname: '*.pixieset.com' }
    ]
  },
  async headers() {
    return [{ source: '/prepared/:path*', headers: [
      { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }
    ] }];
  }
};
module.exports = nextConfig;
