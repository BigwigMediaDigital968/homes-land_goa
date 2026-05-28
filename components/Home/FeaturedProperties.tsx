"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronRight, Phone } from "lucide-react";
import { SectionEyebrow } from "../ui/SectionEyebrow";

// Mock data reflecting premium North Goa sanctuaries
const propertiesData: any = [
  {
    id: 1,
    name: "Villa Solitaire",
    location: "ASSAGAON, NORTH GOA",
    price: "₹ 14.5 Crore",
    details: {
      beds: "4 BHK",
      baths: "5 Baths",
      area: "5,800 Sq. Ft.",
    },
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    tag: "NEW RELEASE"
  },
  {
    id: 2,
    name: "The Olive Grove",
    location: "ALDONA, NORTH GOA",
    price: "₹ 11.2 Crore",
    details: {
      beds: "3 BHK",
      baths: "4 Baths",
      area: "4,600 Sq. Ft.",
    },
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    tag: "FEATURED"
  },
  {
    id: 3,
    name: "Casa de Alentejo",
    location: "MANDREM, NORTH GOA",
    price: "₹ 18.0 Crore",
    details: {
      beds: "5 BHK",
      baths: "6 Baths",
      area: "7,200 Sq. Ft.",
    },
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    tag: "LIMITED EDITION"
  }
];

export default function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState("signature"); // signature | heritage
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });

  // Grid container animation config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-[#fdfcf8] overflow-hidden"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >
      {/* Editorial Decorative Background Details */}
      <div className="absolute top-0 left-10 w-[1px] h-full bg-[#d4c99e]/15 pointer-events-none" />
      <div className="absolute top-0 right-10 w-[1px] h-full bg-[#d4c99e]/15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* 1. SECTION HEADER (Clean layout as seen in Screenshot 1) */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-center gap-6 mb-16 pb-6 border-b border-[#d4c99e]/30"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="flex justify-center">
              <SectionEyebrow
            >
              Curated Estates
            </SectionEyebrow>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-navy leading-tight tracking-tight">
              Featured <span className="italic text-[#9a7a2e]">Properties</span>
            </h2>
          </motion.div>


        </div>

        {/* 2. PROPERTIES PORTFOLIO GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8"
          >
            {propertiesData.map((item: any) => (
              <PropertyCard key={item.id} item={item} variants={cardVariants} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 3. SECTION FOOTER CALL TO ACTION */}
        <div className="mt-16 flex justify-center">
          <a href="#properties-catalog">
            <button className="relative px-10 py-5 bg-[#fdfcf8] hover:bg-navy text-navy hover:text-[#fdfcf8] border-2 border-navy font-sans text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 flex items-center justify-center gap-3 rounded-none cursor-pointer group">
              <span>View All Properties</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </a>
        </div>

      </div>
    </section>
  );
}

// Sub-component for individual property card
function PropertyCard({ item, variants }: any) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={variants}
      className="group cursor-pointer flex flex-col justify-between bg-[#fdfcf8] border border-[#d4c99e]/20 p-3 shadow-sm hover:shadow-xl transition-all duration-700 h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="space-y-5">

        {/* Visual Anchor Box */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e0c4]">

          {/* Internal Elegant Border Framing */}
          <div className="absolute inset-3 border border-white/40 z-20 pointer-events-none transition-all duration-700 group-hover:inset-4" />

          {/* Premium tag overlay */}
          <div className="absolute top-6 left-6 z-20 bg-[#fdfcf8] px-3.5 py-1.5 border border-[#d4c99e]/40 shadow-sm">
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9a7a2e] font-extrabold block">
              {item.tag}
            </span>
          </div>

          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-[3s] ease-[0.16,1,0.3,1] filter contrast-[1.03] brightness-95"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Gentle satin wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/15 via-transparent to-transparent z-10 pointer-events-none" />
        </div>

        {/* Textual Narrative Blocks */}
        <div className="px-2 pb-2 space-y-4">
          <div className="space-y-1.5">
            {/* Location */}
            <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#9a7a2e] font-bold block">
              {item.location}
            </span>

            {/* Project Name */}
            <h3 className="font-serif text-2xl font-light text-navy tracking-tight group-hover:text-[#9a7a2e] transition-colors duration-500 flex items-center justify-between">
              <span>{item.name}</span>
              <ChevronRight className="w-4 h-4 text-[#b8943a] opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
            </h3>
          </div>

          {/* Technical Specs Line */}
          <div className="flex items-center gap-3.5 border-t border-b border-[#d4c99e]/25 py-3">
            <div className="flex items-center gap-2">
              <span className="w-[1.5px] h-3 bg-[#b8943a]" />
              <span className="font-sans text-[10px] uppercase text-[#5c5750] tracking-wider font-semibold">{item.details.beds}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-[1.5px] h-3 bg-[#b8943a]" />
              <span className="font-sans text-[10px] uppercase text-[#5c5750] tracking-wider font-semibold">{item.details.baths}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-[1.5px] h-3 bg-[#b8943a]" />
              <span className="font-sans text-[10px] uppercase text-[#5c5750] tracking-wider font-semibold">{item.details.area}</span>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="flex items-baseline justify-between pt-1">
            <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-[#0d0c09]/50">Estimated Value</span>
            <span className="font-serif text-xl font-normal text-navy">{item.price}</span>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
