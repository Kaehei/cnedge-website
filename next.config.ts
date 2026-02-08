import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gwold.cnedge.net",
      },
    ],
  },
};

export default nextConfig;
