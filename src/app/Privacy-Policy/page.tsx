import type { Metadata } from "next";

const SITE_URL = "https://homesandlandgoa.com";
const PAGE_URL = `${SITE_URL}/privacy-policy`; // Update if your route path differs

export const metadata: Metadata = {
  title: "Privacy Policy | Homes & Land Goa",
  description:
    "Read the Homes & Land Goa Privacy Policy to learn how your personal information is collected, used and protected.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Privacy Policy | Homes & Land Goa",
    description:
      "Read the Homes & Land Goa Privacy Policy to learn how your personal information is collected, used and protected.",
    url: PAGE_URL,
    siteName: "Homes & Land Goa",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Homes & Land Goa",
    description:
      "Read the Homes & Land Goa Privacy Policy to learn how your personal information is collected, used and protected.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Privacy Policy | Homes & Land Goa",
        description:
          "Read the Homes & Land Goa Privacy Policy to learn how your personal information is collected, used and protected.",
        dateModified: "2025-09-16",
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${SITE_URL}#website`,
        },
        about: {
          "@id": `${SITE_URL}#organization`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Privacy Policy",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}#organization`,
        name: "Homes & Land Goa",
        url: SITE_URL,
        email: "supports@homesandlandgoa.com",
        areaServed: {
          "@type": "State",
          name: "Goa",
          containedInPlace: {
            "@type": "Country",
            name: "India",
          },
        },
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="max-w-4xl mx-auto pt-32 pb-10">
        <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          Last updated: <time dateTime="2025-09-16">September 16, 2025</time>
        </p>

        <p className="mb-4">
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>

        <p className="mb-4">
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Definitions</h2>

        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Account:</strong> A unique account created for You to access
            our Service.
          </li>
          <li>
            <strong>Company:</strong> Refers to HOMES &amp; LAND GOA.
          </li>
          <li>
            <strong>Cookies:</strong> Small files placed on Your Device.
          </li>
          <li>
            <strong>Country:</strong> Goa, India.
          </li>
          <li>
            <strong>Device:</strong> Any device that can access the Service.
          </li>
          <li>
            <strong>Personal Data:</strong> Any information that relates to an
            identified or identifiable individual.
          </li>
          <li>
            <strong>Service:</strong> Refers to the Website.
          </li>
          <li>
            <strong>Service Provider:</strong> A third-party processing data on
            behalf of the Company.
          </li>
          <li>
            <strong>Usage Data:</strong> Data collected automatically when using
            the Service.
          </li>
          <li>
            <strong>Website:</strong> HOMES &amp; LAND GOA –{" "}
            <a
              href="https://homesandlandgoa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://homesandlandgoa.com
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Collecting and Using Your Personal Data
        </h2>

        <p className="mb-4">
          We may collect your email address, phone number, usage data (like IP
          address, browser type, pages visited), device details, and more, to
          provide, improve, and personalize our Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cookies and Tracking Technologies
        </h2>

        <p className="mb-4">
          We use Cookies and similar technologies for tracking your activity and
          enhancing the experience. You can manage or disable cookies in your
          browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Use of Your Personal Data
        </h2>

        <p className="mb-4">
          Personal Data is used to provide and maintain the Service, manage
          accounts, communicate offers, respond to your inquiries, perform
          business transfers, and improve our service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Sharing Your Personal Data
        </h2>

        <p className="mb-4">
          We may share data with service providers, affiliates, business
          partners, or during business transactions (e.g., mergers).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Retention of Your Data
        </h2>

        <p className="mb-4">
          We retain your personal data as long as necessary to fulfill the
          purposes described, comply with laws, resolve disputes, and enforce
          agreements.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>

        <p className="mb-4">
          You have the right to access, update, or request deletion of your
          personal data. You can manage your data in your account settings or
          contact us.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Security</h2>

        <p className="mb-4">
          We use reasonable measures to protect your personal data but cannot
          guarantee absolute security over the internet.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Children’s Privacy</h2>

        <p className="mb-4">
          We do not knowingly collect personal data from anyone under the age of
          13.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">External Links</h2>

        <p className="mb-4">
          Our Service may contain links to third-party websites. We are not
          responsible for their content or privacy practices.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Changes to This Policy
        </h2>

        <p className="mb-4">
          We may update this Privacy Policy over time. Please check back
          periodically. Changes are effective once posted.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>

        <p>
          For questions, contact us at:{" "}
          <a
            href="mailto:supports@homesandlandgoa.com"
            className="text-blue-600 underline"
          >
            supports@homesandlandgoa.com
          </a>
        </p>
      </main>
    </div>
  );
}