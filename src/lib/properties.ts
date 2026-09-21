import type { ListingProperty } from "../../components/listings/PropertyCard";

export type ListingPurpose = "buy" | "rent";

const DESCRIPTION_MAX_CHARS = 200;

/**
 * Keep only what a listing card needs. The API returns every image and the
 * full description for each property; sending all of that to the browser as
 * page data would bloat the HTML for no visible benefit.
 */
const toListing = (p: ListingProperty): ListingProperty => ({
  _id: p._id,
  title: p.title,
  slug: p.slug,
  type: p.type,
  location: p.location,
  price: p.price,
  purpose: p.purpose,
  bedrooms: p.bedrooms,
  bathrooms: p.bathrooms,
  areaSqft: p.areaSqft,
  images: p.images?.slice(0, 1) ?? [],
  description: p.description?.slice(0, DESCRIPTION_MAX_CHARS),
});

/** Properties of one purpose only, trimmed for listing cards. */
export function normalizeProperties(
  data: unknown,
  purpose: ListingPurpose,
): ListingProperty[] {
  if (!Array.isArray(data)) return [];

  return (data as ListingProperty[])
    .filter((p) => p.purpose?.toLowerCase() === purpose)
    .map(toListing);
}

/**
 * Server-side fetch, cached and refreshed every 5 minutes.
 * Returns null on any failure so the page can fall back to a client fetch
 * instead of caching an empty listing.
 */
export async function getProperties(
  purpose: ListingPurpose,
): Promise<ListingProperty[] | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;

    return normalizeProperties(await res.json(), purpose);
  } catch {
    return null;
  }
}
