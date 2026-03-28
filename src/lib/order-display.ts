import { products } from "@/data/products";

export function colorLabel(productId: string, colorId: string): string {
  const p = products.find((x) => x.id === productId);
  return p?.colors.find((c) => c.id === colorId)?.name ?? colorId;
}
