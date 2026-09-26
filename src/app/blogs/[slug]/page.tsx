import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogDetails from "../../../../components/blogs/BlogDetails";
import JsonLd from "../../../../components/ui/JsonLd";
import { getBlog, getRelatedBlogs, type BlogPost } from "@/lib/blogs";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Params = Promise<{ slug: string }>;

const DESCRIPTION_MAX = 155;

// Posts are fetched on the server and refreshed every 5 minutes
export const revalidate = 300;

function buildDescription(blog: BlogPost) {
  const text = (blog.excerpt || blog.content.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  return text.length > DESCRIPTION_MAX
    ? `${text.slice(0, DESCRIPTION_MAX - 1).trimEnd()}…`
    : text;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: `Article Not Found | ${SITE_NAME}`,
      robots: { index: false, follow: true },
    };
  }

  const url = `${SITE_URL}/blogs/${blog.slug}`;
  const title = `${blog.title} | ${SITE_NAME}`;
  const description = buildDescription(blog);
  const images = blog.coverImage
    ? [{ url: blog.coverImage, alt: blog.title }]
    : [];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_IN",
      siteName: SITE_NAME,
      url,
      title,
      description,
      images,
      ...(blog.datePublished && { publishedTime: blog.datePublished }),
      ...(blog.lastUpdated && { modifiedTime: blog.lastUpdated }),
      authors: [blog.author],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((img) => img.url),
    },
  };
}

export default async function BlogDetailsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [blog, related] = await Promise.all([
    getBlog(slug),
    getRelatedBlogs(slug),
  ]);

  if (!blog) notFound();

  const url = `${SITE_URL}/blogs/${blog.slug}`;

  // One @graph: page, breadcrumb and the post itself
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: blog.title,
        description: buildDescription(blog),
        inLanguage: "en-IN",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#article` },
        ...(blog.coverImage && { primaryImageOfPage: blog.coverImage }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: `${SITE_URL}/blogs`,
          },
          { "@type": "ListItem", position: 3, name: blog.title, item: url },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: blog.title,
        description: buildDescription(blog),
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        ...(blog.coverImage && { image: blog.coverImage }),
        ...(blog.datePublished && { datePublished: blog.datePublished }),
        dateModified: blog.lastUpdated || blog.datePublished,
        ...(blog.tags.length && { keywords: blog.tags.join(", ") }),
        author: { "@type": "Person", name: blog.author },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <BlogDetails blog={blog} related={related} />
    </>
  );
}
