import { SectionEyebrow } from "../ui/SectionEyebrow";

export default function BuyExploreIntro() {
  return (
    <section
      aria-labelledby="explore-goa-heading"
      className="border-t border-border bg-bg py-14 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionEyebrow>Explore Goa Real Estate</SectionEyebrow>
          <h2
            id="explore-goa-heading"
            className="mt-3 font-serif text-3xl font-light leading-tight text-fg md:text-4xl"
          >
            Explore Property for Sale in Goa
          </h2>
          <span aria-hidden className="mt-6 block h-px w-16 bg-primary/60" />
        </div>

        <p className="font-sans text-base leading-relaxed text-white/80 md:col-span-7 md:text-lg">
          Goa&apos;s property market covers a wide range of needs, from a
          compact apartment near the city to a private villa closer to the
          coast, or a plot of land to design and build your own home. This page
          brings together property for sale in Goa so you can compare options
          in one place before deciding what to view in person. If you are
          looking to buy property in Goa for personal use, as a holiday home,
          or as an investment, filter by property type above and get in touch
          with our team whenever you&apos;re ready to take the next step.
        </p>
      </div>
    </section>
  );
}
