import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
   remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  eslint: {
    // This will allow production builds even if ESLint errors exist
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
