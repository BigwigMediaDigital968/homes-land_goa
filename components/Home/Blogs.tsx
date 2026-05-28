"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionEyebrow } from "../ui/SectionEyebrow";

// Mock data for the Premium editorial Blogs Section (Sourced from your Screenshots)
const blogsData = [
  {
    id: 1,
    title: "A LOCAL'S GUIDE TO SPENDING SUMMER IN NORTH GOA",
    date: "30 April 2026",
    description: "Navigate the tranquil, pristine side of Goan summers. From empty white-sand coastlines to intimate local dining concepts hidden inside lush orchards.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
  },
  {
    id: 2,
    title: "WHY SMART CAPITAL IS PIVOTING TO SENSORY REAL ESTATE IN GOA",
    date: "16 April 2026",
    description: "Analyze the shifting investment horizons where high-net-worth portfolios prioritize holistic, architecturally serene sanctuary homes over metric-only spaces.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
  },
  {
    id: 3,
    title: "WHY HIGH-PERFORMANCE HOMES ARE THE STRATEGIC ASSET OF 2026",
    date: "23 March 2026",
    description: "Discover how ecological systems, structural longevity, and smart automated layouts are redefining luxury benchmarks in contemporary tropical design.",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80"
  },
  {
    id: 4,
    title: "A LEGACY BY THE SEA: THE DISTINCTION OF DONA PAULA LIVING",
    date: "18 March 2026",
    description: "Examine the historic prestige and lifestyle offerings of coastal living along North Goa's most celebrated, dramatic cliffsides.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
  }
];

export default function Blogs() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });

  return (
    <section
      className="relative w-full py-12 sm:py-24 bg-[#fdfcf8] border-t border-[#d4c99e]/20 overflow-hidden"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >
      {/* Editorial Decorative Background Details */}
      <div className="absolute top-0 left-10 w-[1px] h-full bg-[#d4c99e]/15 pointer-events-none" />
      <div className="absolute top-0 right-10 w-[1px] h-full bg-[#d4c99e]/15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Heading & Centered Subtitle (Replicated exactly from your Screenshot) */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionEyebrow
            >
              Insights & Trends
            </SectionEyebrow>
            <h2 className="font-serif text-4xl mt-4 sm:text-5xl font-light text-navy tracking-tight capitalize">
              Latest <span className="text-gold-500">Blogs</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-[#5c5750] leading-relaxed"
          >
            Explore our real estate blogs to discover the industry's best practices, evolving trends in architectural design,
            the financial benefits of investing in high-end homes and the exclusive lifestyle of living in one of India's most
            sought-after destinations. This section is your ultimate guide to understanding the real estate market in Goa
            and experiencing redefined lifestyle and living.
          </motion.p>
        </div>

        {/* 4-column Grid Alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogsData.map((blog, idx) => (
            <BlogCard key={blog.id} blog={blog} index={idx} />
          ))}
        </div>

        {/* Clean, minimalist centered bottom action block (Replicated from screenshot) */}
        <div className="mt-16 flex justify-center">
          <Link href="#all-blogs">
            <button className="relative px-8 py-4 bg-transparent hover:bg-navy text-navy hover:text-[#fdfcf8] border border-[#d4c99e] hover:border-navy font-sans text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 flex items-center justify-center gap-3 rounded-none cursor-pointer group">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9a7a2e] group-hover:text-[#fdfcf8] transition-colors duration-500" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}

// Sub-component for individual Blog grid cards
function BlogCard({ blog, index }: any) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[2/3] w-full overflow-hidden bg-[#0d0c09] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image zoom effect */}
      <img
        src={blog.image}
        alt={blog.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] ease-[0.16,1,0.3,1] filter brightness-[0.7] contrast-[1.05]"
        style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
      />

      {/* Bottom heavy vignette overlay to isolate text perfectly */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c09]/95 via-[#0d0c09]/50 to-transparent z-10 pointer-events-none" />

      {/* Clean overlay outline border */}
      <div className="absolute inset-2 border border-white/40 z-20 pointer-events-none transition-all duration-700" />

      {/* Content wrapper with precise dynamic sliding translate layout */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end">

        {/* Date Container */}
        <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#e0be65] font-bold mb-2">
          {blog.date}
        </span>

        {/* Slidable Content Frame */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-light text-[#fdfcf8] leading-[1.3] tracking-normal capitalize">
            {blog.title}
          </h3>

          {/* Hidden description block that slides up and fades in on hover */}
          <div
            className="overflow-hidden transition-all duration-500 ease-[0.16,1,0.3,1]"
            style={{
              maxHeight: hovered ? "160px" : "0px",
              opacity: hovered ? 1 : 0
            }}
          >
            <p className="text-[13px] text-[#cdc9c2] leading-relaxed pt-2">
              {blog.description}
            </p>

            {/* Premium "Read More" trigger button */}
            <div className="inline-flex items-center gap-2 mt-4 text-[#e0be65] hover:text-[#fdfcf8] transition-colors duration-300">
              <span className="font-sans text-[9px] tracking-[0.25em] font-bold uppercase">
                Read Article
              </span>
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}