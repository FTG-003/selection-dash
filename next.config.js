/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;

