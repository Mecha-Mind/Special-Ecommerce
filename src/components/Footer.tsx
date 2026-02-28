import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="text-lg font-semibold tracking-tight">MechaStore</div>
          <p className="mt-2 text-sm text-gray-600">
            Clean shopping experience, fast checkout, and a distinct brand palette.
          </p>
        </div>

        <div className="text-sm">
          <div className="font-medium">Explore</div>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li><Link className="hover:underline" href="/app/products">Products</Link></li>
            <li><Link className="hover:underline" href="/app/cart">Cart</Link></li>
            <li><Link className="hover:underline" href="/app/orders">Orders</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="font-medium">Support</div>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li><a className="hover:underline" href="mailto:support@mechastore.com">support@mechastore.com</a></li>
            <li><span>EGP • COD available</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} MechaStore. All rights reserved.</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}