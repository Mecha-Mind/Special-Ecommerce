import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-white p-8 md:p-12">
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(900px_circle_at_10%_10%,var(--brand-glow),transparent_60%),radial-gradient(700px_circle_at_90%_20%,var(--accent-glow),transparent_55%)]" />
      <div className="relative max-w-2xl">
        <p className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs text-gray-700 backdrop-blur">
          New season • Fast delivery • Cash on delivery
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          Upgrade your everyday tech with a bold identity.
        </h1>

        <p className="mt-3 text-sm text-gray-600 md:text-base">
          Curated phones, laptops, audio, and accessories — designed for clean browsing and quick checkout.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app/products"
            className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Shop products
          </Link>
          <Link
            href="/app/orders"
            className="rounded-xl border px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
          >
            Track orders
          </Link>
        </div>
      </div>
    </section>
  );
}