import { MetadataRoute } from "next";

const BASE_URL = "https://www.homesandlandgoa.com";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

// ─── Static Pages ────────────────────────────────────────────────────────────
const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/buy`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/rent`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/sell`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/blogs`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/upcoming-projects`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/contacts`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/faq`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/Privacy-Policy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms-condition`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

// ─── Dynamic: Properties (buy) ───────────────────────────────────────────────
async function getPropertyEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_BASE}/property`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const properties: { slug: string; updatedAt?: string }[] = await res.json();

    return properties.map((property) => ({
      url: `${BASE_URL}/buy/${property.slug}`,
      lastModified: property.updatedAt
        ? new Date(property.updatedAt)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  } catch {
    return [];
  }
}

// ─── Dynamic: Rent Properties ────────────────────────────────────────────────
async function getRentPropertyEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_BASE}/property?category=rent`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const properties: { slug: string; updatedAt?: string }[] = await res.json();

    return properties.map((property) => ({
      url: `${BASE_URL}/rent/${property.slug}`,
      lastModified: property.updatedAt
        ? new Date(property.updatedAt)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  } catch {
    return [];
  }
}

// ─── Dynamic: Blog Posts ─────────────────────────────────────────────────────
async function getBlogEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_BASE}/blog/viewblog`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const blogs: {
      slug: string;
      datePublished?: string;
      lastUpdated?: string;
    }[] = await res.json();

    return blogs.map((blog) => ({
      url: `${BASE_URL}/blogs/${blog.slug}`,
      lastModified: blog.lastUpdated
        ? new Date(blog.lastUpdated)
        : blog.datePublished
          ? new Date(blog.datePublished)
          : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

// ─── Dynamic: Upcoming Projects ──────────────────────────────────────────────
async function getUpcomingProjectEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_BASE}/property?category=upcoming`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const projects: { slug: string; updatedAt?: string }[] = await res.json();

    return projects.map((project) => ({
      url: `${BASE_URL}/upcoming-projects/${project.slug}`,
      lastModified: project.updatedAt
        ? new Date(project.updatedAt)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    return [];
  }
}

// ─── Main Sitemap Export ──────────────────────────────────────────────────────
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [propertyEntries, rentEntries, blogEntries, upcomingEntries] =
    await Promise.all([
      getPropertyEntries(),
      getRentPropertyEntries(),
      getBlogEntries(),
      getUpcomingProjectEntries(),
    ]);

  return [
    ...staticRoutes,
    ...propertyEntries,
    ...rentEntries,
    ...blogEntries,
    ...upcomingEntries,
  ];
}
