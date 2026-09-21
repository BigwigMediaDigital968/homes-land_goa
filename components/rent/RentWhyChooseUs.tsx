import { Award, Eye, Headset, SlidersHorizontal } from "lucide-react";
import ButtonLink from "../ui/ButtonLink";
import SectionHeading from "../ui/SectionHeading";

const reasons = [
  {
    heading: "Expert Guidance",
    text: "Our team's familiarity with Goa's rental market helps make your search smoother.",
    Icon: Award,
  },
  {
    heading: "Personalized Service",
    text: "We adjust our approach to your locality, budget and lease-length needs rather than offering a generic process.",
    Icon: SlidersHorizontal,
  },
  {
    heading: "Transparent Process",
    text: "You're kept informed at each stage, with no unnecessary back and forth.",
    Icon: Eye,
  },
  {
    heading: "Responsive Support",
    text: "Our team stays reachable through calls, WhatsApp, and email during your search.",
    Icon: Headset,
  },
];

export default function RentWhyChooseUs() {
  return (
    <section
      aria-labelledby="rent-why-heading"
      className="border-t border-border bg-bg py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionHeading eyebrow="Why Choose Us" id="rent-why-heading">
          What You Can Expect Renting With Us
        </SectionHeading>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ heading, text, Icon }) => (
            <li
              key={heading}
              className="border border-border bg-surface p-6 sm:p-8"
            >
              <Icon
                aria-hidden
                strokeWidth={1.25}
                className="h-9 w-9 text-primary"
              />
              <h3 className="mt-5 font-serif text-2xl font-normal leading-snug text-fg">
                {heading}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/80 md:text-base">
                {text}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <ButtonLink href="/about" variant="outline">
            Learn More About Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
