/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  output: 'export',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;

