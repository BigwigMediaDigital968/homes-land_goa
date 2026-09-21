"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Reports the `?type=` query param to the page. Kept as its own renderless
 * component so `useSearchParams` sits inside a small <Suspense> boundary and
 * the rest of the page stays in the server-rendered HTML.
 */
export default function TypeParamSync({
  onChange,
}: {
  onChange: (type: string | null) => void;
}) {
  const type = useSearchParams().get("type");

  useEffect(() => {
    onChange(type);
  }, [type, onChange]);

  return null;
}
