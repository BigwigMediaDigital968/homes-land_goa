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
      className={`font-sans text-xs uppercase tracking-[0.3em] text-[#9a7a2e] font-bold block ${className}`}
    >
      {children}
    </span>
  );
}