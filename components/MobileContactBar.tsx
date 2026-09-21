import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { BUSINESS } from "@/lib/site";

/**
 * Sticky call / WhatsApp bar, mobile only.
 *
 * Sits below the mobile menu (z-[9999]) and the sell modal (z-[200]) so both
 * still cover it when open. LayoutWrapper renders a matching spacer after the
 * footer so the bar never hides the last row of the page.
 */
export default function MobileContactBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border pb-[env(safe-area-inset-bottom)] md:hidden"
      role="group"
      aria-label="Contact Homes & Land Goa"
    >
      <a
        href={BUSINESS.telephoneHref}
        className="flex min-h-14 items-center justify-center gap-2.5 bg-primary font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-on-primary transition-colors duration-300 active:bg-primary-hover"
      >
        <Phone aria-hidden strokeWidth={2} className="h-4 w-4" />
        Call Us
      </a>

      <a
        href={BUSINESS.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-center gap-2.5 border-l border-border bg-surface font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg transition-colors duration-300 active:bg-surface-elevated"
      >
        <FaWhatsapp aria-hidden className="h-4.5 w-4.5 text-[#25D366]" />
        WhatsApp
      </a>
    </div>
  );
}
