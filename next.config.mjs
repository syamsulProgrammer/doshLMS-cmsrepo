/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    output: 'standalone',
    env: {
      API_URL: process.env.API_URL
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'loremflickr.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '5000',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'dosh.appservice.id',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'dosh.collaveo.com',
          port: '',
          pathname: '/**',
        },
      ]
    }
  };

export default nextConfig;
