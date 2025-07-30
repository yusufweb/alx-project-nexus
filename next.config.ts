import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'], // TMDB's image domain for rendering external image source
  },
};

export default nextConfig;
