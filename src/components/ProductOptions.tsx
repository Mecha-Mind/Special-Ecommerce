"use client"


import Image from "next/image";
import { useState, useMemo } from "react";
import type { Product } from "@/data/products";
import AddToCartBtn from "./AddToCartBtn";
import { formatEGP } from "@/lib/formatEGP";

export default function ProductOptions({product} : {product: Product}) {

    // defaults
    const defaultColorId = product.colors[0]?.id ?? 'default';
    const defaultSize = product.sizes[0] ?? 'Default';

    const [colorId, setColorId] = useState(defaultColorId);
    const [size, setSize] = useState(defaultSize);

    const key = useMemo(()=> `${product.id}`, [product.id]);
    const selectedColor = useMemo(()=>{return product.colors.find((c)=> c.id === colorId) ?? product.colors[0];}, [product.colors, colorId]);
    const imgSrc = selectedColor?.image ?? product.image;

    const discount = product.compareAtPrice && product.compareAtPrice > product.price ?
    Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : null;

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Image */}
            <section className="rounded-2xl border bg-white p-4">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
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
                        <span className="absolute left-3 top-3 rounded-full bg-black px-2 py-1 text-xs text-white">-{discount}%</span>
                    )}
                </div>
            </section>
            {/* Options */}
            <section key={key} className="rounded-2xl border bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                    <h1 className="text-2xl font-semibold">{product.title}</h1>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">{product.category}</span>
                </div>
                <p className="mt-3 text-gray-700">{product.description}</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{product.rating.toFixed(1)}</span>
                    <span>.</span>
                    <span>{product.reviewCount} reviews</span>
                    <span className="ml-auto">{product.stock > 0 ? `${product.stock} in stock`: 'Out of stock'}</span>
                </div>
                <div className="mt-4 flex items-end gap-3">
                    <div className="text-2xl font-semibold">{formatEGP(product.price)}</div>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <div className="text-sm text-gray-500 line-through">
                            {formatEGP(product.compareAtPrice)}
                        </div>
                    )}
                </div>
                {/* Colors */}
                {product.colors.length > 0 && (
                    <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Color</span>
                            <span className="text-sm text-gray-600">{selectedColor?.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((c)=> {
                                const active = c.id === colorId;
                                return (
                                    <button 
                                        key={c.id}
                                        type="button"
                                        onClick={()=> setColorId(c.id)}
                                        className={["h-9 w-9 rounded-full border transition", active ? "ring-2 ring-black ring-offset-2" : "hover:scale-[1.02]", ].join(" ")}
                                        style={{backgroundColor: c.hex}}
                                        aria-label={c.name}
                                        title={c.name}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Sizes */}
                {product.sizes.length > 0 && (
                    <div className="mt-6">
                        <div className="mb-2 text-sm font-medium">Size</div>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((s)=> {
                                const active = s === size;
                                return (
                                    <button 
                                        key={s}
                                        type="button"
                                        onClick={()=> setSize(s)}
                                        className={["rounded-xl border px-3 py-2 text-sm transition", active ? "border-black bg-black text-white" : "hover:bg-gray-50",].join(" ")}
                                    >
                                        {s}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {product.tags.map((t)=> (
                        <span key={t} className="rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-700">{t}</span>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-6 flex gap-3">
                    {/* <button 
                        onClick={()=> addItem(product, {colorId, size})}
                        className="flex-1 rounded-xl bg-black py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
                        disabled= {product.stock === 0}
                        type="button"
                    >
                        Add to cart
                    </button> */}

                    <AddToCartBtn
                        product={product}
                        colorId={colorId}
                        size={size}
                        disabled={product.stock === 0}
                    />
                </div>
            </section>
        </div>
    )
}