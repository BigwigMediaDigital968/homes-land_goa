"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import {
  fieldClass,
  labelClass,
  legendClass,
  submitClass,
} from "../ui/formStyles";
import { BUSINESS } from "@/lib/site";

/**
 * Lead capture with email OTP verification.
 *
 * Unchanged from the previous page: POSTs to /api/lead/send-otp, then
 * /api/lead/verify-otp (Homes-Land_Backend, routes/lead.route.js). Only the
 * markup and styling were rebuilt for the dark theme.
 */
const PURPOSES = [
  "Buy Property",
  "Sell Property",
  "Rent Property",
  "General Inquiry",
];

const initialFields = {
  name: "",
  email: "",
  phone: "",
  purpose: "",
  message: "",
};

export default function ContactLeadForm() {
  const [fields, setFields] = useState(initialFields);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
          body: JSON.stringify(fields),
        },
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

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setError("Enter the code we emailed you.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: fields.email, otp }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        setStep("success");
        setFields(initialFields);
        setOtp("");
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

  const errorBlock = error ? (
    <p
      role="alert"
      className="border border-red-500/40 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-200"
    >
      {error}
    </p>
  ) : null;

  if (step === "success") {
    return (
      <div
        aria-live="polite"
        className="flex flex-col items-start border border-border bg-surface p-6 sm:p-8"
      >
        <span
          aria-hidden
          className="flex h-12 w-12 items-center justify-center border border-primary/60"
        >
          <Check className="h-5 w-5 text-primary" strokeWidth={1.5} />
        </span>
        <h3 className="mt-6 font-serif text-2xl font-normal text-fg">
          Thank you — your message is with us.
        </h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
          Our team will get back to you shortly. If it&apos;s urgent, call us on{" "}
          <a
            href={BUSINESS.telephoneHref}
            className="text-primary underline-offset-4 hover:underline"
          >
            {BUSINESS.telephoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStep("form")}
          className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-fg px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <form
        onSubmit={handleVerifyOtp}
        className="space-y-6 border border-border bg-surface p-6 sm:p-8"
      >
        <div>
          <p className={legendClass}>Step 2 of 2</p>
          <h3 className="font-serif text-2xl font-light text-fg">
            Verify your email
          </h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
            We sent a 6-digit code to{" "}
            <span className="text-fg">{fields.email || "your email"}</span>.
            Enter it below to send your message.
          </p>
        </div>

        <div>
          <label htmlFor="contact-otp" className={labelClass}>
            Verification code
          </label>
          <input
            id="contact-otp"
            name="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit code"
            className={`${fieldClass} tracking-[0.3em]`}
          />
        </div>

        {errorBlock}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button type="submit" disabled={loading} className={submitClass}>
            {loading ? "Verifying…" : "Verify and send"}
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>

          <button
            type="button"
            onClick={() => {
              setError("");
              setStep("form");
            }}
            className="cursor-pointer font-sans text-xs text-fg-muted underline-offset-4 transition-colors duration-300 hover:text-fg hover:underline"
          >
            Back to the form
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSendOtp}
      className="space-y-6 border border-border bg-surface p-6 sm:p-8"
    >
      <div>
        <p className={legendClass}>Step 1 of 2</p>
        <h3 className="font-serif text-2xl font-light text-fg">
          Send Us a Message
        </h3>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone *
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={fields.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-purpose" className={labelClass}>
            Purpose *
          </label>
          <select
            id="contact-purpose"
            name="purpose"
            required
            value={fields.purpose}
            onChange={handleChange}
            className={`${fieldClass} form-select-dark appearance-none`}
          >
            <option value="" disabled>
              Select a purpose
            </option>
            {PURPOSES.map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClass}>
            Message *
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={fields.message}
            onChange={handleChange}
            placeholder="Tell us what you're looking for…"
            className={`${fieldClass} resize-y`}
          />
        </div>
      </div>

      {errorBlock}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={loading} className={submitClass}>
          {loading ? "Sending…" : "Send message"}
          <ArrowUpRight
            aria-hidden
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>

        <p className="font-sans text-xs leading-relaxed text-fg-muted">
          We&apos;ll email you a code to confirm your address.
        </p>
      </div>
    </form>
  );
}
