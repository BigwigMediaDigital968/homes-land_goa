"use client";

import dynamic from "next/dynamic";
import { authHeader } from "@/store/authStore";
import type { BlogFormPost } from "@/features/blog-editor";

// The editor is heavy and browser-only: load it on demand
const BlogFormModal = dynamic(
  () => import("@/features/blog-editor/BlogFormModal"),
  { ssr: false },
);

/** Wires the portable blog editor to this app's API, auth and URLs. */
export default function BlogEditorForm({
  existingBlog,
  onDone,
}: {
  existingBlog: BlogFormPost | null;
  onDone: () => void;
}) {
  return (
    <BlogFormModal
      apiBase={process.env.NEXT_PUBLIC_API_BASE!}
      getAuthHeaders={authHeader}
      urlPrefix="homesandlandgoa.com/blogs/"
      existingBlog={existingBlog}
      onClose={onDone}
      onSuccess={() => {}}
    />
  );
}
