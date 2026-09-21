import { ShieldCheck } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

export default function DueDiligence() {
  return (
    <section
      aria-labelledby="due-diligence-heading"
      className="border-t border-border bg-bg py-14 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Buying Safely" id="due-diligence-heading">
            Due Diligence Before You Buy Property in Goa
          </SectionHeading>
          <ShieldCheck
            aria-hidden
            strokeWidth={1}
            className="mt-8 hidden h-16 w-16 text-primary/70 md:block"
          />
        </div>

        <div className="space-y-5 border-l-2 border-primary/60 pl-6 font-sans text-base leading-relaxed text-white/80 md:col-span-7 md:text-lg">
          <p>
            Before finalizing any property purchase in Goa, it is important to
            review the relevant ownership and title documents, property records,
            applicable permissions, and any existing agreements tied to the
            property. This includes checking for encumbrances, confirming the
            seller&apos;s right to sell, and verifying that the property
            matches what has been represented.
          </p>
          <p>
            We recommend involving a qualified legal professional for property
            title verification and documentation review as part of your due
            diligence in Goa. This page is intended to help you understand what
            to check, not as a substitute for independent legal advice.
          </p>
        </div>
      </div>
    </section>
  );
}
