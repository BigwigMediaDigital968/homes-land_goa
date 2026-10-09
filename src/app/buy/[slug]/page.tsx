import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import BuyPropertyDetails from "../../../../components/buy/BuyPropertyDetails";
import JsonLd from "../../../../components/ui/JsonLd";
import {
  toPositiveNumber,
  toRoomCount,
  type Property,
} from "@/lib/properties";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/site";

type Params = Promise<{ slug: string }>;

const DESCRIPTION_MAX = 155;

/**
 * cache() shares one request between generateMetadata and the page, and the
 * fetch itself is cached for 5 minutes across requests.
 */
const getProperty = cache(async (slug: string): Promise<Property | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/property/${slug}`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return null;

    const data = await res.json();
    return data?.slug ? data : null;
  } catch {
    return null;
  }
});

// function buildDescription(p: Property) {
//   const text = p.description?.replace(/\s+/g, " ").trim();
//   if (text) {
//     return text.length > DESCRIPTION_MAX
//       ? `${text.slice(0, DESCRIPTION_MAX - 1).trimEnd()}…`
//       : text;
//   }

//   // No description in the CMS: fall back to the key facts
//   const beds = toRoomCount(p.bedrooms);
//   const area = toPositiveNumber(p.areaSqft);
//   const facts = [
//     beds && `${beds} bedroom`,
//     p.type?.toLowerCase() ?? "property",
//     "for sale",
//     p.location ? `in ${p.location}, Goa` : "in Goa",
//     area && `(${area.toLocaleString("en-IN")} sq ft)`,
//   ].filter(Boolean);
//   return `${facts.join(" ")}. View photos, price and details with ${SITE_NAME}.`;
// }

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    return {
      title: `Property Not Found | ${SITE_NAME}`,
      robots: { index: false, follow: true },
    };
  }

  const url = `${SITE_URL}/buy/${property.slug}`;
  const title = property.metaTitle?.trim();
  const description = property.metaDescription?.trim();
  const images = (property.images ?? []).slice(0, 4).map((src) => ({
    url: src,
    alt: `${property.title} for sale in ${property.location ?? "Goa"}`,
  }));

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      url,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((img) => img.url),
    },
  };
}

export default async function BuyDetailsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) notFound();

  const url = `${SITE_URL}/buy/${property.slug}`;
  const images = property.images ?? [];
  const featuresAmenities = property.featuresAmenities ?? [];
  const price = toPositiveNumber(property.price);
  const bedrooms = toRoomCount(property.bedrooms);
  const bathrooms = toRoomCount(property.bathrooms);
  const area = toPositiveNumber(property.areaSqft);
  const agentId = `${SITE_URL}/#agent`;

  // One @graph: page, breadcrumb, listing, the home itself and the agent
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemPage",
        "@id": `${url}#webpage`,
        url,
        name: property.metaTitle?.trim(),
        description: property.metaDescription?.trim(),
        inLanguage: "en-IN",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#listing` },
        ...(images[0] && { primaryImageOfPage: images[0] }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Buy",
            item: `${SITE_URL}/buy`,
          },
          { "@type": "ListItem", position: 3, name: property.title, item: url },
        ],
      },
      {
        "@type": "RealEstateAgent",
        "@id": agentId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        address: { "@type": "PostalAddress", ...BUSINESS.address },
        areaServed: { "@type": "State", name: "Goa" },
        sameAs: BUSINESS.sameAs,
      },
    ],
  };

  console.log(property)

  return (
    <>
      <JsonLd data={schema} />
      <BuyPropertyDetails property={property} />
    </>
  );
}
