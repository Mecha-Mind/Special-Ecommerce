"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatEGP } from "@/lib/formatEGP";

const STORAGE_KEY = 'mechastore-orders-v1';

type Order = {
    id:string;
    createdAt:string;
    customer: { fullName: string; phone:string; email:string | null};
    shipping: { city: string; addressLine:string; notes:string | null};
    payment: 'cod' | 'card';
    items: Array<{
        cartKey: string;
        productId: string;
        title: string;
        price: number;
        quantity: number;
        selectedColorId: string;
        selectedSize: string;
        image: string | null;
    }>;
    totals: {
        totalItems: number;
        subtotal: number;
        shippingFee: number;
        grandTotal: number;
    }
    status: string;
};

export default function OrdersList() {
    const [orders, setOrders]= useState<Order[]>([]);
    const [hybrated, setHybrated]= useState(false);

    useEffect(()=> {
        try{
            const raw = localStorage.getItem(STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            setOrders(Array.isArray(parsed) ? parsed : []);
        } catch {
            setOrders([]);
        } finally {
            setHybrated(true);
        }
    }, []);

    const empty = hybrated && orders.length === 0;

    const totalSpent = useMemo(()=> orders.reduce((sum, o)=> sum + (o?.totals?.grandTotal ?? 0), 0), [orders]);

    function clearOrders() {
        if (!confirm('Clear all saved orders?')) return;
        localStorage.removeItem(STORAGE_KEY);
        setOrders([]);
    }

    if(!hybrated) {
        return (
            <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600">Loading orders...</div>
        );
    }

    if(empty) {
        return (
            <div className="rounded-2xl border bg-white p-6">
                <p className="text-sm text-gray-700">No orders yet.</p>
                <Link
                    href='/'
                    className="mt-4 inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
                >
                    Start shopping
                </Link>
            </div>
        );
    }

    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white p-4">
                <div className="text-sm">
                    <div className="font-medium">Summary</div>
                    <div className="text-gray-600">
                        Orders: {orders.length} - Total spent: {formatEGP(totalSpent)}
                    </div>
                </div>
                <button
                    onClick={clearOrders}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                >
                    Clear orders
                </button>
            </div>

            <div className="grid gap-4">
                {orders.map((o)=> (
                    <article 
                        key={o.id}
                        className="rounded-2xl border bg-white p-4"
                    >
                        <div className="flex flex-wrap justify-between gap-3">
                            <div>

                                <div className="text-sm text-gray-600">Order</div>
                                <div className="font-mono text-sm">{o.id}</div>
                                <div className="mt-1 text-sm text-gray-600">
                                    {new Date(o.createdAt).toLocaleString()}
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-gray-600">Total</div>
                                <div className="text-lg font-semibold">{formatEGP(o.totals.grandTotal)}</div>
                                <div className="text-xs text-gray-600">Payment: {o.payment.toUpperCase()}</div>
                            </div>
                        </div>

                        <div className="mt-3 text-sm text-gray-700">
                            <span className="font-medium">{o.customer.fullName}</span> . {' '} {o.shipping.city}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {o.items.slice(0, 3).map((item)=> (
                                <span
                                    key={item.cartKey}
                                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                >
                                    {item.title} x {item.quantity}

                                </span>
                            ))}
                            {o.items.length > 3 && (
                                <span className="text-xs text-gray-600">+{o.items.length -3} more</span>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <Link
                                href={`/app/orders/${o.id}`}
                                className="text-sm font-medium hover:underline"
                            >
                                View details {'==>'}
                            </Link>

                            <span className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-700">{o.status}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )

}