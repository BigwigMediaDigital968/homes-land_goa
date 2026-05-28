"use client";

import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../assets/logo.png";
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // ✅ detect current route

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Blogs", path: "/blogs" },
    { label: "Buy", path: "/buy" },
    { label: "Rent", path: "/rent" },
    { label: "Sell", path: "/sell" },
    { label: "Upcoming Projects", path: "/upcoming-projects" },
    { label: "Contact Us", path: "/contacts" },
  ];

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
    <nav
      className={`sticky w-full top-0 z-50 font-body transition-all duration-300 border-b text-white ${true
        ? "bg-[#0B2545] shadow-2xl border-white/10 backdrop-blur-xl"
        : "bg-white/5 border-transparent backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Homes and land goa Logo"
              className="h-[60px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.path || pathname.startsWith(`${item.path}/`);

              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`relative pb-1 text-sm transition-colors text-center font-medium tracking-widest ${isActive
                    ? "text-gold-500"
                    : "text-white hover:text-gold-500"
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-500"></span>
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
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-[9999] flex flex-col items-center p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-6 border-b">
          <Image
            src={logo}
            alt="Mondus Logo"
            width={80}
            height={80}
            className="w-auto"
          />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-2xl text-black"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 w-full">
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.path || pathname.startsWith(`${item.path}/`);

            return (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg transition-colors ${isActive
                  ? "text-[var(--primary-color)] font-medium"
                  : "text-black hover:text-[var(--primary-color)]"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Social Icons */}
        <div className="mt-auto flex gap-6 justify-center pt-8 text-xl text-gray-600">
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>

          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Google Translate Hidden */}
      {/* <div id="google_translate_element" className="hidden" /> */}
    </nav>
  );
};

export default Navbar;
