import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 px-9 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const variants = {
  primary:
    "border border-transparent bg-primary text-on-primary hover:bg-primary-hover",
  outline:
    "border-2 border-fg bg-transparent text-fg hover:bg-primary/10",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
      {variant === "primary" && (
        <ArrowUpRight
          aria-hidden
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
