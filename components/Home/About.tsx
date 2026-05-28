"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Award, Map, Compass } from "lucide-react";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export default function About() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  // Custom premium cubic-bezier transitions
  const transitionConfig: any = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

  // Stagger wrapper variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitionConfig,
    },
  };

  const scaleRevealVariants: any = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transitionConfig,
    },
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full lg:h-screen flex items-center justify-center bg-[#fdfcf8] py-20 lg:py-0 overflow-hidden border-b border-[#e8e0c4]"
    >

      {/* 2. Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN: Premium Asymmetrical Image Grid (Constrained to fit within viewport) */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-start">

            {/* Main Visual Frame */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={scaleRevealVariants}
              className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[4/5] overflow-hidden bg-[#f9f6ed] p-2 shadow-xl border border-[#d4c99e]/40 z-10"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=90"
                  alt="Luxury Modern Goa Villa Facade"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Overlapping Small Accent Frame */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.4, ...transitionConfig }}
              className="absolute -top-6 -left-4 md:-left-8 w-28 h-36 overflow-hidden shadow-lg border border-[#d4c99e]/50 bg-[#fdfcf8] p-1.5 z-20 hidden sm:block"
            >
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&q=90"
                alt="Goan Coastal Vista"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Luxury Metadata Card */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.5, ...transitionConfig }}
              className="absolute -bottom-6 -right-4 md:-right-8 p-6 bg-[#fdfcf8] border border-[#d4c99e] shadow-xl z-20 w-[180px] text-center"
            >
              <h3
                className="text-4xl font-light text-[#9a7a2e] mb-1 font-display"
              >
                12+
              </h3>
              <p
                className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#5c5750] leading-snug font-bold"
              >
                Years of Curated Coastal Legacy
              </p>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Redesigned Minimal Editorial Text & Micro-Pillars */}
          <motion.div
            className="lg:col-span-7 space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Premium Category Tag */}
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2">
              <SectionEyebrow className="text-gold-500"
              >
                The Heritage & Future
              </SectionEyebrow>
            </motion.div>

            {/* Main Section Header */}
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-navy"
              variants={fadeUpVariants}
            >
              Curating Goa's <span className="italic text-[#9a7a2e] font-medium font-display">Finest</span> <br />
              Architectural Sanctuaries.
            </motion.h2>

            {/* Horizontal gold accent break */}
            <motion.div
              variants={fadeUpVariants}
              className="w-16 h-px bg-gradient-to-r from-[#b8943a] to-transparent"
            />

            {/* Polished, highly readable narrative */}
            <motion.p
              className="font-display text-base md:text-lg font-light text-[#5c5750] leading-relaxed max-w-2xl"
              variants={fadeUpVariants}
            >
              For over a decade, Vana Goa has operated as the trusted custodian for exceptional real estate. We don't simply broker spaces—we partner with discerning global minds to secure sanctuaries that stand in perfect dialogue with local topography.
            </motion.p>

            {/* Luxury Micro-Pillars Grid */}
            <motion.div
              className="grid grid-cols-2 gap-x-8 gap-y-6 pt-2 border-t border-[#e8e0c4] max-w-xl"
              variants={fadeUpVariants}
            >
              {[
                { icon: Compass, title: "Exclusive Registries", desc: "Access unlisted, off-market generational holdings." },
                { icon: Award, title: "White-Glove Advisory", desc: "Absolute administrative and transactional discretion." },
                { icon: ShieldCheck, title: "Legal Assurance", desc: "Rigorous vetting ensures clean, unencumbered titles." },
                { icon: Map, title: "Territorial Domain", desc: "Unmatched expertise across Goa's elite sub-markets." },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="space-y-1 group">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#b8943a] stroke-[1.5]" />
                      <h4
                        className="font-sans text-[10px] uppercase tracking-[0.15em] text-navy font-bold"
                      >
                        {item.title}
                      </h4>
                    </div>
                    <p
                      className="font-display text-xs text-[#7d7870] leading-normal font-light"
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}