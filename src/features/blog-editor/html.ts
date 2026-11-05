/**
 * Pretty-printer for the HTML source view. Editors store HTML on one long line,
 * which is painful to edit by hand; this indents block elements and keeps
 * inline content (text, <strong>, <a>, ...) together on one line.
 * Pure string function - no DOM needed.
 */

const VOID = new Set(["img", "br", "hr", "input", "source", "meta", "link", "col", "wbr"]);
const BLOCK = new Set([
  "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "table",
  "thead", "tbody", "tfoot", "tr", "td", "th", "figure", "figcaption", "div", "section",
  "article", "pre", "hr", "iframe", "details", "summary", "dl", "dt", "dd",
]);

interface TextNode { text: string }
interface ElNode { tag: string; open: string; close: string; children: Node[]; isVoid: boolean }
type Node = TextNode | ElNode;
const isEl = (n: Node): n is ElNode => "tag" in n;

function parse(html: string): Node[] {
  const root: ElNode = { tag: "#root", open: "", close: "", children: [], isVoid: false };
  const stack: ElNode[] = [root];
  const top = () => stack[stack.length - 1];

  for (const token of html.split(/(<!--[\s\S]*?-->|<[^>]+>)/g)) {
    if (!token) continue;
    if (!token.startsWith("<") || token.startsWith("<!--")) {
      top().children.push({ text: token });
      continue;
    }
    const closing = /^<\//.test(token);
    const tag = (token.match(/^<\/?\s*([a-zA-Z][\w-]*)/)?.[1] ?? "").toLowerCase();
    if (!tag) {
      top().children.push({ text: token });
    } else if (closing) {
      const idx = stack.map((n) => n.tag).lastIndexOf(tag);
      if (idx > 0) {
        stack[idx].close = token;
        stack.length = idx; // leniently close anything left open inside
      }
    } else {
      const el: ElNode = { tag, open: token, close: "", children: [], isVoid: VOID.has(tag) || /\/>$/.test(token) };
      top().children.push(el);
      if (!el.isVoid) stack.push(el);
    }
  }
  return root.children;
}

const hasBlockChild = (n: ElNode) => n.children.some((c) => isEl(c) && BLOCK.has(c.tag));

/** Single-line rendering (used for inline content and <pre>). */
function inline(nodes: Node[]): string {
  return nodes
    .map((n) => (isEl(n) ? n.open + inline(n.children) + n.close : n.text))
    .join("");
}

function render(nodes: Node[], depth: number, out: string[]) {
  const pad = "  ".repeat(depth);
  let run: Node[] = [];
  const flush = () => {
    const text = inline(run).replace(/\s+/g, " ").trim();
    if (text) out.push(pad + text);
    run = [];
  };

  for (const n of nodes) {
    if (!isEl(n) || !BLOCK.has(n.tag)) {
      run.push(n);
      continue;
    }
    flush();
    if (n.tag === "pre" || n.isVoid) {
      out.push(pad + inline([n])); // whitespace-sensitive / no children
    } else if (hasBlockChild(n)) {
      out.push(pad + n.open);
      render(n.children, depth + 1, out);
      out.push(pad + n.close);
    } else {
      out.push(pad + n.open + inline(n.children).replace(/\s+/g, " ").trim() + n.close);
    }
  }
  flush();
}

export function formatHtml(html: string): string {
  if (!html.trim()) return "";
  const out: string[] = [];
  render(parse(html), 0, out);
  return out.join("\n");
}
