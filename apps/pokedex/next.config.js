/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [
      'raw.githubusercontent.com'
    ]
  }
}

module.exports = nextConfig
