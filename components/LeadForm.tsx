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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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

  return (
    <div className="p-6 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-xl border border-gray-200 dark:border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-[var(--primary-color)]">
        Enquire About This Property
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
        Send us your details and our team will get in touch within minutes.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 border rounded-lg bg-white dark:bg-[#2c2c2c] border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 border rounded-lg bg-white dark:bg-[#2c2c2c] border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* Subject */}
        <div className="relative">
          <FaBook className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full pl-10 p-3 border rounded-lg bg-white dark:bg-[#2c2c2c] border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* Message */}
        <div className="relative">
          <FaCommentDots className="absolute left-3 top-3 text-gray-500" />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full pl-10 p-3 border rounded-lg bg-white dark:bg-[#2c2c2c] border-gray-300 dark:border-gray-700"
          ></textarea>
        </div>

        {/* Status Messages */}
        {success && (
          <p className="text-green-600 text-sm">Message sent successfully!</p>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[var(--primary-color)] hover:bg-red-700 transition text-white rounded-lg font-semibold"
        >
          {loading ? "Sending..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
}
