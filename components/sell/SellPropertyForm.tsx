"use client";

import { useState } from "react";
import axios from "axios";
import { ArrowUpRight, Check, RotateCcw } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  fieldClass,
  labelClass,
  legendClass,
  submitClass,
} from "../ui/formStyles";

/**
 * Property listing submission, shown inside ListPropertyButton's modal.
 *
 * POSTs to /sellproperty/addsell (Homes-Land_Backend, routes/Sell.route.js) so
 * submissions land in the admin queue at /sell-requests. `purpose` stays "Buy"
 * because that is how the API labels a property that is available to buy — it
 * is not the seller's intent.
 *
 * Valuation enquiries do not come through here; those CTAs link to /contacts.
 */
const PROPERTY_TYPES = [
  "Villa",
  "House",
  "Apartment",
  "Plot / Land",
  "Commercial",
  "Other",
];

const initialFields = {
  name: "",
  email: "",
  phone: "",
  type: "",
  location: "",
  areaSqft: "",
  bedrooms: "",
  bathrooms: "",
  price: "",
  title: "",
  description: "",
  googleMapUrl: "",
  videoLink: "",
};

export default function SellPropertyForm() {
  const [fields, setFields] = useState(initialFields);
  const [images, setImages] = useState<FileList | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const payload: Record<string, string> = {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      title: fields.title,
      description: fields.description,
      purpose: "Buy",
      type: fields.type,
      location: fields.location,
      price: fields.price,
      bedrooms: fields.bedrooms,
      bathrooms: fields.bathrooms,
      areaSqft: fields.areaSqft,
      googleMapUrl: fields.googleMapUrl,
      videoLink: fields.videoLink,
      highlights: "[]",
      featuresAmenities: "[]",
      nearby: "[]",
      extraHighlights: "[]",
    };

    try {
      const data = new FormData();
      Object.entries(payload).forEach(([key, value]) =>
        data.append(key, value),
      );

      if (images) {
        Array.from(images).forEach((file) => data.append("images", file));
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/sellproperty/addsell`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setFields(initialFields);
      setImages(null);
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        "We couldn't send that just now. Please try again, or call us on +91 96238 58108.",
      );
    }
  };

  if (status === "sent") {
    return (
      <div aria-live="polite" className="flex flex-col items-start py-4">
        <span
          aria-hidden
          className="flex h-12 w-12 items-center justify-center border border-primary/60"
        >
          <Check className="h-5 w-5 text-primary" strokeWidth={1.5} />
        </span>
        <h3 className="mt-6 font-serif text-2xl font-normal text-fg">
          Thank you — your property is with us.
        </h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
          Our team will review the details you&apos;ve shared and get back to
          you. If you&apos;d rather talk it through now, call us on{" "}
          <a
            href="tel:+919623858108"
            className="text-primary underline-offset-4 hover:underline"
          >
            +91 96238 58108
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-fg px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <RotateCcw aria-hidden className="h-3.5 w-3.5" />
          Submit another property
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Seller */}
      <fieldset>
        <legend className={legendClass}>Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sell-name" className={labelClass}>
              Name *
            </label>
            <input
              id="sell-name"
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
            <label htmlFor="sell-email" className={labelClass}>
              Email *
            </label>
            <input
              id="sell-email"
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
          <div className="sm:col-span-2">
            <label htmlFor="sell-phone" className={labelClass}>
              Phone *
            </label>
            <PhoneInput
              country="in"
              value={fields.phone}
              onChange={(phone) => setFields((p) => ({ ...p, phone }))}
              enableSearch
              containerClass="phone-dark w-full"
              inputProps={{ id: "sell-phone", name: "phone", required: true }}
            />
          </div>
        </div>
      </fieldset>

      {/* Property */}
      <fieldset>
        <legend className={legendClass}>About the property</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sell-type" className={labelClass}>
              Property type *
            </label>
            <select
              id="sell-type"
              name="type"
              required
              value={fields.type}
              onChange={handleChange}
              className={`${fieldClass} form-select-dark appearance-none`}
            >
              <option value="" disabled>
                Select a type
              </option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sell-location" className={labelClass}>
              Location in Goa *
            </label>
            <input
              id="sell-location"
              name="location"
              type="text"
              required
              value={fields.location}
              onChange={handleChange}
              placeholder="e.g. Assagao, Margao"
              className={fieldClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sell-title" className={labelClass}>
              Listing title *
            </label>
            <input
              id="sell-title"
              name="title"
              type="text"
              required
              value={fields.title}
              onChange={handleChange}
              placeholder="e.g. 3 BHK villa with pool in Assagao"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="sell-price" className={labelClass}>
              Expected price (₹)
            </label>
            <input
              id="sell-price"
              name="price"
              type="number"
              min={0}
              value={fields.price}
              onChange={handleChange}
              placeholder="Leave blank if unsure"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="sell-area" className={labelClass}>
              Area (sq ft)
            </label>
            <input
              id="sell-area"
              name="areaSqft"
              type="number"
              min={0}
              value={fields.areaSqft}
              onChange={handleChange}
              placeholder="Built-up or plot area"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="sell-bedrooms" className={labelClass}>
              Bedrooms
            </label>
            <input
              id="sell-bedrooms"
              name="bedrooms"
              type="number"
              min={0}
              value={fields.bedrooms}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="sell-bathrooms" className={labelClass}>
              Bathrooms
            </label>
            <input
              id="sell-bathrooms"
              name="bathrooms"
              type="number"
              min={0}
              value={fields.bathrooms}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sell-description" className={labelClass}>
              Property description
            </label>
            <textarea
              id="sell-description"
              name="description"
              rows={5}
              value={fields.description}
              onChange={handleChange}
              placeholder="Condition, age, amenities, what makes it stand out…"
              className={`${fieldClass} resize-y`}
            />
          </div>
          <div>
            <label htmlFor="sell-map" className={labelClass}>
              Google Maps link
            </label>
            <input
              id="sell-map"
              name="googleMapUrl"
              type="url"
              value={fields.googleMapUrl}
              onChange={handleChange}
              placeholder="https://maps.app.goo.gl/…"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="sell-video" className={labelClass}>
              Video link
            </label>
            <input
              id="sell-video"
              name="videoLink"
              type="url"
              value={fields.videoLink}
              onChange={handleChange}
              placeholder="YouTube or Drive link"
              className={fieldClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sell-images" className={labelClass}>
              Photos
            </label>
            <input
              id="sell-images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              className="w-full border border-border bg-black-950 px-4 py-3 font-sans text-sm text-fg-muted file:mr-4 file:border file:border-border file:bg-surface-elevated file:px-4 file:py-2 file:font-sans file:text-[10px] file:font-bold file:uppercase file:tracking-[0.2em] file:text-fg hover:file:border-primary/60"
            />
            <p className="mt-2 font-sans text-xs text-fg-muted">
              Clear daylight photos help buyers shortlist faster.
            </p>
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className={submitClass}
        >
          {status === "sending" ? "Sending…" : "Submit property"}
          <ArrowUpRight
            aria-hidden
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>

        <p className="font-sans text-xs leading-relaxed text-fg-muted">
          We use your details only to respond to this enquiry.
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your details" : ""}
      </p>

      {status === "error" && (
        <p
          role="alert"
          className="border border-red-500/40 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-200"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
