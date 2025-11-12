/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⚠️ Ignore ESLint errors during builds (for deployment)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
