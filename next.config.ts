import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Lets a phone on the same network open the dev server (npm run dev) by IP.
   * 172.20.10.x is a phone hotspot; add your Wi-Fi's laptop IP if it differs.
   * Dev only: has no effect on the production build.
   */
  allowedDevOrigins: ["172.20.10.8", "172.20.10.*", "192.168.*.*"],

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

  /** The site is a single page now; old section URLs land on the matching section. */
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/process", destination: "/#process", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/projects/:slug", destination: "/#projects", permanent: true },
      { source: "/credits", destination: "/", permanent: true },
    ];
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
