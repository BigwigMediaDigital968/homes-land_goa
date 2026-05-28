'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  MapPin, 
  ArrowUpRight, 
  Phone, 
  Mail, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  Sparkles, 
  Send, 
  X, 
  Award, 
  Layers, 
  ShieldCheck,
  Heart,
  Search,
  CheckCircle,
  Menu,
  ChevronLeft
} from 'lucide-react';


// --- MAIN REACT COMPONENT ---
export default function App() {
  return (
    <>
    <style>
      {`
    :root {
      --gold:         #B8975A;
      --gold-dark:    #8C6F38;
      --gold-light:   #D4B483;
      --gold-pale:    #F5EDD8;
      --ivory:        #FDFAF5;
      --ivory-2:      #F7F2E8;
      --sand:         #EDE3CE;
      --charcoal:     #1C1C1A;
      --text-main:    #2A2720;
      --text-muted:   #7A7060;
      --text-subtle:  #B0A48C;
      --white:        #FFFFFF;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; background: var(--ivory); font-family: 'Jost', sans-serif; color: var(--text-main); overflow-x: hidden; }

    /* ─── NAVBAR ─────────────────────────────────────────────────────── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 56px;
      background: rgba(253,250,245,0.82);
      backdrop-filter: blur(20px) saturate(1.6);
      -webkit-backdrop-filter: blur(20px) saturate(1.6);
      border-bottom: 1px solid rgba(184,151,90,0.18);
      transition: background 0.4s, box-shadow 0.4s;
    }

    nav.scrolled {
      background: rgba(253,250,245,0.97);
      box-shadow: 0 2px 32px rgba(140,111,56,0.08);
    }

    .nav-logo img {
      height: 46px;
      width: auto;
      display: block;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 38px;
      list-style: none;
    }

    .nav-link {
      font-size: 11.5px;
      font-weight: 400;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--text-muted);
      text-decoration: none;
      position: relative;
      transition: color 0.3s;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      left: 0; bottom: -5px;
      width: 0; height: 1px;
      background: var(--gold);
      transition: width 0.3s ease;
    }

    .nav-link:hover { color: var(--gold-dark); }
    .nav-link:hover::after { width: 100%; }

    .nav-cta {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--white);
      background: var(--gold);
      text-decoration: none;
      padding: 11px 28px;
      border-radius: 2px;
      border: 1px solid var(--gold);
      transition: all 0.3s ease;
    }

    .nav-cta:hover {
      background: var(--gold-dark);
      border-color: var(--gold-dark);
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(140,111,56,0.25);
    }

    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; }
    .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--text-main); }

    /* ─── HERO ───────────────────────────────────────────────────────── */
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      min-height: 700px;
      display: flex;
      align-items: flex-end;
      overflow: hidden;
    }

    .hero-video {
      position: absolute;
      inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: 0;
    }

    /* Light overlays — ivory bleeds in from bottom and left */
    .overlay-top {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 180px;
      background: linear-gradient(to bottom, rgba(253,250,245,0.5) 0%, transparent 100%);
      z-index: 1;
    }

    .overlay-bottom {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 68%;
      background: linear-gradient(
        to top,
        rgba(253,250,245,1)    0%,
        transparent            100%
      );
      z-index: 2;
    }

    .overlay-left {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to right,
        rgba(253,250,245,0.72) 0%,
        transparent            100%
      );
      z-index: 3;
    }

    /* ─── HERO CONTENT ───────────────────────────────────────────────── */
    .hero-content {
      position: relative;
      z-index: 10;
      padding: 0 64px 88px;
      max-width: 660px;
      animation: riseIn 1s cubic-bezier(0.22,1,0.36,1) 0.2s both;
    }

    @keyframes riseIn {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .eyebrow {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 24px;
    }

    .eyebrow-bar {
      width: 36px; height: 1px;
      background: var(--gold);
      animation: barGrow 0.9s ease 0.6s both;
    }

    @keyframes barGrow {
      from { width: 0; opacity: 0; }
      to   { width: 36px; opacity: 1; }
    }

    .eyebrow-text {
      font-size: 10.5px;
      font-weight: 400;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--gold);
    }

    .hero-headline {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-size: clamp(52px, 6.8vw, 88px);
      line-height: 1.04;
      color: var(--text-main);
      margin-bottom: 24px;
      letter-spacing: -0.01em;
    }

    .hero-headline em {
      font-style: italic;
      color: var(--gold);
    }

    .hero-sub {
      font-size: 15px;
      font-weight: 300;
      line-height: 1.82;
      color: var(--text-muted);
      max-width: 400px;
      margin-bottom: 48px;
    }

    /* CTAs */
    .cta-row {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }

    .btn-fill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: 'Jost', sans-serif;
      font-size: 11.5px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-decoration: none;
      color: var(--white);
      background: var(--gold);
      border: 1.5px solid var(--gold);
      padding: 16px 36px;
      border-radius: 2px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .btn-fill::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--gold-dark);
      transform: translateY(101%);
      transition: transform 0.32s ease;
    }

    .btn-fill span, .btn-fill svg { position: relative; z-index: 1; }
    .btn-fill:hover::after { transform: translateY(0); }
    .btn-fill:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(140,111,56,0.3); }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: 'Jost', sans-serif;
      font-size: 11.5px;
      font-weight: 400;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-decoration: none;
      color: var(--text-main);
      background: transparent;
      border: 1.5px solid rgba(140,111,56,0.35);
      padding: 15px 36px;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .btn-outline:hover {
      border-color: var(--gold);
      color: var(--gold-dark);
      background: var(--gold-pale);
      transform: translateY(-2px);
    }

    /* ─── STATS BAR ──────────────────────────────────────────────────── */
    .hero-stats {
      position: absolute;
      right: 0; bottom: 0;
      z-index: 10;
      display: flex;
      animation: riseIn 1s ease 0.85s both;
    }

    .stat-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 26px 48px;
      background: var(--white);
      border-top: 1px solid var(--sand);
      border-left: 1px solid var(--sand);
      gap: 5px;
    }

    .stat-cell:last-child { border-right: 1px solid var(--sand); }

    .stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 30px;
      font-weight: 500;
      color: var(--gold);
      line-height: 1;
    }

    .stat-lbl {
      font-size: 9.5px;
      font-weight: 400;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-subtle);
    }

    /* ─── SCROLL INDICATOR ───────────────────────────────────────────── */
    .scroll-indicator {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      animation: fadeIn 1s ease 1.4s both;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .scroll-label {
      font-size: 9px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--text-subtle);
    }

    .scroll-track {
      width: 1px; height: 44px;
      background: var(--sand);
      position: relative;
      overflow: hidden;
    }

    .scroll-track::after {
      content: '';
      position: absolute;
      top: -50%; left: 0;
      width: 1px; height: 50%;
      background: var(--gold);
      animation: scrollDrop 1.8s ease-in-out infinite;
    }

    @keyframes scrollDrop {
      0%   { top: -50%; opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }

    /* ─── MOBILE ─────────────────────────────────────────────────────── */
    @media (max-width: 768px) {
      nav { padding: 0 24px; }
      .nav-links { display: none; }
      .hamburger { display: flex; }

      .hero-content { padding: 0 28px 130px; max-width: 100%; }
      .hero-headline { font-size: 44px; }
      .hero-sub { max-width: 100%; }

      .hero-stats { width: 100%; }
      .stat-cell { flex: 1; padding: 18px 8px; }
      .stat-num { font-size: 24px; }
      .scroll-indicator { display: none; }

      .overlay-bottom {
        height: 78%;
        background: linear-gradient(
          to top,
          rgba(253,250,245,1) 0%,
          rgba(253,250,245,0.92) 38%,
          transparent 100%
        );
      }
    }
      `      }
    </style>
<nav id="navbar">
    <a href="#" className="nav-logo">
      <img src="/mnt/user-data/uploads/logo__1_.webp" alt="Homes & Land Goa" />
    </a>

    <ul className="nav-links">
      <li><a href="#" className="nav-link">Properties</a></li>
      <li><a href="#" className="nav-link">Buy</a></li>
      <li><a href="#" className="nav-link">Rent</a></li>
      <li><a href="#" className="nav-link">About</a></li>
      <li><a href="#" className="nav-link">Insights</a></li>
      <li><a href="#" className="nav-cta">Get in Touch</a></li>
    </ul>

    <button className="hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <section className="hero">

    <video
      className="hero-video"
      autoPlay muted loop playsInline
      poster="/mnt/user-data/uploads/1779170017867_image.png"
    >
      <source src="/18705145-hd_1920_1080_30fps.mp4" type="video/mp4" />
    </video>

    <div className="overlay-top"></div>
    <div className="overlay-bottom"></div>
    <div className="overlay-left"></div>

    <div className="hero-content">
      <div className="eyebrow">
        <div className="eyebrow-bar"></div>
        <span className="eyebrow-text">Tropical Real Estate Experts · Goa, India</span>
      </div>

      <h1 className="hero-headline">
        Find Your<br />
        <em>Paradise</em><br />
        in Goa
      </h1>

      <p className="hero-sub">
        Curated villas, beachfront homes and private estates — where the tropics meet timeless elegance.
      </p>

      <div className="cta-row">
        <a href="#" className="btn-fill">
          <span>Explore Properties</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        </a>
        <a href="#" className="btn-outline">
          Contact Us
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <div className="hero-stats">
      <div className="stat-cell">
        <span className="stat-num">200+</span>
        <span className="stat-lbl">Listings</span>
      </div>
      <div className="stat-cell">
        <span className="stat-num">12+</span>
        <span className="stat-lbl">Years Active</span>
      </div>
      <div className="stat-cell">
        <span className="stat-num">98%</span>
        <span className="stat-lbl">Satisfaction</span>
      </div>
    </div>

    <div className="scroll-indicator">
      <span className="scroll-label">Scroll</span>
      <div className="scroll-track"></div>
    </div>

  </section>
    </>
  )
}
