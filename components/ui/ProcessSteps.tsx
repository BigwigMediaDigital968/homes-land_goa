import ButtonLink from "./ButtonLink";
import SectionHeading from "./SectionHeading";

interface Step {
  heading: string;
  text: string;
}

interface ProcessStepsProps {
  eyebrow: string;
  /** Matches the section's aria-labelledby. */
  id: string;
  heading: string;
  steps: Step[];
  cta?: { label: string; href: string };
}

/** Numbered step cards; 4 steps sit in one row on large screens, otherwise 3. */
export default function ProcessSteps({
  eyebrow,
  id,
  heading,
  steps,
  cta,
}: ProcessStepsProps) {
  const columns = steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section
      aria-labelledby={id}
      className="border-t border-border bg-bg py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionHeading eyebrow={eyebrow} id={id}>
          {heading}
        </SectionHeading>

        <ol className={`mt-10 grid gap-6 md:grid-cols-2 ${columns}`}>
          {steps.map(({ heading: stepHeading, text }, index) => (
            <li
              key={stepHeading}
              className="relative border border-border bg-surface p-6 sm:p-8"
            >
              <span
                aria-hidden
                className="font-serif text-5xl font-light leading-none text-primary/60"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-normal leading-snug text-fg">
                {stepHeading}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/80 md:text-base">
                {text}
              </p>
            </li>
          ))}
        </ol>

        {cta && (
          <div className="mt-10">
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
