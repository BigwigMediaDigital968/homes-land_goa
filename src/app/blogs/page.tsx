import type { Metadata } from "next";
import banner from "../../../assets/luxury_and_rich_home_exterior_side_view.png";
import PageHero from "../../../components/ui/PageHero";
import JsonLd from "../../../components/ui/JsonLd";
import BlogListings from "../../../components/blogs/BlogListings";
import ContactInfo from "../../../components/ContactInfo";
import { getBlogs } from "@/lib/blogs";
import { blogListingSchema, realEstateAgentSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "Goa Property Blog | Buying, Selling & Renting Guides";
const DESCRIPTION =
  "Guides and updates on the Goa property market from Homes & Land Goa — what to check before you buy, what selling involves, and how renting works across North and South Goa.";
const HERO_ALT = "A villa in Goa featured on the Homes & Land Goa blog";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blogs` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: `${SITE_URL}/blogs`,
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

// Posts are fetched on the server and refreshed every 5 minutes
export const revalidate = 300;

export default async function BlogsPage() {
  const posts = await getBlogs();

  return (
    <main className="flex min-h-screen w-full flex-col bg-bg">
      {/* The breadcrumb schema is emitted by PageHero */}
      <JsonLd
        data={[
          blogListingSchema({
            posts: posts ?? [],
            path: "/blogs",
            title: TITLE,
            description: DESCRIPTION,
          }),
          realEstateAgentSchema(
            `${SITE_URL}/blogs`,
            `${SITE_URL}${banner.src}`,
          ),
        ]}
      />

      <PageHero
        eyebrow="Homes & Land Goa Blog"
        title="Goa Property Insights"
        description="Guides and updates on buying, selling and renting property in Goa, written by our team in Calangute."
        breadcrumbs={[{ label: "Blogs" }]}
        path="/blogs"
        image={{ src: banner, alt: HERO_ALT }}
      />

      <BlogListings initialPosts={posts ?? []} fetchFailed={posts === null} />

      <ContactInfo />
    </main>
  );
}
