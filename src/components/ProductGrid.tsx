import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return null;
  }
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
