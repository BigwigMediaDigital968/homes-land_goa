import type { Metadata } from "next";
import banner from "../../../assets/contact.jpg";
import PageHero from "../../../components/ui/PageHero";
import JsonLd from "../../../components/ui/JsonLd";
import ContactChannels from "../../../components/ui/ContactChannels";
import ContactLeadForm from "../../../components/contact/ContactLeadForm";
import { realEstateAgentSchema, webPageSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "Contact Homes & Land Goa | Property Agents in Calangute, Goa";
const DESCRIPTION =
  "Get in touch with Homes & Land Goa. Call +91 96238 58108, email info@homesandlandgoa.com, or visit our office in Calangute to talk about buying, selling or renting property in Goa.";
const HERO_ALT = "The Homes & Land Goa office in Calangute, Goa";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contacts` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: `${SITE_URL}/contacts`,
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

export default function ContactPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-bg">
      {/* The breadcrumb schema is emitted by PageHero */}
      <JsonLd
        data={[
          webPageSchema({
            type: "ContactPage",
            path: "/contacts",
            title: TITLE,
            description: DESCRIPTION,
          }),
          realEstateAgentSchema(
            `${SITE_URL}/contacts`,
            `${SITE_URL}${banner.src}`,
          ),
        ]}
      />

      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Call, email, or send us a message and our team in Calangute will get back to you about buying, selling or renting property in Goa."
        breadcrumbs={[{ label: "Contact" }]}
        path="/contacts"
        image={{ src: banner, alt: HERO_ALT }}
      />

      <section
        aria-labelledby="contact-info-heading"
        className="border-t border-border bg-bg py-14 md:py-20"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-12 md:gap-12">
          {/* Contact information */}
          <div className="md:col-span-5">
            <h2
              id="contact-info-heading"
              className="font-serif text-3xl font-light leading-tight text-fg md:text-4xl"
            >
              Contact Information
            </h2>
            <span aria-hidden className="mt-6 block h-px w-16 bg-primary/60" />

            <ContactChannels layout="list" className="mt-8" />
          </div>

          {/* Lead form */}
          <div className="md:col-span-7">
            <ContactLeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
