import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm font-medium text-stone-500">
        <Link href="/" className="transition hover:text-amber-900">
          Home
        </Link>
        <span className="mx-2 text-stone-300">/</span>
        <Link href="/app/cart" className="transition hover:text-amber-900">
          Cart
        </Link>
        <span className="mx-2 text-stone-300">/</span>
        <span className="text-stone-900">Checkout</span>
      </nav>

      <header className="mb-8 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-900/85">
          Checkout
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
          Almost there
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 md:text-base">
          Confirm your shipping details and payment choice. This demo never sends
          data to a server—orders are saved in your browser only.
        </p>
      </header>

      <CheckoutForm />
    </main>
  );
}
