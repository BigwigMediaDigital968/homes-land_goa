import type { Metadata } from "next";
import FAQClient, { FAQ } from "./FAQClient";

const SITE_URL = "https://www.homesandlandgoa.com"; // Replace with your actual production domain
const PAGE_URL = `${SITE_URL}/faq`; // Replace with your actual route path

export const metadata: Metadata = {
  title: "Goa Real Estate FAQs: Buying, Selling & Renting | Homes & Land Goa",
  description:
    "Find answers to common questions about buying, selling and renting property in Goa. Explore real estate guidance from Homes & Land Goa.",
  keywords: [
    "Goa real estate FAQs",
    "buy property in Goa",
    "sell property in Goa",
    "rent villa in Goa",
    "NRI property investment Goa",
    "luxury villas Goa",
    "Homes & Land Goa",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Goa Real Estate FAQs: Buying, Selling & Renting | Homes & Land Goa",
    description:
      "Find answers to common questions about buying, selling and renting property in Goa. Explore real estate guidance from Homes & Land Goa.",
    url: PAGE_URL,
    siteName: "Homes & Land Goa",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-faq.jpg`, // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Homes & Land Goa - Real Estate FAQs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Goa Real Estate FAQs: Buying, Selling & Renting | Homes & Land Goa",
    description:
      "Find answers to common questions about buying, selling and renting property in Goa. Explore real estate guidance from Homes & Land Goa.",
    images: [`${SITE_URL}/og-faq.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs: FAQ[] = [
  {
    question: "What services does Homes & Land Goa provide?",
    answer:
      "We specialize in buying, selling, and renting premium properties in Goa, with personalized consultation and end-to-end support.",
  },
  {
    question: "Do you assist NRI clients?",
    answer:
      "Yes, we regularly work with NRI clients and provide complete assistance with legal paperwork, compliance, and property management.",
  },
  {
    question: "Can you help with luxury villa investments?",
    answer:
      "Absolutely! We have curated luxury villas and premium properties in Goa with high ROI potential.",
  },
  {
    question: "Do you charge brokerage fees?",
    answer:
      "Our fee structure is transparent, and we ensure you are informed upfront. No hidden charges.",
  },
  {
    question: "How do I schedule a property visit?",
    answer:
      "You can contact us directly via phone, email, or the enquiry form, and our team will schedule a site visit at your convenience.",
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        url: PAGE_URL,
        name: "Goa Real Estate FAQs: Buying, Selling & Renting | Homes & Land Goa",
        description:
          "Find answers to common questions about buying, selling and renting property in Goa. Explore real estate guidance from Homes & Land Goa.",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
            name: "FAQs",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}#organization`,
        name: "Homes & Land Goa",
        url: SITE_URL,
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FAQClient faqs={faqs} />
    </>
  );
}
