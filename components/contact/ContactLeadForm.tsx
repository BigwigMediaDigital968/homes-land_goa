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
import { BHK_SIZES, BUDGET_RANGES, PROPERTY_TYPES } from "@/lib/properties";

/**
 * The site's one enquiry form (contact page, property details, listings).
 *
 * POSTs to /api/lead/create-lead (Homes-Land_Backend, routes/lead.route.js).
 * `source` and `origin` are filled in behind the scenes so admin can see
 * which page or property each lead came from.
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
  propertyType: "",
  size: "",
  budget: "",
  message: "",
};

/** Types where a BHK count doesn't apply, so the size field is hidden. */
const NO_BHK_TYPES = ["Plot / Land", "Commercial"];

const budgetsFor = (purpose: string) =>
  purpose === "Rent Property" ? BUDGET_RANGES.rent : BUDGET_RANGES.sale;

function SelectField({
  id,
  name,
  label,
  value,
  options,
  placeholder,
  required,
  className,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  required?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && " *"}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={`${fieldClass} form-select-dark appearance-none`}
      >
        <option value="" disabled={required}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export interface LeadOrigin {
  kind: "property" | "page";
  name: string;
}

interface ContactLeadFormProps {
  origin?: LeadOrigin;
  eyebrow?: string;
  title?: string;
  /**
   * Set when the page already implies the purpose (e.g. "Buy Property" on a
   * sale listing): the field is hidden and this value is sent instead.
   */
  purpose?: string;
  /** Same idea as `purpose`, e.g. the property's own type on its detail page. */
  propertyType?: string;
  /** Same idea again, e.g. "3 BHK" from the property's bedrooms. */
  size?: string;
  /** False on a single property's page, where the price is already known. */
  showBudget?: boolean;
}

export default function ContactLeadForm({
  origin = { kind: "page", name: "contact" },
  eyebrow = "Get in touch",
  title = "Send Us a Message",
  purpose,
  propertyType,
  size,
  showBudget = true,
}: ContactLeadFormProps) {
  const freshFields = {
    ...initialFields,
    purpose: purpose ?? "",
    propertyType: propertyType ?? "",
    size: size ?? "",
  };
  const [fields, setFields] = useState(freshFields);

  const showPurpose = !purpose;
  const showType = !propertyType;
  const showSize = !size && !NO_BHK_TYPES.includes(fields.propertyType);
  const budgets = budgetsFor(fields.purpose);

  // Half-width fields after name/email. With an odd count, the last one spans
  // the row so none sits alone.
  const halfFields = [
    "phone",
    showPurpose && "purpose",
    showType && "propertyType",
    showSize && "size",
    showBudget && "budget",
  ].filter(Boolean);
  const spanIf = (field: string) =>
    halfFields.length % 2 === 1 && halfFields.at(-1) === field
      ? "@lg:col-span-2"
      : undefined;

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFields((prev) => {
      const next = { ...prev, [name]: value };
      // Drop answers the new choice makes invalid (rent vs sale budgets,
      // BHK on a plot) so they aren't submitted while hidden.
      if (name === "purpose" && !budgetsFor(value).includes(prev.budget))
        next.budget = "";
      if (name === "propertyType" && NO_BHK_TYPES.includes(value) && !size)
        next.size = "";
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/create-lead`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fields.name.trim(),
            email: fields.email.trim(),
            phone: fields.phone.trim(),
            message: fields.message.trim(),
            purpose: fields.purpose,
            propertyType: fields.propertyType,
            size: fields.size,
            budget: fields.budget,
            source: "website",
            origin,
          }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFields(freshFields);
      } else {
        setError(data.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
          onClick={() => setSuccess(false)}
          className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-fg px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="@container space-y-6 border border-border bg-surface p-6 sm:p-8"
    >
      <div>
        <p className={legendClass}>{eyebrow}</p>
        <h3 className="font-serif text-2xl font-light text-fg">{title}</h3>
      </div>

      {/* Container query: two columns only when the form itself is wide,
          so it stacks in the narrow property-page sidebar. */}
      <div className="grid gap-5 @lg:grid-cols-2">
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

        <div className={spanIf("phone")}>
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

        {showPurpose && (
          <SelectField
            id="contact-purpose"
            name="purpose"
            label="Purpose"
            required
            value={fields.purpose}
            options={PURPOSES}
            placeholder="Select a purpose"
            className={spanIf("purpose")}
            onChange={handleChange}
          />
        )}

        {showType && (
          <SelectField
            id="contact-property-type"
            name="propertyType"
            label="Property type"
            value={fields.propertyType}
            options={PROPERTY_TYPES}
            placeholder="Any / not sure"
            className={spanIf("propertyType")}
            onChange={handleChange}
          />
        )}

        {showSize && (
          <SelectField
            id="contact-size"
            name="size"
            label="Size"
            value={fields.size}
            options={BHK_SIZES}
            placeholder="Any / not sure"
            className={spanIf("size")}
            onChange={handleChange}
          />
        )}

        {showBudget && (
          <SelectField
            id="contact-budget"
            name="budget"
            label="Budget"
            value={fields.budget}
            options={budgets}
            placeholder="Any / not sure"
            className={spanIf("budget")}
            onChange={handleChange}
          />
        )}

        <div className="@lg:col-span-2">
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

      {error ? (
        <p
          role="alert"
          className="border border-red-500/40 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={loading} className={submitClass}>
        {loading ? "Sending…" : "Send message"}
        <ArrowUpRight
          aria-hidden
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>
    </form>
  );
}
