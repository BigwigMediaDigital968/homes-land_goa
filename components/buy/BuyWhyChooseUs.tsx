import ButtonLink from "../ui/ButtonLink";
import SectionHeading from "../ui/SectionHeading";

/**
 * Value points (shortlisting, viewings, documentation support…) are left out
 * until the team confirms which of them Homes & Land Goa actually provides.
 * No office photo yet either — add one beside the text when available.
 */
export default function BuyWhyChooseUs() {
  return (
    <section
      aria-labelledby="why-us-heading"
      className="border-t border-border bg-black-900 py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Why Choose Us" id="why-us-heading">
            Why Choose Homes &amp; Land Goa to Buy Property in Goa
          </SectionHeading>
          <p className="mt-4 font-sans text-base leading-relaxed text-white/80 md:text-lg">
            Homes &amp; Land Goa is based in Calangute and works directly with
            buyers looking to purchase property in Goa. You can reach our team
            by phone, email, or through this website to ask questions about any
            listed property, request more information, or arrange a viewing.
          </p>
          <div className="mt-8">
            <ButtonLink href="/about" variant="outline">
              Learn More About Us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
