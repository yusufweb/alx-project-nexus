import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontendNav: true,
  aggressiveFrontendNavCaching: true,
  reloadOnOnline: true,
  swMinify: true,
  disable: false,
  workBoxOptions: {
    disableDevLogs: true,
  }
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default withPWA(nextConfig);
