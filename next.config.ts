import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly configure Turbopack (Next.js 16 default)
  turbopack: {
    resolveAlias: {
      // Note: Turbopack handles client/server boundaries better than webpack
      // Our 'use client' directives should prevent server-side bundling
      // No additional configuration needed for Firebase client SDK
    },
  },
};

export default nextConfig;
