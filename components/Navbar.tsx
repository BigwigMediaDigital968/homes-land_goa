"use client";

import { useState, useEffect, useRef } from "react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LanguageSelector from "./LanguageSelector";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: Record<string, unknown>,
          id: string
        ) => void;
      };
    };
  }
}

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Blogs", path: "/blogs" },
  {
    label: "I am looking to",
    children: [
      { label: "Buy", path: "/buy" },
      { label: "Rent", path: "/rent" },
      { label: "Sell", path: "/sell" },
    ],
  },
  // { label: "Upcoming Projects", path: "/upcoming-projects" },
  { label: "Contact Us", path: "/contacts" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isMobilePropertiesOpen, setIsMobilePropertiesOpen] = useState(false);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // ✅ detect current route

  const isPropertiesActive =
    navItems
      .find((item) => item.label === "Properties")
      ?.children?.some(
        (child) =>
          pathname === child.path || pathname.startsWith(`${child.path}/`)
      ) ?? false;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        propertiesRef.current &&
        !propertiesRef.current.contains(event.target as Node)
      ) {
        setIsPropertiesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Google Translate script loader
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    if (!window.googleTranslateElementInit) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);

  // Hold the page still behind the open menu, and let Escape close it.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Close the menu when navigating to another page.
  useEffect(() => {
    setIsOpen(false);
    setIsMobilePropertiesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 font-body transition-all duration-300 border-b text-fg ${true
          ? "bg-black-950/95 shadow-2xl border-border backdrop-blur-xl"
          : "bg-black-950/5 border-transparent backdrop-blur-sm"
          }`}
      >
      <div className="w-full mx-auto px-4 sm:px-4 py-2 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Homes and land goa Logo"
              className="h-[50px] w-auto"
              width={322}
              height={73}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-sans">
            {navItems.map((item, index) => {
              if (item.children) {
                return (
                  <div
                    className="relative"
                    ref={propertiesRef}
                    key={index}
                    onMouseEnter={() => setIsPropertiesOpen(true)}
                    onMouseLeave={() => setIsPropertiesOpen(false)}
                  >
                    <button
                      onClick={() => setIsPropertiesOpen((prev) => !prev)}
                      className={`cursor-pointer relative pb-1 flex items-center gap-1 text-sm transition-colors text-center font-medium tracking-widest ${isPropertiesActive
                        ? "text-primary"
                        : "text-fg hover:text-primary"
                        }`}
                    >
                      {item.label}
                      <FiChevronDown
                        className={`transition-transform duration-200 ${isPropertiesOpen ? "rotate-180" : ""
                          }`}
                      />
                      {true && (
                        <span className="absolute top-full left-0 w-full h-[20px] bg-transparent"></span>
                      )}
                    </button>

                    {isPropertiesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                        <div className="p-1.5 space-y-0.5">
                          {item.children.map((child) => {
                            const isActive =
                              pathname === child.path || pathname.startsWith(`${child.path}/`);

                            return (
                              <Link
                                key={child.path}
                                href={child.path}
                                onClick={() => setIsPropertiesOpen(false)}
                                className={`group relative flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs font-medium tracking-wider uppercase transition-all duration-200 ${isActive
                                    ? "bg-primary text-white font-semibold"
                                    : "text-zinc-400 hover:bg-primary hover:text-white"
                                  }`}
                              >
                                {/* Active Indicator Bar */}
                                {isActive && (
                                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full bg-primary shadow-[0_0_8px_0_rgba(var(--primary-rgb),0.8)]" />
                                )}

                                <span className="relative z-10">{child.label}</span>

                                {/* Subtle Hover Glow Line */}
                                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive =
                pathname === item.path || pathname.startsWith(`${item.path}/`);

              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`relative pb-1 text-sm transition-colors text-center font-medium tracking-widest ${isActive
                    ? " text-white"
                    : "text-fg hover:text-primary"
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>
                  )}
                </Link>
              );
            })}
            {/* <div className="notranslate">
              <LanguageSelector />
            </div> */}
          </div>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center gap-4">
            {/* <div className="notranslate">
              <LanguageSelector />
            </div> */}
            <button
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl cursor-pointer"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </div>
      </nav>

      {/*
        Deliberately a sibling of <nav>, not a child. The nav carries
        backdrop-blur, and a backdrop-filter makes an element the containing
        block for position:fixed descendants — nested here, `inset-0` would
        resolve to the nav's own 60-odd pixels and the panel background would
        only paint that strip, leaving the page showing through beneath it.
      */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-0 bg-black-950 z-[9999] flex flex-col items-center py-6 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-6 px-4 pb-4 border-b border-border">
          <Image
            src="/logo.png"
            alt="Homes and land goa"
            width={322}
            height={73}
            className="h-[48px] w-auto"
          />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-2xl text-fg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 w-full items-center">
          {navItems.map((item, index) => {
            if (item.children) {
              return (
                <div className="flex flex-col items-center w-full" key={index}>
                  <button
                    onClick={() => setIsMobilePropertiesOpen((prev) => !prev)}
                    className={`flex items-center gap-1 text-lg transition-colors ${isPropertiesActive
                      ? "text-primary"
                      : "text-fg hover:text-primary"
                      }`}
                  >
                    {item.label}
                    <FiChevronDown
                      className={`transition-transform duration-200 ${isMobilePropertiesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isMobilePropertiesOpen && (
                    <div className="flex flex-col items-center gap-4 mt-4">
                      {item.children.map((child) => {
                        const isActive =
                          pathname === child.path ||
                          pathname.startsWith(`${child.path}/`);

                        return (
                          <Link
                            key={child.path}
                            href={child.path}
                            onClick={() => {
                              setIsOpen(false);
                              setIsMobilePropertiesOpen(false);
                            }}
                            className={`text-base transition-colors ${isActive
                              ? "text-primary"
                              : "text-fg-muted hover:text-primary"
                              }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive =
              pathname === item.path || pathname.startsWith(`${item.path}/`);

            return (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg transition-colors ${isActive
                  ? "text-primary"
                  : "text-fg hover:text-primary"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Social Icons */}
        <div className="mt-auto flex gap-6 justify-center pt-8 text-xl text-fg-muted">
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/homes.land.goa" aria-label="Instagram">
            <FaInstagram />
          </a>

          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Google Translate Hidden */}
      {/* <div id="google_translate_element" className="hidden" /> */}
    </>
  );
};

export default Navbar;
