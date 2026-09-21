"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, ChevronDown, MessageSquare } from "lucide-react";

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // const videoSource = "/download-video.mp4";
  const videoSource = "/18705145-hd_1920_1080_30fps.mp4";

  // Framer Motion Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      className="relative w-full h-dvh flex flex-col justify-between bg-black-950 overflow-hidden text-fg"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >
      {/* 1. Cinematic Fullscreen Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute w-full h-full object-cover transition-all duration-[3000ms] ease-out scale-100"
          }`}
        >
          <source src={videoSource} type="video/mp4" />
        </video>

        {/* Dynamic Gradient Overlays to seamlessly blend the video into the black background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black-950 via-black-950/70 to-transparent z-10 pointer-events-none" />
        {/* <div className="absolute inset-0 bg-radial-gradient(circle_at_bottom_left, rgba(206,156,129,0.08) 0%, transparent 60%) z-10 pointer-events-none" /> */}
      </div>

      {/* 3. Main Editorial Content Area */}
      <div className="relative z-20 w-full max-w-7xl mb-10 mx-auto px-4 flex-1 flex flex-col justify-end pb-16 pt-24">
        <div className="w-full">

          {/* Left Column: Storytelling & Sharp Actions */}
          <motion.div
            className="max-w-4xl space-y-6 md:space-y-4 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Elegant Subtitle with Rose Gold Accent */}
            <motion.div variants={fadeUpVariants} className="flex items-center gap-3 pt-20">
              <span className="w-8 h-px bg-primary" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                Real Estate Agents in Goa
              </span>
            </motion.div>

            {/* Architectural Sans-Serif / Serif Heading Combo */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-light text-fg leading-[1.05] tracking-tight font-serif"
            >
              Find the Property in Goa, <br className="hidden md:inline" />
              <span className="italic font-normal text-primary font-serif relative">
                With People Who Know the Market
              </span>
            </motion.h1>

            {/* Paragraph Body text */}
            <motion.p
              variants={fadeUpVariants}
              className="text-base sm:text-lg max-w-xl leading-relaxed font-sans text-white/80"
            >
              Homes & Land Goa, Property Buying and Selling Support Across Goa
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="text-base sm:text-lg max-w-3xl leading-relaxed font-sans text-white/80"
            >

              <p> Homes & Land Goa helps you buy, sell, or rent property across Goa. As real estate agents and property dealers based here,
                we shortlist properties that actually match your budget and location, arrange viewings, and support you through the paperwork.
                Whether you're looking at a villa, an apartment, or a plot, we help you move forward with clarity.</p>

            </motion.div>

            {/* Action Suite (Sharp, Non-Circular Elements) */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary Button: Solid rose gold */}
              <a href="buy" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto relative px-9 py-4.5 bg-primary hover:bg-primary-hover text-on-primary font-sans text-[10px] uppercase tracking-[0.2em] font-bold rounded-none transition-all duration-500 shadow-md flex items-center justify-center gap-3 group cursor-pointer border border-transparent">
                  <span className="relative z-10">Explore Properties</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              </a>

              {/* Secondary Button: Transparent Outline */}
              <a href="contacts" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto relative px-9 py-4.5 bg-transparent hover:bg-primary/10 text-fg border-2 border-fg font-sans text-[10px] uppercase tracking-[0.2em] font-bold rounded-none transition-all duration-500 cursor-pointer">
                  Talk to Our Team
                </button>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
