/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ['ssl.cdn-redfin.com', 'png.pngtree.com','assets.allurausa.com', '13.212.148.221', 'i.pinimg.com'],
  },
  env: {
    apiUrl: "http://13.212.148.221:3000/api"
  }
};

module.exports = nextConfig;
