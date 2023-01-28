/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['yoembed']); // pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  }
};

module.exports = withTM(nextConfig);
