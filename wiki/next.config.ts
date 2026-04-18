import type { NextConfig } from 'next'

const ROBIN_SERVER = process.env.ROBIN_SERVER ?? 'http://localhost:3000'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${ROBIN_SERVER}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
