"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const steps = [
  {
    number: "01",
    title: "Share Your Requirement",
    description:
      "Tell us your budget, location preference, and property type, or share your property details if you're selling.",
  },
  {
    number: "02",
    title: "Review Suitable Options",
    description:
      "We shortlist matching properties for buyers, or identify interested buyers for sellers.",
  },
  {
    number: "03",
    title: "Visit and Evaluate",
    description:
      "Arrange a site visit, review documentation, and confirm pricing.",
  },
  {
    number: "04",
    title: "Complete the Transaction",
    description:
      "We support you through the paperwork until the deal is closed.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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
      className="relative w-full py-20 sm:py-28 bg-black-900 border-t border-rosegold-700/20 overflow-hidden"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div variants={fadeUpVariants} className="flex justify-center mb-4">
            <SectionEyebrow className="text-primary">The Process</SectionEyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUpVariants}
            className="font-serif text-4xl sm:text-5xl font-light text-fg tracking-tight"
          >
            How Buying or Selling <span className="italic text-rosegold-500">With Us</span> Works
          </motion.h2>
        </div>

        {/* Step Sequence */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {/* Connecting thread line, desktop only */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rosegold-700/40 to-transparent pointer-events-none" />

          {steps.map((step) => (
            <motion.div key={step.number} variants={fadeUpVariants} className="relative space-y-4">
              <div className="relative z-10 w-14 h-14 flex items-center justify-center bg-black-900 border border-rosegold-700/50">
                <span className="font-serif text-lg italic text-primary">{step.number}</span>
              </div>
              <h3 className="font-sans text-sm uppercase tracking-[0.15em] text-fg font-bold">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-fg-muted leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={fadeUpVariants} className="mt-16 sm:mt-20 flex justify-center">
          <Link href="/contacts">
            <button className="relative px-9 py-4.5 bg-primary hover:bg-primary-hover text-on-primary font-sans text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 inline-flex items-center justify-center gap-3 rounded-none cursor-pointer group shadow-md">
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
