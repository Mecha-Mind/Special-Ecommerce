export const ORDERS_STORAGE_KEY = "darlstore-orders-v1";
export const LEGACY_ORDER_KEY = "mechastore-orders-v1";

export function readOrdersRaw(): string | null {
  if (typeof window === "undefined") return null;
  const cur = localStorage.getItem(ORDERS_STORAGE_KEY);
  if (cur) return cur;
  const leg = localStorage.getItem(LEGACY_ORDER_KEY);
  if (leg) {
    localStorage.setItem(ORDERS_STORAGE_KEY, leg);
    return leg;
  }
  return null;
}

export function writeOrdersRaw(json: string) {
  localStorage.setItem(ORDERS_STORAGE_KEY, json);
}
