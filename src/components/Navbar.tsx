"use client"
import Link from "next/link";
import { useShopUi } from "@/context/shop-ui-context";
import { useCart } from "@/context/cart-context";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Image from "next/image";
import CartImage from '../../public/products/icon-cart.svg'

const Navbar = () => {
    const {searchText, setSearchText} = useShopUi();
    const {totalItems} = useCart();
    const { hidden } = useScrollDirection({
        hideAfter: 80,
        showAfter: 50,
    })

    return (
        <header className='sticky top-0 z-60'>
            {/* wrapper */}
            <div className="border-b bg-white/90 backdrop-blur">
                {/* Top bar */}
                <div className={['bg-black text-white text-sm transition-transform duration-300', hidden ? '-translate-y-full' : 'translate-y-0',].join(" ")}>
                    <div className="mx-auto max-w-6xl px-4 text-center">
                        Free shipping on orders over 999 EGP.
                    </div>
                </div>

                {/* Main bar */}

                <div className="mx-auto max-w-6xl px-4 py-4">
                    <div className='flex items-center gap-4'>
                        <Link href={"/"} className="font-semibold text-lg tracking-tight">MechaStore</Link>
                        <div className="flex-1">
                            <label htmlFor="search" className="sr-only">
                                Search products
                            </label>
                            <input
                                id="search"
                                type="search"
                                value={searchText}
                                onChange= {(e)=> setSearchText(e.target.value)}
                                placeholder="Search products..."
                                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 foxus-ring-black/20"/>
                                
                        </div>
                        <Link href='/app/cart' className='rounded-lg border px-3 py-2 text-sm hover:bg-gray-50'>
                            <Image 
                                src={CartImage}
                                alt="Cart"
                                className="bg-gray-50 text-xl text-red-500"
                            
                            />
                            <span className="ml-2 rounded-full bg-black px-2 py-0.5 text-xs text-white">
                                {totalItems}
                            </span>
                        </Link>
                        <Link href={"/app/orders"} className="font-semibold text-lg tracking-tight">Orders</Link>
                    </div>
                </div>

                {/* Categories bar */}
                <nav className="mx-auto max-w-6xl px-4 pb-3">
                    <ul className='flex flex-wrap gap-2 text-sm'>
                        {['all', 'phones', 'laptops', 'audio', 'accessories'].map((c)=>(
                            <button
                                key={c}
                                className="rounded-full border px-3 py- gover:bg-gray-50"
                                // filter here later
                            >
                                {c}
                            </button>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar