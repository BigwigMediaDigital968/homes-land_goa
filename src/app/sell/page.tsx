import type { Metadata } from "next";
import banner from "../../../assets/sell-banner.jpg";
import PageHero from "../../../components/ui/PageHero";
import JsonLd from "../../../components/ui/JsonLd";
import FAQ from "../../../components/ui/FAQ";
import SellValuation from "../../../components/sell/SellValuation";
import SellHeroActions from "../../../components/sell/SellHeroActions";
import CallToAction from "../../../components/Home/CallToAction";
import SellProcess from "../../../components/sell/SellProcess";
import SellWhyChooseUs from "../../../components/sell/SellWhyChooseUs";
import SellDocuments from "../../../components/sell/SellDocuments";
import SellAreas from "../../../components/sell/SellAreas";
import SellContact from "../../../components/sell/SellContact";
import { sellFaqs } from "../../../components/sell/sellFaqs";
import {
  faqSchema,
  realEstateAgentSchema,
  servicePageSchema,
} from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE =
  "Sell Property in Goa | Free Valuation & Documentation Support | Homes & Land Goa";
const DESCRIPTION =
  "Sell property in Goa with Homes & Land Goa. Get a property valuation, documentation support and a straightforward process to connect with genuine buyers, whether you're selling a house, villa or plot.";
const HERO_ALT = "Villa listed for sale by Homes & Land Goa in Goa";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/sell` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: `${SITE_URL}/sell`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}${banner.src}`,
        width: banner.width,
        height: banner.height,
        alt: HERO_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}${banner.src}`],
  },
};

export default function SellPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-bg">
      {/* The breadcrumb schema is emitted by PageHero */}
      <JsonLd
        data={[
          servicePageSchema({
            path: "/sell",
            title: TITLE,
            description: DESCRIPTION,
            serviceName: "Property Valuation and Selling in Goa",
            serviceType: "Real estate selling and property valuation",
          }),
          faqSchema(sellFaqs),
          realEstateAgentSchema(`${SITE_URL}/sell`, `${SITE_URL}${banner.src}`),
        ]}
      />

      {/* 1. HERO */}
      <PageHero
        eyebrow="Sell Property in Goa"
        title="Sell Property in Goa"
        subtitle="Get a Property Valuation and Sell With Confidence"
        description="Thinking about selling your property in Goa? We help you understand what it's worth, guide you through the documentation, and connect you with genuine buyers, whether you're looking to sell a house, a villa, or a plot."
        breadcrumbs={[{ label: "Sell" }]}
        path="/sell"
        image={{ src: banner, alt: HERO_ALT }}
        actions={<SellHeroActions />}
      />

      {/* 2. PROPERTY VALUATION HIGHLIGHT */}
      <SellValuation />

      {/* 3. OUR SELLING PROCESS */}
      <SellProcess />

      {/* 4. WHY SELL WITH US */}
      <SellWhyChooseUs />

      {/* 5. WHAT YOU'LL NEED TO SELL PROPERTY IN GOA */}
      <SellDocuments />

      {/* 6. AREAS WE COVER IN GOA */}
      <SellAreas />

      {/* 7. GET IN TOUCH WITH US */}
      <SellContact />

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <FAQ
        faqs={sellFaqs}
        subtitle="Seller Questions"
        title={
          <>
            Frequently Asked Questions About{" "}
            <span className="italic text-rosegold-500 font-normal">
              Selling Property in Goa
            </span>
          </>
        }
        ctaText="Our team is available to walk you through the process."
        ctaLabel="Browse our FAQ"
        ctaHref="/faq"
      />

      {/* 9. FINAL CTA */}
      <CallToAction
        eyebrow="Next Step"
        title={
          <>
            Ready to Sell
            <br />
            <span className="font-serif font-normal italic text-fg">
              Your Property in Goa?
            </span>
          </>
        }
        description="Get a property valuation, understand what documentation you'll need, and connect with genuine buyers. No obligation to move forward until you're ready."
        primaryCta={{ label: "Get a Free Valuation", href: "/contacts" }}
        secondaryCta={{
          label: "Contact Us",
          href: "tel:+919623858108",
          showPhoneIcon: true,
        }}
      />
    </main>
  );
}
