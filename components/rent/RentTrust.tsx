import { Compass, FileText, Handshake, MessagesSquare } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const valuePoints = [
  {
    label: "Direct Communication",
    text: "One point of contact through your rental search.",
    Icon: MessagesSquare,
  },
  {
    label: "Locality Guidance",
    text: "Familiarity with North and South Goa's different areas.",
    Icon: Compass,
  },
  {
    label: "Documentation Support",
    text: "Guidance on what to check in a rental agreement.",
    Icon: FileText,
  },
  {
    label: "Owner Coordination",
    text: "We liaise with the property owner on your behalf.",
    Icon: Handshake,
  },
];

export default function RentTrust() {
  return (
    <section
      aria-labelledby="rent-trust-heading"
      className="border-t border-border bg-bg py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Our Background" id="rent-trust-heading">
            Local Rental Support Across Goa
          </SectionHeading>
          <p className="mt-4 font-sans text-base leading-relaxed text-white/80 md:text-lg">
            Homes &amp; Land Goa works directly with renters and property owners
            across Goa, helping tenants find the right rental and helping owners
            connect with genuine renters. We work directly with clients rather
            than through layers of middlemen, so communication stays clear from
            the first enquiry to move-in.
          </p>
        </div>

        <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {valuePoints.map(({ label, text, Icon }) => (
            <li key={label} className="bg-surface p-6">
              <Icon
                aria-hidden
                strokeWidth={1.5}
                className="h-7 w-7 text-primary"
              />
              <h3 className="mt-4 font-serif text-xl font-normal text-fg">
                {label}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/80 md:text-base">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
