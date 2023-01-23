/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'experimental-edge',
  },
  reactStrictMode: false,
  images: {
    loader: 'akamai',
    path: '/',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig