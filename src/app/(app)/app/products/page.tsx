import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import ProductBrowser from "@/components/ProductBrowser";

export const metadata: Metadata = {
  title: "Products · Darl Store",
  description: "Browse shoes, clothing, and accessories.",
};

export default function ProductsPage() {
  return (
    <>
      <nav className="mb-6 text-sm text-stone-600">
        <Link href="/" className="hover:text-stone-900 hover:underline">
          Home
        </Link>
        <span className="mx-2 text-stone-300">/</span>
        <span className="text-stone-900">Products</span>
      </nav>

      <h1 className="mb-2 text-2xl font-semibold text-stone-900">Products</h1>
      <p className="mb-6 text-sm text-stone-600">
        Filter and sort the catalog below.
      </p>

      <ProductBrowser products={products} />
    </>
  );
}
