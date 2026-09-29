import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Every image on this site is served from /public, so no remote hosts are
   * allowed. Add a `remotePatterns` entry only if you later load imagery from a
   * CDN or a headless CMS.
   */
  images: {
    // JPEG assets are capped at 1600px wide, so nothing above that is offered.
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /**
   * The project lives inside a home directory that also contains other projects,
   * so the Turbopack root is pinned here rather than inferred from the lockfile.
   */
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
