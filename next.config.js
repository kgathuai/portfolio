/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeholder.com"],
    unoptimized: true,
  },
  // Add memory optimizations to fix the webpack cache error
  experimental: {
    webpackMemoryOptimizations: true,
  },
  // This is important for Netlify deployment
  output: "standalone",
};

module.exports = nextConfig;
