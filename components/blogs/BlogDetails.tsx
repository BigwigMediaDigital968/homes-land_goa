import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Clock,
  MessageCircle,
  Newspaper,
  Phone,
} from "lucide-react";

import ContactInfo from "../ContactInfo";
import styles from "./BlogDetails.module.css";
import {
  formatBlogDate,
  readingMinutes,
  type BlogListItem,
  type BlogPost,
} from "@/lib/blogs";
import { BUSINESS } from "@/lib/site";

const eyebrowClass =
  "font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-primary";
const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

/** Everything visible on /blogs/[slug]; the route page only handles SEO. */
export default function BlogDetails({
  blog,
  related,
}: {
  blog: BlogPost;
  related: BlogListItem[];
}) {
  const published = formatBlogDate(blog.datePublished);
  const minutes = readingMinutes(blog.content);

  return (
    <main className="w-full bg-bg text-fg">
      <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 md:pt-36">
        {/* Breadcrumb (its schema is emitted by the route page) */}
        <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[11px] uppercase tracking-[0.2em]">
            <li>
              <Link
                href="/"
                className={`font-semibold text-fg-muted transition-colors duration-300 hover:text-fg ${focusClass}`}
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight aria-hidden className="h-3 w-3 text-primary/70" />
              <Link
                href="/blogs"
                className={`font-semibold text-fg-muted transition-colors duration-300 hover:text-fg ${focusClass}`}
              >
                Blogs
              </Link>
            </li>
            <li className="flex min-w-0 items-center gap-2">
              <ChevronRight aria-hidden className="h-3 w-3 text-primary/70" />
              <span
                aria-current="page"
                className="line-clamp-1 font-bold text-primary"
              >
                {blog.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT: the article */}
          <article className="min-w-0">
            <header>
              {blog.tags.length > 0 && (
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-primary" />
                  <p className={eyebrowClass}>{blog.tags[0]}</p>
                </div>
              )}

              <h1 className="max-w-5xl text-balance font-serif text-4xl font-light leading-[1.1] tracking-tight text-fg md:text-5xl">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="mt-6 max-w-4xl font-serif text-xl italic leading-relaxed text-fg/80">
                  {blog.excerpt}
                </p>
              )}

              <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4 font-sans text-xs uppercase tracking-[0.15em] text-fg-muted">
                <span>
                  By <span className="text-fg">{blog.author}</span>
                </span>
                {published && (
                  <>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                    <time dateTime={blog.datePublished}>{published}</time>
                  </>
                )}
                <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden className="h-3.5 w-3.5 text-primary" />
                  {minutes} min read
                </span>
              </p>
            </header>

            {blog.coverImage && (
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-surface-elevated">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  priority
                  sizes="(min-width: 1280px) 820px, (min-width: 1024px) 65vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div
              className={`${styles.content} mt-12 w-full max-w-5xl`}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Footer: tags + back link */}
            <footer className="mt-14 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              {blog.tags.length > 0 ? (
                <ul className="flex flex-wrap gap-2" aria-label="Tags">
                  {blog.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-border px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
              <Link
                href="/blogs"
                className={`group inline-flex min-h-11 items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:text-primary ${focusClass}`}
              >
                <ArrowLeft
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                All Articles
              </Link>
            </footer>
          </article>

          {/* RIGHT: sidebar — stacks under the article on mobile */}
          <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            {/* Enquiry card */}
            <section
              aria-labelledby="blog-enquiry"
              className="border border-border bg-surface p-7"
            >
              <p className={eyebrowClass}>Homes &amp; Land Goa</p>
              <h2
                id="blog-enquiry"
                className="mt-3 font-serif text-2xl font-normal leading-snug text-fg"
              >
                Looking to buy, sell or rent in Goa?
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-fg/75">
                Talk to our team in Calangute about listings, viewings and
                paperwork.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contacts"
                  className={`group inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-6 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-on-primary transition-colors duration-300 hover:bg-primary-hover ${focusClass}`}
                >
                  Enquire Now
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={BUSINESS.telephoneHref}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 border border-border font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-fg transition-colors duration-300 hover:border-primary hover:text-primary ${focusClass}`}
                  >
                    <Phone aria-hidden className="h-3.5 w-3.5" />
                    Call
                  </a>
                  <a
                    href={BUSINESS.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-12 items-center justify-center gap-2 border border-border font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-fg transition-colors duration-300 hover:border-primary hover:text-primary ${focusClass}`}
                  >
                    <MessageCircle aria-hidden className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </section>

            {/* Related posts */}
            {related.length > 0 && (
              <section aria-labelledby="related-posts">
                <div className="mb-6 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-primary" />
                  <h2 id="related-posts" className={eyebrowClass}>
                    Related Articles
                  </h2>
                </div>

                <ul className="divide-y divide-border border-y border-border">
                  {related.map((post) => (
                    <li key={post._id}>
                      <RelatedPost post={post} />
                    </li>
                  ))}
                </ul>

                <Link
                  href="/blogs"
                  className={`group mt-6 inline-flex min-h-11 items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-primary ${focusClass}`}
                >
                  View All Articles
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </section>
            )}
          </aside>
        </div>
      </div>

      <ContactInfo />
    </main>
  );
}

function RelatedPost({ post }: { post: BlogListItem }) {
  const published = formatBlogDate(post.datePublished);

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`group flex gap-4 py-5 ${focusClass}`}
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-surface-elevated">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface-elevated to-black-900">
            <Newspaper
              aria-hidden
              strokeWidth={1}
              className="h-7 w-7 text-primary/60"
            />
          </div>
        )}
      </div>

      <div className="min-w-0">
        {post.tags[0] && (
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            {post.tags[0]}
          </p>
        )}
        <h3 className="mt-1 line-clamp-2 font-serif text-lg leading-snug text-fg transition-colors duration-300 group-hover:text-primary">
          {post.title}
        </h3>
        {published && (
          <time
            dateTime={post.datePublished}
            className="mt-1 block font-sans text-xs text-fg-muted"
          >
            {published}
          </time>
        )}
      </div>
    </Link>
  );
}
