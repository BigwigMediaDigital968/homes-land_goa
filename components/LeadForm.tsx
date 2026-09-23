"use client";
import { useState } from "react";
import { FaUser, FaEnvelope, FaBook, FaCommentDots } from "react-icons/fa";

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/contacts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

  const inputClass =
    "w-full pl-10 p-3 border rounded-lg border-border bg-black-950 font-sans text-fg placeholder:text-fg-muted transition-colors focus:border-primary focus:outline-none";
  const iconClass = "absolute left-3 top-4 text-primary/80";

  return (
    <div className="p-6 bg-surface rounded-xl shadow-xl border border-border">
      <h3 className="font-serif text-2xl font-light mb-4 text-primary">
        Enquire About This Property
      </h3>
      <p className="font-sans text-white/70 text-sm mb-6 leading-relaxed">
        Send us your details and our team will get in touch within minutes.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="relative">
          <FaUser aria-hidden className={iconClass} />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            aria-label="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope aria-hidden className={iconClass} />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            aria-label="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Subject */}
        <div className="relative">
          <FaBook aria-hidden className={iconClass} />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            aria-label="Subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Message */}
        <div className="relative">
          <FaCommentDots aria-hidden className={iconClass} />
          <textarea
            name="message"
            placeholder="Your Message"
            aria-label="Your Message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          ></textarea>
        </div>

        {/* Status Messages */}
        {success && (
          <p className="font-sans text-sm text-primary">
            Message sent successfully!
          </p>
        )}
        {error && <p className="font-sans text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary hover:bg-primary-hover transition text-on-primary rounded-lg font-sans font-semibold disabled:opacity-60"
        >
          {loading ? "Sending..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
}
