"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import SellPropertyForm from "./SellPropertyForm";

interface ListPropertyButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "outline";
}

/** Button chrome matches ui/ButtonLink so this sits level with the link CTAs. */
const base =
  "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 px-9 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const variants = {
  primary:
    "border border-transparent bg-primary text-on-primary hover:bg-primary-hover",
  outline: "border-2 border-fg bg-transparent text-fg hover:bg-primary/10",
};

/**
 * The only modal on /sell: the property listing form.
 *
 * Owns its own open state — there is a single trigger, so there is nothing to
 * share and no store to reach for. Valuation enquiries are plain links to
 * /contacts and never come through here.
 */
export default function ListPropertyButton({
  children = "List Your Property",
  variant = "outline",
}: ListPropertyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  /** Closing always hands focus back to the button that opened the modal. */
  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Lock the page behind the modal, and close on Escape.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className={`${base} ${variants[variant]}`}
      >
        {children}
        {variant === "primary" && (
          <ArrowUpRight
            aria-hidden
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        )}
      </button>

      {/*
        Portalled to <body> on purpose. In the hero this button sits inside
        .hero-reveal, whose animation ends on `transform: translateY(0)` with
        fill-mode `both` — a non-none transform makes that element the
        containing block for position:fixed children, so the dialog would be
        positioned against it and clipped by the hero's overflow-hidden.
      */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-black-950/85 px-4 py-8 text-left backdrop-blur-sm sm:px-6"
            onMouseDown={(event) => {
              if (!panelRef.current?.contains(event.target as Node)) close();
            }}
          >
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="list-property-heading"
              className="mx-auto w-full max-w-3xl border border-border bg-surface shadow-2xl"
            >
              <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5 sm:px-8">
                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                    Sell Property in Goa
                  </p>
                  <h2
                    id="list-property-heading"
                    className="mt-2 font-serif text-2xl font-light leading-tight text-fg sm:text-3xl"
                  >
                    List Your Property
                  </h2>
                </div>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="cursor-pointer -mr-2 shrink-0 p-2 text-fg-muted transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <SellPropertyForm />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
