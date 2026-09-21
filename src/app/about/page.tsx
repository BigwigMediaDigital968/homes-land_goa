import type { Metadata } from "next";
import banner from "../../../assets/aboutus.jpg";
import PageHero from "../../../components/ui/PageHero";
import JsonLd from "../../../components/ui/JsonLd";
import OurStory from "../../../components/about/OurStory";
import AboutWhyChooseUs from "../../../components/about/AboutWhyChooseUs";
import ContactInfo from "../../../components/ContactInfo";
import CallToAction from "../../../components/Home/CallToAction";
import { realEstateAgentSchema, webPageSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "About Homes & Land Goa | Real Estate Agents in Goa";
const DESCRIPTION =
  "Learn about Homes & Land Goa, a real estate team based in Calangute helping people buy, sell and rent property across North and South Goa with a transparent, personal process.";
const HERO_ALT = "Homes & Land Goa, property specialists in Goa";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: `${SITE_URL}/about`,
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

export default function AboutPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-bg">
      {/* The breadcrumb schema is emitted by PageHero */}
      <JsonLd
        data={[
          webPageSchema({
            type: "AboutPage",
            path: "/about",
            title: TITLE,
            description: DESCRIPTION,
          }),
          realEstateAgentSchema(
            `${SITE_URL}/about`,
            `${SITE_URL}${banner.src}`,
          ),
        ]}
      />

      <PageHero
        eyebrow="About Homes & Land Goa"
        title={
          <>
            About <span className="text-primary">Us</span>
          </>
        }
        description="A legacy built on trust, architectural distinction, and absolute structural serenity."
        breadcrumbs={[{ label: "About Us" }]}
        path="/about"
        image={{ src: banner, alt: HERO_ALT }}
      />

      <OurStory />

      <AboutWhyChooseUs />

      <ContactInfo />

      <CallToAction
        eyebrow="Work With Us"
        title={
          <>
            Ready to Start
            <br />
            <span className="font-serif font-normal italic text-fg">
              Your Property Journey?
            </span>
          </>
        }
        description="Tell us what you're looking for, and we'll help you take the next step, whether that's buying, selling, or renting a property in Goa."
        primaryCta={{ label: "Contact Us", href: "/contacts" }}
        secondaryCta={{
          label: "Browse Properties",
          href: "/buy",
        }}
      />
    </main>
  );
}
