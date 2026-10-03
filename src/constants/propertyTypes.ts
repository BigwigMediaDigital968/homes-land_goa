/**
 * Listing property types: the admin form's dropdown and the Buy/Rent filters.
 * Keep in sync with Homes-Land_Backend/constants/propertyTypes.js, which
 * rejects any other value.
 */
export const LISTING_TYPES = [
  "Villa",
  "Apartment",
  "Flat",
  "House",
  "Plot",
  "Commercial",
  "Resort",
] as const;

export type ListingType = (typeof LISTING_TYPES)[number];

/** First option of the type filter: no type filter applied. */
export const ALL_TYPES = "All";
