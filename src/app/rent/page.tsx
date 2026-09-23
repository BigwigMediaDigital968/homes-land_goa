import type { Metadata } from "next";
import banner from "../../../assets/rent-banner.jpg";
import PageHero from "../../../components/ui/PageHero";
import PropertyListings from "../../../components/listings/PropertyListings";
import JsonLd from "../../../components/ui/JsonLd";
import RentTrust from "../../../components/rent/RentTrust";
import RentPropertyTypes from "../../../components/rent/RentPropertyTypes";
import RentWhyChooseUs from "../../../components/rent/RentWhyChooseUs";
import RentProcess from "../../../components/rent/RentProcess";
import { rentFaqs } from "../../../components/rent/rentFaqs";
import CallToAction from "../../../components/Home/CallToAction";
import Testimonials from "../../../components/Home/Testimonials";
import FAQ from "../../../components/ui/FAQ";
import { getProperties } from "@/lib/properties";
import {
  faqSchema,
  listingPageSchema,
  realEstateAgentSchema,
} from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE =
  "Property for Rent in Goa | Apartments, Villas & Houses to Rent | Homes & Land Goa";
const DESCRIPTION =
  "Find property for rent in Goa with Homes & Land Goa. Browse apartments, villas and houses for rent in Goa, filter by locality and budget, and get in touch to arrange a viewing.";
const HERO_ALT = "Villas for rent in Goa listed by Homes & Land Goa";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // ?type=villa etc. show the same page, so they all point back to /rent
  alternates: { canonical: `${SITE_URL}/rent` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: `${SITE_URL}/rent`,
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

const TYPE_FILTERS = ["All", "Apartment", "Villa", "House"];

// Listings are fetched on the server and refreshed every 5 minutes
export const revalidate = 300;

export default async function RentPage() {
  const properties = await getProperties("rent");

  return (
    <main className="flex min-h-screen w-full flex-col bg-bg">
      {/* The breadcrumb schema is emitted by PageHero */}
      <JsonLd
        data={[
          listingPageSchema({
            properties: properties ?? [],
            path: "/rent",
            title: TITLE,
            description: DESCRIPTION,
            listName: "Featured Rentals in Goa",
          }),
          faqSchema(rentFaqs),
          realEstateAgentSchema(`${SITE_URL}/rent`),
        ]}
      />

      {/* 1. HERO */}
      <PageHero
        eyebrow="Rent Property in Goa"
        title={
          <>
            Find Property for Rent in Goa,{" "}
            <span className="font-normal italic text-primary">
              With People Who Know the Market
            </span>
          </>
        }
        subtitle="Homes & Land Goa, Rental Support Across Goa"
        description="Homes & Land Goa helps you find property for rent in Goa, whether you need a short holiday stay or a long-term home. As local agents based in Calangute, we match rental listings to your budget and locality, arrange viewings, and support you through the rental agreement. Whether you're looking at an apartment, a villa, or a house, we help you move in with clarity."
        breadcrumbs={[{ label: "Rent" }]}
        path="/rent"
        image={{ src: banner, alt: HERO_ALT }}
      />

{/* 5. FEATURED RENTALS (live listings + type filter) */}
      <PropertyListings
        initialProperties={properties ?? []}
        fetchFailed={properties === null}
        purpose="rent"
        basePath="/rent"
        listingLabel="for rent"
        typeFilters={TYPE_FILTERS}
        listings={{
          eyebrow: "Current Listings",
          heading: "Featured Rentals in Goa",
        }}
        noListings={{
          heading: "No Rentals Listed Right Now",
          text: "Tell us what you're looking for, and our team will share suitable rental options.",
        }}
      />
      
      {/* 2. TRUST BAR / EXPERIENCE */}
      <RentTrust />

      {/* 3. RENTAL PROPERTY TYPES */}
      <RentPropertyTypes />

      {/* 4. WHY CHOOSE US */}
      <RentWhyChooseUs />

      

      {/* 8. FINAL CTA BANNER (shared with Home) */}
      <CallToAction
        eyebrow={null}
        title={
          <>
            Ready to Rent{" "}
            <br />
            <span className="font-serif font-normal italic text-fg">
              a Property in Goa?
            </span>
          </>
        }
        description="Tell us what you're looking for, and we'll help you take the next step, whether that's a short holiday rental or a long-term home in Goa."
        primaryCta={{ label: "Browse Rentals", href: "#listings" }}
        secondaryCta={{ label: "Contact Us", href: "/contacts" }}
      />

      {/* 9. TESTIMONIALS — same set as Home for now. Once renter-specific
          reviews exist, pass them via `testimonials` and use the
          "What Our Renters Say" heading. */}
      <Testimonials />

      {/* 10. HOW RENTING WORKS */}
      <RentProcess />

      {/* 12. FAQ (shared with Home) */}
      <FAQ
        faqs={rentFaqs}
        subtitle="Renter Questions"
        title="Frequently Asked Questions"
        ctaLabel="Browse Rentals"
        ctaHref="/contacts"
      />
    </main>
  );
}
