import type { NextConfig } from 'next';
import { createRequire } from 'node:module';
import path from 'path';

const require = createRequire(import.meta.url);

const nextConfig: NextConfig = {
  cacheHandler: require.resolve('@mocky-balboa/next-js/cache-handler'),
  cacheMaxMemorySize: 0,
  cacheComponents: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
