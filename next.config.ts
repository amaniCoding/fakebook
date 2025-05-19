/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "7gqxz60aa5shpy47.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

<<<<<<< HEAD
=======


>>>>>>> 48ad4c71c2cca7c6484818da1925c4c2ab176060
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
