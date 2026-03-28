"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatEGP } from "@/lib/formatEGP";

export default function CartPage() {
  const { items, increase, decrease, totalItems, totalPrice, removeItem, clear } =
    useCart();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm font-medium text-stone-500">
        <Link href="/" className="transition hover:text-amber-900">
          Home
        </Link>
        <span className="mx-2 text-stone-300">/</span>
        <span className="text-stone-900">Cart</span>
      </nav>

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            Your bag
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            {totalItems === 0
              ? "Nothing here yet."
              : `${totalItems} item${totalItems === 1 ? "" : "s"} · ${formatEGP(totalPrice)}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/app/products"
            className="text-sm font-bold text-amber-900/90 transition hover:text-amber-950"
          >
            Continue shopping
          </Link>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="text-sm font-bold text-stone-500 transition hover:text-red-700"
            >
              Clear cart
            </button>
          )}
        </div>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-14 text-center shadow-sm">
          <p className="font-medium text-stone-700">Your cart is empty.</p>
          <Link
            href="/app/products"
            className="mt-6 inline-flex rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-stone-800"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <section className="space-y-4">
            {items.map((item) => {
              const cname =
                item.colors.find((c) => c.id === item.selectedColorId)?.name ??
                item.selectedColorId;
              return (
                <div
                  key={item.cartKey}
                  className="flex flex-col gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-stone-900">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm font-medium text-stone-600">
                      {cname} · Size {item.selectedSize}
                    </div>
                    <div className="mt-1 text-sm font-bold tabular-nums text-stone-900">
                      {formatEGP(item.price)} each
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.cartKey)}
                      className="mt-3 text-xs font-bold uppercase tracking-wide text-stone-500 transition hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-6 sm:justify-end">
                    <div className="flex items-center gap-1 rounded-xl border border-stone-200 bg-stone-50 p-1">
                      <button
                        type="button"
                        onClick={() => decrease(item.cartKey)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-semibold text-stone-700 transition hover:bg-white"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increase(item.cartKey)}
                        disabled={item.quantity >= item.stock}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-semibold text-stone-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right text-base font-bold tabular-nums text-stone-900">
                      {formatEGP(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          <aside className="sticky top-28 rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-sm font-semibold text-stone-600">
              <span>Items</span>
              <span className="tabular-nums text-stone-900">{totalItems}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 text-lg font-bold text-stone-900">
              <span>Total</span>
              <span className="tabular-nums">{formatEGP(totalPrice)}</span>
            </div>
            <Link
              href="/app/checkout"
              className="mt-6 flex w-full justify-center rounded-xl bg-gradient-to-b from-stone-900 to-stone-800 py-3 text-sm font-bold text-white shadow-md transition hover:from-stone-800 hover:to-stone-700"
              style={{ boxShadow: "var(--cta-shadow)" }}
            >
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
