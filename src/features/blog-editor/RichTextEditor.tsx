"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, Baseline, Bold, Code,
  FileCode, Highlighter, ImagePlus, IndentDecrease, IndentIncrease, Italic,
  Link2, List, ListChecks, ListOrdered, Maximize2, Minimize2, Minus,
  Quote, Redo2, RemoveFormatting, SquareCode, Strikethrough, Subscript,
  Superscript, Table as TableIcon, Trash2, Underline, Undo2, Youtube,
} from "lucide-react";
import { buildExtensions } from "./extensions";
import LinkDialog from "./LinkDialog";
import SourceEditor from "./SourceEditor";
import { formatHtml } from "./html";
import ImageDialog, { type LibraryPage } from "./ImageDialog";
import "./rich-editor.css";

export interface RichTextEditorProps {
  /** HTML string. Read on mount and whenever it differs from the editor. */
  value: string;
  onChange: (html: string) => void;
  /** Upload one image (e.g. to Cloudinary) and resolve with its public URL. */
  onUploadImage: (file: File) => Promise<string>;
  /** Optional: list previously uploaded images (enables the Media library tab). */
  onListImages?: (cursor?: string) => Promise<LibraryPage>;
  placeholder?: string;
}

/**
 * Pasted HTML (Google Docs, Word, websites) carries its own colours, fonts and
 * sizes - typically black text, invisible on a dark theme. Drop those so pasted
 * text takes the app's styling; structure and bold/italic/links/tables stay.
 * Colours / fonts you choose from the toolbar are not affected.
 */
const STRIP_STYLES = [
  "color", "background", "background-color", "font-family", "font-size",
  "line-height", "letter-spacing", "text-indent",
];
function cleanPastedHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  // Google Docs wraps everything in <b style="font-weight:normal" id="docs-internal-guid-...">
  doc.querySelectorAll('b[id^="docs-internal-guid"]').forEach((b) => b.replaceWith(...Array.from(b.childNodes)));
  doc.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
    STRIP_STYLES.forEach((prop) => el.style.removeProperty(prop));
    if (!el.getAttribute("style")?.trim()) el.removeAttribute("style");
  });
  doc.querySelectorAll("font[color], font[face], font[size]").forEach((f) => {
    f.removeAttribute("color");
    f.removeAttribute("face");
    f.removeAttribute("size");
  });
  doc.querySelectorAll("style, meta, link").forEach((n) => n.remove());
  return doc.body.innerHTML;
}

const PALETTE = [
  "#ffffff", "#f5efe9", "#ce9c81", "#e3c5b5", "#8a8a8a", "#000000",
  "#e5484d", "#f5a524", "#f5d90a", "#30a46c", "#0091ff", "#8e4ec6",
];
const HIGHLIGHTS = [
  "#fde68a", "#e3c5b5", "#ce9c81", "#bbf7d0", "#bfdbfe", "#fbcfe8",
  "#fdba74", "#ddd6fe", "#fef08a", "#a7f3d0", "#fecaca", "#e5e5e5",
];
const FONTS = [
  ["", "Font"], ["Georgia, serif", "Serif"], ["Arial, sans-serif", "Sans"],
  ["'Courier New', monospace", "Mono"], ["'Cormorant Garamond', serif", "Cormorant"],
  ["Montserrat, sans-serif", "Montserrat"],
];
const SIZES = ["", "12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px", "48px"];

function Btn({
  label, onClick, active, disabled, children,
}: {
  label: string; onClick: () => void; active?: boolean; disabled?: boolean; children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="rte-btn"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // keep the editor selection when clicking toolbar buttons
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/** Button that opens a small popover. Closes on outside click / Escape. */
function Pop({
  label, icon, active, children,
}: {
  label: string; icon: ReactNode; active?: boolean;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <Btn label={label} active={active || open} onClick={() => setOpen((o) => !o)}>{icon}</Btn>
      {open && <div className="rte-pop">{children(() => setOpen(false))}</div>}
    </div>
  );
}

function UrlForm({
  placeholder, initial = "", submitLabel, onSubmit, extra,
}: {
  placeholder: string; initial?: string; submitLabel: string;
  onSubmit: (url: string) => void; extra?: ReactNode;
}) {
  const [url, setUrl] = useState(initial);
  const submit = () => url.trim() && onSubmit(url.trim());
  return (
    <>
      <input
        autoFocus
        className="rte-input"
        placeholder={placeholder}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
      />
      <div style={{ display: "flex", gap: 6, justifyContent: "space-between" }}>
        {extra ?? <span />}
        <button type="button" className="rte-primary-btn" onClick={submit}>{submitLabel}</button>
      </div>
    </>
  );
}

function ColorPop({
  label, icon, current, onPick, onClear, colors = PALETTE,
}: {
  label: string; icon: ReactNode; current?: string; colors?: string[];
  onPick: (c: string) => void; onClear: () => void;
}) {
  return (
    <Pop label={label} icon={icon} active={!!current}>
      {(close) => (
        <>
          <div className="rte-swatches">
            {colors.map((c) => (
              <button
                key={c} type="button" aria-label={c} className="rte-swatch" style={{ background: c }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onPick(c); close(); }}
              />
            ))}
          </div>
          <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12 }}>
            Custom
            <input type="color" value={/^#[0-9a-f]{6}$/i.test(current ?? "") ? current : "#ce9c81"}
              onChange={(e) => onPick(e.target.value)} />
          </label>
          <button type="button" className="rte-btn" style={{ justifyContent: "flex-start" }}
            onClick={() => { onClear(); close(); }}>Remove colour</button>
        </>
      )}
    </Pop>
  );
}

