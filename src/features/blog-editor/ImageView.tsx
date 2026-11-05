"use client";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, ImagePlus, Pencil, Trash2 } from "lucide-react";

/**
 * How an image looks INSIDE the editor. When selected it shows a floating
 * toolbar above it (editing aid only, never part of the saved HTML).
 */
export default function ImageView({ node, selected, updateAttributes, deleteNode, extension }: NodeViewProps) {
  const { src, alt, title, width, align, caption } = node.attrs;
  const onEdit = (extension.options as { onEdit?: (replace: boolean) => void }).onEdit;
  const Btn = ({ label, on, pressed, children }: { label: string; on: () => void; pressed?: boolean; children: React.ReactNode }) => (
    <button type="button" title={label} aria-label={label} aria-pressed={pressed} onClick={on}>
      {children}
    </button>
  );

  return (
    <NodeViewWrapper
      as="figure"
      data-rte-image=""
      data-align={align}
      data-width={width ?? undefined}
      style={width ? { width: `${width}%` } : undefined}
    >
      {selected && (
        <div className="rte-imgfloat" contentEditable={false}>
          <Btn label="Align left" pressed={align === "left"} on={() => updateAttributes({ align: "left" })}><AlignLeft size={16} /></Btn>
          <Btn label="Align centre" pressed={align === "center"} on={() => updateAttributes({ align: "center" })}><AlignCenter size={16} /></Btn>
          <Btn label="Align right" pressed={align === "right"} on={() => updateAttributes({ align: "right" })}><AlignRight size={16} /></Btn>
          <span className="rte-sep" />
          {[25, 50, 75].map((w) => (
            <Btn key={w} label={`${w}% width`} pressed={Number(width) === w} on={() => updateAttributes({ width: w })}>{w}%</Btn>
          ))}
          <Btn label="Original size" pressed={!width} on={() => updateAttributes({ width: null })}>Auto</Btn>
          <span className="rte-sep" />
          <Btn label="Edit image details" on={() => onEdit?.(false)}><Pencil size={14} /> Edit</Btn>
          <Btn label="Replace image" on={() => onEdit?.(true)}><ImagePlus size={16} /></Btn>
          <Btn label="Delete image" on={() => deleteNode()}><Trash2 size={16} /></Btn>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ""}
        title={title ?? undefined}
        draggable={false}
        className={selected ? "ProseMirror-selectednode" : undefined}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </NodeViewWrapper>
  );
}
