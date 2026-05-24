import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/r/[name]': ['./src/hooks/**/*'],
    '/r/index': ['./src/hooks/**/*'],
  },
};

export default nextConfig;