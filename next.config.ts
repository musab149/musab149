import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is a fully static content site (all copy lives in src/content).
  // Cache Components / PPR is left off on purpose: it adds no value here and
  // forbids empty `generateStaticParams` results, which we need while the
  // portfolio and insights collections are still empty. See DECISIONS.md.
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    deviceSizes: [375, 414, 640, 768, 1024, 1280, 1440, 1920],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
