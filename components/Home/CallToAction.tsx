

"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";
import { BUSINESS } from "@/lib/site";

interface CtaLink {
  label: string;
  href: string;
}

interface CallToActionProps {
  /** Pass null to hide the eyebrow. Defaults match the Home page. */
  eyebrow?: string | null;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink & { showPhoneIcon?: boolean };
}

export default function CallToAction({
  eyebrow = "Private Commissions",
  title = (
    <>
      Ready to Start<br />
      <span className="italic text-fg font-serif font-normal"> Your Property Search? </span>
    </>
  ),
  description = "Tell us what you're looking for, and we'll help you take the next step, whether that's buying, selling, or renting a property in Goa.",
  primaryCta = { label: "Explore Properties", href: "/buy" },
  secondaryCta = { label: "Contact Advisory", href: `tel:${BUSINESS.telephone}`, showPhoneIcon: true },
}: CallToActionProps) {
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
      className="relative h-[65vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden bg-black-950"
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
      {/* Warm rose gold light bleed */}
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center, rgba(206,156,129,0.15) 0%, transparent 75%) z-10 pointer-events-none" />

      {/* 3. Luxury Decorative Structural Thread Frame */}

      {/* 4. Editorial Narrative Content Block */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-20 max-w-4xl mx-auto px-6 space-y-8"
      >
        {/* Fine Art Subtitle badge */}
        {eyebrow && (
          <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-3">
            <span className="w-6 h-px bg-primary" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-rosegold-500 font-bold">
              {eyebrow}
            </span>
            <span className="w-6 h-px bg-primary" />
          </motion.div>
        )}

        {/* Cinematic Main Heading */}
        <motion.h2
          variants={fadeUpVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-primary tracking-tight leading-tight"
        >
          {title}
        </motion.h2>

        {/* High-End Description Narrative */}
        <motion.p
          variants={fadeUpVariants}
          className="font-sans text-fg text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* 5. Sharp Actions Suite (100% Rounding-Free) */}
        <motion.div 
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {/* Action 1: Private Booking */}
          <Link href={primaryCta.href} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto relative px-9 py-4.5 bg-primary hover:bg-primary-hover text-on-primary font-sans text-[10px] uppercase tracking-[0.25em] font-bold rounded-none transition-all duration-500 shadow-md flex items-center justify-center gap-2.5 group cursor-pointer border border-primary">
              <span>{primaryCta.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>

          {/* Action 2: Direct Call */}
          <Link href={secondaryCta.href} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto relative px-9 py-4.5 bg-transparent hover:bg-primary text-fg hover:text-on-primary border-2 border-primary font-sans text-[10px] uppercase tracking-[0.25em] font-bold rounded-none transition-all duration-500 shadow-sm flex items-center justify-center gap-2.5 group cursor-pointer">
              {secondaryCta.showPhoneIcon && (
                <Phone className="w-3 h-3 text-primary group-hover:text-on-primary transition-colors duration-300" />
              )}
              <span>{secondaryCta.label}</span>
            </button>
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}