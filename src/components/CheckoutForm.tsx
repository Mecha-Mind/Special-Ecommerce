"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { formatEGP } from "@/lib/formatEGP";
import { colorLabel } from "@/lib/order-display";
import { readOrdersRaw, writeOrdersRaw } from "@/lib/orders-storage";

type PaymentMethod = "cod" | "card";

type CheckoutValues = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  addressLine: string;
  notes: string;
  payment: PaymentMethod;
};

function isValidEgyptPhone(phone: string) {
  return /^01\d{9}$/.test(phone.replace(/\s+/g, ""));
}

const fieldBase =
  "mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 shadow-sm outline-none transition placeholder:font-normal placeholder:text-stone-400";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clear } = useCart();
  const [values, setValues] = useState<CheckoutValues>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    addressLine: "",
    notes: "",
    payment: "cod",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shippingFee = useMemo(
    () => (totalPrice >= 999 ? 0 : 60),
    [totalPrice],
  );
  const grandTotal = totalPrice + shippingFee;
  const canCheckout = items.length > 0;

  function setField<K extends keyof CheckoutValues>(
    key: K,
    val: CheckoutValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function validate(v: CheckoutValues) {
    const errors: Partial<Record<keyof CheckoutValues, string>> = {};

    if (!v.fullName.trim()) errors.fullName = "Full name is required";
    if (!v.phone.trim()) errors.phone = "Phone is required";
    else if (!isValidEgyptPhone(v.phone))
      errors.phone = "Use a valid Egyptian mobile (11 digits starting with 01)";

    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
      errors.email = "Enter a valid email";
    }

    if (!v.city.trim()) errors.city = "City is required";
    if (!v.addressLine.trim())
      errors.addressLine = "Address line is required";

    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canCheckout) {
      setError("Your cart is empty.");
      return;
    }

    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setTouched({
        fullName: true,
        phone: true,
        email: true,
        city: true,
        addressLine: true,
      });
      setError("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const orderId = `ord-${Date.now()}`;
      const order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer: {
          fullName: values.fullName.trim(),
          phone: values.phone.trim(),
          email: values.email.trim() || null,
        },
        shipping: {
          city: values.city.trim(),
          addressLine: values.addressLine.trim(),
          notes: values.notes.trim() || null,
        },
        payment: values.payment,
        items: items.map((i) => ({
          cartKey: i.cartKey,
          productId: i.id,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          selectedColorId: i.selectedColorId,
          selectedSize: i.selectedSize,
          image: i.image ?? null,
        })),
        totals: {
          totalItems,
          subtotal: totalPrice,
          shippingFee,
          grandTotal,
        },
        status: "placed",
      };

      const raw = readOrdersRaw();
      const prev = raw ? JSON.parse(raw) : [];
      const next = Array.isArray(prev) ? [order, ...prev] : [order];
      writeOrdersRaw(JSON.stringify(next));

      clear();
      router.push(`/app/checkout/success?orderId=${encodeURIComponent(orderId)}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldError = useMemo(() => validate(values), [values]);
  const showErr = (name: keyof CheckoutValues) =>
    touched[name] && fieldError[name];

  const errBorder = "border-red-300 focus:ring-red-200";
  const okBorder =
    "border-stone-200 focus:border-amber-900/35 focus:ring-2 focus:ring-amber-600/20";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start xl:grid-cols-[1fr_380px]">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="border-b border-stone-100 pb-5">
          <h2 className="text-lg font-bold text-stone-900">
            Shipping & contact
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Demo checkout: details are saved in your browser only.
          </p>
        </div>

        {error && (
          <div
            className="mt-5 rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm font-medium text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}

        {!canCheckout && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm font-medium text-amber-950">
            Add items to your cart before you can place an order.
          </div>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-stone-800">
              Full name <span className="text-red-600">*</span>
            </label>
            <input
              id="fullName"
              value={values.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, fullName: true }))}
              className={[fieldBase, showErr("fullName") ? errBorder : okBorder].join(
                " ",
              )}
              placeholder="As on your ID"
              autoComplete="name"
            />
            {showErr("fullName") && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {fieldError.fullName}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="text-sm font-semibold text-stone-800">
              Mobile <span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
              className={[fieldBase, showErr("phone") ? errBorder : okBorder].join(" ")}
              placeholder="01xxxxxxxxx"
              inputMode="numeric"
              autoComplete="tel"
            />
            {showErr("phone") && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {fieldError.phone}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-sm font-semibold text-stone-800">
              Email <span className="text-stone-400 font-normal">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, email: true }))}
              className={[fieldBase, showErr("email") ? errBorder : okBorder].join(" ")}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {showErr("email") && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {fieldError.email}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="city" className="text-sm font-semibold text-stone-800">
              City <span className="text-red-600">*</span>
            </label>
            <input
              id="city"
              value={values.city}
              onChange={(e) => setField("city", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, city: true }))}
              className={[fieldBase, showErr("city") ? errBorder : okBorder].join(" ")}
              placeholder="Cairo"
              autoComplete="address-level2"
            />
            {showErr("city") && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {fieldError.city}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="addressLine" className="text-sm font-semibold text-stone-800">
              Street, building, floor <span className="text-red-600">*</span>
            </label>
            <input
              id="addressLine"
              value={values.addressLine}
              onChange={(e) => setField("addressLine", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, addressLine: true }))}
              className={[fieldBase, showErr("addressLine") ? errBorder : okBorder].join(
                " ",
              )}
              placeholder="Street, building, floor, apartment"
              autoComplete="street-address"
            />
            {showErr("addressLine") && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {fieldError.addressLine}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="notes" className="text-sm font-semibold text-stone-800">
              Delivery notes{" "}
              <span className="text-stone-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="notes"
              value={values.notes}
              onChange={(e) => setField("notes", e.target.value)}
              className={[fieldBase, okBorder].join(" ")}
              placeholder="Landmark, gate code, preferred time…"
              rows={3}
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-bold text-stone-900">Payment</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setField("payment", "cod")}
              className={[
                "rounded-2xl border px-4 py-3 text-left transition",
                values.payment === "cod"
                  ? "border-stone-900 bg-stone-900 text-white shadow-md ring-2 ring-amber-600/40 ring-offset-2"
                  : "border-stone-200 bg-white hover:border-stone-300",
              ].join(" ")}
            >
              <div className="text-sm font-bold">Cash on delivery</div>
              <div
                className={
                  values.payment === "cod"
                    ? "mt-0.5 text-xs text-stone-200"
                    : "mt-0.5 text-xs text-stone-600"
                }
              >
                Pay when your order arrives.
              </div>
            </button>
            <button
              type="button"
              onClick={() => setField("payment", "card")}
              className={[
                "rounded-2xl border px-4 py-3 text-left transition",
                values.payment === "card"
                  ? "border-stone-900 bg-stone-900 text-white shadow-md ring-2 ring-amber-600/40 ring-offset-2"
                  : "border-stone-200 bg-white hover:border-stone-300",
              ].join(" ")}
            >
              <div className="text-sm font-bold">Card (demo)</div>
              <div
                className={
                  values.payment === "card"
                    ? "mt-0.5 text-xs text-stone-200"
                    : "mt-0.5 text-xs text-stone-600"
                }
              >
                Simulated only—no charge.
              </div>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canCheckout || submitting}
          className="mt-8 w-full rounded-xl bg-gradient-to-b from-stone-900 to-stone-800 py-3.5 text-sm font-bold text-white shadow-md transition hover:from-stone-800 hover:to-stone-700 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600/80"
          style={{ boxShadow: "var(--cta-shadow)" }}
        >
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>

      <aside className="sticky top-24 rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900">Order summary</h2>

        <div className="mt-4 max-h-[min(420px,55vh)] space-y-4 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <p className="text-sm text-stone-500">No items in cart.</p>
          ) : (
            items.map((i) => (
              <div
                key={i.cartKey}
                className="flex justify-between gap-3 border-b border-stone-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-stone-900">{i.title}</p>
                  <p className="mt-0.5 text-xs font-medium text-stone-600">
                    {colorLabel(i.id, i.selectedColorId)} · {i.selectedSize} · Qty{" "}
                    {i.quantity}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-sm font-bold text-stone-900">
                    {formatEGP(i.price * i.quantity)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 space-y-2 border-t border-stone-200 pt-4 text-sm">
          <div className="flex justify-between font-medium text-stone-600">
            <span>Subtotal</span>
            <span className="tabular-nums text-stone-900">
              {formatEGP(totalPrice)}
            </span>
          </div>
          <div className="flex justify-between font-medium text-stone-600">
            <span>Shipping</span>
            <span className="tabular-nums text-stone-900">
              {shippingFee === 0 ? "Free" : formatEGP(shippingFee)}
            </span>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-bold text-stone-900">
            <span>Total</span>
            <span className="tabular-nums">{formatEGP(grandTotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
