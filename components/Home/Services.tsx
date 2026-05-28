"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const services = [
  {
    id: "buy",
    type: "Buy",
    romanNumeral: "I",
    headline: "Find Your\nPerfect Retreat",
    description:
      "We guide you through every step of acquiring your dream property in Goa — from identifying the finest listings to navigating legalities and beyond. Our deep knowledge of Goa's micro-markets ensures you invest wisely.",
    features: [
      "Curated exclusive property listings",
      "Private viewings & estate tours",
      "Market valuation & due diligence",
      "Legal title verification",
      "Post-purchase concierge services",
    ],
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=90",
    accent: "◈ Buy in Goa",
  },
  {
    id: "sell",
    type: "Sell",
    romanNumeral: "II",
    headline: "Unlock Your\nProperty's Worth",
    description:
      "When the time comes to sell, we ensure your property commands its true market value. Through our elite network of buyers, immersive marketing, and expert negotiation, we deliver outcomes that exceed expectations.",
    features: [
      "Premium property valuation",
      "Professional photography & staging",
      "Discreet off-market sales",
      "Expert price negotiation",
      "Complete documentation support",
    ],
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=90",
    accent: "◉ Sell in Goa",
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
      className="relative w-full overflow-hidden bg-[#fdfcf8] py-12 lg:py-0"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >
      {/* 1. Elegant Editorial Section Header */}
      <div
        ref={headerRef}
        className="relative py-20 text-center border-t border-[#d4c99e]/30 border-b border-[#d4c99e]/20 bg-[#fdfcf8]"
      >
        {/* Decorative Grid Line Accents */}

        <motion.p
          className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#9a7a2e] font-bold mb-4"
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
          className="font-serif text-4xl sm:text-5xl font-light text-navy tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Our <span className="italic text-[#9a7a2e] font-normal">Services</span>
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
      className={`relative w-full lg:h-screen flex items-center justify-center py-16 lg:py-0 border-b border-[#d4c99e]/20 overflow-hidden ${isEven ? "bg-[#fdfcf8]" : "bg-[#f9f6ed]"
        }`}
    >
      {/* Decorative Ambient Light Wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b8943a]/3 rounded-none blur-[120px] pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full h-full flex flex-col justify-center">

        {/* Overlapping CSS Grid Container */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-0">

          {/* IMAGE BLOCK: Frame inspired by contemporary architectural design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, x: isEven ? -50 : 50 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={transitionConfig}
            className={`col-span-1 lg:col-span-8 relative w-full aspect-[16/10] lg:aspect-[1.45] overflow-hidden shadow-[0_20px_45px_rgba(13,12,9,0.06)] border border-[#d4c99e]/40 p-2 bg-[#fdfcf8] ${isEven
                ? "lg:col-start-1 lg:row-start-1"
                : "lg:col-start-5 lg:row-start-1"
              }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Elegant Sub-Border inside image padding */}
            <div className="absolute inset-4 border border-[#d4c99e]/20 z-20 pointer-events-none" />

            <div className="w-full h-full overflow-hidden relative">
              <img
                src={service.img}
                alt={service.type}
                className="w-full h-full object-cover transition-transform duration-[2.5s] ease-[0.16,1,0.3,1] filter brightness-95 contrast-[1.02]"
                style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
              />
              {/* Premium Light Satin Gradient Wash over Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#fdfcf8]/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Beautiful Vintage Large Watermarked Roman Numeral */}
            <div className="absolute bottom-6 right-8 font-serif text-[8rem] lg:text-[12rem] font-light text-[#b8943a]/10 leading-none pointer-events-none select-none italic">
              {service.romanNumeral}
            </div>
          </motion.div>

          {/* FLOATING FOLIO CONTENT CARD: Overlaps onto image element on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40, x: isEven ? 50 : -50 }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ delay: 0.2, ...transitionConfig }}
            className={`col-span-1 lg:col-span-5 relative z-20 w-full lg:max-w-md p-8 md:p-12 bg-[#fdfcf8] border border-[#d4c99e]/50 shadow-[0_30px_60px_rgba(13,12,9,0.06)] rounded-none ${isEven
                ? "lg:col-start-8 lg:row-start-1 lg:-ml-16"
                : "lg:col-start-1 lg:row-start-1 lg:-mr-16"
              }`}
          >
            {/* Top gold accent thread line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-[#b8943a] pointer-events-none" />

            {/* Luxury Category Tag */}
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#9a7a2e] font-bold block mb-4">
              {service.accent}
            </span>

            {/* Editorial Headline */}
            <h3 className="font-serif text-3xl md:text-4xl font-light text-navy leading-[1.2] mb-5 whitespace-pre-line">
              {service.headline}
            </h3>

            {/* Minimal Horizontal Partition */}
            <div className="w-16 h-[1px] bg-[#b8943a]/40 mb-6" />

            {/* Narrative Description */}
            <p className="font-serif text-[15px] sm:text-base text-navy/70 leading-relaxed mb-8">
              {service.description}
            </p>

            {/* Custom Architectural Feature Checklist */}
            <ul className="space-y-4 mb-8 border-t border-[#d4c99e]/30 pt-6">
              {service.features.map((feat: any, fIdx: any) => (
                <li key={fIdx} className="flex items-center gap-3.5">
                  {/* Elegant Golden Vertical Pin Bullet */}
                  <span className="w-[2px] h-3.5 bg-[#b8943a]" />
                  <span className="font-sans text-[11px] text-navy font-bold tracking-wider uppercase">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* Solid Rectangular Architectural CTA Button */}
            <a
              href="#contacts"
              className="w-full py-4.5 bg-navy hover:bg-[#b8943a] text-[#fdfcf8] hover:text-navy transition-all duration-500 flex items-center justify-center gap-3 font-sans text-[10px] uppercase tracking-[0.25em] font-bold rounded-none border border-[#0d0c09] hover:border-[#b8943a] cursor-pointer"
            >
              <span>
                {service.type === "Buy" ? "Explore Listings" : "Get Valuation"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

        </div>

      </div>

      {/* Micro Down Scroll Cue for the first service block */}

    </div>
  );
}