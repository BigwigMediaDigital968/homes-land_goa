"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BlogEditorForm from "../../BlogEditorForm";
import type { BlogFormPost } from "@/features/blog-editor";

export default function EditBlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogFormPost | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        setBlog(data);
        setStatus("ready");
      })
      .catch(() => !cancelled && setStatus("missing"));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") return <p className="text-gray-400">Loading…</p>;
  if (status === "missing" || !blog) {
    return (
      <div className="space-y-3">
        <p>That blog post could not be found.</p>
        <Link href="/adminblogs" className="text-[var(--primary-color)] underline">
          Back to all blogs
        </Link>
      </div>
    );
  }
  return <BlogEditorForm existingBlog={blog} onDone={() => router.push("/adminblogs")} />;
}
