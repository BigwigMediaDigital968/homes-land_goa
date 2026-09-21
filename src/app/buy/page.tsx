import type { Metadata } from "next";
import banner from "../../../assets/buy-banner.jpg";
import ContactInfo from "../../../components/ContactInfo";
import PageHero from "../../../components/ui/PageHero";
import PropertyListings from "../../../components/listings/PropertyListings";
import JsonLd from "../../../components/ui/JsonLd";
import BuyExploreIntro from "../../../components/buy/BuyExploreIntro";
import PropertyTypes from "../../../components/buy/PropertyTypes";
import BuyLocations from "../../../components/buy/BuyLocations";
import BuyerGuidance from "../../../components/buy/BuyerGuidance";
import DueDiligence from "../../../components/buy/DueDiligence";
import BuyWhyChooseUs from "../../../components/buy/BuyWhyChooseUs";
import BuyProcess from "../../../components/buy/BuyProcess";
import BuyCta from "../../../components/buy/BuyCta";
import { buyFaqs } from "../../../components/buy/buyFaqs";
import FAQ from "../../../components/ui/FAQ";
import { getProperties } from "@/lib/properties";
import {
  faqSchema,
  listingPageSchema,
  realEstateAgentSchema,
} from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE =
  "Property for Sale in Goa | Buy Villas, Apartments & Plots | Homes & Land Goa";
const DESCRIPTION =
  "Explore property for sale in Goa with Homes & Land Goa. Browse villas, apartments and plots to buy property in Goa, shortlist your options and connect with our team to schedule a viewing.";
const HERO_ALT = "Villa for sale in North Goa listed by Homes & Land Goa";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // ?type=villa etc. show the same page, so they all point back to /buy
  alternates: { canonical: `${SITE_URL}/buy` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: `${SITE_URL}/buy`,
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

const TYPE_FILTERS = ["All", "Apartment", "Villa", "Plot"];

const GOA_LOCATIONS = [
  "All Locations",
  "Panaji",
  "Mapusa",
  "Calangute",
  "Tiswadi Taluka",
  "Candolim",
  "Baga",
];

// Listings are fetched on the server and refreshed every 5 minutes
export const revalidate = 300;

export default async function BuyPage() {
  const properties = await getProperties("buy");

  return (
    <main className="flex min-h-screen w-full flex-col bg-bg">
      {/* The breadcrumb schema is emitted by PageHero */}
      <JsonLd
        data={[
          listingPageSchema({
            properties: properties ?? [],
            path: "/buy",
            title: TITLE,
            description: DESCRIPTION,
            listName: "Available Properties in Goa",
          }),
          faqSchema(buyFaqs),
          realEstateAgentSchema(`${SITE_URL}/buy`),
        ]}
      />

      {/* 1. HERO */}
      <PageHero
        eyebrow="Buy Property in Goa"
        title="Property for Sale in Goa"
        subtitle="Villas, Apartments and Plots to Buy Across Goa"
        description="Whether you are looking for a beachside villa, a city apartment or a plot to build on, explore property for sale in Goa and find a home that fits how you want to live. Filter by property type below, review listing details, and get in touch with our team whenever you want to arrange a viewing."
        breadcrumbs={[{ label: "Buy" }]}
        path="/buy"
        image={{ src: banner, alt: HERO_ALT }}
      />

      {/* 2 + 3. FILTERS AND LISTINGS (interactive) */}
      <PropertyListings
        initialProperties={properties ?? []}
        fetchFailed={properties === null}
        purpose="buy"
        basePath="/buy"
        listingLabel="for sale"
        typeFilters={TYPE_FILTERS}
        locations={GOA_LOCATIONS}
        discovery={{
          eyebrow: "Browse by Type",
          heading: "Browse Property for Sale in Goa",
          paragraph:
            "Use the filters below to browse property for sale in Goa by type. Choose Villa to see villas for sale in Goa, Apartment for apartments for sale in Goa, or Plot if you are looking for land to build your own home.",
        }}
        listings={{
          eyebrow: "Current Listings",
          heading: "Available Properties in Goa",
          paragraph:
            "Browse property for sale in Goa below. Each listing includes the details you need to shortlist and compare, and you can view full information or enquire directly from any card.",
        }}
      />

      {/* 4. SEO INTRODUCTION */}
      <BuyExploreIntro />

      {/* 5. PROPERTY TYPES */}
      <PropertyTypes />

      {/* 6. LOCATION */}
      <BuyLocations />

      {/* 7. BUYER GUIDANCE */}
      <BuyerGuidance />

      {/* 8. DUE DILIGENCE */}
      <DueDiligence />

      {/* 9. WHY HOMES & LAND GOA */}
      <BuyWhyChooseUs />

      {/* 10. BUYING PROCESS */}
      <BuyProcess />

      {/* 11. CTA, with the existing contact block directly below */}
      <BuyCta />
      {/* <ContactInfo showHeading={false} /> */}

      {/* 12. FAQ */}
      <FAQ
        faqs={buyFaqs}
        subtitle="Buyer Questions"
        title={
          <>
            Frequently Asked Questions About{" "}
            <span className="italic text-rosegold-500 font-normal">
              Buying Property in Goa
            </span>
          </>
        }
        ctaLabel="Enquire Now"
        ctaHref="/contacts"
      />
    </main>
  );
}
