"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionEyebrow } from "./SectionEyebrow";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
  title?: React.ReactNode;
  subtitle?: string;
  /** Closing call-out copy and button; defaults match the Home page. */
  ctaText?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question:
      "What legal due diligence is performed for properties in North Goa?",
    answer:
      "We review basic property documentation before a listing is shared, and recommend involving a property lawyer for a full legal review before you close a transaction.",
  },
  {
    question:
      "How does the purchase process work for NRIs and foreign citizens?",
    answer:
      "We can guide you through our general search and viewing process. For eligibility and regulatory questions specific to NRIs or foreign nationals, we recommend confirming details with a property lawyer.",
  },
  {
    question:
      "Can you assist with restoring or preserving Portuguese heritage bungalows?",
    answer:
      "If you're specifically looking for a heritage property, let us know and we'll try to match you with relevant listings and connect you with professionals who specialize in restoration.",
  },
  {
    question:
      "What are the current trends in micro markets like Assagao and Aldona?",
    answer:
      "Demand and pricing vary by area and season. Our team can walk you through what we're currently seeing in the specific location you're interested in.",
  },
  {
    question:
      "Do you help with renting property in Goa, not just buying and selling?",
    answer:
      "Yes, we also assist with short-term and long-term rentals across Goa.",
  },
  {
    question: "How do I get in touch with Homes & Land Goa?",
    answer:
      "You can call or WhatsApp us at +91 96238 58108, email info@homesandlandgoa.com, or visit us at Casa Lotus, Porba Vaddo, Calangute.",
  },
];

export default function FAQ({
  faqs = defaultFaqs,
  title = (
    <>
      Frequently Asked{" "}
      <span className="italic text-rosegold-500 font-normal">Questions</span>
    </>
  ),
  subtitle = "Advisory & Compliance",
  ctaText = "Our team is available to answer questions and set up a viewing.",
  ctaLabel = "Explore Properties",
  ctaHref = "/contacts",
}: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLElement | null>(null);

  const inView = useInView(containerRef, {
    once: true,
    margin: "-10%",
  });

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-6 sm:py-12 md:py-20 bg-black-950 overflow-hidden text-fg"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionEyebrow>{subtitle}</SectionEyebrow>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-4xl sm:text-5xl mt-4 font-light tracking-tight leading-tight capitalize"
          >
            {title}
          </motion.h2>

          <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-6" />
        </div>

        {/* Accordion Rows Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="border-t border-rosegold-700/40 divide-y divide-rosegold-700/40"
        >
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 15,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="py-6 sm:py-8 bg-transparent"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer"
                >
                  {/* Dynamic Serial Tag */}
                  <span className=" text-[16px] tracking-widest text-rosegold-500 font-bold mt-1.5">
                    {String(index + 1).padStart(2, "0")}.
                  </span>

                  {/* Question */}
                  <span className="flex-1 text-base sm:text-lg font-light text-fg group-hover:text-rosegold-500 transition-colors duration-400">
                    {faq.question}
                  </span>

                  {/* Sharp Premium Cross / Minus Toggle Indicator */}
                  <div className="relative w-4 h-4 mt-2 flex items-center justify-center">
                    <span className="absolute w-4 h-[1px] bg-rosegold-500" />

                    <motion.span
                      animate={{
                        rotate: isOpen ? 0 : 90,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute w-[1px] h-4 bg-rosegold-500"
                    />
                  </div>
                </button>

                {/* Answer Expandable Block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 sm:pl-8 pr-12 pt-4 sm:pt-6 pb-2">
                        <p className="font-serif text-base sm:text-[17px] text-fg-muted leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Advisory Call-Out Box */}
        <div className="mt-16 p-8 border border-rosegold-700/40 bg-black-900 text-center space-y-4">
          <p className=" text-[10px] tracking-[0.2em] uppercase text-rosegold-500 font-bold">
            Still have questions?
          </p>

          <p className=" text-lg text-fg max-w-lg mx-auto leading-relaxed">
            {ctaText}
          </p>

          <div className="pt-2 flex justify-center">
            <Link href={ctaHref} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto relative px-9 py-4.5 bg-primary hover:bg-primary-hover text-on-primary font-sans text-[10px] uppercase tracking-[0.25em] font-bold rounded-none transition-all duration-500 shadow-md flex items-center justify-center gap-2.5 group cursor-pointer border border-primary">
                <span>{ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
