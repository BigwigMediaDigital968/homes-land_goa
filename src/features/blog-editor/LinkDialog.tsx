"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import { X } from "lucide-react";

/** "example.com/x" -> "https://example.com/x"; /paths, #anchors, mailto:, tel: untouched. */
function normalizeUrl(raw: string) {
  const v = raw.trim();
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(v)) return v;
  return /^[\w-]+(\.[\w-]+)+/.test(v) ? `https://${v}` : v;
}

export default function LinkDialog({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const existing = editor.getAttributes("link") as { href?: string; target?: string; rel?: string };
  const isEditing = !!existing.href;
  const [url, setUrl] = useState(existing.href ?? "");
  const [newTab, setNewTab] = useState(existing.target === "_blank");
  const [nofollow, setNofollow] = useState(/\bnofollow\b/.test(existing.rel ?? ""));

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [onClose]);

  const apply = () => {
    const href = normalizeUrl(url);
    if (!href) return;
    const rel = [newTab && "noopener noreferrer", nofollow && "nofollow"].filter(Boolean).join(" ") || null;
    const attrs = { href, target: newTab ? "_blank" : null, rel };
    const chain = editor.chain().focus();
    if (editor.state.selection.empty && !isEditing) {
      // nothing selected: insert the URL itself as the link text
      chain.insertContent({ type: "text", text: href, marks: [{ type: "link", attrs }] }).run();
    } else {
      chain.extendMarkRange("link").setLink(attrs).run();
    }
    onClose();
  };

  const remove = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  };

  return (
    <div className="rte-dlg-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rte-dlg rte-sm" role="dialog" aria-modal="true" aria-label="Insert link">
        <div className="rte-dlg-head">
          <h2>{isEditing ? "Edit link" : "Insert link"}</h2>
          <button type="button" className="rte-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="rte-dlg-body">
          <div className="rte-field">
            <label htmlFor="rte-link-url">URL</label>
            <input
              id="rte-link-url"
              className="rte-input"
              autoFocus
              value={url}
              placeholder="https://"
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  apply();
                }
              }}
            />
            <small>Use /blogs/… for pages on this site, #heading-id for anchors</small>
          </div>
          <label className="rte-check">
            <input type="checkbox" checked={newTab} onChange={(e) => setNewTab(e.target.checked)} />
            Open in new tab
          </label>
          <label className="rte-check">
            <input type="checkbox" checked={nofollow} onChange={(e) => setNofollow(e.target.checked)} />
            Add rel=&quot;nofollow&quot; (sponsored or untrusted links)
          </label>
        </div>

        <div className="rte-dlg-foot">
          {isEditing && (
            <button type="button" className="rte-btn" style={{ marginRight: "auto", color: "var(--rte-danger)" }} onClick={remove}>
              Remove link
            </button>
          )}
          <button type="button" className="rte-btn" style={{ padding: "0 16px" }} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="rte-primary-btn"
            style={{ height: 40, padding: "0 20px" }}
            disabled={!url.trim()}
            onClick={apply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
