"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useInView, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  title?: React.ReactNode;
  description?: string;
  bgImage?: string;
  showBreadcrumbs?: boolean;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function PageHero({
  title = <>About Us</>,
  description = "A legacy built on trust, architectural distinction, and absolute structural serenity.",
  bgImage = "https://images.unsplash.com/photo-1652820330085-82a0c2b88d78?q=80&w=1174&auto=format&fit=crop",
  showBreadcrumbs = true,
}: PageHeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  const inView = useInView(containerRef, {
    once: true,
    margin: "-10%",
  });

  /**
   * Generate breadcrumbs automatically from URL
   * Example:
   * /about/team -> Home / About / Team
   */
  const breadcrumbs: BreadcrumbItem[] = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");

      return {
        label: segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
        href,
      };
    });

  breadcrumbs.unshift({
    label: "Home",
    href: "/",
  });

  // Luxury editorial stagger configurations
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
      ref={containerRef}
      className="relative h-[45vh] min-h-[380px] md:h-[50vh] flex items-center justify-center text-center overflow-hidden bg-navy"
      style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
      }}
    >
      {/* 1. Fixed Parallax Background Image */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* 2. Overlays */}
      <div className="absolute inset-0 bg-navy/50 z-10 pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,148,58,0.12)_0%,transparent_70%)] z-10 pointer-events-none" />

      {/* 3. Decorative Frame */}
      <div className="absolute inset-0 border border-[#d4c99e]/40 pointer-events-none z-20 m-4 sm:m-6 lg:m-10" />

      {/* 4. Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-20 max-w-3xl mx-auto px-6 flex flex-col items-center gap-5 sm:gap-6"
      >
        {/* Breadcrumbs */}
        {showBreadcrumbs && (
          <motion.nav
            variants={fadeUpVariants}
            aria-label="Breadcrumb"
            className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mb-2"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;

              return (
                <div
                  key={crumb.href}
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  {idx > 0 && (
                    <ChevronRight className="w-3 h-3 text-gold-500 opacity-70" />
                  )}

                  {isLast ? (
                    <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-500 font-extrabold">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/70 hover:text-white font-bold transition-colors duration-300"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          variants={fadeUpVariants}
          className="text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-tight uppercase font-serif"
        >
          {title}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            variants={fadeUpVariants}
            className="text-white text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-serif font-medium"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}