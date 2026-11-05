"use client";

import { useRef, type CSSProperties } from "react";
import { AlignLeft } from "lucide-react";
import { formatHtml } from "./html";
import "./rich-editor.css";

/**
 * Raw-HTML editing area: monospace, Tab inserts indentation (Esc then Tab
 * leaves the field, so keyboard users are never trapped) and a Format button
 * that re-indents the markup.
 */
export default function SourceEditor({
  value,
  onChange,
  className,
  style,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}) {
  const escaped = useRef(false);

  return (
    <div className={`rte-srcwrap ${className ?? ""}`} style={style}>
      <div className="rte-srcbar">
        <span>HTML source</span>
        <span className="rte-srchint">Tab indents · Esc then Tab leaves the field</span>
        <button
          type="button"
          className="rte-btn"
          title="Re-indent the HTML"
          onClick={() => onChange(formatHtml(value))}
        >
          <AlignLeft size={14} /> Format
        </button>
      </div>
      <textarea
        className="rte-source"
        spellCheck={false}
        aria-label="HTML source"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            escaped.current = true;
            return;
          }
          if (e.key === "Tab" && !e.shiftKey && !escaped.current) {
            e.preventDefault();
            const el = e.currentTarget;
            el.setRangeText("  ", el.selectionStart, el.selectionEnd, "end");
            onChange(el.value);
          }
          if (e.key !== "Tab") escaped.current = false;
        }}
      />
    </div>
  );
}
