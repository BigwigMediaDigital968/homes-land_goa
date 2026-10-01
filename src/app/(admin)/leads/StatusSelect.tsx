"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "lost";

/** Order and colours of the pipeline; keep in sync with lead.model.js. */
export const STATUSES: {
  value: LeadStatus;
  label: string;
  className: string;
  dot: string;
}[] = [
  { value: "new", label: "New", className: "border-sky-500/40 bg-sky-500/10 text-sky-300", dot: "bg-sky-400" },
  { value: "contacted", label: "Contacted", className: "border-amber-500/40 bg-amber-500/10 text-amber-300", dot: "bg-amber-400" },
  { value: "qualified", label: "Qualified", className: "border-violet-500/40 bg-violet-500/10 text-violet-300", dot: "bg-violet-400" },
  { value: "closed", label: "Closed", className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300", dot: "bg-emerald-400" },
  { value: "lost", label: "Lost", className: "border-gray-600 bg-gray-500/10 text-gray-400", dot: "bg-gray-500" },
];

export const statusMeta = (status?: LeadStatus) =>
  STATUSES.find((s) => s.value === (status ?? "new")) ?? STATUSES[0];

const MENU_HEIGHT = STATUSES.length * 36 + 8;

/**
 * Status pill with a custom listbox (a native <select> popup can't be styled).
 *
 * Same keyboard/ARIA pattern as components/ui/FilterDropdown. The menu is
 * position:fixed so the leads table's overflow-x-auto wrapper can't clip it,
 * and it flips upward when there's no room below.
 */
export default function StatusSelect({
  value,
  label,
  onChange,
}: {
  value?: LeadStatus;
  /** Accessible name, e.g. "Status for Jane Doe". */
  label: string;
  onChange: (status: LeadStatus) => void;
}) {
  const id = useId();
  const current = statusMeta(value);
  const selectedIndex = STATUSES.indexOf(current);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const [position, setPosition] = useState<React.CSSProperties>({});

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      const fitsBelow = rect.bottom + 4 + MENU_HEIGHT <= window.innerHeight;
      setPosition(
        fitsBelow
          ? { top: rect.bottom + 4, left: rect.left }
          : { bottom: window.innerHeight - rect.top + 4, left: rect.left }
      );
    }
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const commit = (index: number) => {
    const option = STATUSES[index];
    if (option && option.value !== current.value) onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Close on outside click, and on scroll/resize since the menu is fixed.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const close = () => setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else setActiveIndex((i) => Math.min(i + 1, STATUSES.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openMenu();
        else setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(STATUSES.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) commit(activeIndex);
        else openMenu();
        break;
      case "Escape":
        if (open) {
          // Don't let Escape also close the surrounding <dialog>.
          e.preventDefault();
          e.stopPropagation();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-label={`${label}: ${current.label}`}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`inline-flex h-8 cursor-pointer items-center gap-2 rounded-full border pl-3 pr-2 text-xs font-medium transition-colors hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${current.className}`}
      >
        <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
        {current.label}
        <ChevronDown
          aria-hidden
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-label={label}
          style={position}
          className="fixed z-50 w-44 overflow-hidden rounded-xl border border-gray-700 bg-[#0f1923] p-1 shadow-2xl shadow-black/60"
        >
          {STATUSES.map((s, index) => {
            const isSelected = s.value === current.value;
            const isActive = index === activeIndex;
            return (
              <li
                key={s.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => commit(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-3 text-sm transition-colors duration-150 ${
                  isActive ? "bg-white/[0.07] text-white" : "text-gray-300"
                }`}
              >
                <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
                <span className="flex-1">{s.label}</span>
                {isSelected && (
                  <Check aria-hidden size={14} className="shrink-0 text-gray-300" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
