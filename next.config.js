module.exports = {
  output: "standalone",
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeholder.com"],
    unoptimized: true,
  },
  // Exclude specific packages from bundling
  serverExternalPackages: ["bcrypt", "sharp", "mongoose"],
  // This is important for Netlify deployment
  output: "standalone",
};

module.exports = nextConfig;
