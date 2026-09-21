import React from "react";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionEyebrow({
  children,
  className = "",
}: SectionEyebrowProps) {
  return (
    <span
      className={`font-sans text-xs uppercase tracking-[0.3em] text-rosegold-500 font-bold block ${className}`}
    >
      {children}
    </span>
  );
}