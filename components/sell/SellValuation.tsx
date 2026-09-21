import Image from "next/image"; // Remove or adjust if using standard <img>
import ButtonLink from "../ui/ButtonLink";

/**
 * Section 2. Valuation CTA section with image on the right side.
 */
export default function SellValuation() {
  return (
    <section
      aria-labelledby="valuation-heading"
      className="relative overflow-hidden border-t border-border bg-black-900 py-20 md:py-28"
    >
      {/* Warm centre glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(206,156,129,0.12)_0%,transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span aria-hidden className="h-px w-8 bg-primary" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                Start Here
              </span>
              <span aria-hidden className="h-px w-8 bg-primary lg:hidden" />
            </div>

            <h2
              id="valuation-heading"
              className="mt-6 font-serif text-3xl font-light leading-tight text-fg sm:text-4xl md:text-5xl"
            >
              What Is Your Property Worth?
            </h2>

            <p className="mt-6 font-sans text-base leading-relaxed text-white/80 md:text-lg">
              A property valuation in Goa is usually the first thing a seller
              wants to know. Share a few basic details about your property, and
              our team will help you understand a realistic market price before
              you decide how to move forward.
            </p>

            <div className="mt-10 flex justify-center lg:justify-start">
              <ButtonLink href="/contacts">Get Your Free Valuation</ButtonLink>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=90" // Replace with your image path
              alt="Property in Goa"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
