"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Eye, ImagePlus, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import { normalizeLegacyHtml } from "./legacy";

export interface BlogFormPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags?: string[] | string;
  coverImage?: string;
  schemaMarkup?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface BlogFormModalProps {
  /** e.g. https://api.example.com  — endpoints used: POST /blog/add, PUT /blog/:slug, POST /blog/upload-image */
  apiBase: string;
  /** Returns the admin Authorization header(s). */
  getAuthHeaders: () => Record<string, string>;
  existingBlog?: BlogFormPost | null;
  /** Public URL prefix shown before the slug, e.g. "example.com/blogs/" */
  urlPrefix?: string;
  onClose: () => void;
  onSuccess: () => void;
  /**
   * Positioning of the editor root. Default fills a host content area that has
   * 1.5rem (p-6) padding. Use "fixed inset-0 z-50" for a full-screen overlay.
   */
  className?: string;
}

const slugify = (v: string) =>
  v.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

const field =
  "w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-muted focus:border-primary focus:outline-none";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted";

function Section({ title, children, hint }: { title: string; children: React.ReactNode; hint?: string }) {
  return (
    <section className="border-b border-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-fg">{title}</h3>
        {hint && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] text-primary">{hint}</span>}
      </div>
      {children}
    </section>
  );
}

