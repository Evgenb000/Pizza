/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "img.icons8.com",
      "media.dodostatic.net",
      "cdn.dodostatic.net",
      "avatars.githubusercontent.com",
    ],
  },
};

export default nextConfig;
