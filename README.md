# Rakura Thailand Website

A modern, bilingual (Thai/English) marketing website for Rakura Himalayan tea in Thailand. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Bilingual**: Thai (default) and English with locale switcher and path-based routing (`/th/...`, `/en/...`)
- **Pages**: Home, Products (full lineup with category filters), Our Story, Sustainability & Quality, Contact
- **1NG teabag highlights**: Features section with the 1NG asset and feature list
- **Contact**: Form (submits to Formspree or API route) plus Line and WhatsApp CTAs
- **Product inquiry**: "Inquire" on each product links to Contact with optional product prefill

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local: add NEXT_PUBLIC_SITE_URL, optional NEXT_PUBLIC_FORMSPREE_ID, NEXT_PUBLIC_LINE_URL, NEXT_PUBLIC_WHATSAPP_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000); you will be redirected to `/th`.

## Environment variables

| Variable | Description |
|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Site URL for canonical and OG tags (e.g. `https://rakura-thailand.com`) |
| `NEXT_PUBLIC_FORMSPREE_ID` | Optional. Formspree form ID for contact form; if set, submissions go to Formspree |
| `NEXT_PUBLIC_LINE_URL` | Optional. Full Line URL for Thailand (e.g. `https://line.me/ti/p/...`) |
| `NEXT_PUBLIC_WHATSAPP_URL` | Optional. WhatsApp link (e.g. `https://wa.me/66xxxxxxxxx`) |

## Build & deploy

```bash
npm run build
npm start
```

### Deploy to Vercel (free)

1. **One-time login** (opens browser):
   ```bash
   npx vercel login
   ```
2. **Deploy** (from repo root):
   ```bash
   npx vercel --prod
   ```
   Or add Vercel as a dev dependency and use: `npm run deploy`
3. **Environment variables**: In [Vercel Dashboard](https://vercel.com/dashboard) → your project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SITE_URL` = your live URL (e.g. `https://rakura.vercel.app`)
   - Optionally: `NEXT_PUBLIC_FORMSPREE_ID`, `NEXT_PUBLIC_LINE_URL`, `NEXT_PUBLIC_WHATSAPP_URL`
4. **Git-based deploys**: For automatic deploys on push, import the repo at [vercel.com/new](https://vercel.com/new) and connect your Git provider. Set the same env vars in the project settings.

## Assets

- **1NG features image**: `public/assets/1NG_Features.jpg` (included)
- **Product images from PDF**: All product images come from the Profile PDF.
  - **Collections** (Noir, Rouge, Emerald, Blossoms): Cropped from rendered PDF page 12 (`page12_crop0.png` … `page12_crop3.png`).
  - **First 6 Classic** (Classic Green, Classic Breakfast, English Breakfast, Organic High Mountain Black, Pure Green, Pure Masala): Cropped from rendered PDF page 13 (`page13_crop0.png` … `page13_crop5.png`).
  - **Earl Grey onward**: Embedded thumbnails (270×221) from PDF pages 14–20 (`page14_img0.png` … `page20_img6.png`).
  - To re-extract: `python3 scripts/extract-pdf-product-images.py /path/to/Profile.pdf` (requires `pymupdf` and `Pillow`).

## Project structure

- `src/app/[locale]/` – Locale-specific pages (home, products, story, sustainability, contact)
- `src/app/api/contact/` – Contact form API route (POST)
- `src/components/` – Header, Footer, ProductCard, LangSetter
- `src/data/` – products, features (1NG), contact, translations
- `src/lib/i18n.ts` – Locale types and helpers
