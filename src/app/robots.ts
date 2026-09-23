import { MetadataRoute } from "next";

const BASE_URL = "https://www.homesandlandgoa.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers on all public pages
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",        // Admin panel — block crawlers
          "/(admin)/",      // Next.js route group for admin
          "/api/",          // Internal API routes
          "/_next/",        // Next.js build assets
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
