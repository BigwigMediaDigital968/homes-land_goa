"use client";

import { useRouter } from "next/navigation";
import BlogEditorForm from "../BlogEditorForm";

export default function NewBlogPage() {
  const router = useRouter();
  return <BlogEditorForm existingBlog={null} onDone={() => router.push("/adminblogs")} />;
}
