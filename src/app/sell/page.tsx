"use client";

import { useRef, useState } from "react";
import {
  Phone,
  Mail,
  Home,
  ClipboardList,
  DollarSign,
  CheckCircle,
  X,
} from "lucide-react";

import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import banner from "../../../assets/sell-banner.jpg";
import Image from "next/image";
import SellForm from "../../../components/SellForm";
import ContactInfo from "../../../components/ContactInfo";
import HelpSection from "../../../components/HelpSection";

function Sell() {
  const [showForm, setShowForm] = useState(false);

  const sellRef = useRef<HTMLDivElement | null>(null);
  const scrollToNext = () => {
    if (sellRef.current) {
      const yOffset = -50;
      const y =
        sellRef.current.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[100vh] bg-black flex flex-col justify-center items-center text-center px-6 tracking-widest">
        <Image
          src={banner}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-white">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-widest">
            Sell Your Property With Us
          </h1>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </div>
      </div>

      <section
        ref={sellRef}
        className="py-12 bg-white w-11/12 md:w-5/6 text-[var(--primary-color)] mx-auto tracking-widest"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 tracking-widest">
          Our Selling Process
        </h2>
        <div className="grid md:grid-cols-3 gap-10 ">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-[var(--bg-color)]">
            <ClipboardList size={40} className="text-[var(--title)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[var(--title)]">
              Step 1: Share Your Details
            </h3>
            <p className="text-[var(--primary-color)]">
              Fill out our form or call us directly to provide basic information
              about your property.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-[var(--bg-color)]">
            <Home size={40} className="text-[var(--title)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[var(--title)]">
              Step 2: Property Evaluation
            </h3>
            <p className="text-[var(--primary-color)]">
              Our experts will evaluate your property and suggest the best
              market price.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-[var(--bg-color)]">
            <DollarSign size={40} className="text-[var(--title)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[var(--title)]">
              Step 3: Close the Deal
            </h3>
            <p className="text-[var(--primary-color)]">
              We connect you with genuine buyers and ensure a hassle-free
              closing process.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-[var(--bg-color)] text-[var(--primary-color)] tracking-widest">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 tracking-widest">
          Why Sell With Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 w-11/12 md:w-5/6 mx-auto">
          {[
            {
              title: "Trusted Network",
              desc: "Access to genuine buyers & investors.",
            },
            {
              title: "Best Market Price",
              desc: "Get accurate valuation and maximum returns.",
            },
            {
              title: "Hassle-Free Process",
              desc: "We handle the legal and documentation work.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-6 rounded-xl bg-white shadow"
            >
              <CheckCircle className="text-[var(--title)]" size={32} />
              <div>
                <h3 className="text-lg font-semibold text-[var(--title)]">
                  {item.title}
                </h3>
                <p className="text-[var(--primary-color)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sell Form */}
      {/* Sell Form */}
      <section className="py-16 bg-white w-11/12 md:w-5/6 mx-auto text-[var(--primary-color)]">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 tracking-widest ">
          Get In Touch With Us
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center tracking-widest">
          <div className="space-y-6">
            <p className="text-lg text-gray-600">
              Want to sell your property quickly and easily? Fill out the form
              or contact us directly.
            </p>
            <div className="flex items-center gap-3">
              <Phone className="text-[var(--title)]" />
              <span className="text-lg">+91 96238 58108</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[var(--title)]" />
              <span className="text-lg">info@homesandlandgoa.com</span>
            </div>

            {/* Button to toggle form */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="relative px-6 py-3  bg-[#E50E0B] text-white font-semibold 
                overflow-hidden group cursor-pointer transition-all duration-300 rounded"
            >
              <span className="relative z-10 tracking-widest">
                List Your Property
              </span>
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/20 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
              ></span>
            </button>
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-white w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto p-8 rounded-2xl shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-[var(--title)] text-center">
              List Your Property
            </h2>

            <SellForm onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}
      <ContactInfo />
      <HelpSection />

      <Footer />
    </div>
  );
}

export default Sell;
