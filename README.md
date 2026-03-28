# Darl Store (client)

Front-end demo for a small apparel shop: shoes, clothing, and a few accessories. Product data lives in `src/data/products.ts` as plain TypeScript so you can tweak copy, categories, and variant images without touching the UI logic.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The catalogue and product detail pages read from the same product array; the cart is stored in `localStorage` under `darlstore-cart-v1`.

## Images

Product and hero photos use **Unsplash** URLs in `src/data/products.ts` and `Hero.tsx`. `next.config.ts` allows `images.unsplash.com` for `next/image`. Replace with files under `public/` if you prefer self-hosting. Cart icon: `public/products/icon-cart.svg`.

## Product shape

Each product has `colors[]` with `id`, `name`, `hex`, and `image`. The **hex** drives the color swatch on the PDP; `image` is what the gallery shows for that swatch. Keeping those aligned matters: if every variant used the same hex, the UI looked “wrong” even when the copy said “green” or “orange”. The detail page also resets the selected color when you switch products so the ring highlight doesn’t stick around from the previous item.

## Stack

Next.js (App Router), Tailwind v4 (`@import "tailwindcss"` in `globals.css`), client-side cart context, toast notifications for add-to-cart.

## Deploy

Standard Next.js build: `npm run build` then host on any platform that supports Node or static export (this project expects the default server build unless you change it).
