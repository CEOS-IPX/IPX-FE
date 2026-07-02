import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "picsum.photos" }],
  },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [{ loader: "@svgr/webpack", options: { dimensions: false } }],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
