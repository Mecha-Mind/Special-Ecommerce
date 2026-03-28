"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatEGP } from "@/lib/formatEGP";
import { colorLabel } from "@/lib/order-display";
import { readOrdersRaw } from "@/lib/orders-storage";

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

export default function OrderDetails({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = readOrdersRaw();
      const parsed = raw ? JSON.parse(raw) : [];
      const list: Order[] = Array.isArray(parsed) ? parsed : [];
      setOrder(list.find((o) => o.id === orderId) ?? null);
    } catch {
      setOrder(null);
    } finally {
      setHydrated(true);
    }
  }, [orderId]);

  const createdAt = useMemo(() => {
    if (!order) return "";
    try {
      return new Date(order.createdAt).toLocaleString();
    } catch {
      return order.createdAt;
    }
  }, [order]);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center text-sm font-medium text-stone-500 shadow-sm">
        Loading order…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-stone-900">Order not found</h1>
        <p className="mt-2 text-sm text-stone-600">
          This ID is not in your browser storage. It may have been cleared or
          never placed on this device.
        </p>
        <Link
          href="/app/orders"
          className="mt-6 inline-flex rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-stone-800"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Order details
          </h1>
          <div className="mt-2 text-sm text-stone-600">
            <span className="font-mono font-semibold text-stone-800">
              {order.id}
            </span>
            <span className="text-stone-300"> · </span>
            {createdAt}
          </div>
        </div>
        <Link
          href="/app/orders"
          className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-800 shadow-sm transition hover:border-stone-300 hover:bg-stone-50"
        >
          ← Orders
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px] lg:items-start">
        <section className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-stone-900">Items</h2>
          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.cartKey}
                className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-stone-900">{item.title}</p>
                  <p className="mt-1 text-xs font-medium text-stone-600">
                    {colorLabel(item.productId, item.selectedColorId)} · Size{" "}
                    {item.selectedSize}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-500">
                    Qty {item.quantity} · {formatEGP(item.price)} each
                  </p>
                </div>
                <div className="shrink-0 text-right text-sm font-bold tabular-nums text-stone-900">
                  {formatEGP(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-stone-900">Summary</h2>
            <div className="mt-4 space-y-2 text-sm font-medium">
              <div className="flex justify-between text-stone-600">
                <span>Items</span>
                <span className="tabular-nums text-stone-900">
                  {order.totals.totalItems}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="tabular-nums text-stone-900">
                  {formatEGP(order.totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="tabular-nums text-stone-900">
                  {order.totals.shippingFee === 0
                    ? "Free"
                    : formatEGP(order.totals.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-bold text-stone-900">
                <span>Total</span>
                <span className="tabular-nums">
                  {formatEGP(order.totals.grandTotal)}
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-stone-100 pt-5 text-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Customer
              </div>
              <div className="mt-1 font-semibold text-stone-900">
                {order.customer.fullName}
              </div>
              <div className="mt-1 text-stone-600">{order.customer.phone}</div>
              {order.customer.email && (
                <div className="mt-0.5 text-stone-600">
                  {order.customer.email}
                </div>
              )}
            </div>

            <div className="mt-4 text-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Shipping
              </div>
              <div className="mt-1 font-medium text-stone-800">
                {order.shipping.city}
              </div>
              <div className="text-stone-600">{order.shipping.addressLine}</div>
              {order.shipping.notes && (
                <div className="mt-1 text-stone-600">{order.shipping.notes}</div>
              )}
            </div>

            <div className="mt-5">
              <span className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-800 ring-1 ring-stone-200">
                Status: {order.status}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
