/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Pixieset cover images (if you hotlink one)
      { protocol: 'https', hostname: '*.pixieset.com' }
    ]
  }
};
module.exports = nextConfig;
