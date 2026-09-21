"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Distinguishes this nav from others on the page for screen readers. */
  label?: string;
}

const MAX_VISIBLE = 3;

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > MAX_VISIBLE + 1) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - MAX_VISIBLE) pages.push("...");
    pages.push(totalPages);
  }

  return pages;
};

const base =
  "inline-flex h-11 min-w-11 items-center justify-center border px-3 font-sans text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const idle = "border-border text-fg hover:border-primary hover:text-primary";
const arrow = `${base} ${idle} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-fg`;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  label = "Listings pagination",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label={label}
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className={arrow}
      >
        <ChevronLeft aria-hidden className="h-4 w-4" />
      </button>

      {getPageNumbers(currentPage, totalPages).map((num, idx) =>
        num === "..." ? (
          <span key={idx} aria-hidden className="px-2 font-sans text-fg-muted">
            …
          </span>
        ) : (
          <button
            key={idx}
            type="button"
            onClick={() => onPageChange(num as number)}
            aria-label={`Page ${num}`}
            aria-current={currentPage === num ? "page" : undefined}
            className={`${base} ${
              currentPage === num
                ? "border-primary bg-primary text-on-primary"
                : idle
            }`}
          >
            {num}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className={arrow}
      >
        <ChevronRight aria-hidden className="h-4 w-4" />
      </button>
    </nav>
  );
}
