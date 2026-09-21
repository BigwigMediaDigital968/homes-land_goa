"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { motion, MotionConfig } from "framer-motion";
import { X } from "lucide-react";
import FilterDropdown from "../ui/FilterDropdown";
import { LeadForm } from "../LeadForm";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import PropertyCard, { type ListingProperty } from "./PropertyCard";
import Pagination from "./Pagination";
import TypeParamSync from "./TypeParamSync";
import { normalizeProperties, type ListingPurpose } from "@/lib/properties";

const PROPERTIES_PER_PAGE = 9;

/** Sentinel for "no bedroom filter applied". */
const ANY_BEDROOMS = "";

/**
 * Pull the bedroom count out of whatever the field happens to hold.
 *
 * `bedrooms` is a Number in the schema but reaches us as free text often
 * enough ("2 BHK", "2 bhk", " 3 ") that comparing the whole value never
 * matches. Reading the first number out instead ignores the surrounding text,
 * while still keeping 2 and 12 apart — which a plain substring check would
 * not, since "12 BHK" contains "2".
 */
const toBedroomCount = (value: number | string | null | undefined) => {
  if (value === null || value === undefined) return null;

  const digits = String(value).match(/\d+/);
  if (!digits) return null;

  const count = Number(digits[0]);
  return Number.isFinite(count) && count > 0 ? count : null;
};

interface SectionCopy {
  eyebrow: string;
  heading: string;
  paragraph?: string;
}

interface PropertyListingsProps {
  /** Fetched on the server so the cards are in the initial HTML. */
  initialProperties: ListingProperty[];
  /** True when the server fetch failed; the browser then fetches instead. */
  fetchFailed: boolean;
  purpose: ListingPurpose;
  /** Listing page route; also the prefix of each card's detail link. */
  basePath: "/buy" | "/rent";
  /** Alt-text wording, e.g. "for sale" / "for rent". */
  listingLabel: string;
  /** First entry should be "All". */
  typeFilters: string[];
  /** Adds a location dropdown when provided (first entry = "All Locations"). */
  locations?: string[];
  /** Optional intro block above the filters (Buy uses one, Rent doesn't). */
  discovery?: Required<SectionCopy>;
  listings: SectionCopy;
  /** Shown when the site has no properties for this purpose at all. */
  noListings?: { heading: string; text: string };
}

