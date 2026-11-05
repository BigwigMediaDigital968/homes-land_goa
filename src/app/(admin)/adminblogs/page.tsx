"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  ExternalLink,
  FileText,
  ImageIcon,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { authHeader } from "@/store/authStore";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags?: string[];
  datePublished: string;
  lastUpdated?: string;
  slug: string;
  coverImage: string;
}

type Sort = "newest" | "oldest" | "title";
const PAGE_SIZE = 10;
const API = process.env.NEXT_PUBLIC_API_BASE;

const fmtDate = (v?: string) => {
  const d = v ? new Date(v) : null;
  return d && !Number.isNaN(d.getTime())
    ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "—";
};

/** "Updated" is only worth showing when it differs from the publish day. */
const wasUpdated = (b: BlogPost) =>
  !!b.lastUpdated &&
  new Date(b.lastUpdated).toDateString() !== new Date(b.datePublished).toDateString();

function IconAction({
  label,
  onClick,
  href,
  external,
  danger,
  children,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  const cls = `inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-fg-muted transition-colors ${
    danger ? "hover:bg-red-500/10 hover:text-red-400" : "hover:bg-surface-elevated hover:text-primary"
  } focus-visible:outline-2 focus-visible:outline-primary`;
  return href ? (
    <Link
      href={href}
      title={label}
      aria-label={label}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  ) : (
    <button type="button" title={label} aria-label={label} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

function Modal({
  title,
  onClose,
  children,
  footer,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`flex max-h-[90vh] w-full flex-col rounded-2xl border border-border bg-surface shadow-2xl ${
          wide ? "max-w-3xl" : "max-w-md"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-bold text-fg">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-fg-muted hover:bg-surface-elevated hover:text-fg"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
        <div className="flex justify-end gap-3 border-t border-border px-5 py-4">{footer}</div>
      </div>
    </div>
  );
}

const ghostBtn =
  "cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-fg-muted hover:bg-surface-elevated hover:text-fg";
const primaryBtn =
  "cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [notice, setNotice] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [page, setPage] = useState(1);

  const [htmlFor, setHtmlFor] = useState<BlogPost | null>(null);
  const [html, setHtml] = useState("");
  const [imageFor, setImageFor] = useState<BlogPost | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch(`${API}/blog/viewblog`);
      if (!res.ok) throw new Error();
      setBlogs(await res.json());
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // auto-dismiss notices
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const newImagePreview = useMemo(() => (newImage ? URL.createObjectURL(newImage) : ""), [newImage]);
  useEffect(() => () => { if (newImagePreview) URL.revokeObjectURL(newImagePreview); }, [newImagePreview]);

  const visible = useMemo(() => {
    const base = query.trim()
      ? new Fuse(blogs, { keys: ["title", "author", "slug", "tags"], threshold: 0.3, ignoreLocation: true })
          .search(query)
          .map((r) => r.item)
      : [...blogs];
    if (!query.trim()) {
      base.sort((a, b) =>
        sort === "title"
          ? a.title.localeCompare(b.title)
          : (new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime()) *
            (sort === "newest" ? -1 : 1),
      );
    }
    return base;
  }, [blogs, query, sort]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = visible.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const from = visible.length ? (safePage - 1) * PAGE_SIZE + 1 : 0;

  const handleDelete = async (b: BlogPost) => {
    if (!confirm(`Delete "${b.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API}/blog/${b.slug}`, { method: "DELETE", headers: authHeader() });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.msg || "Failed to delete");
      setNotice({ type: "ok", text: "Blog post deleted." });
      fetchBlogs();
    } catch (e) {
      setNotice({ type: "error", text: e instanceof Error ? e.message : "Error deleting blog post" });
    }
  };

  const saveHtml = async () => {
    if (!htmlFor) return;
    setBusy(true);
    try {
      const res = await fetch(`${API}/blog/${htmlFor.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({ content: html }),
      });
      if (!res.ok) throw new Error();
      setNotice({ type: "ok", text: "Blog content updated." });
      setHtmlFor(null);
      fetchBlogs();
    } catch {
      setNotice({ type: "error", text: "Failed to update the blog content." });
    } finally {
      setBusy(false);
    }
  };

  const saveImage = async () => {
    if (!imageFor || !newImage) return;
    setBusy(true);
    try {
      const body = new FormData();
      body.append("coverImage", newImage);
      const res = await fetch(`${API}/blog/${imageFor.slug}/image`, {
        method: "PATCH",
        headers: authHeader(),
        body,
      });
      if (!res.ok) throw new Error();
      setNotice({ type: "ok", text: "Cover image updated." });
      setImageFor(null);
      setNewImage(null);
      fetchBlogs();
    } catch {
      setNotice({ type: "error", text: "Failed to update the cover image." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl text-fg">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blogs</h1>
          <p className="mt-1 text-sm text-fg-muted">
            {loading ? "Loading posts…" : `${blogs.length} ${blogs.length === 1 ? "post" : "posts"}`}
          </p>
        </div>
        <Link
          href="/adminblogs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-on-primary hover:bg-primary-hover"
        >
          <Plus size={16} /> Add Blog
        </Link>
      </div>

      {notice && (
        <div
          role="status"
          className={`mb-4 flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm ${
            notice.type === "ok"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {notice.text}
          <button type="button" aria-label="Dismiss" className="cursor-pointer" onClick={() => setNotice(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search aria-hidden size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by title, author, tag or slug…"
            aria-label="Search blogs"
            className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-fg placeholder:text-fg-muted focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          aria-label="Sort blogs"
          disabled={!!query.trim()}
          title={query.trim() ? "Results are ordered by relevance while searching" : undefined}
          className="cursor-pointer rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-fg focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-fg-muted">
                <th className="px-5 py-4">Post</th>
                <th className="hidden px-4 py-4 md:table-cell">Author</th>
                <th className="hidden px-4 py-4 sm:table-cell">Published</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} aria-hidden>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-24 animate-pulse rounded-md bg-surface-elevated" />
                        <div className="space-y-2">
                          <div className="h-3.5 w-64 max-w-full animate-pulse rounded bg-surface-elevated" />
                          <div className="h-3 w-40 animate-pulse rounded bg-surface-elevated" />
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 md:table-cell"><div className="h-3.5 w-24 animate-pulse rounded bg-surface-elevated" /></td>
                    <td className="hidden px-4 sm:table-cell"><div className="h-3.5 w-20 animate-pulse rounded bg-surface-elevated" /></td>
                    <td />
                  </tr>
                ))}

              {!loading &&
                rows.map((b) => (
                  <tr key={b._id} className="transition-colors hover:bg-surface-elevated/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md bg-surface-elevated">
                          {b.coverImage ? (
                            <Image src={b.coverImage} alt="" fill sizes="96px" className="object-cover" />
                          ) : (
                            <FileText aria-hidden size={20} className="absolute inset-0 m-auto text-fg-muted" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/adminblogs/${b.slug}/edit`}
                            className="line-clamp-2 font-semibold text-fg hover:text-primary"
                          >
                            {b.title}
                          </Link>
                          <p className="mt-0.5 truncate text-xs text-fg-muted">
                            {b.tags?.[0] && <span className="text-primary">{b.tags[0]} · </span>}/{b.slug}
                          </p>
                          <p className="mt-0.5 text-xs text-fg-muted md:hidden">{b.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-4 text-fg/90 md:table-cell">{b.author}</td>
                    <td className="hidden whitespace-nowrap px-4 py-4 sm:table-cell">
                      <p className="text-fg/90">{fmtDate(b.datePublished)}</p>
                      {wasUpdated(b) && <p className="mt-0.5 text-xs text-fg-muted">Updated {fmtDate(b.lastUpdated)}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-0.5">
                        <IconAction label="Edit post" href={`/adminblogs/${b.slug}/edit`}><Pencil size={16} /></IconAction>
                        <IconAction label="View on site" href={`/blogs/${b.slug}`} external><ExternalLink size={16} /></IconAction>
                        <IconAction label="Edit HTML" onClick={() => { setHtmlFor(b); setHtml(b.content); }}><Code size={16} /></IconAction>
                        <IconAction label="Change cover image" onClick={() => setImageFor(b)}><ImageIcon size={16} /></IconAction>
                        <IconAction label="Delete post" danger onClick={() => handleDelete(b)}><Trash2 size={16} /></IconAction>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Empty / error states */}
        {!loading && loadError && (
          <div className="px-6 py-14 text-center">
            <p className="font-semibold">Couldn&apos;t load your blogs</p>
            <p className="mt-1 text-sm text-fg-muted">Check your connection and try again.</p>
            <button type="button" onClick={fetchBlogs} className={`${primaryBtn} mt-4`}>Retry</button>
          </div>
        )}
        {!loading && !loadError && visible.length === 0 && (
          <div className="px-6 py-14 text-center">
            <FileText aria-hidden size={32} className="mx-auto text-fg-muted" />
            <p className="mt-3 font-semibold">{query.trim() ? "No blogs match your search" : "No blogs yet"}</p>
            <p className="mt-1 text-sm text-fg-muted">
              {query.trim() ? "Try a different title, author or tag." : "Write your first post to see it here."}
            </p>
            {query.trim() ? (
              <button type="button" onClick={() => setQuery("")} className={`${ghostBtn} mt-4`}>Clear search</button>
            ) : (
              <Link href="/adminblogs/new" className={`${primaryBtn} mt-4 inline-block`}>Add Blog</Link>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && visible.length > PAGE_SIZE && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3 text-sm text-fg-muted">
            <span>
              Showing {from}–{Math.min(safePage * PAGE_SIZE, visible.length)} of {visible.length}
            </span>
            <nav aria-label="Pagination" className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={safePage === 1}
                onClick={() => setPage(safePage - 1)}
                className="cursor-pointer rounded-lg p-2 hover:bg-surface-elevated disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((n) => n === 1 || n === totalPages || Math.abs(n - safePage) <= 1)
                .map((n, i, arr) => (
                  <span key={n} className="flex items-center gap-1">
                    {i > 0 && n - arr[i - 1] > 1 && <span aria-hidden>…</span>}
                    <button
                      type="button"
                      aria-current={n === safePage ? "page" : undefined}
                      onClick={() => setPage(n)}
                      className={`h-9 min-w-9 cursor-pointer rounded-lg px-2 font-semibold ${
                        n === safePage ? "bg-primary text-on-primary" : "hover:bg-surface-elevated hover:text-fg"
                      }`}
                    >
                      {n}
                    </button>
                  </span>
                ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={safePage === totalPages}
                onClick={() => setPage(safePage + 1)}
                className="cursor-pointer rounded-lg p-2 hover:bg-surface-elevated disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Edit HTML */}
      {htmlFor && (
        <Modal
          wide
          title={`Edit HTML — ${htmlFor.title}`}
          onClose={() => setHtmlFor(null)}
          footer={
            <>
              <button type="button" className={ghostBtn} onClick={() => setHtmlFor(null)}>Cancel</button>
              <button type="button" className={primaryBtn} disabled={busy} onClick={saveHtml}>
                {busy ? "Saving…" : "Save"}
              </button>
            </>
          }
        >
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            spellCheck={false}
            aria-label="Blog HTML"
            className="h-80 w-full rounded-lg border border-border bg-bg p-3 font-mono text-xs leading-relaxed text-fg focus:border-primary focus:outline-none"
          />
        </Modal>
      )}

      {/* Change cover */}
      {imageFor && (
        <Modal
          title="Change cover image"
          onClose={() => { setImageFor(null); setNewImage(null); }}
          footer={
            <>
              <button type="button" className={ghostBtn} onClick={() => { setImageFor(null); setNewImage(null); }}>Cancel</button>
              <button type="button" className={primaryBtn} disabled={!newImage || busy} onClick={saveImage}>
                {busy ? "Uploading…" : "Update"}
              </button>
            </>
          }
        >
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-border text-center text-sm text-fg-muted hover:border-primary">
            {newImagePreview || imageFor.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={newImagePreview || imageFor.coverImage} alt="Cover preview" className="aspect-[1200/630] w-full object-cover" />
            ) : (
              <span className="py-10">Click to choose an image</span>
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
            />
          </label>
          <p className="mt-2 text-xs text-fg-muted">
            {newImage ? newImage.name : "Click the image to choose a new one (1200 × 630 recommended)."}
          </p>
        </Modal>
      )}
    </div>
  );
}
