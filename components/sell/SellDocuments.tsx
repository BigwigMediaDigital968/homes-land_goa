import { FileStack } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

/**
 * Listed exactly as the team supplied them — no added legal commentary, since
 * which documents apply depends on the individual property.
 */
const documents = [
  "Ownership and title documents",
  "Property tax assessment records (Form 9)",
  "Inscription and Description (Inscrição e Descrição)",
  "Sale deed or previous transfer documents",
  "Encumbrance-related records",
];

export default function SellDocuments() {
  return (
    <section
      aria-labelledby="sell-documents-heading"
      className="border-t border-border bg-bg py-14 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionHeading
            eyebrow="What You'll Need"
            id="sell-documents-heading"
          >
            What You&apos;ll Need to Sell Property in Goa
          </SectionHeading>

          <p className="mt-5 font-sans text-base leading-relaxed text-white/80 md:text-lg">
            Selling property in Goa often involves documentation that isn&apos;t
            required elsewhere in India, due to the state&apos;s Portuguese-era
            land records. Having these ready in advance makes the process
            faster.
          </p>

          <FileStack
            aria-hidden
            strokeWidth={1}
            className="mt-10 hidden h-16 w-16 text-primary/70 md:block"
          />
        </div>

        <div className="md:col-span-7">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            Commonly requested documents
          </p>

          <ol className="mt-6 divide-y divide-border border border-border bg-surface">
            {documents.map((document, index) => (
              <li
                key={document}
                className="flex items-baseline gap-5 p-5 sm:px-8"
              >
                <span
                  aria-hidden
                  className="font-serif text-2xl font-light leading-none text-primary/60"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-base leading-relaxed text-fg">
                  {document}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-8 font-sans text-base leading-relaxed text-white/80 md:text-lg">
            We can guide you on what&apos;s typically needed and help you
            understand which documents apply to your specific property.
          </p>
        </div>
      </div>
    </section>
  );
}
