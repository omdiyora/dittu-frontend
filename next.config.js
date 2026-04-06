/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['zest-cosmo.myshopify.com'],
    // domains: ["via.placeholder.com"],
  },
};

module.exports = nextConfig;