import Link from "next/link";
import OrderList from "@/components/OrderList";

export const metadata = {
  title: "Orders · Darl Store",
};

export default function OrdersPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-6 text-sm font-medium text-stone-500">
        <Link href="/" className="transition hover:text-amber-900">
          Home
        </Link>
        <span className="mx-2 text-stone-300">/</span>
        <span className="text-stone-900">Orders</span>
      </nav>

      <header className="mb-8 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-900/85">
          Account (local)
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
          Your orders
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 md:text-base">
          Demo orders you&apos;ve placed from this device. Data stays in{" "}
          <code className="rounded bg-stone-100 px-1.5 py-0.5 text-xs font-mono text-stone-800">
            localStorage
          </code>{" "}
          only.
        </p>
      </header>

      <OrderList />
    </main>
  );
}
