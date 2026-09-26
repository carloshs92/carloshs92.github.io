import type { NextConfig } from "next";

// Sitio 100% estático para GitHub Pages (https://carloshs92.github.io)
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
