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
}

const defaultFaqs: FAQItem[] = [
    {
        question: "What legal due diligence is performed for properties in North Goa?",
        answer:
            "Every sanctuary in our portfolio undergoes a rigorous title verification process by senior counsel. We trace historical ownership deeds back at least 30 years, verify zone classification clearance under the Goa regional plan, and confirm absolute freedom from any agricultural land classification restrictions.",
    },
    {
        question: "How does the purchase process work for NRIs and foreign citizens?",
        answer:
            "Non-Resident Indians (NRIs) can acquire residential and commercial properties in India without specific approvals, following FEMA regulations. For foreign citizens, foreign passport holders, or OCI holders, our legal desk assists in structuring the transactions through compliant pathways such as establishing specific corporate residency parameters.",
    },
    {
        question:
            "Can you assist in the restoration and preservation of Portuguese heritage bungalows?",
        answer:
            "Yes, our bespoke advisory coordinates directly with certified conservation architects and master stone-masons in Goa. From securing approvals from the local planning authority to sourcing authentic red Laterite stone, old roof tiles, and traditional mother-of-pearl window materials, we guide you from discovery through to historical restoration.",
    },
    {
        question:
            "What are the current capital appreciation trends in micro-markets like Assagaon and Aldona?",
        answer:
            "North Goa's premium inland enclaves are experiencing sustained capital appreciation, driven by a finite supply of heritage estates and high-quality contemporary villas. Assagaon has shown a steady 15-18% year-on-year value index climb, whereas Aldona remains an exclusive, quiet pocket of sustained long-term growth with a focus on riverfront heritage preservation.",
    },
];

export default function FAQ({
    faqs = defaultFaqs,
    title = (
        <>
            Frequently Asked{" "}
            <span className="italic text-[#9a7a2e] font-normal">
                Questions
            </span>
        </>
    ),
    subtitle = "Advisory & Compliance",
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
            className="relative w-full py-6 sm:py-12 md:py-24 bg-[#fdfcf8] overflow-hidden text-[#0B2545]"
        >
            {/* Thin Gold Structural Thread Lines */}
            <div className="absolute top-0 left-10 w-[1px] h-full bg-[#d4c99e]/15 pointer-events-none" />
            <div className="absolute top-0 right-10 w-[1px] h-full bg-[#d4c99e]/15 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >

                        <SectionEyebrow>
                            {subtitle}
                        </SectionEyebrow>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 1.2,
                            delay: 0.1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="text-4xl sm:text-5xl mt-4 font-light tracking-tight leading-tight uppercase"
                    >
                        {title}
                    </motion.h2>

                    <div className="w-12 h-[1px] bg-[#b8943a]/60 mx-auto mt-6" />
                </div>

                {/* Accordion Rows Grid Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="border-t border-[#d4c99e]/40 divide-y divide-[#d4c99e]/40"
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
                                    <span className=" text-[10px] tracking-widest text-[#9a7a2e] font-bold mt-1.5">
                                        {String(index + 1).padStart(2, "0")}.
                                    </span>

                                    {/* Question */}
                                    <span className="flex-1 text-base sm:text-lg font-light text-[#0B2545] group-hover:text-[#9a7a2e] transition-colors duration-400">
                                        {faq.question}
                                    </span>

                                    {/* Sharp Premium Cross / Minus Toggle Indicator */}
                                    <div className="relative w-4 h-4 mt-2 flex items-center justify-center">
                                        <span className="absolute w-4 h-[1px] bg-[#9a7a2e]" />

                                        <motion.span
                                            animate={{
                                                rotate: isOpen ? 0 : 90,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="absolute w-[1px] h-4 bg-[#9a7a2e]"
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
                                                <p className="font-serif text-base sm:text-[17px] text-[#0B2545]/80 leading-relaxed font-medium">
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
                <div className="mt-16 p-8 border border-[#d4c99e]/40 bg-[#f9f6ed] text-center space-y-4">
                    <p className=" text-[10px] tracking-[0.2em] uppercase text-[#9a7a2e] font-bold">
                        Still Have Inquiries?
                    </p>

                    <p className=" text-lg text-[#0B2545] max-w-lg mx-auto leading-relaxed">
                        Our specialized acquisition desk is prepared to provide
                        comprehensive legal, financial, and structural consultations.
                    </p>

                    <div className="pt-2 flex justify-center">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto relative px-9 py-4.5 bg-navy hover:bg-[#b8943a] text-[#fdfcf8] hover:text-navy font-sans text-[10px] uppercase tracking-[0.25em] font-bold rounded-none transition-all duration-500 shadow-md flex items-center justify-center gap-2.5 group cursor-pointer border border-navy hover:border-[#b8943a]">
                                <span>Explore Properties</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-[#fdfcf8] group-hover:text-navy transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}