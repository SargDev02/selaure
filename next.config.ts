import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.labodegahyc.store",
      },
      {
        protocol: "https",
        hostname: "femprobiotics.co",
        pathname: "/cdn/shop/files/**",
      },
    ],
  },
};

export default nextConfig;
