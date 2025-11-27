"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import contactBanner from "../../../assets/contact.jpg";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // SEND OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStep("otp");
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) return setError("Enter OTP");

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStep("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          purpose: "",
          message: "",
        });
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black transition-colors">
      <Navbar />

      {/* Banner */}
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
          <h1 className="text-5xl font-semibold mb-4 tracking-widest">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Main Section */}
      <section className="w-11/12 md:w-5/6 mx-auto py-16 grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8 tracking-widest">
          <h2 className="text-3xl font-semibold text-[var(--primary-color)]">
            Contact Information
          </h2>

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1 text-[var(--primary-color)]" />
            <span>
              Casa Lotus, H/No. 4/213 A, Porba Vaddo,
              <br />
              Calangute 403516
            </span>
          </div>

          <p className="flex items-center gap-3">
            <FaPhoneAlt className="text-[var(--primary-color)]" /> +91 96238
            58108
          </p>

          <a href="mailto:info@homesandlandgoa.com">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-[var(--primary-color)]" />{" "}
              info@homesandlandgoa.com
            </p>
          </a>
        </div>

        {/* FORM / OTP / SUCCESS */}
        <div className="space-y-6  p-8 shadow-lg border">
          {/* Step 1 — Form */}
          {step === "form" && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-3 border "
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full p-3 border "
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full p-3 border "
              />

              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
                className="w-full p-3 border  !text-black"
              >
                <option className="!text-black" value="">
                  Select Purpose
                </option>
                <option className="!text-black" value="Buy Property">
                  Buy Property
                </option>
                <option className="!text-black" value="Sell Property">
                  Sell Property
                </option>
                <option className="!text-black" value="Rent Property">
                  Rent Property
                </option>
                <option className="!text-black" value="General Inquiry">
                  General Inquiry
                </option>
              </select>

              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full p-3 border dark:bg-[#2c2c2c]"
              />

              {error && <p className="text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#E50E0B] text-white rounded cursor-pointer"
              >
                {loading ? "Sending OTP..." : "Send "}
              </button>
            </form>
          )}

          {/* Step 2 — OTP */}
          {step === "otp" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Enter OTP sent to email</h3>

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full p-3 border dark:bg-[#2c2c2c]"
              />

              {error && <p className="text-red-600">{error}</p>}

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {/* Step 3 — Success */}
          {step === "success" && (
            <p className="text-green-600 text-center text-lg font-semibold">
              ✔ Your message has been submitted successfully!
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
