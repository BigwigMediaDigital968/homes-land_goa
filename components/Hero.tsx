// app/components/Hero.tsx
"use client";
import Image from "next/image";
import hero from "../assets/banner image.avif";
import { Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-screen flex items-center justify-center">
      {/* ✅ Background Image */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-2"
      >
        <source src="/kpd-goa.mp4" type="video/mp4" />
      </video>

      {/* ✅ Optional Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* ✅ Center Content */}
      <div className="relative z-10 text-center max-w-3xl px-4 space-y-10">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center gap-2 justify-center uppercase tracking-widest"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Unlock !
          </motion.div>

          <motion.div
            className="flex items-center gap-2 justify-center"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-[#fff] text-3xl md:text-4xl font-semibold tracking-widest">
              Your Ideal Living Space
            </span>
            <Home className="hidden md:block w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg font-semibold text-gray-200 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Uncover elegant properties thoughtfully curated to reflect your
          aspirations.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Link href="/contacts">
            <button
              className="relative px-6 py-3  bg-[#E50E0B] text-white font-semibold 
                overflow-hidden group cursor-pointer transition-all duration-300 rounded"
            >
              <span className="relative z-10 tracking-widest">Contact Us</span>
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/20 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
              ></span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
