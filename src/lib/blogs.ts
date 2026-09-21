export interface BlogListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage: string;
  datePublished: string;
}

/**
 * Keep only what a card needs. Each post carries its full HTML `content`,
 * which would otherwise be serialised into the page data for every post on
 * the index — megabytes of markup nothing on this page renders.
 */
const toListItem = (b: BlogListItem & { content?: string }): BlogListItem => ({
  _id: b._id,
  title: b.title,
  slug: b.slug,
  excerpt: b.excerpt,
  author: b.author,
  tags: b.tags ?? [],
  coverImage: b.coverImage,
  datePublished: b.datePublished,
});

/**
 * Server-side fetch, cached and refreshed every 5 minutes.
 * Returns null on failure so the page can fall back to a client fetch rather
 * than caching an empty index.
 */
export async function getBlogs(): Promise<BlogListItem[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return null;

    return normalizeBlogs(await res.json());
  } catch {
    return null;
  }
}

export function normalizeBlogs(data: unknown): BlogListItem[] {
  if (!Array.isArray(data)) return [];
  return data.map(toListItem);
}

/**
 * Fixed locale and timezone so the server and the browser format the date
 * identically — otherwise React reports a hydration mismatch.
 */
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatBlogDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
}
