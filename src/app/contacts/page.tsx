"use client";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import contactBanner from "../../../assets/contact.jpg";
import { useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Footer from "../../../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const contactRef = useRef<HTMLDivElement | null>(null);
  const scrollToNext = () => {
    if (contactRef.current) {
      const yOffset = -50;
      const y =
        contactRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black transition-colors">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] md:h-[100vh] flex items-center justify-center pt-32">
        <Image
          src={contactBanner}
          alt="Contact page"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-widest">
            Contact Us
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto tracking-widest">
            Get in touch with our team for property inquiries, collaborations,
            or support.
          </p>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </div>
      </section>

      {/* Main Section */}
      <section
        ref={contactRef}
        className="w-11/12 md:w-5/6 mx-auto py-16 grid md:grid-cols-2 gap-12 items-start"
      >
        {/* Left info */}
        <div className="space-y-8 tracking-widest">
          <h2 className="text-3xl font-semibold text-[var(--primary-color)]">
            Contact Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Whether you’re buying your first home, investing in real estate, or
            exploring new projects, our team is here to assist you every step of
            the way.
          </p>

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1 text-[var(--primary-color)]" />
            <span>
              Casa Lotus, H/No. 4/213 A, Porba Vaddo,
              <br />
              Calangute 403516
            </span>
          </div>
          <p className="flex items-center gap-3">
            <FaPhoneAlt className="text-[var(--primary-color)]" />
            +91 96238 58108
          </p>

          <a href="mailto:info@homesandlandgoa.com">
            <p className="flex items-center gap-3">
              <FaEnvelope size={18} className="text-[var(--primary-color)]" />{" "}
              info@homesandlandgoa.com
            </p>
          </a>
        </div>

        {/* Right form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-[#1e1e1e] p-8  shadow-lg border dark:border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 p-3  bg-white dark:bg-[#2c2c2c] text-black dark:text-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 p-3  bg-white dark:bg-[#2c2c2c] text-black dark:text-white"
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 p-3  bg-white dark:bg-[#2c2c2c] text-black dark:text-white"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 p-3  bg-white dark:bg-[#2c2c2c] text-black dark:text-white"
            required
          />

          {/* Success / Error messages */}
          {success && (
            <p className="text-green-600">Message sent successfully!</p>
          )}
          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="relative px-6 py-3  bg-[#E50E0B] text-white font-semibold 
  overflow-hidden group cursor-pointer transition-all duration-300 rounded"
          >
            <span className="relative z-10">
              {loading ? "Submitting..." : "Submit"}
            </span>
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent 
    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
            ></span>
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
