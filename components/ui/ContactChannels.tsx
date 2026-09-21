import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/site";

/** All three read from BUSINESS so the details live in exactly one place. */
const channels = [
  {
    label: "Call Us",
    lines: [BUSINESS.telephoneDisplay],
    href: BUSINESS.telephoneHref,
    Icon: Phone,
  },
  {
    label: "Find Us",
    lines: BUSINESS.addressLines,
    Icon: MapPin,
  },
  {
    label: "Email Us",
    lines: [BUSINESS.email],
    href: `mailto:${BUSINESS.email}`,
    Icon: Mail,
  },
];

interface ContactChannelsProps {
  /** "grid" = three across, "list" = stacked rows for a narrow column. */
  layout?: "grid" | "list";
  className?: string;
}

/**
 * Phone, address and email as hairline-separated cards. Shared by the contact
 * page, the sell page and the standalone ContactInfo band so the three can't
 * drift apart.
 */
export default function ContactChannels({
  layout = "grid",
  className = "",
}: ContactChannelsProps) {
  const isList = layout === "list";

  return (
    <ul
      className={`${
        isList
          ? "divide-y divide-border border border-border bg-surface"
          : "grid gap-px border border-border bg-border sm:grid-cols-3"
      } ${className}`}
    >
      {channels.map(({ label, lines, href, Icon }) => (
        <li
          key={label}
          className={isList ? "flex gap-5 p-6 sm:p-7" : "bg-surface p-6 sm:p-7"}
        >
          <Icon
            aria-hidden
            strokeWidth={1.25}
            className={`shrink-0 text-primary ${
              isList ? "mt-1 h-6 w-6" : "h-8 w-8"
            }`}
          />

          <div className={isList ? undefined : "mt-5"}>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              {label}
            </p>

            {href ? (
              <a
                href={href}
                className="mt-2 block font-sans text-base leading-relaxed text-fg transition-colors duration-300 hover:text-primary"
              >
                {lines.join(" ")}
              </a>
            ) : (
              <p className="mt-2 font-sans text-base leading-relaxed text-white/80">
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
