"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import type { Product } from "@/data/products";
import AddToCartBtn from "./AddToCartBtn";
import { formatEGP } from "@/lib/formatEGP";

export default function ProductOptions({ product }: { product: Product }) {
  const defaultColorId = product.colors[0]?.id ?? "default";
  const defaultSize = product.sizes[0] ?? "Default";

  const [colorId, setColorId] = useState(defaultColorId);
  const [size, setSize] = useState(defaultSize);

  useEffect(() => {
    setColorId(product.colors[0]?.id ?? "default");
    setSize(product.sizes[0] ?? "Default");
  }, [product.id]);

  const key = useMemo(() => `${product.id}`, [product.id]);
  const selectedColor = useMemo(
    () => product.colors.find((c) => c.id === colorId) ?? product.colors[0],
    [product.colors, colorId],
  );
  const imgSrc = selectedColor?.image ?? product.image;

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100,
        )
      : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <section className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm sm:p-5">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100 ring-1 ring-stone-900/5">
          <Image
            key={imgSrc}
            src={imgSrc}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
          {discount !== null && (
            <span className="absolute left-3 top-3 rounded-full bg-stone-900 px-2.5 py-1 text-xs font-bold text-white shadow-md">
              −{discount}%
            </span>
          )}
        </div>
      </section>

      <section
        key={key}
        className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm sm:p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
            {product.title}
          </h1>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-950/90 ring-1 ring-amber-900/10">
            {product.category}
          </span>
        </div>
        <p className="mt-3 leading-relaxed text-stone-600">{product.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-stone-100 pt-4 text-sm text-stone-600">
          <span className="font-bold text-stone-900">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-stone-300" aria-hidden>
            ·
          </span>
          <span>{product.reviewCount.toLocaleString()} reviews</span>
          <span className="text-stone-300" aria-hidden>
            ·
          </span>
          <span
            className={
              product.stock > 0
                ? "font-semibold text-emerald-700"
                : "font-semibold text-red-600"
            }
          >
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="text-2xl font-bold text-stone-900">
            {formatEGP(product.price)}
          </div>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <div className="text-sm font-semibold text-stone-400 line-through">
              {formatEGP(product.compareAtPrice)}
            </div>
          )}
        </div>

        {product.colors.length > 0 && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-stone-900">Color</span>
              <span className="text-sm font-medium text-stone-600">
                {selectedColor?.name}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => {
                const active = c.id === colorId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColorId(c.id)}
                    className={[
                      "h-10 w-10 rounded-full border border-black/15 shadow-inner transition",
                      active
                        ? "ring-2 ring-stone-900 ring-offset-2 ring-offset-white"
                        : "hover:scale-[1.04] hover:ring-2 hover:ring-stone-300 hover:ring-offset-1",
                    ].join(" ")}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                    title={c.name}
                  />
                );
              })}
            </div>
          </div>
        )}

        {product.sizes.length > 0 && (
          <div className="mt-6">
            <div className="mb-2 text-sm font-bold text-stone-900">Size</div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const active = s === size;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={[
                      "min-w-[2.75rem] rounded-xl border px-3 py-2 text-sm font-semibold transition",
                      active
                        ? "border-stone-900 bg-stone-900 text-white shadow-sm ring-2 ring-amber-600/35 ring-offset-2"
                        : "border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50",
                    ].join(" ")}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <span
              key={t}
              className="rounded-lg bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-600"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <AddToCartBtn
            product={product}
            colorId={colorId}
            size={size}
            disabled={product.stock === 0}
          />
        </div>
      </section>
    </div>
  );
}
