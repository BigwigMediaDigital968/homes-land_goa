import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export interface PageHeroBreadcrumb {
  label: string;
  /** Omit on the last item (the current page). */
  href?: string;
}

export interface PageHeroCta {
  label: string;
  href: string;
}

interface PageHeroProps {
  /** Small label above the H1, e.g. "Buy Property in Goa". */
  eyebrow?: string;
  /** Rendered as the page's single <h1>. */
  title: React.ReactNode;
  /** Rendered as an <h2> directly under the title. */
  subtitle?: string;
  description?: string;
  /** Home is prepended automatically. Last item = current page (no href). */
  breadcrumbs: PageHeroBreadcrumb[];
  /** Current page path (e.g. "/buy"), used as the last breadcrumb's URL in schema. */
  path?: string;
  image: { src: string | StaticImageData; alt: string };
  primaryCta?: PageHeroCta;
  secondaryCta?: PageHeroCta;
  /**
   * Replaces the built-in CTA links. Lets a server-rendered hero carry
   * interactive buttons (e.g. a modal trigger) without going client-side.
   */
  actions?: React.ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  description,
  breadcrumbs,
  path,
  image,
  primaryCta,
  secondaryCta,
  actions,
}: PageHeroProps) {
  const trail: PageHeroBreadcrumb[] = [
    { label: "Home", href: "/" },
    ...breadcrumbs,
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => {
      const href = crumb.href ?? (index === trail.length - 1 ? path : undefined);

      return {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        ...(href ? { item: `${SITE_URL}${href}` } : {}),
      };
    }),
  };

  return (
    <section className="relative w-full overflow-hidden bg-black-950 text-fg">
      {/* Background image — priority: it is the LCP element on inner pages */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Contrast layers: left-to-right for text legibility, bottom fade into page */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black-950 via-black-950/80 to-black-950/30"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black-950 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-12 md:pt-36 md:pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="hero-reveal mb-8 md:mb-10">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[11px] uppercase tracking-[0.2em]">
            {trail.map((crumb, index) => {
              const isLast = index === trail.length - 1;

              return (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 && (
                    <ChevronRight
                      aria-hidden
                      className="h-3 w-3 text-primary/70"
                    />
                  )}
                  {isLast || !crumb.href ? (
                    <span aria-current="page" className="font-bold text-primary">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="font-semibold text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="max-w-3xl">
          {eyebrow && (
            <div
              className="hero-reveal mb-4 flex items-center gap-3"
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              <span aria-hidden className="h-px w-8 bg-primary" />
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                {eyebrow}
              </p>
            </div>
          )}

          <h1
            className="hero-reveal font-serif text-3xl font-light leading-[1.05] tracking-tight text-fg sm:text-4xl md:text-5xl"
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            {title}
          </h1>

          {subtitle && (
            <h2
              className="hero-reveal mt-4 font-serif text-xl font-normal italic leading-snug text-primary sm:text-2xl md:text-3xl"
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              {subtitle}
            </h2>
          )}

          {description && (
            <p
              className="hero-reveal mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
            >
              {description}
            </p>
          )}

          {(actions || primaryCta || secondaryCta) && (
            <div
              className="hero-reveal mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
              style={{ "--reveal-delay": "400ms" } as React.CSSProperties}
            >
              {actions}
              {!actions && primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="group inline-flex min-h-12 items-center justify-center gap-3 border border-transparent bg-primary px-9 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-on-primary transition-colors duration-300 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {primaryCta.label}
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              )}
              {!actions && secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex min-h-12 items-center justify-center border-2 border-fg bg-transparent px-9 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </section>
  );
}
