/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      /**
       * Set up path for remote images
       */
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.secretlab.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
