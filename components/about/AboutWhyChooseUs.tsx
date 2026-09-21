import { ClipboardList, Handshake, MapPin, User } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const features = [
  {
    title: "Expert Guidance",
    description:
      "Benefit from our team's seasoned expertise for a smooth buying experience",
    Icon: MapPin,
  },
  {
    title: "Personalized Service",
    description:
      "Our services adapt to your unique needs, making your journey stress-free",
    Icon: User,
  },
  {
    title: "Transparent Process",
    description:
      "Stay informed with our clear and honest approach to buying your home",
    Icon: ClipboardList,
  },
  {
    title: "Exceptional Support",
    description:
      "Providing peace of mind with our responsive and attentive customer service",
    Icon: Handshake,
  },
];

export default function AboutWhyChooseUs() {
  return (
    <section
      aria-labelledby="about-why-heading"
      className="border-t border-border bg-black-900 py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Why Choose Us"
            id="about-why-heading"
            align="center"
          >
            Why Choose Us
          </SectionHeading>
          <p className="mt-4 font-sans text-base leading-relaxed text-white/80 md:text-lg">
            Elevating your home buying experience with expertise, integrity, and
            unmatched personalized service.
          </p>
        </div>

        <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, Icon }) => (
            <li key={title} className="bg-surface p-6 sm:p-7">
              <Icon
                aria-hidden
                strokeWidth={1.25}
                className="h-9 w-9 text-primary"
              />
              <h3 className="mt-5 font-serif text-xl font-normal leading-snug text-fg">
                {title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
