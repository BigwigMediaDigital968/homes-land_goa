import type { Metadata } from "next";
import banner from "../../../assets/upcoming-banner.webp";
import ContactInfo from "../../../components/ContactInfo";
import PageHero from "../../../components/ui/PageHero";
import PropertyListings from "../../../components/listings/PropertyListings";
import JsonLd from "../../../components/ui/JsonLd";
import { getProperties } from "@/lib/properties";
import { listingPageSchema, realEstateAgentSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE =
  "Upcoming Projects in Goa | New Villas, Apartments & Plots | Homes & Land Goa";
const DESCRIPTION =
  "Explore upcoming projects in Goa with Homes & Land Goa. Browse new villas, apartments and plots before launch, compare the details and connect with our team for pricing and site visits.";
const HERO_ALT = "Upcoming residential project in Goa listed by Homes & Land Goa";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // ?type=villa etc. show the same page, so they all point back here
  alternates: { canonical: `${SITE_URL}/upcoming-projects` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: `${SITE_URL}/upcoming-projects`,
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

// Listings are fetched on the server and refreshed every 5 minutes
export const revalidate = 300;

export default async function UpcomingProjectsPage() {
  const properties = await getProperties("upcoming");

  return (
    <main className="flex min-h-screen w-full flex-col bg-bg">
      {/* The breadcrumb schema is emitted by PageHero */}
      <JsonLd
        data={[
          listingPageSchema({
            properties: properties ?? [],
            path: "/upcoming-projects",
            title: TITLE,
            description: DESCRIPTION,
            listName: `Upcoming Projects in Goa - ${SITE_NAME}`,
          }),
          realEstateAgentSchema(`${SITE_URL}/upcoming-projects`),
        ]}
      />

      {/* 1. HERO */}
      <PageHero
        eyebrow="New Launches in Goa"
        title="Upcoming Projects in Goa"
        subtitle="Villas, Apartments, Plots and Commercial Spaces"
        description="Get early access to new projects across Goa. Browse upcoming villas, apartments and plots, review the details of each project, and talk to our team about pricing, payment plans and site visits."
        breadcrumbs={[{ label: "Upcoming Projects" }]}
        path="/upcoming-projects"
        image={{ src: banner, alt: HERO_ALT }}
      />

      {/* 2. FILTERS AND LISTINGS (interactive) */}
      <PropertyListings
        initialProperties={properties ?? []}
        fetchFailed={properties === null}
        purpose="upcoming"
        basePath="/upcoming-projects"
        listingLabel="upcoming project"
        listings={{
          eyebrow: "Current Projects",
          heading: "Upcoming Projects in Goa",
        }}
        noListings={{
          heading: "No Upcoming Projects Listed Right Now",
          text: "Tell us what you're looking for, and our team will let you know about new projects as they launch.",
        }}
      />

      {/* 3. CONTACT */}
      <ContactInfo />
    </main>
  );
}
