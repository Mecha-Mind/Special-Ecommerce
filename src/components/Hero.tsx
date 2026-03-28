import Link from "next/link";
import Image from "next/image";

const HERO_IMG =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1100&q=80";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-[var(--hero-surface)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(780px_circle_at_15%_20%,var(--brand-glow),transparent_55%),radial-gradient(640px_circle_at_85%_30%,var(--accent-glow),transparent_50%)]"
        aria-hidden
      />
      <div className="relative grid gap-8 p-8 md:grid-cols-[1.05fr_minmax(0,0.95fr)] md:items-center md:p-12">
        <div className="max-w-xl">
          <p className="inline-flex items-center rounded-full border border-stone-200/90 bg-white/80 px-3 py-1 text-xs font-medium text-stone-600 backdrop-blur-sm">
            New season · Shoes & clothing · EGP
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 md:text-5xl md:leading-[1.1]">
            Everyday pieces for wardrobe and footwear.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 md:text-base">
            Browse shoes, layers, and accessories—filter by category, check out in
            EGP.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/app/products"
              className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
            >
              Shop products
            </Link>
            <Link
              href="/app/orders"
              className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-50"
            >
              Orders
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 md:aspect-square">
            <Image
              src={HERO_IMG}
              alt="Clothing retail store interior"
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 768px) 42vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
