"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export default function UpcomingProjectsPreview() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-15%" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-12 sm:py-16 bg-black-950 border-t border-rosegold-700/20 border-b border-rosegold-700/20 overflow-hidden text-center"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >
      {/* Editorial Decorative Background Details */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10"
      >
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-4">
          <SectionEyebrow className="text-primary">What's Coming</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          className="font-serif text-4xl sm:text-5xl font-light text-fg tracking-tight mb-6"
        >
          New Projects in Goa, <span className="italic text-rosegold-500">Coming Soon</span>
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          className="font-sans text-sm sm:text-base text-fg-muted leading-relaxed max-w-xl mx-auto mb-10"
        >
          We regularly add new residential projects to our listings across Goa. If none of our
          current properties fit your requirements, take a look at what&apos;s coming up next.
        </motion.p>

        <motion.div variants={fadeUpVariants}>
          <Link href="/upcoming-projects">
            <button className="relative px-9 py-4.5 bg-transparent hover:bg-primary text-fg hover:text-on-primary border-2 border-primary font-sans text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 inline-flex items-center justify-center gap-3 rounded-none cursor-pointer group">
              <span>See Upcoming Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
