"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import { ImagePlus, Library, Link2, Upload, X } from "lucide-react";

export interface LibraryPage {
  items: { url: string; name?: string }[];
  next: string | null;
}

type Tab = "upload" | "url" | "library";
const MAX_MB = 10;

export default function ImageDialog({
  editor, onClose, onUpload, onList, initial, replace,
}: {
  editor: Editor;
  /** Attributes of the selected image when editing/replacing it. */
  initial?: Record<string, unknown>;
  /** With `initial`: start from a blank source so a new image is chosen. */
  replace?: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<string>;
  /** Provide to enable the Media library tab. */
  onList?: (cursor?: string) => Promise<LibraryPage>;
}) {
  const [tab, setTab] = useState<Tab>("upload");
  const str = (k: string) => (initial?.[k] as string | null | undefined) ?? "";
  const [src, setSrc] = useState(replace ? "" : str("src"));
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [alt, setAlt] = useState(str("alt"));
  const [title, setTitle] = useState(str("title"));
  const [caption, setCaption] = useState(str("caption"));
  const [width, setWidth] = useState(str("width"));
  const [align, setAlign] = useState(str("align") || "center");
  const [link, setLink] = useState(str("link"));
  const [lib, setLib] = useState<LibraryPage>({ items: [], next: null });
  const [libLoading, setLibLoading] = useState(false);
  const [libLoaded, setLibLoaded] = useState(false);

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [onClose]);

  const loadLibrary = async (cursor?: string) => {
    if (!onList) return;
    setLibLoading(true);
    setError("");
    try {
      const page = await onList(cursor);
      setLib((l) => ({ items: cursor ? [...l.items, ...page.items] : page.items, next: page.next }));
      setLibLoaded(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the media library");
    } finally {
      setLibLoading(false);
    }
  };

  useEffect(() => {
    if (tab === "library" && !libLoaded) loadLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const pickFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("That file is not an image.");
    if (file.size > MAX_MB * 1024 * 1024) return setError(`Image is larger than ${MAX_MB}MB.`);
    setError("");
    setUploading(true);
    try {
      setSrc(await onUpload(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const insert = () => {
    const attrs = {
      src, alt, title: title || null, caption: caption || null,
      width: width || null, align, link: link || null,
    };
    if (initial) editor.chain().focus().updateAttributes("image", attrs).run();
    else editor.chain().focus().insertContent({ type: "image", attrs }).run();
    onClose();
  };

  const tabs: [Tab, string, typeof Upload][] = [
    ["upload", "Upload", Upload],
    ["url", "From URL", Link2],
    ...(onList ? ([["library", "Media library", Library]] as [Tab, string, typeof Upload][]) : []),
  ];

  return (
    <div className="rte-dlg-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rte-dlg" role="dialog" aria-modal="true" aria-label={initial ? "Edit image" : "Insert image"}>
        <div className="rte-dlg-head">
          <h2>{initial ? (replace ? "Replace image" : "Edit image") : "Insert image"}</h2>
          <button type="button" className="rte-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="rte-dlg-body">
          <div className="rte-tabs" role="tablist">
            {tabs.map(([id, text, Icon]) => (
              <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>
                <Icon size={15} /> {text}
              </button>
            ))}
          </div>

          {tab === "upload" && (
            <label
              className="rte-drop"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                pickFile(e.dataTransfer.files[0]);
              }}
            >
              <ImagePlus size={36} />
              <strong>{uploading ? "Uploading…" : "Drop an image here or click to browse"}</strong>
              <small>JPG, PNG, WebP, GIF or AVIF · max {MAX_MB}MB · stored on Cloudinary</small>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  pickFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
          )}

          {tab === "url" && (
            <div className="rte-row">
              <input
                className="rte-input"
                style={{ flex: 1, height: 40 }}
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                autoFocus
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && urlInput.trim()) setSrc(urlInput.trim());
                }}
              />
              <button
                type="button"
                className="rte-primary-btn"
                style={{ height: 40 }}
                onClick={() => urlInput.trim() && setSrc(urlInput.trim())}
              >
                Use URL
              </button>
            </div>
          )}

          {tab === "library" && (
            <div>
              <div className="rte-grid">
                {lib.items.map((it) => (
                  <button key={it.url} type="button" aria-pressed={src === it.url} title={it.name} onClick={() => setSrc(it.url)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.url} alt={it.name ?? ""} loading="lazy" />
                  </button>
                ))}
              </div>
              {libLoaded && !lib.items.length && !libLoading && <p className="rte-hint">No uploaded images yet.</p>}
              {libLoading && <p className="rte-hint">Loading…</p>}
              {lib.next && !libLoading && (
                <button type="button" className="rte-btn" style={{ marginTop: 8 }} onClick={() => loadLibrary(lib.next!)}>
                  Load more
                </button>
              )}
            </div>
          )}

          {error && (
            <p className="rte-error" role="alert">
              {error}
            </p>
          )}

          {src && (
            <div className="rte-selected">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
              <span>Image ready</span>
            </div>
          )}

          <div className="rte-field">
            <label htmlFor="rte-alt">Alt text</label>
            <input
              id="rte-alt"
              className="rte-input"
              maxLength={125}
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="e.g. Team reviewing SEO report on a laptop"
            />
            <small>
              Describes the image for Google and screen readers. {alt.length}/125
              {!alt && (
                <>
                  {" "}· <span className="rte-warn">Recommended for SEO</span>
                </>
              )}
            </small>
          </div>

          <div className="rte-two">
            <div className="rte-field">
              <label htmlFor="rte-title">Title (tooltip)</label>
              <input id="rte-title" className="rte-input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="rte-field">
              <label htmlFor="rte-caption">Caption</label>
              <input
                id="rte-caption"
                className="rte-input"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Shown under the image"
              />
            </div>
            <div className="rte-field">
              <label htmlFor="rte-width">Width</label>
              <select id="rte-width" className="rte-select" value={width} onChange={(e) => setWidth(e.target.value)}>
                <option value="">Auto (original)</option>
                {[25, 50, 75, 100].map((w) => (
                  <option key={w} value={w}>
                    {w}%
                  </option>
                ))}
              </select>
            </div>
            <div className="rte-field">
              <label htmlFor="rte-align">Alignment</label>
              <select id="rte-align" className="rte-select" value={align} onChange={(e) => setAlign(e.target.value)}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>

          <div className="rte-field">
            <label htmlFor="rte-link">Link (optional)</label>
            <input
              id="rte-link"
              className="rte-input"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://… (clicking the image opens this)"
            />
          </div>
        </div>

        <div className="rte-dlg-foot">
          <button type="button" className="rte-btn" style={{ padding: "0 16px" }} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="rte-primary-btn"
            style={{ height: 40, padding: "0 20px" }}
            disabled={!src || uploading}
            onClick={insert}
          >
            {initial ? "Update image" : "Insert image"}
          </button>
        </div>
      </div>
    </div>
  );
}
