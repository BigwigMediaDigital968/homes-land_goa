"use client";

import Link from "next/link";
import { Mail, HelpCircle } from "lucide-react";
import { SectionEyebrow } from "./ui/SectionEyebrow";

const HelpSection = () => {
  return (
    <section className="border-t border-border bg-bg py-14 md:py-20 px-4 text-center">
      <SectionEyebrow>Need Help?</SectionEyebrow>

      {/* Heading */}
      <h2 className="mt-3 font-serif text-3xl md:text-4xl font-light leading-tight text-fg mb-4">
        Do You Have Any Questions?
        <br />
        <span className="italic text-primary">Get Help From Us</span>
      </h2>

      {/* Support Options */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6 mb-10">
        <Link
          href="/faq"
          className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg-muted transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <HelpCircle aria-hidden className="h-4 w-4 text-primary" />
          Browse our FAQ
        </Link>
      </div>

      {/* Newsletter / Email Form */}
      <form className="flex flex-col md:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto">
        <label className="flex items-center gap-3 border border-border bg-surface px-4 py-3 flex-grow w-full transition-colors duration-300 focus-within:border-primary">
          <Mail aria-hidden className="h-4 w-4 shrink-0 text-primary" />
          <span className="sr-only">Email address</span>
          <input
            type="email"
            placeholder="Enter your email address..."
            className="bg-transparent outline-none flex-grow font-sans text-sm text-fg placeholder:text-fg-muted"
            required
          />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center bg-primary px-9 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-on-primary transition-colors duration-300 hover:bg-primary-hover cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default HelpSection;
