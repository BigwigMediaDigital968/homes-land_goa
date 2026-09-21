"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const services = [
  {
    id: "buy",
    type: "Buy",
    romanNumeral: "I",
    headline: "Find the Right Property to Buy",
    description:
      "We help you shortlist and view properties that match your requirement, and guide you through valuation, verification, and closing.",
    features: [
      "Curated property listings",
      "Property viewings and site visits",
      "Valuation and basic due diligence",
      "Title verification support",
      "Support after the purchase",
    ],
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=90",
    accent: "◈ Buy in Goa",
    ctaLabel: "Explore Listings",
    ctaHref: "#contacts",
  },
  {
    id: "sell",
    type: "Sell",
    romanNumeral: "II",
    headline: "Get the Right Value for Your Property",
    description:
      "We help you price your property realistically, market it to genuine buyers, and manage the negotiation and paperwork.",
    features: [
      "Property valuation",
      "Photography and listing preparation",
      "Buyer outreach",
      "Price negotiation support",
      "Documentation support",
    ],
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=90",
    accent: "◉ Sell in Goa",
    ctaLabel: "Get a Valuation",
    ctaHref: "#contacts",
  },
  {
    id: "rent",
    type: "Rent",
    romanNumeral: "III",
    headline: "Find a Property to Rent in Goa",
    description:
      "Looking for a short-term stay or a long-term rental in Goa? We help match your requirements with available rental listings across the region.",
    features: [
      "Short-term and long-term rental listings",
      "Verified landlords and property details",
      "Support with rental agreements",
    ],
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90",
    accent: "◆ Rent in Goa",
    ctaLabel: "View Rentals",
    ctaHref: "/rent",
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black-950 py-12 lg:py-0"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >
      {/* 1. Elegant Editorial Section Header */}
      <div
        ref={headerRef}
        className="relative py-20 text-center border-t border-rosegold-700/30 bg-black-950"
      >
        {/* Decorative Grid Line Accents */}

        <motion.p
          className="font-sans text-[10px] uppercase tracking-[0.3em] text-rosegold-500 font-bold mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionEyebrow
          >
            Bespoke Excellence
          </SectionEyebrow>
        </motion.p>

        <motion.h2
          className="font-serif text-4xl sm:text-5xl font-light text-fg tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Our <span className="italic text-rosegold-500 font-normal">Services</span>
        </motion.h2>
      </div>

      {/* 2. SERVICES PANELS (Single-Screen Cinematic Scroll Sequence) */}
      {services.map((service, idx) => (
        <ServicePanel key={service.id} service={service} index={idx} />
      ))}
    </section>
  );
}

// Sub-component to isolate intersection observers for perfect in-view triggers
function ServicePanel({ service, index }: any) {
  const panelRef = useRef(null);
  const inView = useInView(panelRef, { once: true, margin: "-20% 0px" });
  const [hovered, setHovered] = useState(false);

  const transitionConfig: any = { duration: 1.5, ease: [0.16, 1, 0.3, 1] };

  // Alternates layout based on list index (Buy is Even, Sell is Odd)
  const isEven = index % 2 === 0;

  return (
    <div
      ref={panelRef}
      className={`relative w-full lg:h-screen flex items-center justify-center py-16 lg:py-0 border-b border-rosegold-700/20 overflow-hidden ${isEven ? "bg-black-950" : "bg-black-900"
        }`}
    >
      {/* Decorative Ambient Light Wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-none blur-[120px] pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full h-full flex flex-col justify-center">

        {/* Overlapping CSS Grid Container */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-0">

          {/* IMAGE BLOCK: Frame inspired by contemporary architectural design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, x: isEven ? -50 : 50 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={transitionConfig}
            className={`col-span-1 lg:col-span-8 relative w-full aspect-[16/10] lg:aspect-[1.45] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.4)] border border-rosegold-700/40 p-2 bg-black-950 ${isEven
                ? "lg:col-start-1 lg:row-start-1"
                : "lg:col-start-5 lg:row-start-1"
              }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Elegant Sub-Border inside image padding */}
            <div className="absolute inset-4 border border-rosegold-700/20 z-20 pointer-events-none" />

            <div className="w-full h-full overflow-hidden relative">
              <img
                src={service.img}
                alt={service.type}
                className="w-full h-full object-cover transition-transform duration-[2.5s] ease-[0.16,1,0.3,1] filter brightness-95 contrast-[1.02]"
                style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
              />
              {/* Premium Dark Satin Gradient Wash over Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Beautiful Vintage Large Watermarked Roman Numeral */}
            <div className="absolute bottom-6 right-8 font-serif text-[8rem] lg:text-[12rem] font-light text-primary/10 leading-none pointer-events-none select-none italic">
              {service.romanNumeral}
            </div>
          </motion.div>

          {/* FLOATING FOLIO CONTENT CARD: Overlaps onto image element on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40, x: isEven ? 50 : -50 }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ delay: 0.2, ...transitionConfig }}
            className={`col-span-1 lg:col-span-5 relative z-20 w-full lg:max-w-md p-8 md:p-12 bg-black-900 border border-rosegold-700/50 shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-none ${isEven
                ? "lg:col-start-8 lg:row-start-1 lg:-ml-16"
                : "lg:col-start-1 lg:row-start-1 lg:-mr-16"
              }`}
          >
            {/* Top gold accent thread line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-primary pointer-events-none" />

            {/* Luxury Category Tag */}
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-rosegold-500 font-bold block mb-4">
              {service.accent}
            </span>

            {/* Editorial Headline */}
            <h3 className="font-serif text-3xl md:text-4xl font-light text-fg leading-[1.2] mb-5 whitespace-pre-line">
              {service.headline}
            </h3>

            {/* Minimal Horizontal Partition */}
            <div className="w-16 h-[1px] bg-primary/40 mb-4" />

            {/* Narrative Description */}
            <p className="font-serif text-[15px] sm:text-base text-fg-muted leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Custom Architectural Feature Checklist */}
            <ul className="space-y-4 mb-8 border-t border-rosegold-700/30 pt-6">
              {service.features.map((feat: any, fIdx: any) => (
                <li key={fIdx} className="flex items-center gap-3.5">
                  {/* Elegant Golden Vertical Pin Bullet */}
                  <span className="w-[2px] h-3.5 bg-primary" />
                  <span className="font-sans text-[11px] text-fg font-bold tracking-wider uppercase">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* Solid Rectangular Architectural CTA Button */}
            <Link
              href={service.ctaHref}
              className="w-full py-4.5 bg-primary hover:bg-primary-hover text-on-primary transition-all duration-500 flex items-center justify-center gap-3 font-sans text-[10px] uppercase tracking-[0.25em] font-bold rounded-none border border-primary cursor-pointer"
            >
              <span>{service.ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

        </div>

      </div>

      {/* Micro Down Scroll Cue for the first service block */}

    </div>
  );
}