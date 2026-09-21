import type { Metadata } from "next";
import Hero from "../../components/Home/Hero";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import WhatsAppButton from "../../components/floatingBtn";
import About from "../../components/Home/About";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import Services from "../../components/Home/Services";
import Testimonials from "../../components/Home/Testimonials";
import FeaturedProperties from "../../components/Home/FeaturedProperties";
import Blogs from "../../components/Home/Blogs";
import CallToAction from "../../components/Home/CallToAction";
import UpcomingProjectsPreview from "../../components/Home/UpcomingProjectsPreview";
import AreasWeCover from "../../components/Home/AreasWeCover";
import HowItWorks from "../../components/Home/HowItWorks";
import FAQ from "../../components/ui/FAQ";

export const metadata: Metadata = {
  title: "Real Estate Agents in Goa | Buy, Sell & Rent Property | Homes & Land Goa",
  description:
    "Homes & Land Goa, trusted real estate agents in Goa helping you buy, sell or rent property across North and South Goa. Explore listings or talk to our team today.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What legal due diligence is performed for properties in North Goa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We review basic property documentation before a listing is shared, and recommend involving a property lawyer for a full legal review before you close a transaction.",
      },
    },
    {
      "@type": "Question",
      name: "How does the purchase process work for NRIs and foreign citizens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can guide you through our general search and viewing process. For eligibility and regulatory questions specific to NRIs or foreign nationals, we recommend confirming details with a property lawyer.",
      },
    },
    {
      "@type": "Question",
      name: "Can you assist with restoring or preserving Portuguese heritage bungalows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you are specifically looking for a heritage property, let us know and we will try to match you with relevant listings and connect you with professionals who specialize in restoration.",
      },
    },
    {
      "@type": "Question",
      name: "What are the current trends in micro markets like Assagao and Aldona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Demand and pricing vary by area and season. Our team can walk you through what we are currently seeing in the specific location you are interested in.",
      },
    },
    {
      "@type": "Question",
      name: "Do you help with renting property in Goa, not just buying and selling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we also assist with short-term and long-term rentals across Goa.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get in touch with Homes & Land Goa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can call or WhatsApp us at +91 96238 58108, email info@homesandlandgoa.com, or visit us at Casa Lotus, Porba Vaddo, Calangute.",
      },
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Homes and Land Goa",
  alternateName: "Homes and Land Goa",
  url: "https://www.homesandlandgoa.com/",
  logo: "https://www.homesandlandgoa.com/_next/static/media/logo.0f88f77d.png",
  image: "https://www.homesandlandgoa.com/_next/static/media/logo.0f88f77d.png",
  description:
    "Homes and Land Goa is a real estate agency in Goa helping buyers, sellers, and renters with villas, apartments, and plots across North and South Goa.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Casa Lotus, H/No. 4/213 A, Porba Vaddo",
    addressLocality: "Calangute",
    addressRegion: "Goa",
    postalCode: "403516",
    addressCountry: "IN",
  },
  telephone: "+91-9623858108",
  email: "info@homesandlandgoa.com",
  sameAs: [
    "https://www.instagram.com/homes.land.goa",
    "https://facebook.com/yourprofile",
  ],
  areaServed: {
    "@type": "Place",
    name: "Goa, India",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9623858108",
    contactType: "customer service",
    email: "info@homesandlandgoa.com",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://www.homesandlandgoa.com/#organization",
  name: "Homes and Land Goa",
  alternateName: "Homes and Land Goa",
  url: "https://www.homesandlandgoa.com/",
  logo: "https://www.homesandlandgoa.com/_next/static/media/logo.0f88f77d.png",
  image: "https://www.homesandlandgoa.com/_next/static/media/logo.0f88f77d.png",
  description:
    "Homes and Land Goa is a real estate agency based in Calangute, Goa, helping buyers, sellers, and renters with villas, apartments, and plots across North and South Goa.",
  telephone: "+91-9623858108",
  email: "info@homesandlandgoa.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Casa Lotus, H/No. 4/213 A, Porba Vaddo",
    addressLocality: "Calangute",
    addressRegion: "Goa",
    postalCode: "403516",
    addressCountry: "IN",
  },
  areaServed: [
    {
      "@type": "Place",
      name: "North Goa",
    },
    {
      "@type": "Place",
      name: "South Goa",
    },
  ],
  sameAs: [
    "https://www.instagram.com/homes.land.goa",
    "https://facebook.com/yourprofile",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9623858108",
    contactType: "customer service",
    email: "info@homesandlandgoa.com",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Property Buying Assistance in Goa",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Property Selling Assistance in Goa",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Property Rental Assistance in Goa",
      },
    },
  ],
};

function Landing() {

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
      />
      <Hero />
      {/* <HeroSection/> */}
      <About />
      <Services />
      <WhyChooseUs />
      <FeaturedProperties />
      <AreasWeCover />
      <UpcomingProjectsPreview />
      <CallToAction />
      <Testimonials />
      <HowItWorks />
      <Blogs />
      <div className="-mt-12">
        <FAQ />
      </div>
      {/* 
      <PopularResidences />
      <Stats />

      <ReviewSection />
      <TopBlogs />
      <ContactInfo />
      {/* <HelpSection /> */}
      {/* <FAQPage />  */}
      <WhatsAppButton />
      <ScrollToTopButton />
    </div>
  );
}

export default Landing;
