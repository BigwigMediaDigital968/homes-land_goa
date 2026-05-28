"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-15%" });

  // Luxury editorial spring animations to replace standard AOS fade-ups
  const fadeUpVariants : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[65vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden bg-[#0d0c09]"
      style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
      }}
    >
      {/* 1. Cinematic Parallax Background Image */}
      <div 
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=90")`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* 2. Premium Overlays (Dual satin wash tailored to our light theme) */}
      {/* Light mist glass wash to guarantee high contrast */}
      <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
      {/* Warm golden light bleed */}
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center, rgba(184,148,58,0.15) 0%, transparent 75%) z-10 pointer-events-none" />

      {/* 3. Luxury Decorative Structural Thread Frame */}

      {/* 4. Editorial Narrative Content Block */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-20 max-w-4xl mx-auto px-6 space-y-8"
      >
        {/* Fine Art Subtitle badge */}
        <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-3">
          <span className="w-6 h-px bg-[#b8943a]" />
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#9a7a2e] font-bold">
            Private Commissions
          </span>
          <span className="w-6 h-px bg-[#b8943a]" />
        </motion.div>

        {/* Cinematic Main Heading */}
        <motion.h2 
          variants={fadeUpVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-gold-500 tracking-tight leading-tight"
        >
          Ready to Begin <br />
          <span className="italic text-white font-serif font-normal">Your Architectural Legacy?</span>
        </motion.h2>

        {/* High-End Description Narrative */}
        <motion.p 
          variants={fadeUpVariants}
          className="text-white text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-serif"
        >
          Discover carefully curated residences that reflect your lifestyle and aspirations, where tropical coastal beauty meets absolute structural serenity.
        </motion.p>

        {/* 5. Sharp Actions Suite (100% Rounding-Free) */}
        <motion.div 
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {/* Action 1: Private Booking */}
          <Link href="#contacts" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto relative px-9 py-4.5 bg-navy hover:bg-[#b8943a] text-[#fdfcf8] hover:text-navy font-sans text-[10px] uppercase tracking-[0.25em] font-bold rounded-none transition-all duration-500 shadow-md flex items-center justify-center gap-2.5 group cursor-pointer border border-navy hover:border-[#b8943a]">
              <span>Explore Properties</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#fdfcf8] group-hover:text-navy transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>

          {/* Action 2: Direct Call */}
          <Link href="tel:+91" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto relative px-9 py-4.5 bg-[#fdfcf8] hover:bg-navy text-navy hover:text-[#fdfcf8] border-2 border-navy font-sans text-[10px] uppercase tracking-[0.25em] font-bold rounded-none transition-all duration-500 shadow-sm flex items-center justify-center gap-2.5 group cursor-pointer">
              <Phone className="w-3 h-3 text-[#9a7a2e] group-hover:text-[#fdfcf8] transition-colors duration-300" />
              <span>Contact Advisory</span>
            </button>
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}