/** Full-screen blog editor (create + edit). Theme comes from the app's CSS tokens. */
export default function BlogFormModal({
  apiBase, getAuthHeaders, existingBlog = null, urlPrefix = "/blogs/", onClose, onSuccess,
  className = "-m-6 h-[calc(100%+3rem)]",
}: BlogFormModalProps) {
  const editing = !!existingBlog;
  const [title, setTitle] = useState(existingBlog?.title ?? "");
  const [slug, setSlug] = useState(existingBlog?.slug ?? "");
  const [excerpt, setExcerpt] = useState(existingBlog?.excerpt ?? "");
  const [content, setContent] = useState(() => normalizeLegacyHtml(existingBlog?.content ?? ""));
  const [author, setAuthor] = useState(existingBlog?.author ?? "");
  const [tags, setTags] = useState(
    Array.isArray(existingBlog?.tags) ? existingBlog!.tags.join(", ") : (existingBlog?.tags as string) ?? "",
  );
  const [cover, setCover] = useState<File | null>(null);
  const [schemas, setSchemas] = useState<string[]>(existingBlog?.schemaMarkup?.length ? existingBlog.schemaMarkup : []);
  const [faqs, setFaqs] = useState(existingBlog?.faqs?.length ? existingBlog.faqs : []);
  const [showSettings, setShowSettings] = useState(true);
  const [preview, setPreview] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const coverPreview = useMemo(
    () => (cover ? URL.createObjectURL(cover) : existingBlog?.coverImage ?? ""),
    [cover, existingBlog?.coverImage],
  );
  useEffect(() => () => { if (cover && coverPreview) URL.revokeObjectURL(coverPreview); }, [cover, coverPreview]);

  const touch = <T,>(set: (v: T) => void) => (v: T) => { set(v); setDirty(true); };

  const uploadImage = useCallback(async (file: File) => {
    const body = new FormData();
    body.append("image", file);
    const res = await fetch(`${apiBase}/blog/upload-image`, { method: "POST", headers: getAuthHeaders(), body });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.url) throw new Error(data.error || "Image upload failed");
    return data.url as string;
  }, [apiBase, getAuthHeaders]);

  const listImages = useCallback(async (cursor?: string) => {
    const res = await fetch(`${apiBase}/blog/media${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`, { headers: getAuthHeaders() });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Could not load the media library");
    return data as { items: { url: string; name?: string }[]; next: string | null };
  }, [apiBase, getAuthHeaders]);

  const close = () => {
    if (dirty && !confirm("You have unsaved changes. Leave without saving?")) return;
    onClose();
  };

  const save = async () => {
    setError("");
    const plain = content.replace(/<[^>]*>/g, "").trim();
    if (!title.trim() || !slug.trim() || !excerpt.trim() || !author.trim()) {
      return setError("Title, slug, meta description and author are required.");
    }
    if (!plain && !/<img\b|<iframe\b/.test(content)) return setError("Write some content first.");
    if (!editing && !cover) return setError("A cover image is required.");
    const badSchema = schemas.findIndex((s) => { try { JSON.parse(s); return false; } catch { return !!s.trim(); } });
    if (badSchema >= 0) return setError(`Custom schema ${badSchema + 1} is not valid JSON.`);

    const body = new FormData();
    body.append("title", title.trim());
    body.append("slug", slug.trim());
    body.append("excerpt", excerpt.trim());
    body.append("content", content);
    body.append("author", author.trim());
    body.append("tags", tags);
    if (cover) body.append("coverImage", cover);
    // always sent (even empty) so removing every FAQ on edit clears them
    body.append("faqs", JSON.stringify(faqs));
    schemas.filter((s) => s.trim()).forEach((s) => body.append("schemaMarkup", s));

    setSaving(true);
    try {
      const res = await fetch(editing ? `${apiBase}/blog/${existingBlog!.slug}` : `${apiBase}/blog/add`, {
        method: editing ? "PUT" : "POST", headers: getAuthHeaders(), body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || data.msg || "Something went wrong");
      setDirty(false);
      onSuccess();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network or server error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`rte-modal flex flex-col bg-bg text-fg ${className}`}>
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
        <button type="button" onClick={close} aria-label="Back to posts" className="rounded p-2 hover:bg-surface-elevated">
          <ArrowLeft size={18} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">{editing ? "Edit post" : "New post"}</p>
          <p className="truncate text-sm font-semibold">{title || "Untitled"}</p>
        </div>
        <span className="hidden text-xs text-fg-muted sm:block">{dirty ? "Unsaved changes" : "All changes saved"}</span>
        <button type="button" onClick={() => setPreview((p) => !p)} aria-pressed={preview}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary aria-pressed:border-primary aria-pressed:text-primary">
          {preview ? <Pencil size={14} /> : <Eye size={14} />} {preview ? "Edit" : "Preview"}
        </button>
        <button type="button" onClick={() => setShowSettings((s) => !s)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary">
          {showSettings ? "Hide settings" : "Show settings"}
        </button>
        <button type="button" onClick={save} disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-on-primary hover:bg-primary-hover disabled:opacity-60">
          <Save size={16} /> {saving ? "Saving…" : editing ? "Update" : "Save"}
        </button>
      </header>

      {error && (
        <div role="alert" className="flex items-center justify-between bg-red-950 px-4 py-2 text-sm text-red-200">
          {error}
          <button type="button" aria-label="Dismiss" onClick={() => setError("")}><X size={16} /></button>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* Main column */}
        {preview ? (
          <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-8" aria-label="Post preview">
            <article className="mx-auto max-w-4xl">
              <p className="mb-4 rounded bg-primary/15 px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-widest text-primary">
                Preview — not published
              </p>
              {tags.split(",")[0]?.trim() && (
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">{tags.split(",")[0].trim()}</p>
              )}
              <h1 className="font-serif text-4xl font-light leading-tight md:text-5xl">{title || "Untitled"}</h1>
              {excerpt && <p className="mt-6 font-serif text-xl italic text-fg/80">{excerpt}</p>}
              <p className="mt-6 border-y border-border py-3 text-xs uppercase tracking-[0.15em] text-fg-muted">
                By <span className="text-fg">{author || "Author"}</span>
              </p>
              {coverPreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverPreview} alt="" className="mt-8 aspect-[16/9] w-full object-cover" />
              )}
              <div className="rte-content mt-10" dangerouslySetInnerHTML={{ __html: content }} />
              {faqs.some((f) => f.question && f.answer) && (
                <section className="mt-12">
                  <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Frequently Asked Questions</h2>
                  <div className="divide-y divide-border border-y border-border">
                    {faqs.filter((f) => f.question && f.answer).map((f, i) => (
                      <details key={i} className="py-4">
                        <summary className="cursor-pointer font-serif text-xl">{f.question}</summary>
                        <p className="mt-2 whitespace-pre-line text-sm text-fg/75">{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </main>
        ) : (
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-4 sm:p-8">
          <input
            value={title}
            onChange={(e) => {
              touch(setTitle)(e.target.value);
              if (!editing) setSlug(slugify(e.target.value));
            }}
            placeholder="Post title"
            aria-label="Post title"
            className="w-full bg-transparent font-serif text-4xl font-semibold text-fg placeholder:text-fg-muted/50 focus:outline-none"
          />
          <div className="mb-6 mt-3 flex items-center gap-1 text-sm text-fg-muted">
            <span className="shrink-0">{urlPrefix}</span>
            <input
              value={slug} readOnly={editing}
              onChange={(e) => touch(setSlug)(slugify(e.target.value))}
              placeholder="post-url-slug" aria-label="Slug"
              className="min-w-0 flex-1 bg-transparent text-fg focus:outline-none read-only:cursor-not-allowed read-only:opacity-70"
            />
          </div>
          <RichTextEditor value={content} onChange={touch(setContent)} onUploadImage={uploadImage} onListImages={listImages}
            placeholder="Start writing your post… paste from Google Docs, Word or any website" />
          </div>
        </main>
        )}

        {/* Settings sidebar */}
        {showSettings && (
          <aside className="hidden w-[380px] shrink-0 overflow-y-auto border-l border-border bg-surface md:block">
            <Section title="SEO">
              <label className={label} htmlFor="blog-excerpt">Meta description</label>
              <textarea id="blog-excerpt" rows={3} className={field} value={excerpt}
                onChange={(e) => touch(setExcerpt)(e.target.value)} placeholder="Summary shown in Google results and social shares" />
              <p className={`mt-1 text-xs ${excerpt.length > 160 ? "text-red-400" : "text-fg-muted"}`}>
                {excerpt.length}/160 · 120–160 characters works best
              </p>
              {/* Search-result preview */}
              <div className="mt-4 rounded-lg bg-white p-3 text-left">
                <p className="truncate text-xs text-neutral-600">{urlPrefix.replace(/^\/+/, "")}{slug}</p>
                <p className="truncate text-lg leading-snug text-blue-700">{title || "Post title"}</p>
                <p className="line-clamp-2 text-sm text-neutral-600">{excerpt || "Your meta description will appear here."}</p>
              </div>
            </Section>

            <Section title="Cover image" hint={editing ? undefined : "Required"}>
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files[0];
                  if (f?.type.startsWith("image/")) { setCover(f); setDirty(true); }
                }}
                className="flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed border-border text-center text-sm text-fg-muted hover:border-primary"
                style={{ minHeight: 160 }}
              >
                {coverPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverPreview} alt="Cover preview" className="aspect-[1200/630] w-full object-cover" />
                ) : (
                  <>
                    <ImagePlus size={28} className="text-primary" />
                    <span className="text-fg">Click or drop an image</span>
                    <span className="text-xs">1200 × 630 recommended</span>
                  </>
                )}
                <input type="file" accept="image/*" hidden
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) { setCover(f); setDirty(true); } }} />
              </label>
              {coverPreview && <p className="mt-2 text-xs text-fg-muted">Click or drop to replace.</p>}
            </Section>

            <Section title="Publishing">
              <label className={label} htmlFor="blog-author">Author</label>
              <input id="blog-author" className={field} value={author} onChange={(e) => touch(setAuthor)(e.target.value)} placeholder="Author name" />
              <label className={`${label} mt-4`} htmlFor="blog-tags">Tags</label>
              <input id="blog-tags" className={field} value={tags} onChange={(e) => touch(setTags)(e.target.value)} placeholder="goa, villas, investment" />
              <p className="mt-1 text-xs text-fg-muted">Comma separated. The first tag is shown as the category.</p>
            </Section>

            <Section title="FAQs" hint={faqs.length ? `${faqs.length}` : undefined}>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="space-y-2 rounded-lg border border-border p-3">
                    <input className={field} aria-label={`Question ${i + 1}`} placeholder="Question" value={faq.question}
                      onChange={(e) => { setFaqs((a) => a.map((v, j) => (j === i ? { ...v, question: e.target.value } : v))); setDirty(true); }} />
                    <textarea rows={3} className={field} aria-label={`Answer ${i + 1}`} placeholder="Answer" value={faq.answer}
                      onChange={(e) => { setFaqs((a) => a.map((v, j) => (j === i ? { ...v, answer: e.target.value } : v))); setDirty(true); }} />
                    <button type="button" className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                      onClick={() => { setFaqs((a) => a.filter((_, j) => j !== i)); setDirty(true); }}>
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => { setFaqs((a) => [...a, { question: "", answer: "" }]); setDirty(true); }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-sm text-fg-muted hover:border-primary hover:text-primary">
                  <Plus size={16} /> Add FAQ
                </button>
                <p className="text-xs text-fg-muted">Shown under the article and added as FAQ schema for Google.</p>
              </div>
            </Section>

            <Section title="Custom JSON-LD schema">
              <div className="space-y-3">
                {schemas.map((s, i) => {
                  let ok = true;
                  try { JSON.parse(s); } catch { ok = !s.trim(); }
                  return (
                    <div key={i}>
                      <textarea rows={5} value={s} spellCheck={false} aria-label={`Schema ${i + 1}`}
                        onChange={(e) => { setSchemas((a) => a.map((v, j) => (j === i ? e.target.value : v))); setDirty(true); }}
                        className={`${field} font-mono text-xs ${ok ? "" : "border-red-500"}`} placeholder='{"@context":"https://schema.org", …}' />
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className={ok ? "text-fg-muted" : "text-red-400"}>{ok ? "Valid JSON" : "Invalid JSON"}</span>
                        <button type="button" className="inline-flex items-center gap-1 text-red-400 hover:text-red-300"
                          onClick={() => { setSchemas((a) => a.filter((_, j) => j !== i)); setDirty(true); }}>
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button type="button" onClick={() => { setSchemas((a) => [...a, ""]); setDirty(true); }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-sm text-fg-muted hover:border-primary hover:text-primary">
                  <Plus size={16} /> Add custom schema
                </button>
              </div>
            </Section>
          </aside>
        )}
      </div>
    </div>
  );
}
