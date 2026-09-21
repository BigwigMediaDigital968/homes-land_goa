import ButtonLink from "../ui/ButtonLink";
import SectionHeading from "../ui/SectionHeading";

export default function BuyCta() {
  return (
    <section
      aria-labelledby="buy-cta-heading"
      className="relative overflow-hidden border-t border-border bg-black-900 py-16 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(206,156,129,0.12)_0%,transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 text-center">
        <SectionHeading eyebrow="Next Step" id="buy-cta-heading" align="center">
          Ready to Buy Property in Goa?
        </SectionHeading>
        <p className="mt-4 font-sans text-base leading-relaxed text-white/80 md:text-lg">
          Browse property for sale in Goa above, or get in touch and tell us
          what you are looking for. We will help you find the right villa,
          apartment or plot to buy in Goa.
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/contacts">Enquire Now</ButtonLink>
          <ButtonLink href="#listings" variant="outline">
            Explore Properties
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
