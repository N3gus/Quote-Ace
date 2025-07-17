/**
 * @type {import('next').NextConfig}
 */
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    /**
     * Disables TypeScript errors during the build process.
     * Useful for faster iteration, but should be used with caution in production.
     */
    ignoreBuildErrors: true,
  },
  eslint: {
    /**
     * Disables ESLint checks during the build process.
     * Useful for faster iteration, but it's recommended to run ESLint separately.
     */
    ignoreDuringBuilds: true,
  },
  images: {
    /**
     * Configuration for Next.js Image Optimization.
     * Defines a list of allowed remote domains for images.
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
