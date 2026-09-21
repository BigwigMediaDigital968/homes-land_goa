import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { formatBlogDate, type BlogListItem } from "@/lib/blogs";

export default function BlogCard({ post }: { post: BlogListItem }) {
  const href = `/blogs/${post.slug}`;
  const published = formatBlogDate(post.datePublished);

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-surface transition-colors duration-300 hover:border-primary/60">
      <Link href={href} tabIndex={-1} aria-hidden className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-elevated">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface-elevated to-black-900">
              <Newspaper
                aria-hidden
                strokeWidth={1}
                className="h-12 w-12 text-primary/60"
              />
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {post.tags.length > 0 && (
          <ul className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <li
                key={tag}
                className="border border-border px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <h3 className="font-serif text-2xl font-normal leading-snug text-fg">
          <Link
            href={href}
            className="transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-white/80">
          {post.excerpt}
        </p>

        <p className="mt-4 font-sans text-xs text-fg-muted">
          By {post.author}
          {published && (
            <>
              {" · "}
              <time dateTime={post.datePublished}>{published}</time>
            </>
          )}
        </p>

        <span
          aria-hidden
          className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-primary"
        >
          Read More
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
