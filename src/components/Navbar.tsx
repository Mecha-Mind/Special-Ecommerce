"use client";
import Link from "next/link";
import { useShopUi } from "@/context/shop-ui-context";
import { useCart } from "@/context/cart-context";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Image from "next/image";
import CartImage from "../../public/products/icon-cart.svg";

const CATEGORY_CHIPS = ["all", "shoes", "clothing", "accessories"] as const;

const Navbar = () => {
  const { searchText, setSearchText, category, setCategory } = useShopUi();
  const { totalItems } = useCart();
  const { hidden } = useScrollDirection({
    hideAfter: 80,
    showAfter: 50,
  });

  return (
    <header className="sticky top-0 z-[60]">
      <div className="border-b border-stone-200/90 bg-white/95 shadow-sm backdrop-blur-md">
        <div
          className={[
            "bg-stone-900 text-white transition-transform duration-300",
            hidden ? "-translate-y-full" : "translate-y-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-6xl px-4 py-2 text-center text-xs font-medium tracking-wide md:text-sm">
            Free shipping on orders over{" "}
            <span className="font-semibold text-amber-200/95">999 EGP</span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Link
              href={"/"}
              className="text-lg font-bold tracking-tight text-stone-900 transition hover:text-amber-900 md:text-xl"
            >
              Darl Store
            </Link>
            <div className="order-3 flex w-full min-w-0 md:order-none md:flex-1">
              <label htmlFor="search" className="sr-only">
                Search products
              </label>
              <input
                id="search"
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search shoes, layers, accessories…"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50/80 px-4 py-2.5 text-sm text-stone-900 shadow-inner outline-none transition placeholder:text-stone-400 focus:border-amber-900/30 focus:bg-white focus:ring-2 focus:ring-amber-600/25"
              />
            </div>
            <div className="ml-auto flex items-center gap-2 md:ml-0">
              <Link
                href="/app/cart"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-stone-200 bg-white px-3 py-2 shadow-sm transition hover:border-amber-900/25 hover:bg-amber-50/50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700/50 active:scale-[0.98]"
              >
                <Image
                  src={CartImage}
                  alt="Shopping cart"
                  width={22}
                  height={22}
                  className="shrink-0 opacity-95"
                />
                <span className="min-w-[1.25rem] rounded-full bg-stone-900 px-2 py-0.5 text-center text-xs font-bold tabular-nums text-white">
                  {totalItems}
                </span>
              </Link>
              <Link
                href={"/app/orders"}
                className="hidden rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 sm:inline-flex"
              >
                Orders
              </Link>
            </div>
          </div>
        </div>

        <nav
          className="mx-auto max-w-6xl border-t border-stone-100 px-4 pb-3 pt-2"
          aria-label="Categories"
        >
          <ul className="flex flex-wrap gap-2">
            {CATEGORY_CHIPS.map((c) => {
              const active = category === c;
              return (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setCategory(c)}
                    className={[
                      "rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition md:text-sm md:normal-case md:tracking-normal",
                      active
                        ? "bg-stone-900 text-white shadow-sm ring-1 ring-stone-900/20"
                        : "border border-stone-200 bg-white text-stone-700 hover:border-amber-900/20 hover:bg-amber-50/40",
                    ].join(" ")}
                  >
                    {c === "all" ? "All" : c}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
