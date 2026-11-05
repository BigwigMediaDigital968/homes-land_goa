/**
 * Cleans HTML saved by older editors (Quill, pasted Google Docs) so it follows
 * the app theme. Pure string transforms - safe on the server and in the browser.
 * Applied when rendering a post and when opening one for editing; the stored
 * HTML is only replaced if the post is saved again.
 *
 *  - near-black text colours / transparent backgrounds (invisible on dark themes)
 *  - Quill bullet lists (<ol><li data-list="bullet">) -> real <ul>
 *  - Quill alignment classes (ql-align-*) -> text-align
 *  - empty Quill UI spans
 */

const isDark = (r: number, g: number, b: number) => r <= 70 && g <= 70 && b <= 70;

function cleanStyle(style: string): string {
  return style
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .filter((decl) => {
      const idx = decl.indexOf(":");
      const prop = decl.slice(0, idx).trim().toLowerCase();
      const val = decl.slice(idx + 1).trim().toLowerCase();
      if (prop === "background-color" || prop === "background") {
        return !(val === "transparent" || val === "none" || /^rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)$/.test(val));
      }
      if (prop === "color") {
        if (val === "black" || val === "#000" || val === "#000000") return false;
        const m = val.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
        if (m) return !isDark(+m[1], +m[2], +m[3]);
      }
      return true;
    })
    .join("; ");
}

export function normalizeLegacyHtml(html: string): string {
  if (!html) return html;

  let out = html
    // Quill list markers
    .replace(/<span class="ql-ui"[^>]*><\/span>/g, "")
    // inline styles: drop invisible colours, keep everything else
    .replace(/style="([^"]*)"/g, (_m, style: string) => {
      const cleaned = cleanStyle(style);
      return cleaned ? `style="${cleaned}"` : "";
    })
    // alignment classes -> inline text-align
    .replace(/class="ql-align-(center|right|justify)"/g, 'style="text-align: $1"')
    // tidy what the cleanup left behind: "<span >" and attribute-less text spans
    .replace(/<(\w+)\s+>/g, "<$1>")
    .replace(/<span>([^<]*)<\/span>/g, "$1");

  // <ol> blocks whose items are marked data-list="bullet" -> <ul> (split mixed runs)
  out = out.replace(/<ol>([\s\S]*?)<\/ol>/g, (whole, inner: string) => {
    if (!/data-list="/.test(inner)) return whole;
    const items = inner.match(/<li[^>]*>[\s\S]*?<\/li>/g);
    if (!items) return whole;
    let html2 = "";
    let current = "";
    let buffer = "";
    const flush = () => {
      if (!buffer) return;
      const tag = current === "bullet" ? "ul" : "ol";
      html2 += `<${tag}>${buffer}</${tag}>`;
      buffer = "";
    };
    for (const li of items) {
      const kind = /data-list="bullet"/.test(li) ? "bullet" : "ordered";
      if (kind !== current) flush();
      current = kind;
      buffer += li.replace(/\sdata-list="\w+"/, "");
    }
    flush();
    return html2;
  });

  return out;
}
