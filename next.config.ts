import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root: a stray lock file in the home directory would
  // otherwise make Turbopack trace far outside the project.
  turbopack: { root: path.resolve(".") },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three.js and its R3F wrappers ship large ESM graphs; tree-shaking them per
  // import keeps the hero scene chunk lean.
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei", "motion"],
  },
};

export default nextConfig;