export default function PropertyListings({
  initialProperties,
  fetchFailed,
  purpose,
  basePath,
  listingLabel,
  typeFilters,
  locations,
  discovery,
  listings,
  noListings,
}: PropertyListingsProps) {
  const allLocations = locations?.[0] ?? "";

  const [selectedType, setSelectedType] = useState(typeFilters[0]);
  const [selectedLocation, setSelectedLocation] = useState(allLocations);
  const [selectedBedrooms, setSelectedBedrooms] = useState(ANY_BEDROOMS);
  const [currentPage, setCurrentPage] = useState(1);

  const [properties, setProperties] = useState(initialProperties);
  const [loading, setLoading] = useState(fetchFailed);
  // The entrance animation starts from opacity 0, so it only plays after the
  // user changes a filter/page. The first render stays fully visible in the
  // server HTML (no hidden content for crawlers, no flash before hydration).
  const [interacted, setInteracted] = useState(false);

  const listingsRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  // Only runs when the server couldn't reach the API
  useEffect(() => {
    if (!fetchFailed) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`)
      .then((res) => res.json())
      .then((data) => setProperties(normalizeProperties(data, purpose)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [fetchFailed, purpose]);

  // `?type=villa` (from the property-types section) → apply that filter
  const applyTypeParam = useCallback(
    (param: string | null) => {
      const match = typeFilters.find(
        (t) => t.toLowerCase() === param?.toLowerCase(),
      );
      setSelectedType(match ?? typeFilters[0]);
      setCurrentPage(1);
    },
    [typeFilters],
  );

  // Keep the URL in step with the dropdown so re-clicking an "Explore …" link
  // after changing the filter still takes effect.
  const selectType = (type: string) => {
    setInteracted(true);
    setSelectedType(type);
    setCurrentPage(1);
    router.replace(
      type === typeFilters[0]
        ? basePath
        : `${basePath}?type=${type.toLowerCase()}`,
      { scroll: false },
    );
  };

  /**
   * Only the bedroom counts that actually exist in the current listings, so
   * every option in the dropdown returns at least one property.
   */
  const bedroomOptions = useMemo(() => {
    const counts = new Set<number>();

    properties.forEach((p) => {
      const count = toBedroomCount(p.bedrooms);
      if (count !== null) counts.add(count);
    });

    return [...counts].sort((a, b) => a - b);
  }, [properties]);

  const filtered = properties.filter((p) => {
    // Inclusive rather than exact: "Luxury Villa" still matches Villa, and
    // "Plot / Land" still matches Plot.
    const typeMatch =
      selectedType === typeFilters[0] ||
      (p.type ?? "")
        .toLowerCase()
        .trim()
        .includes(selectedType.toLowerCase().trim());

    const locationMatch =
      !locations ||
      selectedLocation === allLocations ||
      p.location
        ?.toLowerCase()
        .trim()
        .includes(selectedLocation.toLowerCase().trim());

    const bedroomMatch =
      selectedBedrooms === ANY_BEDROOMS ||
      toBedroomCount(p.bedrooms) === Number(selectedBedrooms);

    return typeMatch && locationMatch && bedroomMatch;
  });

  const totalPages = Math.ceil(filtered.length / PROPERTIES_PER_PAGE);
  const startIdx = (currentPage - 1) * PROPERTIES_PER_PAGE;
  const paginatedProperties = filtered.slice(
    startIdx,
    startIdx + PROPERTIES_PER_PAGE,
  );

  const goToPage = (page: number) => {
    setInteracted(true);
    setCurrentPage(page);
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const noPropertiesAtAll = !loading && properties.length === 0 && !!noListings;

  const dropdowns = [
    {
      id: "type-filter",
      label: "Property Type",
      value: selectedType,
      isDefault: selectedType === typeFilters[0],
      onChange: selectType,
      options: typeFilters.map((type) => ({ value: type, label: type })),
    },
    ...(bedroomOptions.length > 0
      ? [
          {
            id: "bedroom-filter",
            label: "Bedrooms",
            value: selectedBedrooms,
            isDefault: selectedBedrooms === ANY_BEDROOMS,
            onChange: (value: string) => {
              setInteracted(true);
              setSelectedBedrooms(value);
              setCurrentPage(1);
            },
            options: [
              { value: ANY_BEDROOMS, label: "Any Bedrooms" },
              ...bedroomOptions.map((count) => ({
                value: String(count),
                label: `${count} ${count === 1 ? "Bedroom" : "Bedrooms"}`,
              })),
            ],
          },
        ]
      : []),
    ...(locations
      ? [
          {
            id: "location-filter",
            label: "Location",
            value: selectedLocation,
            isDefault: selectedLocation === allLocations,
            onChange: (value: string) => {
              setInteracted(true);
              setSelectedLocation(value);
              setCurrentPage(1);
            },
            options: locations.map((loc) => ({ value: loc, label: loc })),
          },
        ]
      : []),
  ];

  const activeCount = dropdowns.filter((d) => !d.isDefault).length;

  const clearFilters = () => {
    setInteracted(true);
    setSelectedBedrooms(ANY_BEDROOMS);
    setSelectedLocation(allLocations);
    // Also resets the page and clears ?type= from the URL
    selectType(typeFilters[0]);
  };

  const filterBar = (
    <div className="border border-border bg-surface">
      <div className="flex flex-col divide-y divide-border md:flex-row md:divide-x md:divide-y-0">
        {dropdowns.map((dropdown) => (
          <FilterDropdown key={dropdown.id} {...dropdown} />
        ))}

        {activeCount > 0 && (
          <div className="flex items-center justify-center px-5 py-4 md:py-0">
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-fg-muted transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X aria-hidden className="h-3.5 w-3.5" />
              Clear {activeCount === 1 ? "filter" : "filters"}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <MotionConfig reducedMotion="user">
      {/* PROPERTY DISCOVERY / FILTERS (optional intro above the filters) */}
      {discovery && (
        <section
          aria-labelledby="browse-heading"
          className="border-b border-border bg-bg py-14 md:py-16"
        >
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="max-w-3xl">
              <SectionEyebrow>{discovery.eyebrow}</SectionEyebrow>
              <h2
                id="browse-heading"
                className="mt-3 font-serif text-3xl font-light leading-tight text-fg md:text-4xl"
              >
                {discovery.heading}
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/80 md:text-lg">
                {discovery.paragraph}
              </p>
            </div>

            <div className="mt-8">{filterBar}</div>
          </div>
        </section>
      )}

      {/* PROPERTY LISTINGS */}
      <section
        ref={listingsRef}
        id="listings"
        aria-labelledby="listings-heading"
        className="scroll-mt-20 border-t border-border bg-bg py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>{listings.eyebrow}</SectionEyebrow>
              <h2
                id="listings-heading"
                className="mt-3 font-serif text-3xl font-light leading-tight text-fg md:text-4xl"
              >
                {listings.heading}
              </h2>
              {listings.paragraph && (
                <p className="mt-4 font-sans text-base leading-relaxed text-white/80 md:text-lg">
                  {listings.paragraph}
                </p>
              )}
            </div>

            {!loading && !noPropertiesAtAll && (
              <p
                aria-live="polite"
                className="shrink-0 font-sans text-xs font-bold uppercase tracking-[0.2em] text-fg-muted"
              >
                {filtered.length}{" "}
                {filtered.length === 1 ? "property" : "properties"}
              </p>
            )}
          </div>

          {/* With no intro block, the filters live here, above the grid */}
          {!discovery && !noPropertiesAtAll && (
            <div className="mt-8">{filterBar}</div>
          )}

          <div className="mt-10">
            {loading ? (
              <div
                aria-busy="true"
                aria-label="Loading properties"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse border border-border bg-surface"
                  >
                    <div className="aspect-[4/3] bg-surface-elevated" />
                    <div className="space-y-3 p-6">
                      <div className="h-3 w-1/3 bg-surface-elevated" />
                      <div className="h-6 w-3/4 bg-surface-elevated" />
                      <div className="h-3 w-full bg-surface-elevated" />
                      <div className="h-3 w-2/3 bg-surface-elevated" />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedProperties.length === 0 ? (
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="font-serif text-3xl font-light text-fg">
                  {noPropertiesAtAll
                    ? noListings.heading
                    : "No Properties Match Your Search"}
                </h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-white/80 md:text-lg">
                  {noPropertiesAtAll
                    ? noListings.text
                    : "Tell us what you're looking for, and our team will share the best options curated for you."}
                </p>

                <div className="mx-auto mt-10 text-left">
                  <LeadForm />
                </div>
              </div>
            ) : (
              <>
                <motion.ul
                  // Re-mount on filter/page change so the stagger replays
                  key={`${selectedType}-${selectedLocation}-${selectedBedrooms}-${currentPage}`}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  initial={interacted ? "hidden" : false}
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.07 } },
                  }}
                >
                  {paginatedProperties.map((p) => (
                    <motion.li
                      key={p._id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                    >
                      <PropertyCard
                        property={p}
                        basePath={basePath}
                        listingLabel={listingLabel}
                      />
                    </motion.li>
                  ))}
                </motion.ul>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </>
            )}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <TypeParamSync onChange={applyTypeParam} />
      </Suspense>
    </MotionConfig>
  );
}
