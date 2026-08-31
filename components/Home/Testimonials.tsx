"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const testimonials = [
  {
    id: 1,
    quote:
      "Homes & Land Goa didn't just find us a villa - they found us a way of life. The process was seamless, the team was impeccable, and the property exceeded every expectation. An extraordinary experience from start to finish.",
    name: "Arjun & Priya Mehta",
    role: "Mumbai · Acquired a beachfront villa in Vagator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=90",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "When we decided to sell our heritage property in Panjim, we were skeptical. But the team at Homes & Land Goa handled everything with discretion and professionalism. We received an offer 22% above our asking price within three weeks.",
    name: "Sunita Rodrigues",
    role: "Panjim · Sold a Portuguese heritage bungalow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=90",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "As an NRI investor, finding a trustworthy partner in Indian real estate is rare. Homes & Land Goa managed every aspect of my investment with absolute transparency. I can sleep soundly knowing my assets are in expert hands.",
    name: "Ravi Nair",
    role: "Dubai · Investment portfolio of 3 properties",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=90",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="testimonials"
      className="relative w-full py-12 lg:py-24 overflow-hidden bg-[#f9f6ed]"
      style={{ 
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        borderTop: "1px solid rgba(212, 201, 158, 0.4)",
        borderBottom: "1px solid rgba(212, 201, 158, 0.4)"
      }}
    >
      {/* Decorative Structural Grid Lines */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#d4c99e]/15 pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[#d4c99e]/15 pointer-events-none z-0" />

      {/* Large Decorative Faded Quote Mark */}
      <div
        className="absolute top-10 left-8 lg:left-24 select-none pointer-events-none font-serif text-[18rem] lg:text-[24rem] text-[#b8943a]/8 leading-none z-0 italic"
      >
        “
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-24"
        >
          <SectionEyebrow
                      >
                        Client Voices
                      </SectionEyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-navy tracking-tight mt-4">
            What Our <span className="italic text-[#9a7a2e]">Clients</span> Say
          </h2>
          <div className="w-12 h-[1px] bg-[#b8943a]/60 mx-auto mt-6" />
        </motion.div>

        {/* Testimonial Active Slider Area */}
        <div className="relative min-h-[340px] sm:min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center w-full"
            >
              {/* Stars Representation */}
              <div className="flex justify-center gap-1.5 mb-8">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-3.5 h-3.5 fill-[#b8943a] text-[#b8943a]" 
                  />
                ))}
              </div>

              {/* Cinematic Quote text */}
              <blockquote
                className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed mb-10 mx-auto text-[#1a1814] max-w-4xl italic"
                style={{ lineHeight: "1.65" }}
              >
                "{testimonials[active].quote}"
              </blockquote>

              {/* Client Portrait & Signature Block */}
              <div className="flex flex-col items-center gap-4 pt-4">
                <div className="relative p-1 bg-[#fdfcf8] border border-[#d4c99e]/40 shadow-sm">
                  <img
                    src={testimonials[active].avatar}
                    alt={testimonials[active].name}
                    className="w-14 h-14 object-cover transition-all duration-700"
                  />
                </div>
                <div>
                  <p className="font-serif text-lg text-navy font-medium tracking-wide">
                    {testimonials[active].name}
                  </p>
                  <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#9a7a2e] font-bold mt-1.5">
                    {testimonials[active].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Navigation Controls (Sharp-edged rectangular layout) */}
        <div className="flex items-center justify-center gap-8 mt-16">
          {/* Left Arrow Button */}
          <button
            onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
            className="w-12 h-12 flex items-center justify-center border border-[#d4c99e] bg-[#fdfcf8] text-navy hover:bg-navy hover:text-[#fdfcf8] hover:border-[#0d0c09] transition-all duration-500 rounded-none cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Linear Progress Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-500 rounded-none cursor-pointer"
                style={{
                  width: i === active ? "32px" : "6px",
                  height: "2px",
                  background: i === active ? "#b8943a" : "rgba(184, 148, 58, 0.2)",
                }}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => setActive((a) => (a + 1) % testimonials.length)}
            className="w-12 h-12 flex items-center justify-center border border-[#d4c99e] bg-[#fdfcf8] text-[#0d0c09] hover:bg-[#0d0c09] hover:text-[#fdfcf8] hover:border-[#0d0c09] transition-all duration-500 rounded-none cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
      </div>
    </section>
  );
}
