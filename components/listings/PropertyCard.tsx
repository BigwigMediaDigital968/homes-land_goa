import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bath, BedDouble, MapPin, Ruler } from "lucide-react";

export interface ListingProperty {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  location?: string;
  price?: number | null;
  images: string[];
  purpose?: string;
  description?: string;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  areaSqft?: number | string | null;
}

interface PropertyCardProps {
  property: ListingProperty;
  /** Route prefix for the detail page, e.g. "/buy" → /buy/[slug]. */
  basePath: string;
  /** Used in the image alt text, e.g. "for sale" / "for rent". */
  listingLabel?: string;
}

import { toPositiveNumber as toPositive } from "@/lib/properties";

export default function PropertyCard({
  property: p,
  basePath,
  listingLabel = "for sale",
}: PropertyCardProps) {
  const href = `${basePath}/${p.slug}`;
  const bedrooms = toPositive(p.bedrooms);
  const bathrooms = toPositive(p.bathrooms);
  const area = toPositive(p.areaSqft);
  const hasSpecs = bedrooms || bathrooms || area;
  const price = toPositive(p.price);

  const imageAlt = `${p.type ?? "Property"} ${listingLabel} in ${
    p.location ?? "Goa"
  } - ${p.title}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-border bg-surface transition-colors duration-300 hover:border-primary/60">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-elevated">
        {p.images?.[0] ? (
          <Image
            src={p.images[0]}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center font-sans text-xs uppercase tracking-[0.2em] text-fg-muted">
            Photo coming soon
          </div>
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black-950/70 to-transparent"
        />

        {p.type && (
          <span className="absolute left-4 top-4 bg-black-950/85 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
            {p.type}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {p.location && (
          <p className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
            <MapPin aria-hidden className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{p.location}</span>
          </p>
        )}

        <h3 className="mt-2 font-serif text-lg sm:text-xl font-normal leading-snug text-fg">
          <Link
            href={href}
            className="line-clamp-2 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {p.title}
          </Link>
        </h3>

        {hasSpecs && (
          <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-white/80">
            {bedrooms && (
              <li className="flex items-center gap-1.5">
                <BedDouble aria-hidden className="h-4 w-4 text-primary" />
                {bedrooms} <span className="sr-only">bedrooms</span>
                <span aria-hidden>Beds</span>
              </li>
            )}
            {bathrooms && (
              <li className="flex items-center gap-1.5">
                <Bath aria-hidden className="h-4 w-4 text-primary" />
                {bathrooms} <span className="sr-only">bathrooms</span>
                <span aria-hidden>Baths</span>
              </li>
            )}
            {area && (
              <li className="flex items-center gap-1.5">
                <Ruler aria-hidden className="h-4 w-4 text-primary" />
                {area.toLocaleString("en-IN")} sq ft
              </li>
            )}
          </ul>
        )}

        {p.description && (
          <p className="mt-4 line-clamp-2 font-sans text-sm leading-relaxed text-fg-muted">
            {p.description}
          </p>
        )}

        {/* Price + CTA pinned to the bottom so cards align in a row */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-5">
          <div className="pt-1">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-fg-muted">
              Price
            </p>
            <p className="font-serif text-2xl text-fg">
              {price ? `₹ ${price.toLocaleString("en-IN")}` : "On request"}
            </p>
          </div>

          <Link
            href={href}
            className="inline-flex min-h-11 items-center gap-2 bg-primary px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-on-primary transition-colors duration-300 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View Details
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">: {p.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
