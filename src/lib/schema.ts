import type { ListingProperty } from "../../components/listings/PropertyCard";
import { toPositiveNumber, toRoomCount } from "./properties";
import { BUSINESS, SITE_NAME, SITE_URL } from "./site";

/** schema.org type of the property itself; plots/land get none. */
function aboutType(type?: string) {
  const t = type?.toLowerCase() ?? "";
  if (/plot|land/.test(t)) return null;
  if (/apartment|flat/.test(t)) return "Apartment";
  if (/villa|house|bungalow/.test(t)) return "House";
  return "Accommodation";
}

/** RealEstateListing for one card on a listing page. */
function realEstateListing(p: ListingProperty, url: string) {
  const type = aboutType(p.type);
  const bedrooms = toRoomCount(p.bedrooms);
  const area = toPositiveNumber(p.areaSqft);
  const price = toPositiveNumber(p.price);
  const description = p.description?.replace(/\s+/g, " ").trim();

  return {
    "@type": "RealEstateListing",
    name: p.title,
    url,
    ...(description && { description }),
    ...(p.images[0] && { image: p.images[0] }),
    ...(type && {
      about: {
        "@type": type,
        name: p.title,
        address: {
          "@type": "PostalAddress",
          ...(p.location && { addressLocality: p.location }),
          addressRegion: "Goa",
          addressCountry: "IN",
        },
        ...(bedrooms && { numberOfBedrooms: bedrooms }),
        ...(area && {
          floorSize: { "@type": "QuantitativeValue", value: area, unitCode: "FTK" },
        }),
      },
    }),
    offers: {
      "@type": "Offer",
      ...(price && { price }),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      ...(p.purpose?.toLowerCase() === "rent" && {
        businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
      }),
      url,
    },
  };
}

interface ListingPageSchemaInput {
  properties: ListingProperty[];
  /** Route of the listing page, e.g. "/buy" → detail pages at /buy/[slug]. */
  path: string;
  title: string;
  description: string;
  listName: string;
}

/**
 * CollectionPage + ItemList + one RealEstateListing per property (the list
 * and listings only when there are listings).
 */
export function listingPageSchema({
  properties,
  path,
  title,
  description,
  listName,
}: ListingPageSchemaInput) {
  const pageUrl = `${SITE_URL}${path}`;
  const hasListings = properties.length > 0;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      ...(hasListings && { mainEntity: { "@id": `${pageUrl}#listings` } }),
    },
  ];

  if (hasListings) {
    graph.push({
      "@type": "ItemList",
      "@id": `${pageUrl}#listings`,
      name: listName,
      description,
      url: pageUrl,
      numberOfItems: properties.length,
      itemListElement: properties.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${pageUrl}/${p.slug}`,
        name: p.title,
      })),
    });
    graph.push(
      ...properties.map((p) => realEstateListing(p, `${pageUrl}/${p.slug}`)),
    );
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

interface ServicePageSchemaInput {
  /** Route of the page, e.g. "/sell". */
  path: string;
  title: string;
  description: string;
  /** The service being offered, e.g. "Property Valuation and Selling in Goa". */
  serviceName: string;
  serviceType: string;
}

/** WebPage + Service, for pages that offer a service rather than listings. */
export function servicePageSchema({
  path,
  title,
  description,
  serviceName,
  serviceType,
}: ServicePageSchemaInput) {
  const pageUrl = `${SITE_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: serviceName,
        serviceType,
        description,
        areaServed: { "@type": "State", name: "Goa" },
        provider: {
          "@type": "RealEstateAgent",
          name: SITE_NAME,
          url: SITE_URL,
          telephone: BUSINESS.telephone,
          email: BUSINESS.email,
          address: { "@type": "PostalAddress", ...BUSINESS.address },
        },
      },
    ],
  };
}

/**
 * A plain content page. `type` takes the specific schema.org WebPage subtype
 * ("ContactPage", "AboutPage", …). The business itself is emitted separately
 * via realEstateAgentSchema.
 */
export function webPageSchema({
  type = "WebPage",
  path,
  title,
  description,
}: {
  type?: "WebPage" | "ContactPage" | "AboutPage";
  path: string;
  title: string;
  description: string;
}) {
  const pageUrl = `${SITE_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}

interface BlogListingSchemaInput {
  posts: {
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    coverImage: string;
    datePublished: string;
  }[];
  path: string;
  title: string;
  description: string;
}

/** Blog + its BlogPosting entries, for the blog index. */
export function blogListingSchema({
  posts,
  path,
  title,
  description,
}: BlogListingSchemaInput) {
  const pageUrl = `${SITE_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${pageUrl}#blog`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${pageUrl}/${post.slug}`,
      ...(post.coverImage ? { image: post.coverImage } : {}),
      ...(post.datePublished ? { datePublished: post.datePublished } : {}),
      author: { "@type": "Person", name: post.author },
    })),
  };
}

/**
 * FAQPage. Pass the same items the visible FAQ renders: Google requires the
 * structured data to match the on-page text.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/**
 * RealEstateAgent (the business). `url` is the page reporting the entity;
 * `image` is that page's representative photo (usually its hero banner) and is
 * omitted when not supplied.
 */
export function realEstateAgentSchema(url: string = SITE_URL, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE_NAME,
    url,
    // Stable file in /public, not a hashed _next/static asset that changes
    // whenever the logo is re-imported or rebuilt
    logo: `${SITE_URL}/logo.png`,
    ...(image ? { image } : {}),
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: { "@type": "PostalAddress", ...BUSINESS.address },
    areaServed: { "@type": "State", name: "Goa" },
    sameAs: BUSINESS.sameAs,
  };
}
