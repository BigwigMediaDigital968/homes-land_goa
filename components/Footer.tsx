"use client";

import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { SiX } from "react-icons/si";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#091d35] text-white pt-12">
      {/* Main Footer Content */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 w-11/12 mx-auto pb-10">
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-1 ">
          <div className="flex justify-center">
            <Image src={logo} alt="Company Logo" width={150} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-base ">
            <li>
              <Link href="/buy">Buy</Link>
            </li>
            <li>
              <Link href="/rent">Rent</Link>
            </li>
            <li>
              <Link href="/sell">Sell</Link>
            </li>
            <li>
              <Link href="/upcoming-projects">Upcoming Projects</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-base ">
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/Privacy-Policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-condition">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className=" text-2xl font-semibold mb-3">Our Social</h3>
          <ul className="space-y-3 text-base ">
            <li>
              <Link
                href="https://www.instagram.com/homes.land.goa?igsh=MWNvZXlwdW53YmJwZw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer text-current hover:text-[#e24b5b]"
              >
                <Instagram size={18} className="text-current" /> Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer text-current hover:text-[#1877F2]"
              >
                <Facebook size={18} className="text-current" /> Facebook
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
          <h3 className="text-2xl font-bold mb-3">Contact</h3>
          <ul className="space-y-3 text-base ">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-1" />
              Casa Lotus, H/No. 4/213 A, Porba Vaddo, <br /> Calangute 403516
            </li>
            <li className="flex items-center gap-2">
              <Link
                href="mailto:info@homesandlandgoa.com"
                className="flex items-center gap-2 "
              >
                <Mail size={18} /> info@homesandlandgoa.com
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +91 96238 58108
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 text-center py-4 text-sm md:text-base space-y-2">
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
            className=" font-semibold hover:underline"
          >
            Bigwig Media Digital
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
