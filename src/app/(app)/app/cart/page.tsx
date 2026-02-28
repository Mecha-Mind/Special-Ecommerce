'use client'

import Link from 'next/link';
import {useCart} from '@/context/cart-context';
import { formatEGP } from '@/lib/formatEGP';
export default function CartPage() {
    const {items, increase, decrease, totalItems, totalPrice, removeItem, clear} = useCart();

    return (
        <main className='mx-auto max-w-6xl px-4 py-6'>
            <header>
                <h1>Cart</h1>
                <div>
                    <Link href='/' className='text-sm underline'>Continue shopping</Link>
                    {items.length > 0 && (
                        <button onClick={clear} className='text-sm underline' >Clear</button>
                    )}
                </div>
            </header>
            {items.length === 0 ? (
                    <p className='text-gray-600'>Your cart is empty.</p>
                ) : (
                    <div className='grid gap-6 lg:grid-cols-3'>
                        <section className='lg:col-span-2 space-y-3'>
                            {items.map((item) => (
                                <div key={item.cartKey} className='rounded-2xl border p-4 flex items-center justify-between gap-4'>
                                    <div className='min-w-0'>
                                        <div className='font-medium truncate'>{item.title}</div>
                                        <div className='text-sm text-gray-600'>Color: {item.selectedColorId} - Size:{item.selectedSize}</div>
                                        <div className='text-sm text-gray-600'>{formatEGP(item.price)}</div>
                                        <button onClick={()=>removeItem(item.cartKey)} className='mt-2 text-sm underline text-gray-700'>Remove</button>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <button onClick={()=>decrease(item.cartKey)} className='h-9 w-9 rounded-lg border'>-</button>
                                        <span className='w-6 text-center'>{item.quantity}</span>
                                        <button onClick={()=>increase(item.cartKey)} disabled={item.quantity >= item.stock} className='h-9 w-9 rounded-lg border disabled:opacity-40'>+</button>
                                    </div>
                                    <div className='font-semibold'>{formatEGP(item.price * item.quantity)}</div>
                                </div>
                            ))}
                            </section>
                            <aside className='rounded-2xl border p-4 h-fit'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-gray-700'>Items</span>
                                    <span className='font-semibold'>{totalItems}</span>
                                </div>
                                <div className='mt-2 flex items-center justify-between text-lg'>
                                    <span className='text-gray-700'>Total</span>
                                    <span className='font-semibold'>{formatEGP(totalPrice)}</span>
                                </div>
                                <Link href={'/app/checkout'} className='mt-4 w-full rounded-xl bg-black py-2 text-sm font-medium text-white hover:opacity-90'>
                                    Checkout
                                </Link>
                            </aside>
                        </div>
                
            )}
        </main>
    )
}