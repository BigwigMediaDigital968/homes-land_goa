import type { ListingProperty } from "../../components/listings/PropertyCard";

export type ListingPurpose = "buy" | "rent";

const DESCRIPTION_MAX_CHARS = 200;

/**
 * Positive number, or null when the field is empty, zero or not a number.
 * Price, bedrooms and area all arrive as `number | string | null`.
 */
export const toPositiveNumber = (value: number | string | null | undefined) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
};

/**
 * Bedroom / bathroom count out of whatever the field happens to hold.
 *
 * These are Numbers in the schema but reach us as free text often enough
 * ("2 BHK", "2 bhk", " 3 ") that Number() just returns NaN. Reading the first
 * number out ignores the surrounding text, while still keeping 2 and 12 apart
 * — which a plain substring check would not, since "12 BHK" contains "2".
 *
 * Only safe for small counts: on "5,800" it would read 5, so price and area
 * use toPositiveNumber instead.
 */
export const toRoomCount = (value: number | string | null | undefined) => {
  if (value === null || value === undefined) return null;

  const digits = String(value).match(/\d+/);
  if (!digits) return null;

  const count = Number(digits[0]);
  return Number.isFinite(count) && count > 0 ? count : null;
};

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
