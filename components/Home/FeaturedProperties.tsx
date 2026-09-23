"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import type { ListingProperty } from "../listings/PropertyCard";
import { toPositiveNumber, toRoomCount } from "@/lib/properties";

interface FeaturedPropertiesProps {
  /** Live listings, fetched on the server by the page. */
  properties: ListingProperty[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FeaturedProperties({
  properties,
}: FeaturedPropertiesProps) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 bg-black-950 overflow-hidden"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* 1. SECTION HEADER */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-center gap-6 mb-16 pb-6 border-b border-rosegold-700/30"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="flex justify-center">
              <SectionEyebrow>Current Listings</SectionEyebrow>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-fg leading-tight tracking-tight">
              Featured{" "}
              <span className="italic text-rosegold-500">Properties</span>
            </h2>
          </motion.div>
        </div>

        {/* 2. PROPERTIES PORTFOLIO GRID */}
        {properties.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8"
          >
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </motion.div>
        ) : (
          <p className="text-center font-sans text-base leading-relaxed text-white/80">
            New listings are on the way. Get in touch and our team will share
            what&apos;s currently available in Goa.
          </p>
        )}

        {/* 3. SECTION FOOTER CALL TO ACTION */}
        <div className="mt-16 flex justify-center">
          <Link href="/buy">
            <button className="relative px-10 py-5 bg-transparent hover:bg-primary text-fg hover:text-on-primary border-2 border-primary font-sans text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 flex items-center justify-center gap-3 rounded-none cursor-pointer group">
              <span>View All Properties</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ property }: { property: ListingProperty }) {
  const [hovered, setHovered] = useState(false);

  const href = `/buy/${property.slug}`;
  const price = toPositiveNumber(property.price);
  // Room counts tolerate "3 BHK"; price and area must not (see toRoomCount)
  const bedrooms = toRoomCount(property.bedrooms);
  const bathrooms = toRoomCount(property.bathrooms);
  const area = toPositiveNumber(property.areaSqft);

  // Only the specs this listing actually has, so no "undefined BHK" chips
  const specs = [
    bedrooms && `${bedrooms} BHK`,
    bathrooms && `${bathrooms} Baths`,
    area && `${area.toLocaleString("en-IN")} Sq. Ft.`,
  ].filter(Boolean) as string[];

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col justify-between bg-black-950 border border-rosegold-700/20 p-3 shadow-sm hover:shadow-xl transition-all duration-700 h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="space-y-5">
        {/* Visual Anchor Box */}
        <div className="relative aspect-[4/5] overflow-hidden bg-black-800">
          {/* Internal Elegant Border Framing */}
          <div className="absolute inset-3 border border-white/40 z-20 pointer-events-none transition-all duration-700 group-hover:inset-4" />

          {property.type && (
            <div className="absolute top-6 left-6 z-20 bg-black-950 px-3.5 py-1.5 border border-rosegold-700/40 shadow-sm">
              <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-rosegold-500 font-extrabold block">
                {property.type}
              </span>
            </div>
          )}

          {property.images?.[0] ? (
            <Image
              src={property.images[0]}
              alt={`${property.type ?? "Property"} for sale in ${
                property.location ?? "Goa"
              } - ${property.title}`}
              fill
              unoptimized
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[3s] ease-[0.16,1,0.3,1] filter contrast-[1.03] brightness-95"
              style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
            />
          ) : (
            <div className="flex h-full items-center justify-center font-sans text-[10px] uppercase tracking-[0.2em] text-fg-muted">
              Photo coming soon
            </div>
          )}

          {/* Gentle satin wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-black-950/40 via-transparent to-transparent z-10 pointer-events-none" />
        </div>

        {/* Textual Narrative Blocks */}
        <div className="px-2 pb-2 space-y-4">
          <div className="space-y-1.5">
            {property.location && (
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-rosegold-500 font-bold block">
                {property.location}
              </span>
            )}

            <h3 className="font-serif text-2xl font-light text-fg tracking-tight group-hover:text-rosegold-500 transition-colors duration-500 flex items-center justify-between gap-3">
              <Link
                href={href}
                className="line-clamp-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {/* Covers the card so the whole tile is clickable */}
                <span aria-hidden className="absolute inset-0 z-30" />
                {property.title}
              </Link>
              <ChevronRight className="w-4 h-4 shrink-0 text-primary opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
            </h3>
          </div>

          {specs.length > 0 && (
            <div className="flex flex-wrap items-center gap-3.5 border-t border-b border-rosegold-700/25 py-3">
              {specs.map((spec) => (
                <div key={spec} className="flex items-center gap-2">
                  <span className="w-[1.5px] h-3 bg-primary" />
                  <span className="font-sans text-[10px] uppercase text-fg-muted tracking-wider font-semibold">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-baseline justify-between gap-3 pt-1">
            <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-fg-muted">
              {price ? "Estimated Value" : "Price"}
            </span>
            <span className="font-serif text-xl font-normal text-fg">
              {price ? `₹ ${price.toLocaleString("en-IN")}` : "On request"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
