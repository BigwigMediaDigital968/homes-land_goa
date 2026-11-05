import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageView from "./ImageView";
import StarterKit from "@tiptap/starter-kit";
import Image, { type ImageOptions } from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle, Color, FontFamily, FontSize } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

const imgOf = (el: HTMLElement) =>
  el.tagName === "IMG" ? el : (el.querySelector("img") as HTMLElement | null);

/**
 * Image saved as <figure data-rte-image data-align data-width>
 *   [<a href>]<img src alt title>[</a>] [<figcaption>]</figure>
 * Plain <img> from older posts still parses (via the img rule).
 */
const RichImage = Image.extend<ImageOptions & { onEdit: (replace: boolean) => void }>({
  addOptions() {
    return { ...this.parent?.(), onEdit: () => {} } as ImageOptions & { onEdit: (replace: boolean) => void };
  },
  addAttributes() {
    return {
      src: { default: null, parseHTML: (el) => imgOf(el)?.getAttribute("src") },
      alt: { default: "", parseHTML: (el) => imgOf(el)?.getAttribute("alt") ?? "" },
      title: { default: null, parseHTML: (el) => imgOf(el)?.getAttribute("title") },
      width: { default: null, parseHTML: (el) => el.getAttribute("data-width") },
      align: { default: "center", parseHTML: (el) => el.getAttribute("data-align") || "center" },
      caption: { default: null, parseHTML: (el) => el.querySelector("figcaption")?.textContent || null },
      link: { default: null, parseHTML: (el) => el.querySelector("a")?.getAttribute("href") || null },
    };
  },
  parseHTML() {
    return [{ tag: "figure[data-rte-image]" }, { tag: "img[src]" }];
  },
  renderHTML({ node }) {
    const { src, alt, title, width, align, caption, link } = node.attrs;
    const img = ["img", { src, alt: alt ?? "", ...(title && { title }), loading: "lazy" }];
    const inner = link
      ? ["a", { href: link, target: "_blank", rel: "noopener noreferrer" }, img]
      : img;
    return [
      "figure",
      {
        "data-rte-image": "",
        "data-align": align,
        ...(width && { "data-width": width, style: `width:${width}%` }),
      },
      inner,
      ...(caption ? [["figcaption", {}, caption]] : []),
    ] as never;
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
});

export const buildExtensions = (placeholder: string, onEditImage: (replace: boolean) => void) => [
  StarterKit.configure({
    heading: { levels: [1, 2, 3, 4, 5, 6] },
    link: { openOnClick: false, autolink: true, HTMLAttributes: { target: null, rel: null } },
  }),
  RichImage.configure({ allowBase64: false, onEdit: onEditImage }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextStyle,
  Color,
  FontFamily,
  FontSize,
  Highlight.configure({ multicolor: true }),
  Table.configure({ resizable: false }),
  TableRow,
  TableHeader,
  TableCell,
  Youtube.configure({ nocookie: true, controls: true }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Subscript,
  Superscript,
  Placeholder.configure({ placeholder }),
  CharacterCount,
];
