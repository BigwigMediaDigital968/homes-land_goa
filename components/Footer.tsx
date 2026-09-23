"use client";

import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="bg-black-950 text-fg pt-12 border-t border-rosegold-700/20 ">
      {/* Main Footer Content */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 w-11/12 mx-auto pb-10 max-w-7xl">
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-1 ">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Homes and land goa Logo"
              width={322}
              height={73}
              className="h-auto w-[150px]"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-1 text-fg">Quick Links</h3>
          <div className="w-10 h-px bg-primary/50 mb-4" />
          <ul className="space-y-2 text-base font-sans">
            <li>
              <Link href="/buy" className="hover:text-primary transition-colors">Buy</Link>
            </li>
            <li>
              <Link href="/rent" className="hover:text-primary transition-colors">Rent</Link>
            </li>
            <li>
              <Link href="/sell" className="hover:text-primary transition-colors">Sell</Link>
            </li>
            <li>
              <Link href="/upcoming-projects" className="hover:text-primary transition-colors">Upcoming Projects</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-2xl font-semibold mb-1 text-fg">Support</h3>
          <div className="w-10 h-px bg-primary/50 mb-4" />
          <ul className="space-y-2 text-base font-sans">
            <li>
              <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            </li>
            <li>
              <Link href="/contacts" className="hover:text-primary transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link href="/Privacy-Policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-condition" className="hover:text-primary transition-colors">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-1 text-fg">Our Social</h3>
          <div className="w-10 h-px bg-primary/50 mb-4" />
          <ul className="space-y-3 text-base font-sans">
            <li>
              <Link
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer text-current hover:text-primary-hover transition-colors"
              >
                <Instagram size={18} className="text-primary" /> Instagram
              </Link>
            </li>
            <li>
              <Link
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer text-current hover:text-primary-hover transition-colors"
              >
                <Facebook size={18} className="text-primary" /> Facebook
              </Link>
            </li>
            {/* <li>
              <Link
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer hover:text-[var(--primary-color)]"
              >
                <SiX size={18} /> Twitter (X)
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-2xl font-bold mb-1 text-fg">Contact</h3>
          <div className="w-10 h-px bg-primary/50 mb-4" />
          <ul className="space-y-3 text-base font-sans">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-1 text-primary shrink-0" />
              Casa Lotus, H/No. 4/213 A, Porba Vaddo, <br /> Calangute 403516
            </li>
            <li className="flex items-center gap-2">
              <Link
                href="mailto:info@homesandlandgoa.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail size={18} className="text-primary shrink-0" /> info@homesandlandgoa.com
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-primary shrink-0" /> +91 96238 58108
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-rosegold-700/20 text-center py-4 text-sm space-y-2 text-fg-muted font-sans">
        <p>
          © {new Date().getFullYear()} HOMES & LAND GOA. All Rights Reserved.{" "}
          <br />
        </p>
        <p>
          Made & Marketed by{" "}
          <Link
            href="https://www.bigwigmediadigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-fg hover:text-primary hover:underline transition-colors"
          >
            Bigwig Media Digital
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
