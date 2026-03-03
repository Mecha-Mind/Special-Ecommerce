"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatEGP } from "@/lib/formatEGP";

const STORAGE_KEY= 'mechastore-orders-v1';


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

export default function OrderDetails({orderId}: { orderId: string}) {
    const [order, setOrder]= useState<Order| null>(null);
    const [hybrated, setHybrated]= useState(false);

    useEffect(()=> {
        try{
            const raw = localStorage.getItem(STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            const list: Order[] = Array.isArray(parsed) ? parsed : [];
            const found = list.find((o)=> o.id === orderId) ?? null;
            setOrder(found);
        } catch {
            setOrder(null);
        } finally {
            setHybrated(true);
        }
    }, [orderId]);

    const createdAt = useMemo(()=> {
        if(!order) return '';
        try{
            return new Date(order.createdAt).toLocaleString();
        } catch {
            return order.createdAt;
        }
    }, [order]);

    if(!hybrated) {
        return (
            <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600">Loading order...</div>
        );
    }

    if(!order) {
        return (
            <div className="rounded-2xl border bg-white p-6">
                <h1 className="text-xl font-semibold">Order not found</h1>
                <p className="mt-2 text-sm text-gray-600">This order doesn't exist in local storage.</p>
                <Link
                    href={"/app/orders"}
                    className="mt-4 inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
                >
                    Back to orders
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Order details</h1>
                    <div className="mt-1 text-sm text-gray-600">
                        <span className="font-mono">{order.id} - {createdAt}</span>
                    </div>
                </div>
                <Link
                    href={'/app/orders'}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Back</Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
                <section className="rounded-2xl border bg-white p-4 lg:p-6">
                    <h2 className="text-lg font-semibold">Items</h2>
                    <div className="mt-4 space-y-3">
                        {order.items.map((item)=> (
                            <div key={item.cartKey} className="flex justify-between gap-3 border-b pb-3 last:border-b-0 last:pb-0">
                                <div className="min-w-0">
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-xs text-gray-600">Color: {item.selectedColorId} - Size: {item.selectedSize}</p>
                                    <p className="text-xs text-gray-600">Qty: {item.quantity} - Unit: {formatEGP(item.price)}</p>
                                </div>

                                <div className="shrink-0 text-right font-medium">{formatEGP(item.price * item.quantity)}</div>
                            </div>

                        ))}
                    </div>
                </section>
                <aside className="rounded-2xl border bg-white p-4 lg:p-6">
                    <h2 className="text-lg font-semibold">Summary</h2>
                    <div className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Items</span>
                            <span>{order.totals.totalItems}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>{order.totals.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span>{order.totals.shippingFee === 0 ? "Free" : formatEGP(order.totals.shippingFee)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 text-base font-semibold">
                            <span>Total</span>
                            <span>{formatEGP(order.totals.grandTotal)}</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-2 text-sm">
                        <div className="font-medium">Customer</div>
                        <div className="text-gray-70">{order.customer.fullName}</div>
                        <div className="text-gray-600">{order.customer.phone}</div>
                        {order.customer.email && <div className="text-gray-600">{order.customer.email}</div>}
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                        <div className="font-medium">Shipping</div>
                        <div className="text-gray-700">{order.shipping.city}</div>
                        <div className="text-gray-700">{order.shipping.addressLine}</div>
                        {order.shipping.notes && <div className="text-gray-700">{order.shipping.notes}</div>}

                    </div>

                    <div className="mt-4">
                        <span className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-700">Status: {order.status}</span>
                    </div>
                </aside>
            </div>
        </div>
    );
}