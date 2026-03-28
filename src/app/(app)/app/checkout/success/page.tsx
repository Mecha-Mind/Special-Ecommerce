import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId = "—" } = await searchParams;

  return (
    <main className="mx-auto max-w-lg px-4 py-16 md:py-24">
      <div className="rounded-3xl border border-stone-200/90 bg-white p-8 text-center shadow-lg shadow-stone-900/5 ring-1 ring-stone-900/5 md:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl ring-1 ring-emerald-600/20">
          ✓
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-stone-900">
          Order placed
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Thanks—we&apos;ve stored this demo order in your browser. You can
          review it anytime under Orders.
        </p>
        <div className="mt-6 rounded-2xl bg-stone-50 px-4 py-3 text-left ring-1 ring-stone-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Order ID
          </div>
          <div className="mt-1 break-all font-mono text-sm font-semibold text-stone-900">
            {orderId}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/app/orders"
            className="inline-flex justify-center rounded-xl bg-gradient-to-b from-stone-900 to-stone-800 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-stone-800 hover:to-stone-700"
            style={{ boxShadow: "var(--cta-shadow)" }}
          >
            View orders
          </Link>
          <Link
            href="/app/products"
            className="inline-flex justify-center rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-bold text-stone-800 transition hover:border-stone-300 hover:bg-stone-50"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
