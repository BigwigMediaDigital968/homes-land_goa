"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  /** Unique per bar; used to wire up the ARIA relationships. */
  id: string;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  /** True while the filter is on its "show everything" value. */
  isDefault: boolean;
}

/**
 * Listbox replacement for a native <select>.
 *
 * A native select hands its option list to the OS, which ignores page styling
 * — the popup arrives in the system font with a blue highlight, which looks
 * nothing like the rest of the site. This renders the list ourselves.
 *
 * Follows the APG combobox pattern: focus stays on the trigger and the active
 * option is pointed at with aria-activedescendant, so screen readers announce
 * it without the focus having to move.
 */
export default function FilterDropdown({
  id,
  label,
  value,
  options,
  onChange,
  isDefault,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const selectedIndex = Math.max(
    options.findIndex((o) => o.value === value),
    0,
  );
  const selectedLabel = options[selectedIndex]?.label ?? "";

  const openMenu = (index = selectedIndex) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const commit = (index: number) => {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Close when the focus or the pointer goes elsewhere on the page.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option in view when arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openMenu();
        else setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openMenu();
        else setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) commit(activeIndex);
        else openMenu();
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          closeMenu();
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      className="group relative flex-1 px-5 py-4 transition-colors duration-300 hover:bg-black-900/60 focus-within:bg-black-900/60"
    >
      <span
        id={`${id}-label`}
        className="block font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-fg-muted"
      >
        {label}
      </span>

      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className="mt-1.5 flex w-full cursor-pointer items-center justify-between gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <span
          id={`${id}-value`}
          className={`truncate font-serif text-lg font-light transition-colors duration-300 ${
            isDefault ? "text-fg" : "text-primary"
          }`}
        >
          {selectedLabel}
        </span>

        <ChevronDown
          aria-hidden
          strokeWidth={1.5}
          className={`h-4 w-4 shrink-0 transition-all duration-300 ${
            open ? "rotate-180 text-primary" : ""
          } ${
            isDefault
              ? "text-fg-muted group-hover:text-primary"
              : "text-primary"
          }`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute left-0 right-0 top-full z-40 mt-px max-h-72 overflow-y-auto border border-primary/40 bg-black-950 py-1 shadow-2xl shadow-black/60"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onClick={() => commit(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-5 py-2.5 font-sans text-sm transition-colors duration-150 ${
                  isActive ? "bg-primary/10" : ""
                } ${isSelected ? "text-primary" : "text-fg"}`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check
                    aria-hidden
                    strokeWidth={2}
                    className="h-3.5 w-3.5 shrink-0 text-primary"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
