import { FileCheck, IndianRupee, Users } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const reasons = [
  {
    heading: "Trusted Network",
    description:
      "Access to genuine buyers and investors looking to buy property in Goa.",
    Icon: Users,
  },
  {
    heading: "Best Market Price",
    description:
      "Get an accurate property valuation in Goa and aim for the best possible return.",
    Icon: IndianRupee,
  },
  {
    heading: "Hassle-Free Process",
    description:
      "We handle the legal and documentation work involved in property selling in Goa.",
    Icon: FileCheck,
  },
];

export default function SellWhyChooseUs() {
  return (
    <section
      aria-labelledby="sell-why-heading"
      className="border-t border-border bg-black-900 py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Why Sell With Us" id="sell-why-heading">
            Why Sell Your Property in Goa With Us
          </SectionHeading>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reasons.map(({ heading, description, Icon }) => (
            <article
              key={heading}
              className="border border-border bg-surface p-6 transition-colors duration-300 hover:border-primary/60 sm:p-8"
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
      </div>
    </section>
  );
}