function Toolbar({
  editor, onPickImage, onOpenLink, sourceMode, onToggleSource, fullscreen, onToggleFullscreen,
}: {
  editor: Editor; onPickImage: () => void; onOpenLink: () => void; sourceMode: boolean; onToggleSource: () => void;
  fullscreen: boolean; onToggleFullscreen: () => void;
}) {
  // re-render only when something the toolbar shows actually changes
  const s = useEditorState({
    editor,
    selector: ({ editor: e, transactionNumber }) => ({
      tn: transactionNumber,
      blockType: e.isActive("heading")
        ? `h${e.getAttributes("heading").level}`
        : e.isActive("codeBlock") ? "code" : "p",
      font: (e.getAttributes("textStyle").fontFamily as string) ?? "",
      size: (e.getAttributes("textStyle").fontSize as string) ?? "",
      color: e.getAttributes("textStyle").color as string | undefined,
      highlight: e.getAttributes("highlight").color as string | undefined,
      link: e.getAttributes("link").href as string | undefined,
      canUndo: e.can().undo(), canRedo: e.can().redo(),
      inTable: e.isActive("table"),
      image: e.isActive("image") ? e.getAttributes("image") : null,
    }),
  });
  const cmd = () => editor.chain().focus(); // new chain per click
  const is = (n: string, a?: Record<string, unknown>) => editor.isActive(n, a);
  const off = sourceMode;

  return (
    <>
      <div className="rte-toolbar" role="toolbar" aria-label="Formatting">
        <Btn label="Undo" disabled={off || !s.canUndo} onClick={() => cmd().undo().run()}><Undo2 size={16} /></Btn>
        <Btn label="Redo" disabled={off || !s.canRedo} onClick={() => cmd().redo().run()}><Redo2 size={16} /></Btn>
        <span className="rte-sep" />

        <select className="rte-select" aria-label="Block type" disabled={off} value={s.blockType}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "p") cmd().setParagraph().run();
            else if (v === "code") cmd().setCodeBlock().run();
            else cmd().setHeading({ level: Number(v[1]) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
          }}>
          <option value="p">Paragraph</option>
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={`h${n}`}>Heading {n}</option>)}
          <option value="code">Code block</option>
        </select>
        <select className="rte-select" aria-label="Font" disabled={off} value={s.font}
          onChange={(e) => (e.target.value ? cmd().setFontFamily(e.target.value) : cmd().unsetFontFamily()).run()}>
          {FONTS.map(([v, l]) => <option key={l} value={v}>{l}</option>)}
        </select>
        <select className="rte-select" aria-label="Font size" disabled={off} value={s.size}
          onChange={(e) => (e.target.value ? cmd().setFontSize(e.target.value) : cmd().unsetFontSize()).run()}>
          {SIZES.map((v) => <option key={v} value={v}>{v ? v.replace("px", "") : "Size"}</option>)}
        </select>
        <span className="rte-sep" />

        <Btn label="Bold" disabled={off} active={is("bold")} onClick={() => cmd().toggleBold().run()}><Bold size={16} /></Btn>
        <Btn label="Italic" disabled={off} active={is("italic")} onClick={() => cmd().toggleItalic().run()}><Italic size={16} /></Btn>
        <Btn label="Underline" disabled={off} active={is("underline")} onClick={() => cmd().toggleUnderline().run()}><Underline size={16} /></Btn>
        <Btn label="Strikethrough" disabled={off} active={is("strike")} onClick={() => cmd().toggleStrike().run()}><Strikethrough size={16} /></Btn>
        <Btn label="Subscript" disabled={off} active={is("subscript")} onClick={() => cmd().toggleSubscript().run()}><Subscript size={16} /></Btn>
        <Btn label="Superscript" disabled={off} active={is("superscript")} onClick={() => cmd().toggleSuperscript().run()}><Superscript size={16} /></Btn>
        <Btn label="Inline code" disabled={off} active={is("code")} onClick={() => cmd().toggleCode().run()}><Code size={16} /></Btn>
        <span className="rte-sep" />

        {!off && (
          <>
            <ColorPop label="Text colour" icon={<Baseline size={16} style={{ color: s.color }} />} current={s.color}
              onPick={(col) => cmd().setColor(col).run()} onClear={() => cmd().unsetColor().run()} />
            <ColorPop label="Highlight" icon={<Highlighter size={16} />} current={s.highlight} colors={HIGHLIGHTS}
              onPick={(col) => cmd().setHighlight({ color: col }).run()} onClear={() => cmd().unsetHighlight().run()} />
          </>
        )}
        <span className="rte-sep" />

        <Btn label="Align left" disabled={off} active={is("paragraph", { textAlign: "left" }) || is("heading", { textAlign: "left" })} onClick={() => cmd().setTextAlign("left").run()}><AlignLeft size={16} /></Btn>
        <Btn label="Align centre" disabled={off} active={editor.isActive({ textAlign: "center" })} onClick={() => cmd().setTextAlign("center").run()}><AlignCenter size={16} /></Btn>
        <Btn label="Align right" disabled={off} active={editor.isActive({ textAlign: "right" })} onClick={() => cmd().setTextAlign("right").run()}><AlignRight size={16} /></Btn>
        <Btn label="Justify" disabled={off} active={editor.isActive({ textAlign: "justify" })} onClick={() => cmd().setTextAlign("justify").run()}><AlignJustify size={16} /></Btn>
        <span className="rte-sep" />

        <Btn label="Bullet list" disabled={off} active={is("bulletList")} onClick={() => cmd().toggleBulletList().run()}><List size={16} /></Btn>
        <Btn label="Numbered list" disabled={off} active={is("orderedList")} onClick={() => cmd().toggleOrderedList().run()}><ListOrdered size={16} /></Btn>
        <Btn label="Task list" disabled={off} active={is("taskList")} onClick={() => cmd().toggleTaskList().run()}><ListChecks size={16} /></Btn>
        <Btn label="Outdent" disabled={off} onClick={() => (is("taskItem") ? cmd().liftListItem("taskItem") : cmd().liftListItem("listItem")).run()}><IndentDecrease size={16} /></Btn>
        <Btn label="Indent" disabled={off} onClick={() => (is("taskItem") ? cmd().sinkListItem("taskItem") : cmd().sinkListItem("listItem")).run()}><IndentIncrease size={16} /></Btn>
        <span className="rte-sep" />

        {!off && (
          <>
            <Btn label="Link" active={!!s.link} onClick={onOpenLink}><Link2 size={16} /></Btn>
            <Btn label="Insert image" onClick={onPickImage}><ImagePlus size={16} /></Btn>
            <Pop label="YouTube video" icon={<Youtube size={16} />}>
              {(close) => (
                <UrlForm placeholder="YouTube URL" submitLabel="Embed"
                  onSubmit={(u) => { cmd().setYoutubeVideo({ src: u }).run(); close(); }} />
              )}
            </Pop>
            <Btn label="Insert table" active={s.inTable} onClick={() => cmd().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableIcon size={16} /></Btn>
          </>
        )}
        <Btn label="Quote" disabled={off} active={is("blockquote")} onClick={() => cmd().toggleBlockquote().run()}><Quote size={16} /></Btn>
        <Btn label="Code block" disabled={off} active={is("codeBlock")} onClick={() => cmd().toggleCodeBlock().run()}><SquareCode size={16} /></Btn>
        <Btn label="Divider" disabled={off} onClick={() => cmd().setHorizontalRule().run()}><Minus size={16} /></Btn>
        <Btn label="Clear formatting" disabled={off} onClick={() => cmd().unsetAllMarks().clearNodes().run()}><RemoveFormatting size={16} /></Btn>
        <span className="rte-sep" />
        <Btn label="Edit HTML source" active={sourceMode} onClick={onToggleSource}><FileCode size={16} /></Btn>
        <Btn label={fullscreen ? "Exit full screen" : "Full screen"} onClick={onToggleFullscreen}>
          {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </Btn>
      </div>

      {!off && s.inTable && (
        <div className="rte-imgbar">
          Table
          <button type="button" className="rte-btn" onClick={() => cmd().addRowAfter().run()}>+ Row</button>
          <button type="button" className="rte-btn" onClick={() => cmd().addColumnAfter().run()}>+ Column</button>
          <button type="button" className="rte-btn" onClick={() => cmd().deleteRow().run()}>− Row</button>
          <button type="button" className="rte-btn" onClick={() => cmd().deleteColumn().run()}>− Column</button>
          <button type="button" className="rte-btn" onClick={() => cmd().toggleHeaderRow().run()}>Header row</button>
          <button type="button" className="rte-btn" onClick={() => cmd().mergeOrSplit().run()}>Merge/split</button>
          <Btn label="Delete table" onClick={() => cmd().deleteTable().run()}><Trash2 size={14} /></Btn>
        </div>
      )}
    </>
  );
}

