"use client";

import { usePathname } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileContactBar from "../../components/MobileContactBar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/properties") ||
    pathname.startsWith("/adminblogs") ||
    pathname.startsWith("/contact-requests") ||
    pathname.startsWith("/sell-requests");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      {!hideLayout && (
        <>
          {/* Keeps the sticky bar from covering the end of the page. Matches
              the bar's own height plus the iOS home-indicator inset. */}
          <div
            aria-hidden
            className="h-[calc(3.5rem+env(safe-area-inset-bottom))] md:hidden"
          />
          <MobileContactBar />
        </>
      )}
    </>
  );
}