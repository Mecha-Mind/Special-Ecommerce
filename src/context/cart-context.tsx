"use client";

import React, {
  useCallback,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";

export type CartItem = Product & {
  quantity: number;
  selectedColorId: string;
  selectedSize: string;
  cartKey: string;
};

const makeCartKey = (id: string, colorId: string, size: string) =>
  `${id}__${colorId}__${size}`;

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, opts: { colorId: string; size: string }) => void;
  removeItem: (cartKey: string) => void;
  increase: (cartKey: string) => void;
  decrease: (cartKey: string) => void;
  clear: () => void;
  makeKey: (
    product: Product,
    opts: { colorId: string; size: string },
  ) => string;
  getQuantity: (cartKey: string) => number;
  canAddItem: (
    product: Product,
    opts: { colorId: string; size: string },
  ) => boolean;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "darlstore-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore */
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const makeKey = useCallback(
    (product: Product, opts: { colorId: string; size: string }) =>
      makeCartKey(product.id, opts.colorId, opts.size),
    [],
  );

  const getQuantity = useCallback(
    (cartKey: string) =>
      items.find((i) => i.cartKey === cartKey)?.quantity ?? 0,
    [items],
  );

  const canAddItem = useCallback(
    (product: Product, opts: { colorId: string; size: string }) =>
      product.stock > 0 &&
      getQuantity(makeKey(product, opts)) < product.stock,
    [getQuantity, makeKey],
  );

  const addItem = useCallback((product: Product, opts: { colorId: string; size: string }) => {
    setItems((prev) => {
      if (product.stock <= 0) return prev;

      const cartKey = makeCartKey(product.id, opts.colorId, opts.size);
      const found = prev.find((i) => i.cartKey === cartKey);

      if (found) {
        if (found.quantity >= product.stock) return prev;
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          selectedColorId: opts.colorId,
          selectedSize: opts.size,
          cartKey,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((cartKey: string) => {
    setItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
  }, []);

  const increase = useCallback((cartKey: string) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.cartKey !== cartKey) return i;
        if (i.quantity >= i.stock) return i;
        return { ...i, quantity: i.quantity + 1 };
      }),
    );
  }, []);

  const decrease = useCallback((cartKey: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.cartKey === cartKey);
      if (!target) return prev;
      if (target.quantity === 1) {
        return prev.filter((i) => i.cartKey !== cartKey);
      }
      return prev.map((i) =>
        i.cartKey === cartKey ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      increase,
      decrease,
      clear,
      makeKey,
      getQuantity,
      canAddItem,
      totalItems,
      totalPrice,
    }),
    [
      items,
      addItem,
      removeItem,
      increase,
      decrease,
      clear,
      makeKey,
      getQuantity,
      canAddItem,
      totalItems,
      totalPrice,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
