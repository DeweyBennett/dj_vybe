import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['utfs.io', "cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      }
    ]
  }
};

export default nextConfig;
