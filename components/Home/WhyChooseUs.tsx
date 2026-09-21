"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { MapPin, User, ClipboardList, Handshake, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const features = [
  {
    icon: MapPin,
    title: "Expert Guidance",
    description:
      "Our team's experience in the Goa market helps make your buying or selling process smoother.",
  },
  {
    icon: User,
    title: "Personalized Service",
    description:
      "We adjust our approach to your specific requirements rather than offering a generic process.",
  },
  {
    icon: ClipboardList,
    title: "Transparent Process",
    description:
      "You're kept informed at each stage, with no unnecessary back and forth.",
  },
  {
    icon: Handshake,
    title: "Responsive Support",
    description:
      "Our team stays reachable through calls, WhatsApp, and email during your transaction.",
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

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
      className="relative w-full py-20 sm:py-28 bg-black-900 border-t border-rosegold-700/20 overflow-hidden"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center"
      >
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-4">
          <SectionEyebrow className="text-primary">Why Choose Us</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          className="font-serif text-4xl sm:text-5xl font-light text-fg tracking-tight mb-16"
        >
          What You Can <span className="italic text-rosegold-500">Expect</span> Working With Us
        </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 text-left mb-14">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div key={idx} variants={fadeUpVariants} className="space-y-4 group">
                <div className="w-12 h-12 flex items-center justify-center border border-rosegold-700/40 text-primary group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-all duration-500">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-sans text-sm uppercase tracking-[0.15em] text-fg font-bold">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-fg-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div variants={fadeUpVariants}>
          <Link href="/about">
            <button className="relative px-9 py-4.5 bg-transparent hover:bg-primary text-fg hover:text-on-primary border-2 border-primary font-sans text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 inline-flex items-center justify-center gap-3 rounded-none cursor-pointer group">
              <span>Learn More About Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
