import ButtonLink from "./ui/ButtonLink";
import ContactChannels from "./ui/ContactChannels";
import SectionHeading from "./ui/SectionHeading";

interface ContactInfoProps {
  showHeading?: boolean;
  eyebrow?: string;
  heading?: string;
  /** Set to null to drop the button. */
  cta?: { label: string; href: string } | null;
}

/**
 * Standalone contact band, used at the foot of several pages.
 *
 * Props are unchanged from the previous light-theme version (`showHeading`),
 * so the pages already rendering it pick up the new styling without edits.
 */
export default function ContactInfo({
  showHeading = true,
  eyebrow = "Get In Touch",
  heading = "Your Dream House Is One Step Away!",
  cta = { label: "Contact Us", href: "/contacts" },
}: ContactInfoProps) {
  return (
    <section
      aria-labelledby={showHeading ? "contact-info-band-heading" : undefined}
      aria-label={showHeading ? undefined : "Contact details"}
      className="border-t border-border bg-black-900 py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        {showHeading && (
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <SectionHeading
              eyebrow={eyebrow}
              id="contact-info-band-heading"
              align="center"
            >
              {heading}
            </SectionHeading>
          </div>
        )}

        <ContactChannels />

        {cta && (
          <div className="mt-10 flex justify-center">
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
