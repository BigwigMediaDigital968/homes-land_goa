"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import Pagination from "../listings/Pagination";
import BlogCard from "./BlogCard";
import { normalizeBlogs, type BlogListItem } from "@/lib/blogs";

const POSTS_PER_PAGE = 6;

interface BlogListingsProps {
  /** Fetched on the server so the cards are in the initial HTML. */
  initialPosts: BlogListItem[];
  /** True when the server fetch failed; the browser then fetches instead. */
  fetchFailed: boolean;
}

export default function BlogListings({
  initialPosts,
  fetchFailed,
}: BlogListingsProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(fetchFailed);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const listRef = useRef<HTMLDivElement | null>(null);

  // Only runs when the server couldn't reach the API
  useEffect(() => {
    if (!fetchFailed) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`)
      .then((res) => res.json())
      .then((data) => setPosts(normalizeBlogs(data)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [fetchFailed]);

  // Rebuilt only when the posts change, not on every keystroke
  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "excerpt", "author", "tags"],
        threshold: 0.3,
      }),
    [posts],
  );

  const filtered = useMemo(() => {
    const term = query.trim();
    if (!term) return posts;
    return fuse.search(term).map((result) => result.item);
  }, [query, posts, fuse]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const visible = filtered.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={listRef}
      aria-labelledby="blog-listings-heading"
      className="scroll-mt-24 border-t border-border bg-bg py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>Latest Posts</SectionEyebrow>
            <h2
              id="blog-listings-heading"
              className="mt-3 font-serif text-3xl font-light leading-tight text-fg md:text-4xl"
            >
              From the Blog
            </h2>
          </div>

          {!loading && (
            <p
              aria-live="polite"
              className="shrink-0 font-sans text-xs font-bold uppercase tracking-[0.2em] text-fg-muted"
            >
              {filtered.length} {filtered.length === 1 ? "post" : "posts"}
            </p>
          )}
        </div>

        {/* Search */}
        <div className="mt-8 border border-border bg-surface p-4 sm:p-5">
          <label
            htmlFor="blog-search"
            className="block font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-fg-muted"
          >
            Search the blog
          </label>

          <div className="relative mt-2">
            <Search
              aria-hidden
              strokeWidth={1.5}
              className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
            />
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, author or tag…"
              className="w-full border-0 bg-transparent py-1 pl-7 pr-9 font-serif text-lg font-light text-fg placeholder:font-sans placeholder:text-base placeholder:text-fg-muted focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-fg-muted transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            <div
              aria-busy="true"
              aria-label="Loading posts"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse border border-border bg-surface"
                >
                  <div className="aspect-[16/10] bg-surface-elevated" />
                  <div className="space-y-3 p-6">
                    <div className="h-3 w-1/3 bg-surface-elevated" />
                    <div className="h-6 w-3/4 bg-surface-elevated" />
                    <div className="h-3 w-full bg-surface-elevated" />
                    <div className="h-3 w-2/3 bg-surface-elevated" />
                  </div>
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="mx-auto max-w-2xl py-10 text-center">
              <h3 className="font-serif text-3xl font-light text-fg">
                {query ? "No Posts Match Your Search" : "No Posts Yet"}
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-white/80">
                {query
                  ? "Try a different title, author or tag."
                  : "We're working on it — check back soon."}
              </p>
            </div>
          ) : (
            <>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((post) => (
                  <li key={post._id}>
                    <BlogCard post={post} />
                  </li>
                ))}
              </ul>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                label="Blog pagination"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
