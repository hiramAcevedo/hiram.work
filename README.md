<!-- LOGO: hiram.work uses the HA monogram from Recursos/HiramAcevedo/
     For GitHub rendering, reference the public/assets/ versions -->

<h1 align="center">hiram.work</h1>
<h3 align="center">Professional portfolio &amp; CV — Hiram Acevedo</h3>

<p align="center">
  Fullstack Developer &middot; AI &amp; LLM Integration &middot; 21+ shipped projects
</p>

<p align="center">
  <a href="https://hiram.work"><img src="https://img.shields.io/badge/Live-hiram.work-812424?style=flat-square" alt="Live"/></a>
  <a href="https://github.com/hiramAcevedo"><img src="https://img.shields.io/badge/Author-hiramAcevedo-181717?style=flat-square&logo=github&logoColor=white" alt="Author"/></a>
  <a href="https://hiramlab.center"><img src="https://img.shields.io/badge/HiramLab-1a1a2e?style=flat-square&logo=flask&logoColor=white" alt="HiramLab"/></a>
</p>

---

## Overview

Single-page portfolio site built with Next.js 16 and the App Router. Designed with a Bauhaus/Swiss minimalism aesthetic, featuring an animated HA monogram in the hero, dark/light theming via CSS custom properties, and full i18n support (EN/ES).

---

## Stack

```
Next.js 16.1.6          App Router, Turbopack, Server Components
React 19.2.3            RSC + client components where needed
TypeScript              Strict mode
Tailwind CSS 4          @theme inline for CSS custom properties
Framer Motion           Scroll animations, AnimatePresence, flyIn variants
next-intl 4.8           i18n with [locale] dynamic segment (EN, ES)
react-hook-form + Zod   Contact form validation
Resend                  Serverless email delivery
Upstash                 Redis-based API rate limiting (optional)
```

---

## Architecture

```
hiram-work/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx        4 Google Fonts, NextIntlClientProvider, dark mode
│   │   │   └── page.tsx          Single page: JSON-LD, all sections
│   │   ├── api/contact/route.ts  POST: Zod → Resend email → rate limit
│   │   └── globals.css           CSS tokens system, @theme inline
│   ├── components/
│   │   ├── LogoHA.tsx            353-line inline SVG, 15 animated groups
│   │   ├── Header.tsx            Fixed, scroll-aware, theme-reactive logo
│   │   ├── Hero.tsx              Full viewport, LogoHA, staggered CTAs
│   │   ├── About.tsx             Bio + 4 stats cards
│   │   ├── Projects.tsx          6 ProjectCards grid
│   │   ├── TechStack.tsx         5 categories of tech badges
│   │   ├── Education.tsx         Timeline with active/completed states
│   │   └── Contact.tsx           Form with honeypot spam protection
│   ├── i18n/                     Routing, request config, navigation
│   ├── lib/                      Projects data, rate limiter, Resend client
│   └── messages/                 en.json, es.json, zh.json (placeholder)
├── public/
│   ├── assets/                   Logo SVGs (light/dark variants)
│   └── cv/Hiram_Acevedo_CV.pdf
└── next.config.ts                withNextIntl wrapper
```

---

## Design System

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#FFFFFF` | `#000000` |
| `--ink` | `#000000` | `#FFFFFF` |
| `--accent` | `#812424` | `#812424` |
| `--surface-1` | `#FAFAFA` | `#0A0A0A` |
| `--surface-2` | `#F0F0F0` | `#1A1A1A` |

**Fonts**: Rajdhani (headings), IBM Plex Sans (body), JetBrains Mono (code), Libre Bodoni (logo)

Theming is controlled via `data-theme` attribute on `<html>`, with CSS custom properties consumed by Tailwind through `@theme inline`.

---

## Quick Start

```bash
git clone https://github.com/hiramAcevedo/hiram-work.git
cd hiram-work
npm install
npm run dev
```

Requires Node.js 20+. The dev server uses Turbopack by default.

### Environment Variables

```env
RESEND_API_KEY=re_...              # Required for contact form
UPSTASH_REDIS_REST_URL=https://... # Optional: rate limiting
UPSTASH_REDIS_REST_TOKEN=...       # Optional: rate limiting
```

---

## Companion Site

This portfolio links to [hiramlab.center](https://hiramlab.center) — the lab showcase with detailed project sheets, MDX-powered documentation, and the full project catalog.

---

<p align="center">
  <i>Built by <a href="https://github.com/hiramAcevedo">Hiram Acevedo</a> at <a href="https://github.com/HiramLab">HiramLab</a></i>
</p>
