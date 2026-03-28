"use client";

import type { Product } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import { formatEGP } from "@/lib/formatEGP";

function calcDiscountPercent(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return null;
  const pct = Math.round(((compareAt - price) / compareAt) * 100);
  return pct > 0 ? pct : null;
}

export default function ProductCard({ product }: { product: Product }) {
  const {
    title,
    description,
    price,
    compareAtPrice,
    rating,
    reviewCount,
    stock,
    category,
    tags,
  } = product;
  const discount = calcDiscountPercent(price, compareAtPrice);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg">
      <Link href={`/app/products/${product.id}`} className="block shrink-0">
        <div className="relative">
          <div className="relative aspect-square overflow-hidden bg-stone-100">
            <Image
              src={product.image}
              alt={title}
              fill
              className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
              priority={false}
            />
          </div>
          {discount !== null && (
            <span className="absolute left-3 top-3 rounded-full bg-stone-900 px-2.5 py-1 text-xs font-bold text-white shadow-md">
              −{discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 pt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950/90 ring-1 ring-amber-900/10">
            {category}
          </span>
        </div>

        <div>
          <h3 className="font-semibold leading-snug text-stone-900">
            <Link
              href={`/app/products/${product.id}`}
              className="transition hover:text-amber-900/90"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-stone-600">
            {description}
          </p>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-stone-100 pt-3 text-sm text-stone-600">
          <span className="font-bold text-stone-900">{rating.toFixed(1)}</span>
          <span className="text-stone-300" aria-hidden>
            ·
          </span>
          <span>
            {reviewCount.toLocaleString()} reviews
          </span>
          <span className="text-stone-300" aria-hidden>
            ·
          </span>
          <span
            className={
              stock > 0
                ? "font-medium text-emerald-700"
                : "font-medium text-red-600"
            }
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <div className="text-lg font-bold text-stone-900">
            {formatEGP(price)}
          </div>
          {compareAtPrice && compareAtPrice > price && (
            <div className="text-sm font-medium text-stone-400 line-through">
              {formatEGP(compareAtPrice)}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-lg bg-stone-100 px-2 py-1 text-[11px] font-medium text-stone-600"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-1">
          <AddToCartBtn
            product={product}
            colorId={product.colors[0]?.id ?? ""}
            size={product.sizes[0]}
            disabled={product.stock === 0}
          />
        </div>
      </div>
    </article>
  );
}