export default function RichTextEditor({
  value, onChange, onUploadImage, onListImages, placeholder = "Start writing your post…",
}: RichTextEditorProps) {
  const [sourceMode, setSourceMode] = useState(false);
  const [source, setSource] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState("");
  const [imageDialog, setImageDialog] = useState<null | { initial?: Record<string, unknown>; replace?: boolean }>(null);
  const [linkDialog, setLinkDialog] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const uploadRef = useRef(onUploadImage);
  uploadRef.current = onUploadImage;

  // TipTap re-applies options whenever their identity changes, which re-renders
  // and steals focus from other inputs (e.g. the post title). Keep every
  // non-callback option referentially stable.
  const initialContent = useRef(value).current;
  const lastHtml = useRef(value); // last HTML we know the editor holds
  const extensions = useMemo(
    () =>
      buildExtensions(placeholder, (replace) => {
        const e = editorRef.current;
        if (e) setImageDialog({ initial: e.getAttributes("image"), replace });
      }),
    [placeholder],
  );
  const editorProps = useMemo(
    () => ({
      transformPastedHTML: cleanPastedHtml,
      handlePaste: (_v: unknown, ev: ClipboardEvent) => insertFiles(ev.clipboardData?.files),
      handleDrop: (_v: unknown, ev: DragEvent) => insertFiles(ev.dataTransfer?.files),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const editor = useEditor({
    extensions,
    content: initialContent,
    immediatelyRender: false, // Next.js SSR
    autofocus: false,
    editorProps,
    onUpdate: ({ editor: e }) => {
      lastHtml.current = e.getHTML();
      onChange(lastHtml.current);
    },
  });

  editorRef.current = editor;

  /** Upload dropped/pasted/picked images and insert each as it finishes. */
  function insertFiles(files?: FileList | null) {
    const images = Array.from(files ?? []).filter((f) => f.type.startsWith("image/"));
    if (!images.length) return false;
    images.forEach(async (file) => {
      setUploading((n) => n + 1);
      setError("");
      try {
        const src = await uploadRef.current(file);
        editorRef.current?.chain().focus().setImage({ src, alt: "" }).run();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Image upload failed");
      } finally {
        setUploading((n) => n - 1);
      }
    });
    return true;
  }

  // Pull in external value changes (e.g. editing an existing post). Typing in
  // the editor itself never lands here: those values equal lastHtml.
  useEffect(() => {
    if (!editor || sourceMode || value === lastHtml.current) return;
    lastHtml.current = value;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor, sourceMode]);

  useEffect(() => {
    if (!fullscreen) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setFullscreen(false);
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [fullscreen]);

  if (!editor) return <div className="rte-root" style={{ minHeight: 480 }} />;

  const toggleSource = () => {
    if (!sourceMode) setSource(formatHtml(editor.getHTML()));
    else {
      editor.commands.setContent(source, { emitUpdate: true });
    }
    setSourceMode(!sourceMode);
  };

  const text = editor.getText();
  const words = editor.storage.characterCount.words();
  const images = (editor.getHTML().match(/<img\b/g) ?? []).length;

  return (
    <div className={`rte-root${fullscreen ? " rte-fullscreen" : ""}`}>
      <Toolbar
        editor={editor} onPickImage={() => setImageDialog({})} onOpenLink={() => setLinkDialog(true)}
        sourceMode={sourceMode} onToggleSource={toggleSource}
        fullscreen={fullscreen} onToggleFullscreen={() => setFullscreen((f) => !f)}
      />
      {linkDialog && <LinkDialog editor={editor} onClose={() => setLinkDialog(false)} />}

      {imageDialog && (
        <ImageDialog editor={editor} initial={imageDialog.initial} replace={imageDialog.replace} onClose={() => setImageDialog(null)} onUpload={onUploadImage} onList={onListImages} />
      )}

      {sourceMode ? (
        <SourceEditor
          value={source}
          onChange={(v) => { setSource(v); onChange(v); }}
          style={{ flex: 1, minHeight: 420 }}
        />
      ) : (
        <div className="rte-area" onClick={() => editor.chain().focus().run()}>
          <EditorContent editor={editor} className="rte-content" />
        </div>
      )}

      <div className="rte-footer" aria-live="polite">
        <span>{words} words</span>
        <span>{text.length} characters</span>
        <span>~{Math.max(1, Math.round(words / 200))} min read</span>
        <span>{images} images</span>
        {error && <span style={{ color: "var(--rte-danger)" }}>{error}</span>}
        {uploading > 0 && <span className="rte-uploading">Uploading {uploading} image{uploading > 1 ? "s" : ""}…</span>}
      </div>
    </div>
  );
}
