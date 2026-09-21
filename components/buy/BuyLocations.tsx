import { TreePalm, Waves } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

/**
 * Deliberately region-level only: no micro-locations (Assagao, Candolim…)
 * until they can be backed by real, location-tagged inventory.
 */
const regions = [
  {
    heading: "Buying Property in North Goa",
    description:
      "North Goa tends to suit buyers who want proximity to beaches, cafes and a more active social scene, and is popular for holiday homes and short-term rental potential.",
    Icon: Waves,
  },
  {
    heading: "Buying Property in South Goa",
    description:
      "South Goa tends to suit buyers looking for a quieter, more residential setting, often at a different price point and pace of life.",
    Icon: TreePalm,
  },
];

export default function BuyLocations() {
  return (
    <section
      aria-labelledby="locations-heading"
      className="border-t border-border bg-bg py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionHeading eyebrow="Where to Buy" id="locations-heading">
          Find the Right Location in Goa
        </SectionHeading>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {regions.map(({ heading, description, Icon }) => (
            <article
              key={heading}
              className="border border-border bg-surface p-6 sm:p-8"
            >
              <Icon
                aria-hidden
                strokeWidth={1.25}
                className="h-10 w-10 text-primary"
              />
              <h3 className="mt-5 font-serif text-2xl font-normal leading-snug text-fg">
                {heading}
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-white/80">
                {description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl font-sans text-base leading-relaxed text-white/80 md:text-lg">
          Beyond North versus South, think about your daily commute needs,
          proximity to the coast, the type of property you want, your budget,
          and whether you are buying for personal use or as an investment
          property in Goa.
        </p>
      </div>
    </section>
  );
}
