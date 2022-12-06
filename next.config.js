/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['yoembed']); // pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withTM(nextConfig);
