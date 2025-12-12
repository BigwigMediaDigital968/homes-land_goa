"use client";
import React from "react";

const LanguageSelector = () => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    if (!selectedLang) return;

    const cookieVal = `/en/${selectedLang}`;
    const expires = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toUTCString();

    // 1) Remove old variants that can conflict
    try {
      document.cookie =
        "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      document.cookie =
        "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=homesandlandgoa.com";
      document.cookie =
        "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.homesandlandgoa.com";
      document.cookie =
        "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=www.homesandlandgoa.com";
    } catch (err) {
      // ignore
    }

    // 2) Set one authoritative cookie (leading-dot domain)
    try {
      document.cookie = `googtrans=${cookieVal};expires=${expires};path=/;domain=.homesandlandgoa.com;SameSite=None;Secure`;
    } catch (err) {
      // ignore
    }

    // 3) Persist preference (optional but useful)
    try {
      localStorage.setItem("preferredLang", selectedLang);
    } catch (e) {}

    // 4) Update hash & reload to apply globally
    try {
      window.location.hash = `#googtrans=${cookieVal}`;
    } catch (e) {}
    setTimeout(() => window.location.reload(), 300);
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
