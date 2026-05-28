"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, ChevronDown, MessageSquare } from "lucide-react";

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const videoSource = "/kpd-goa.mp4";
  const backupVideoSource = "https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-by-the-sea-41846-large.mp4";

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
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#fdfcf8] overflow-hidden text-[#0d0c09]"
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
          onLoadedData={() => setIsVideoLoaded(true)}
          className="absolute w-full h-full object-cover transition-all duration-[3000ms] ease-out scale-100"
        >
          <source src={videoSource} type="video/mp4" />
          <source src={backupVideoSource} type="video/mp4" />
        </video>
        {/* Refined Light Contrast Overlays (Reduced opacity so the video is beautifully clear) */}
        {/* Bottom fading gradient */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#fdfcf8]/70 via-[#fdfcf8]/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_bottom_left, rgba(184,148,58,0.04) 0%, transparent 60%) z-10 pointer-events-none" /> */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_bottom_left, rgba(184,148,58,0.04) 0%, transparent 60%) z-10 pointer-events-none" />
      </div>


      {/* 3. Main Editorial Content Area (Left-Bottom Anchored with maximum breathing room) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 flex-1 flex flex-col justify-end pb-16 pt-24">
        <div className="w-full">

          {/* Left Column: Storytelling & Sharp Actions */}
          <motion.div
            className="max-w-4xl space-y-6 md:space-y-4 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Elegant Subtitle */}
            {/* <motion.div variants={fadeUpVariants} className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#b8943a]" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#9a7a2e] font-bold">
                CRAFTING SANCTUARIES • CREATING LEGACIES
              </span>
            </motion.div> */}
            <motion.div variants={fadeUpVariants} className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#b8943a]" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400 font-bold">
                CRAFTING SANCTUARIES • CREATING LEGACIES
              </span>
            </motion.div>

            {/* Architectural Sans-Serif / Serif Heading Combo */}
            {/* <motion.h1 
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-light text-[#0d0c09] leading-[1.05] tracking-tight font-serif"
            >
              Unlock Your <br className="hidden md:inline" />
              <span className="italic font-normal text-gold-600 font-serif relative">
                Ideal Living Space
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeUpVariants}
              className="text-[#1a1814] text-base sm:text-lg max-w-xl leading-relaxed font-serif"
            >
              Uncover elegant properties thoughtfully curated to reflect your highest architectural aspirations. Harmonizing timeless coastal beauty with absolute structural serenity.
            </motion.p> */}


            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight font-serif"
            >
              Unlock Your <br className="hidden md:inline" />
              <span className="italic font-normal text-gold-400 font-serif relative">
                Ideal Living Space
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="text-white text-base sm:text-lg max-w-xl leading-relaxed font-serif"
            >
              Uncover elegant properties thoughtfully curated to reflect your highest architectural aspirations. Harmonizing timeless coastal beauty with absolute structural serenity.
            </motion.p>

            {/* Action Suite (Fully Sharp, Non-Circular Elements) */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary Sharp Architectural Button */}
              <a href="#properties" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto relative px-9 py-4.5 bg-[#0d0c09] hover:bg-[#b8943a] text-[#fdfcf8] font-sans text-[10px] uppercase tracking-[0.2em] font-bold rounded-none transition-all duration-500 shadow-md flex items-center justify-center gap-3 group cursor-pointer">
                  <span className="relative z-10">Explore Properties</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#fdfcf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </a>

              {/* Secondary Sharp Outline Button */}
              <a href="#contacts" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto relative px-9 py-4.5 bg-transparent hover:bg-white text-white hover:text-[#0d0c09] border-2 border-white font-sans text-[10px] uppercase tracking-[0.2em] font-bold rounded-none transition-all duration-500 cursor-pointer">
                  Inquire Directly
                </button>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function Hero2() {
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
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#091d35] overflow-hidden text-white"
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
        
        {/* Dynamic Dark Blue Gradient Overlays to seamlessly blend the video into #091d35 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#091d35] via-[#091d35]/20 to-transparent z-10 pointer-events-none" />
        {/* <div className="absolute inset-0 bg-radial-gradient(circle_at_bottom_left, rgba(212,175,55,0.08) 0%, transparent 60%) z-10 pointer-events-none" /> */}
      </div>

      {/* 3. Main Editorial Content Area */}
      <div className="relative z-20 w-full max-w-7xl mb-10 mx-auto px-6 lg:px-8 flex-1 flex flex-col justify-end pb-16 pt-24">
        <div className="w-full">

          {/* Left Column: Storytelling & Sharp Actions */}
          <motion.div
            className="max-w-4xl space-y-6 md:space-y-4 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Elegant Subtitle with Gold Accent */}
            <motion.div variants={fadeUpVariants} className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#d4af37]" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400 font-bold">
                CRAFTING SANCTUARIES • CREATING LEGACIES
              </span>
            </motion.div>

            {/* Architectural Sans-Serif / Serif Heading Combo */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight font-serif"
            >
              Unlock Your <br className="hidden md:inline" />
              <span className="italic font-normal text-gold-400 font-serif relative">
                Ideal Living Space
              </span>
            </motion.h1>

            {/* Paragraph Body text */}
            <motion.p
              variants={fadeUpVariants}
              className="text-slate-200 text-base sm:text-lg max-w-xl leading-relaxed font-serif"
            >
              Uncover elegant properties thoughtfully curated to reflect your highest architectural aspirations. Harmonizing timeless coastal beauty with absolute structural serenity.
            </motion.p>

            {/* Action Suite (Sharp, Non-Circular Elements) */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary Button: Starts as crisp white, transitions to gold */}
              <a href="#properties" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto relative px-9 py-4.5 bg-white hover:bg-gold-400 text-[#091d35] hover:text-white font-sans text-[10px] uppercase tracking-[0.2em] font-bold rounded-none transition-all duration-500 shadow-md flex items-center justify-center gap-3 group cursor-pointer border border-transparent">
                  <span className="relative z-10">Explore Properties</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#091d35] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              </a>

              {/* Secondary Button: Transparent Outline */}
              <a href="#contacts" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto relative px-9 py-4.5 bg-transparent hover:bg-white/10 text-white border-2 border-white font-sans text-[10px] uppercase tracking-[0.2em] font-bold rounded-none transition-all duration-500 cursor-pointer">
                  Inquire Directly
                </button>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}