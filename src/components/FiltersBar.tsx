"use client";

import { useMemo } from "react";
import { useShopUi } from "@/context/shop-ui-context";
import type { Product } from "@/data/products";
import type { SortKey } from "@/context/shop-ui-context";

const selectClass =
  "w-full cursor-pointer rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-900 shadow-sm outline-none transition hover:border-stone-300 focus:border-amber-900/35 focus:ring-2 focus:ring-amber-600/20";

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-900 tabular-nums shadow-sm outline-none transition hover:border-stone-300 focus:border-amber-900/35 focus:ring-2 focus:ring-amber-600/20";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500";

export default function FiltersBar({ products }: { products: Product[] }) {
  const {
    category,
    setCategory,
    sort,
    setSort,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useShopUi();
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  return (
    <div className="mb-6 grid gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 md:grid-cols-4 md:p-5">
      <div>
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClass}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All categories" : c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sortSelect" className={labelClass}>
          Sort
        </label>
        <select
          name="sortSelect"
          id="sortSelect"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className={selectClass}
        >
          <option value="newest">Newest</option>
          <option value="rating-desc">Top rated</option>
          <option value="price-asc">Price: low → high</option>
          <option value="price-desc">Price: high → low</option>
        </select>
      </div>

      <div>
        <label htmlFor="minPrice" className={labelClass}>
          Min price (EGP)
        </label>
        <input
          type="number"
          value={minPrice}
          name="minPrice"
          id="minPrice"
          onChange={(e) => setMinPrice(Number(e.target.value || 0))}
          className={inputClass}
          min={0}
        />
      </div>

      <div>
        <label htmlFor="maxPrice" className={labelClass}>
          Max price (EGP)
        </label>
        <input
          type="number"
          value={maxPrice}
          name="maxPrice"
          id="maxPrice"
          onChange={(e) => setMaxPrice(Number(e.target.value || 0))}
          className={inputClass}
          min={0}
        />
      </div>
    </div>
  );
}
