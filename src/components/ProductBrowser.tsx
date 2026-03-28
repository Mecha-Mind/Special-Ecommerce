"use client";
import { useMemo } from "react";
import { useShopUi } from "@/context/shop-ui-context";
import ProductGrid from "./ProductGrid";
import FiltersBar from "./FiltersBar";
import type { Product } from "../data/products";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

const ProductBrowser = ({ products }: { products: Product[] }) => {
  const { searchText, category, sort, minPrice, maxPrice } = useShopUi();

  const filtered = useMemo(() => {
    const q = normalize(searchText);

    let list = products.filter((p) => {
      const matchText =
        q.length === 0 ||
        normalize(p.title).includes(q) ||
        normalize(p.description).includes(q);
      const matchCategory = category === "all" || p.category === category;
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;

      return matchText && matchCategory && matchPrice;
    });

    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "newest") return +new Date(b.createdAt) - +new Date(a.createdAt);
      return 0;
    });
    return list;
  }, [products, searchText, category, sort, minPrice, maxPrice]);

  return (
    <>
      <FiltersBar products={products} />
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm">
          <p className="font-semibold text-stone-900">No matches</p>
          <p className="mt-2 text-sm text-stone-600">
            Try another category, widen the price range, or clear your search.
          </p>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </>
  );
};

export default ProductBrowser;
