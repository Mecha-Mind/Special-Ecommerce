"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatEGP } from "@/lib/formatEGP";
import {
  ORDERS_STORAGE_KEY,
  LEGACY_ORDER_KEY,
  readOrdersRaw,
} from "@/lib/orders-storage";

type Order = {
  id: string;
  createdAt: string;
  customer: { fullName: string; phone: string; email: string | null };
  shipping: { city: string; addressLine: string; notes: string | null };
  payment: "cod" | "card";
  items: Array<{
    cartKey: string;
    productId: string;
    title: string;
    price: number;
    quantity: number;
    selectedColorId: string;
    selectedSize: string;
    image: string | null;
  }>;
  totals: {
    totalItems: number;
    subtotal: number;
    shippingFee: number;
    grandTotal: number;
  };
  status: string;
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = readOrdersRaw();
      const parsed = raw ? JSON.parse(raw) : [];
      setOrders(Array.isArray(parsed) ? parsed : []);
    } catch {
      setOrders([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  const empty = hydrated && orders.length === 0;
  const totalSpent = useMemo(
    () => orders.reduce((sum, o) => sum + (o?.totals?.grandTotal ?? 0), 0),
    [orders],
  );

  function clearOrders() {
    if (!confirm("Clear all orders saved in this browser?")) return;
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    localStorage.removeItem(LEGACY_ORDER_KEY);
    setOrders([]);
  }

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center text-sm font-medium text-stone-500 shadow-sm">
        Loading orders…
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900">No orders yet</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          When you check out, a demo receipt is stored here in your browser
          (nothing hits a server).
        </p>
        <Link
          href="/app/products"
          className="mt-6 inline-flex rounded-xl bg-gradient-to-b from-stone-900 to-stone-800 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:from-stone-800 hover:to-stone-700"
          style={{ boxShadow: "var(--cta-shadow)" }}
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm sm:p-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Overview
          </div>
          <div className="mt-1 text-sm font-semibold text-stone-900">
            {orders.length} order{orders.length === 1 ? "" : "s"} ·{" "}
            <span className="tabular-nums">{formatEGP(totalSpent)}</span>{" "}
            lifetime (demo)
          </div>
        </div>
        <button
          type="button"
          onClick={clearOrders}
          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-stone-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-800"
        >
          Clear all
        </button>
      </div>

      <div className="grid gap-4">
        {orders.map((o) => (
          <article
            key={o.id}
            className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm transition hover:border-stone-300 hover:shadow-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Order
                </div>
                <div className="mt-0.5 font-mono text-sm font-semibold text-stone-900">
                  {o.id}
                </div>
                <div className="mt-1 text-xs font-medium text-stone-500">
                  {new Date(o.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Total
                </div>
                <div className="mt-0.5 text-xl font-bold tabular-nums text-stone-900">
                  {formatEGP(o.totals.grandTotal)}
                </div>
                <div className="mt-1 text-xs font-medium text-stone-500">
                  {o.payment === "cod" ? "Cash on delivery" : "Card (demo)"}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm font-medium text-stone-700">
              <span className="font-semibold text-stone-900">
                {o.customer.fullName}
              </span>
              <span className="text-stone-300"> · </span>
              {o.shipping.city}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {o.items.slice(0, 4).map((item) => (
                <span
                  key={item.cartKey}
                  className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700"
                >
                  {item.title}{" "}
                  <span className="text-stone-500">×{item.quantity}</span>
                </span>
              ))}
              {o.items.length > 4 && (
                <span className="self-center text-xs font-medium text-stone-500">
                  +{o.items.length - 4} more
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
              <Link
                href={`/app/orders/${o.id}`}
                className="text-sm font-bold text-amber-900/90 transition hover:text-amber-950"
              >
                View details →
              </Link>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-600/15">
                {o.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
