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
    domains: ['zest-cosmo.myshopify.com',"res.cloudinary.com",'images.unsplash.com'],
    // domains: ["via.placeholder.com"],
  },
};

module.exports = nextConfig;