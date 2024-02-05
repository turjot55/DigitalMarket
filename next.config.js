/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "digitalmarket-production-6816.up.railway.app"],
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "**",
    //   },

    // ],
  },
};

module.exports = nextConfig;
