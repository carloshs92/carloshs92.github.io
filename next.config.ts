import type { NextConfig } from "next";

// Sitio 100% estático para GitHub Pages, servido en https://carloshuamani.com
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
