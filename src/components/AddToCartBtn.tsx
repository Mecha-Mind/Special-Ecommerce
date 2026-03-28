"use client";

import { useCart } from "@/context/cart-context";
import type { Product } from "@/data/products";
import { useToast } from "./toast/ToastProvider";

type Props = {
  product: Product;
  colorId: string;
  size: string;
  disabled?: boolean;
};

export default function AddToCartBtn({
  product,
  colorId,
  size,
  disabled,
}: Props) {
  const { addItem, canAddItem } = useCart();
  const { push } = useToast();

  const handleAddToCart = () => {
    const canAdd = canAddItem(product, { colorId, size });

    if (canAdd) {
      addItem(product, { colorId, size });
      push({
        title: "Added to cart",
        message: `${product.title} is in your bag.`,
        variant: "success",
      });
    } else {
      push({
        title: "Could not add",
        message: "This item is out of stock or already at the limit.",
        variant: "error",
      });
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      type="button"
      disabled={disabled || product.stock === 0}
      className="flex-1 rounded-xl bg-gradient-to-b from-stone-900 to-stone-800 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-stone-800 hover:to-stone-700 hover:shadow-lg active:scale-[0.99] disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600/90"
      style={{ boxShadow: "var(--cta-shadow)" }}
    >
      Add to cart
    </button>
  );
}
