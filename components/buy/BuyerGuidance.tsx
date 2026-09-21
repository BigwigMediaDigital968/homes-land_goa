import {
  FileCheck,
  FileText,
  Hourglass,
  House,
  MapPin,
  Route,
  TrendingUp,
  Wallet,
  Wrench,
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const considerations = [
  {
    label: "Location",
    text: "proximity to the coast, town, or your daily requirements",
    Icon: MapPin,
  },
  {
    label: "Budget",
    text: "total cost including applicable taxes, registration and other charges",
    Icon: Wallet,
  },
  {
    label: "Property type",
    text: "villa, apartment or plot, based on how you plan to use it",
    Icon: House,
  },
  {
    label: "Property condition",
    text: "age of construction, maintenance history, repairs needed",
    Icon: Wrench,
  },
  {
    label: "Ownership and title",
    text: "confirming the seller has clear, transferable ownership",
    Icon: FileCheck,
  },
  {
    label: "Documentation",
    text: "availability of required property and ownership documents",
    Icon: FileText,
  },
  {
    label: "Accessibility",
    text: "road access, distance from the airport, nearby amenities",
    Icon: Route,
  },
  {
    label: "Future requirements",
    text: "whether the property will still suit your needs over time",
    Icon: Hourglass,
  },
  {
    label: "Investment objectives",
    text: "personal use, holiday home, or investment property in Goa",
    Icon: TrendingUp,
  },
];

export default function BuyerGuidance() {
  return (
    <section
      aria-labelledby="guidance-heading"
      className="border-t border-border bg-black-900 py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Before You Decide" id="guidance-heading">
            What to Consider Before Buying Property in Goa
          </SectionHeading>
          <p className="mt-4 font-sans text-base leading-relaxed text-white/80 md:text-lg">
            Buying property in Goa is a significant decision, and it helps to go
            in with a clear picture of what matters most to you.
          </p>
        </div>

        <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {considerations.map(({ label, text, Icon }) => (
            <li key={label} className="flex gap-4 bg-surface p-6">
              <Icon
                aria-hidden
                strokeWidth={1.5}
                className="mt-1 h-6 w-6 shrink-0 text-primary"
              />
              <p className="font-sans text-sm leading-relaxed text-white/80 md:text-base">
                <strong className="block font-serif text-xl font-normal text-fg">
                  {label}
                </strong>
                <span className="mt-1 block first-letter:uppercase">{text}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
