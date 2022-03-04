/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['loremflickr.com']
  },
  staticPageGenerationTimeout: 60
}

module.exports = nextConfig
