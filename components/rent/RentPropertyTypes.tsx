import Link from "next/link";
import { ArrowUpRight, Building2, Check, House, TreePalm } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

interface RentType {
  heading: string;
  description: string;
  points: string[];
  cta: string;
  /** Lands on the listings with the matching filter applied. */
  href: string;
  Icon: LucideIcon;
}

// No photos supplied for these yet, so each card uses an icon instead of a
// stand-in picture.
const rentTypes: RentType[] = [
  {
    heading: "Apartments for Rent",
    description:
      "Apartments for rent in Goa suit renters who want lower maintenance, often within a managed complex, and are a common choice for both long-term residents and shorter holiday stays.",
    points: [
      "Furnished and unfurnished options",
      "Suited to long stays and shorter holiday rentals",
      "Available across North and South Goa",
    ],
    cta: "Browse Apartments",
    href: "/rent?type=apartment#listings",
    Icon: Building2,
  },
  {
    heading: "Villas for Rent",
    description:
      "Villas for rent in Goa suit renters who want more space and privacy, often with a private pool or garden, and are a popular choice for holiday rentals and families.",
    points: [
      "More space and privacy than an apartment",
      "Often includes a garden or private pool",
      "Popular for holiday and family rentals",
    ],
    cta: "Browse Villas",
    href: "/rent?type=villa#listings",
    Icon: TreePalm,
  },
  {
    heading: "Houses for Rent",
    description:
      "Houses for rent in Goa suit renters looking for an independent property rather than a unit within a larger complex.",
    points: [
      "Independent, standalone properties",
      "Suited to longer-term stays",
      "Available in select localities",
    ],
    cta: "Browse Houses",
    href: "/rent?type=house#listings",
    Icon: House,
  },
];

export default function RentPropertyTypes() {
  return (
    <section
      aria-labelledby="rent-types-heading"
      className="border-t border-border bg-black-900 py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionHeading eyebrow="What You Can Rent" id="rent-types-heading">
          Rental Property Types in Goa
        </SectionHeading>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {rentTypes.map(
            ({ heading, description, points, cta, href, Icon }) => (
              <li key={heading}>
                <article className="group flex h-full flex-col border border-border bg-surface p-6 transition-colors duration-300 hover:border-primary/60 sm:p-8">
                  <Icon
                    aria-hidden
                    strokeWidth={1.25}
                    className="h-10 w-10 text-primary"
                  />
                  <h3 className="mt-5 font-serif text-2xl font-normal leading-snug text-fg">
                    {heading}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-white/80 md:text-base">
                    {description}
                  </p>

                  <ul className="mt-5 mb-4 space-y-2 font-sans text-sm text-white/80 md:text-base">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check
                          aria-hidden
                          className="mt-1 h-4 w-4 shrink-0 text-primary"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={href}
                    className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 border-2 border-fg px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:mt-auto"
                  >
                    {cta}
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                </article>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
