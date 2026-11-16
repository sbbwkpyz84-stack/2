import type { NextConfig } from 'next';
import { weiterleitungen } from './src/lib/content';

const sicherheit = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const config: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return weiterleitungen.map(([source, destination]) => ({ source, destination, statusCode: 301 as const }));
  },
  async headers() {
    return [
      { source: '/:path*', headers: sicherheit },
      {
        // Persönliche Zielseite und PDF: nicht indexieren, nicht cachen, keinen Referrer weitergeben.
        source: '/a/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Cache-Control', value: 'private, no-store' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
    ];
  },
};
export default config;
