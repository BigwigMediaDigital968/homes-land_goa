"use client";
import React from "react";

const LANGUAGE_NAME_MAP: Record<string, string> = {
  en: "English",
  de: "German",
  fr: "French",
  hi: "Hindi",
  es: "Spanish",
  // add others optionally if you want name-based matching
};

function setCookie(name: string, value: string, days = 7, domain?: string) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const domainPart = domain ? `;domain=${domain}` : "";
  document.cookie = `${name}=${value};expires=${expires};path=/${domainPart}`;
}

const tryWriteAllCookieVariants = (val: string) => {
  // write several variants (no domain, with current hostname, with .hostname)
  setCookie("googtrans", val, 7);
  try {
    const host = location.hostname;
    if (host) {
      setCookie("googtrans", val, 7, host);
      // leading dot variant
      setCookie("googtrans", val, 7, "." + host);
    }
  } catch (e) {
    // ignore
  }
};

const LanguageSelector = () => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    if (!selectedLang) return;

    // value format used by the widget: /source/target  (we assume source is en)
    const cookieVal = `/en/${selectedLang}`;

    // 1) write cookies (multiple variants)
    tryWriteAllCookieVariants(cookieVal);

    // 2) set hash (many implementations also check this)
    try {
      window.location.hash = `#googtrans=/en/${selectedLang}`;
    } catch (err) {
      /* ignore */
    }

    // 3) try clicking the menu item inside the translate iframe (best-effort)
    const tryClickIframeAnchor = () =>
      new Promise<boolean>((resolve) => {
        let attempts = 0;
        const maxAttempts = 20;
        const interval = 250;

        const iv = setInterval(() => {
          attempts += 1;
          // multiple selectors just in case
          const iframe =
            (document.querySelector(
              "iframe.goog-te-menu-frame"
            ) as HTMLIFrameElement) ||
            (document.querySelector("iframe") as HTMLIFrameElement);

          if (!iframe) {
            if (attempts >= maxAttempts) {
              clearInterval(iv);
              resolve(false);
            }
            return;
          }

          let innerDoc: Document | null = null;
          try {
            innerDoc =
              iframe.contentDocument ||
              (iframe.contentWindow && iframe.contentWindow.document);
          } catch (err) {
            // cross-origin — we cannot access; bail out
            clearInterval(iv);
            resolve(false);
            return;
          }

          if (!innerDoc) {
            if (attempts >= maxAttempts) {
              clearInterval(iv);
              resolve(false);
            }
            return;
          }

          // Try different match methods:
          // 1) anchor href contains "#<lang>"
          // 2) data-lang or lang attribute
          // 3) anchor text contains language name (English/German...)
          const anchors = Array.from(
            innerDoc.querySelectorAll("a, button, div")
          ) as HTMLElement[];

          const candidate = anchors.find((a) => {
            const href = a.getAttribute("href") || "";
            const dataLang =
              a.getAttribute("data-language") || a.getAttribute("lang") || "";
            const text = (a.textContent || "").toLowerCase();
            if (href.includes(`#${selectedLang}`)) return true;
            if (dataLang === selectedLang) return true;
            if (
              text.includes(
                (LANGUAGE_NAME_MAP[selectedLang] || "").toLowerCase()
              )
            )
              return true;
            // Some widgets use 'en|en' patterns in href — check that too
            if (href.includes(`${selectedLang}|${selectedLang}`)) return true;
            return false;
          });

          if (candidate) {
            try {
              candidate.click();
            } catch (err) {
              // last resort: dispatch MouseEvent
              const ev = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
              });
              candidate.dispatchEvent(ev);
            }
            clearInterval(iv);
            resolve(true);
            return;
          }

          if (attempts >= maxAttempts) {
            clearInterval(iv);
            resolve(false);
          }
        }, interval);
      });

    // run the iframe click attempt, then fallback to a reload if needed
    tryClickIframeAnchor().then((clicked) => {
      if (clicked) {
        // allow the translate script a moment to apply changes
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        // fallback: ensure cookie/hash set then reload
        // write again just before reload
        tryWriteAllCookieVariants(cookieVal);
        setTimeout(() => window.location.reload(), 400);
      }
    });

    // as a safety, also set a hard timeout fallback to reload anyway after 1s
    setTimeout(() => {
      tryWriteAllCookieVariants(cookieVal);
      try {
        window.location.reload();
      } catch (e) {}
    }, 1500);
  };

  return (
    <select
      onChange={handleLanguageChange}
      className="language-selector bg-transparent  text-black  border border-white w-fit pb-1  text-center rounded-full tracking-widest"
      defaultValue=""
    >
      <option value="" disabled>
        Language
      </option>

      {/* your options */}
      <option value="en">English</option>
      <option value="ar">Arabic</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="hi">Hindi</option>
      <option value="zh-CN">Chinese (Simplified)</option>
      <option value="zh-TW">Chinese (Traditional)</option>
      <option value="ja">Japanese</option>
      <option value="es">Spanish</option>
      <option value="it">Italian</option>
      <option value="pt">Portuguese</option>
      <option value="ru">Russian</option>
      <option value="ko">Korean</option>
      <option value="tr">Turkish</option>
      <option value="bn">Bengali</option>
      <option value="ta">Tamil</option>
      <option value="te">Telugu</option>
      <option value="mr">Marathi</option>
      <option value="gu">Gujarati</option>
      <option value="pa">Punjabi</option>
      <option value="nl">Dutch</option>
      <option value="pl">Polish</option>
      <option value="uk">Ukrainian</option>
      <option value="fa">Persian (Farsi)</option>
      <option value="vi">Vietnamese</option>
      <option value="th">Thai</option>
      <option value="sw">Swahili</option>
      <option value="ro">Romanian</option>
      <option value="cs">Czech</option>
      <option value="sv">Swedish</option>
      <option value="no">Norwegian</option>
      <option value="fi">Finnish</option>
      <option value="el">Greek</option>
      <option value="he">Hebrew</option>
      <option value="id">Indonesian</option>
      <option value="ms">Malay</option>
      <option value="ur">Urdu</option>
      <option value="am">Amharic</option>
      <option value="ha">Hausa</option>
      <option value="my">Burmese</option>
      <option value="ig">Igbo</option>
      <option value="om">Oromo</option>
      <option value="so">Somali</option>
      <option value="yo">Yoruba</option>
      <option value="ff">Fulani</option>
    </select>
  );
};

export default LanguageSelector;
