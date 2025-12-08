import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude Firebase client SDK from server bundles
      // This prevents build-time module evaluation errors
      config.externals = config.externals || [];
      config.externals.push({
        'firebase/app': 'commonjs firebase/app',
        'firebase/auth': 'commonjs firebase/auth',
        'firebase/firestore': 'commonjs firebase/firestore',
      });
    }
    return config;
  },
};

export default nextConfig;
