import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  cacheComponents: true,
  /* config options here */
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
