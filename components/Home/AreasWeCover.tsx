"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionEyebrow } from "../ui/SectionEyebrow";

interface Region {
  id: string;
  label: string;
  tag: string;
  areas: string[];
  image: string;
  span: string;
}

interface AreasWeCoverProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  /** Defaults to the Home page's region split. */
  regions?: Region[];
  cta?: { label: string; href: string };
}

const defaultRegions: Region[] = [
  {
    id: "north",
    label: "North Goa",
    tag: "North Goa",
    areas: ["Assagao", "Aldona", "Mandrem", "Vagator", "Anjuna", "Calangute"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=90",
    span: "lg:col-span-6",
  },
  {
    id: "south",
    label: "South Goa",
    tag: "South Goa",
    areas: ["Dona Paula", "Majorda", "Benaulim", "Colva"],
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=90",
    span: "lg:col-span-6",
  },
];

export default function AreasWeCover({
  eyebrow = "Where We Work",
  title = (
    <>
      Areas We <span className="italic text-rosegold-500">Cover</span> Across Goa
    </>
  ),
  description = "Our listings span both North and South Goa. Here are some of the areas we regularly work in.",
  regions = defaultRegions,
  cta = { label: "Browse Properties by Location", href: "/buy" },
}: AreasWeCoverProps) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

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
      className="relative w-full py-20 sm:py-28 bg-black-950 border-t border-rosegold-700/20 overflow-hidden"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <SectionEyebrow className="text-primary">{eyebrow}</SectionEyebrow>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-fg tracking-tight">
            {title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-fg-muted leading-relaxed mt-6 max-w-xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Editorial Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {regions.map((region, idx) => (
            <RegionPanel key={region.id} region={region} index={idx} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          transition={{ delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <Link href={cta.href}>
            <button className="relative px-9 py-4.5 bg-transparent hover:bg-primary text-fg hover:text-on-primary border-2 border-primary font-sans text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 inline-flex items-center justify-center gap-3 rounded-none cursor-pointer group">
              <span>{cta.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Sub-component so each panel gets its own in-view + hover state
function RegionPanel({ region, index }: { region: Region; index: number }) {
  const panelRef = useRef(null);
  const inView = useInView(panelRef, { once: true, margin: "-15%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative col-span-1 ${region.span} aspect-[4/5] sm:aspect-[16/9] overflow-hidden`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image with slow premium zoom on hover */}
      <img
        src={region.image}
        alt={`Properties in ${region.label}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[0.16,1,0.3,1] group-hover:scale-110"
      />

      {/* Gradient wash — deepens on hover so the area tags stay perfectly legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/55 to-black-950/10 group-hover:from-black-950/95 group-hover:via-black-950/70 transition-colors duration-700 pointer-events-none" />

      {/* Elegant frame that lights up rose gold on hover */}
      <div className="absolute inset-3 border border-white/15 group-hover:border-primary/50 transition-all duration-700 pointer-events-none" />

      {/* Region tag */}
      <span className="absolute top-6 left-6 font-sans text-[9px] uppercase tracking-[0.25em] text-primary font-extrabold">
        {region.tag}
      </span>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <h3 className="font-serif text-3xl md:text-4xl italic font-light text-fg mb-5 transition-transform duration-700 group-hover:-translate-y-1">
          {region.label}
        </h3>

        {/* Area chips — slide up and brighten on hover, like a reveal */}
        <div
          className="flex flex-wrap gap-2 transition-all duration-500 ease-[0.16,1,0.3,1]"
          style={{
            transform: hovered ? "translateY(0px)" : "translateY(6px)",
            opacity: hovered ? 1 : 1,
          }}
        >
          {region.areas.map((area) => (
            <span
              key={area}
              className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-fg border border-rosegold-700/40 px-3 py-1.5 group-hover:border-primary/60 group-hover:text-fg transition-colors duration-500"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
