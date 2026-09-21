import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, LandPlot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import villaImage from "../../assets/feature-2024-06-15T115431.377.webp";

interface PropertyTypeItem {
  heading: string;
  description: string;
  cta: string;
  /** Lands on the listings with the matching filter applied. */
  href: string;
  /**
   * Representative photo. When omitted, a placeholder tile is shown instead
   * of a mismatched picture — add the image here once one is available.
   */
  image?: { src: StaticImageData | string; alt: string };
  placeholderIcon: LucideIcon;
}

const propertyTypes: PropertyTypeItem[] = [
  {
    heading: "Villas for Sale in Goa",
    description:
      "Villas for sale in Goa typically suit buyers who want more space, privacy and often a private pool or garden. They work well as a primary residence, a holiday home, or a long-term investment property in Goa.",
    cta: "Explore Villas",
    href: "/buy?type=villa#listings",
    image: { src: villaImage, alt: "Villa for sale in Goa" },
    placeholderIcon: Building2,
  },
  {
    heading: "Apartments for Sale in Goa",
    description:
      "Apartments for sale in Goa are a practical option for buyers who want lower maintenance, often within a gated or managed complex, and suit first-time buyers or those looking for a lock-and-leave holiday home.",
    cta: "Explore Apartments",
    href: "/buy?type=apartment#listings",
    image: { src: "https://images.pexels.com/photos/27075286/pexels-photo-27075286.jpeg", alt: "Apartments for Sale in Goa" },

    placeholderIcon: Building2,
  },
  {
    heading: "Plots for Sale in Goa",
    description:
      "Plots for sale in Goa suit buyers who want to design and build a home to their own specifications, subject to local building and land-use approvals.",
    cta: "Explore Plots",
    href: "/buy?type=plot#listings",
    image: { src: "https://images.pexels.com/photos/16408959/pexels-photo-16408959.jpeg", alt: "Plots for Sale in Goa" },
    placeholderIcon: LandPlot,
  },
];

export default function PropertyTypes() {
  return (
    <section
      aria-labelledby="property-types-heading"
      className="border-t border-border bg-black-900 py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="max-w-3xl">
          <SectionEyebrow>What You Can Buy</SectionEyebrow>
          <h2
            id="property-types-heading"
            className="mt-3 font-serif text-3xl font-light leading-tight text-fg md:text-4xl"
          >
            Property Types Available in Goa
          </h2>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {propertyTypes.map(
            ({ heading, description, cta, href, image, placeholderIcon: Icon }) => (
              <li key={heading}>
                <article className="group flex h-full flex-col overflow-hidden border border-border bg-surface transition-colors duration-300 hover:border-primary/60">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-elevated">
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill

                        unoptimized
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="flex h-full items-center justify-center bg-gradient-to-br from-surface-elevated to-black-900"
                      >
                        <Icon
                          strokeWidth={1}
                          className="h-16 w-16 text-primary/60"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1   justify-between flex-col p-6">
                    <div>
                      <h3 className="font-serif text-2xl font-normal leading-snug text-fg">
                        {heading}
                      </h3>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-white/80 md:text-base">
                        {description}
                      </p>
                    </div>

                    <Link
                      href={href}
                      className="mt-4 inline-flex min-h-11 w-fit items-center gap-2 border-2 border-fg px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      {cta}
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
