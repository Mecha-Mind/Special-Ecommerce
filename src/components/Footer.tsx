import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-stone-200/90 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="text-lg font-bold tracking-tight text-stone-900">
            Darl Store
          </div>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Footwear, layers, and finishing touches—thoughtful spacing, EGP
            pricing, and checkout that favours clarity over noise.
          </p>
        </div>

        <div className="text-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Explore
          </div>
          <ul className="mt-4 space-y-2.5 font-medium text-stone-600">
            <li>
              <Link
                className="transition hover:text-amber-900"
                href="/app/products"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-amber-900" href="/app/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-amber-900"
                href="/app/orders"
              >
                Orders
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Support
          </div>
          <ul className="mt-4 space-y-2.5 text-stone-600">
            <li>
              <a
                className="font-medium transition hover:text-amber-900"
                href="mailto:support@darlstore.example"
              >
                support@darlstore.example
              </a>
            </li>
            <li className="text-xs font-medium text-stone-500">
              EGP · Cash on delivery on demo checkout
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-100 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-xs font-medium text-stone-500">
          <span>© {new Date().getFullYear()} Darl Store</span>
          <span className="text-stone-400">Next.js · Demo storefront</span>
        </div>
      </div>
    </footer>
  );
}
