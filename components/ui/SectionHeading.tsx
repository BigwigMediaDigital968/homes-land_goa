import { SectionEyebrow } from "./SectionEyebrow";

interface SectionHeadingProps {
  eyebrow: string;
  /** Matches the section's aria-labelledby. */
  id: string;
  children: React.ReactNode;
  align?: "left" | "center";
}

/** Eyebrow + H2 pair used at the top of each content section. */
export default function SectionHeading({
  eyebrow,
  id,
  children,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : undefined}>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2
        id={id}
        className="mt-3 font-serif text-3xl font-light leading-tight text-fg md:text-4xl"
      >
        {children}
      </h2>
    </div>
  );
}
