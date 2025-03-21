/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeholder.com"],
    unoptimized: true,
  },
  // This is important for Netlify deployment
  output: "standalone",
};

module.exports = nextConfig;
