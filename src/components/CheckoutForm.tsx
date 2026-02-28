"use client"
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import {formatEGP} from '@/lib/formatEGP'

type PaymentMethod = 'cod' | 'card';

type CheckoutValues = {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    addressLine: string;
    notes: string;
    payment: PaymentMethod;
};

function isValidEgyptPhone(phone: string) {
    return /^01\d{9}$/.test(phone.replace(/\s+/g, ''));
}

export default function CheckoutForm(){
    const router = useRouter();
    const { items,totalItems, totalPrice, clear} = useCart();
    const [values, setValues] = useState<CheckoutValues>({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        addressLine: '',
        notes: '',
        payment: 'cod',
    });
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitting, setSubmitting] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const shippingFee = useMemo(()=> {
        // free for over 999
        return totalPrice >= 999 ? 0 : 60;
    }, [totalPrice]);

    const grandTotal = totalPrice + shippingFee;
    
    const canCheckout = items.length > 0;

    function setField<K extends keyof CheckoutValues>(key: K, val: CheckoutValues[K]) {
            setValues((prev)=> ({...prev, [key]: val}))
        }

    function validate(v: CheckoutValues) {
        const errors: Record<string, string> = {};

        if (!v.fullName.trim()) errors.fullName = 'Full name is required';
        if (!v.phone.trim()) errors.phone = 'Phone is required'
        else if (!isValidEgyptPhone(v.phone)) errors.phone = 'Phone must be valid (e.g. 01xxx xxx xxx';

        if (v.email.trim() && !/^\S+@\.\S+$/.test(v.email.trim())) {
            errors.email = 'Email is not valid';
        }

        if (!v.city.trim()) errors.city = 'City is required';

        if (!v.addressLine.trim()) errors.addressLine = 'Address is required';

        return errors;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setError(null);
        
        if (!canCheckout) {
            setError('Your cart is empty.');
            return;
        }

        const errors = validate(values);
        const hasErrors = Object.keys(errors).length > 0;

        if (hasErrors) {
            setTouched((prev) => ({
                ...prev,
                fullName: true,
                phone: true,
                email: true,
                city: true,
                addressLine: true,
            }));

            setError('Please fix the highlighted fields.');

            return;
        }

        setSubmitting(true);

        try {
            // Order payload //Localstorage tmp;
            const orderId = `ord-${Date.now()}`;
            const order = {
                id: orderId,
                createdAt: new Date().toISOString(),
                customer: {
                    fullName: values.fullName.trim(),
                    phone: values.phone.trim(),
                    email: values.email.trim() || null,
                },
                shipping: {
                    city: values.city.trim(),
                    addressLine: values.addressLine.trim(),
                    notes: values.notes.trim() || null,
                },
                payment: values.payment,
                items: items.map((i)=> ({
                    cartKey: i.cartKey,
                    productId: i.id,
                    title: i.title,
                    price: i.price,
                    quantity: i.quantity,
                    selectedColorId: i.selectedColorId,
                    selectedSize: i.selectedSize,
                    image: i.image ?? null,
                })),
                totals: {
                    totalItems,
                    subtotal: totalPrice,
                    shippingFee,
                    grandTotal,
                },
                status: 'placed',
            };

            const STORAGE_KEY = 'mechastore-orders-v1';
            const raw = localStorage.getItem(STORAGE_KEY);
            const prev = raw ? JSON.parse(raw) : [];
            const next = Array.isArray(prev) ? [order, ...prev] : [order];

            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

            // clear cart
            clear();

            // go to success page
            router.push(`/app/checkout/success?orderId=${orderId}`);
        } catch (err) {
            setError('Somthing went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }

        
    }

    const fieldError = useMemo(()=> validate(values), [values]);
    const showErr = (name: keyof CheckoutValues) => touched[name] && fieldError[name];

    return (
        <div className="grid gap-6 lg:grid-cols-[1fr-360px]">
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border bg-white p-4 lg:p-6"
            >
                <h2 className="mb-4 text-lg font-medium">Customer & Shipping</h2>

                {error && (
                    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    {/* Full Name */}
                    <div className="sm:col-span-2">
                        <label htmlFor="fullName" className="text-sm font-medium">Full name *</label>
                        <input
                        id="fullName"
                        value={values.fullName}
                        onChange={(e)=> setField('fullName', e.target.value)}
                        onBlur={()=> setTouched((p)=> ({...p, fullName:true}))}
                        className={["mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none", showErr('fullName') ? 'border-red-300' : 'border-gray-200',].join(' ')}
                        placeholder="Full name"
                        />
                        {showErr('fullName') && <p className="mt-1 text-xs text-red-600">{fieldError.fullName}</p>}
                    </div>
                    {/* Phone */}
                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone *</label>
                        <input
                        id="phone"
                        value={values.phone}
                        onChange={(e)=> setField('phone', e.target.value)}
                        onBlur={()=> setTouched((p)=> ({...p, phone:true}))}
                        className={["mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none", showErr('phone') ? 'border-red-300' : 'border-gray-200',].join(' ')}
                        placeholder="01xxx xxx xxx"
                        />
                        {showErr('phone') && <p className="mt-1 text-xs text-red-600">{fieldError.phone}</p>}
                    </div>
                    {/* Email */}
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="text-sm font-medium">Email (optional)</label>
                        <input
                        id="email"
                        value={values.email}
                        onChange={(e)=> setField('email', e.target.value)}
                        onBlur={()=> setTouched((p)=> ({...p, email:true}))}
                        className={["mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none", showErr('email') ? 'border-red-300' : 'border-gray-200',].join(' ')}
                        placeholder="Full name"
                        />
                        {showErr('email') && <p className="mt-1 text-xs text-red-600">{fieldError.email}</p>}
                    </div>
                    {/* City */}
                    <div className="sm:col-span-2">
                        <label htmlFor="city" className="text-sm font-medium">City name *</label>
                        <input
                        id="city"
                        value={values.city}
                        onChange={(e)=> setField('city', e.target.value)}
                        onBlur={()=> setTouched((p)=> ({...p, city:true}))}
                        className={["mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none", showErr('city') ? 'border-red-300' : 'border-gray-200',].join(' ')}
                        placeholder="Cairo"
                        />
                        {showErr('city') && <p className="mt-1 text-xs text-red-600">{fieldError.city}</p>}
                    </div>
                    {/* Address */}
                    <div className="sm:col-span-2">
                        <label htmlFor="addressLine" className="text-sm font-medium">addressLine name *</label>
                        <input
                        id="addressLine"
                        value={values.addressLine}
                        onChange={(e)=> setField('addressLine', e.target.value)}
                        onBlur={()=> setTouched((p)=> ({...p, addressLine:true}))}
                        className={["mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none", showErr('addressLine') ? 'border-red-300' : 'border-gray-200',].join(' ')}
                        placeholder="Street, bulding, floor, apartment"
                        />
                        {showErr('addressLine') && <p className="mt-1 text-xs text-red-600">{fieldError.addressLine}</p>}
                    </div>
                    {/* Notes */}
                    <div className="sm:col-span-2">
                        <label htmlFor="notes" className="text-sm font-medium">Notes (optional)</label>
                        <textarea
                        id="notes"
                        value={values.notes}
                        onChange={(e)=> setField('notes', e.target.value)}
                        className={"mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none"}
                        placeholder="Delivery notes..."
                        rows={3}
                        />
                        {showErr('notes') && <p className="mt-1 text-xs text-red-600">{fieldError.notes}</p>}
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-sm font-semibold">Payment method</h3>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={()=> setField('payment', 'cod')}
                            className={['rounded-xl border px-3 py-2 text-left text-sm', values.payment === 'cod' ? 'border-black' : 'border-gray-200',].join(' ')}
                        >
                            <div className="font-medium">Cash on delivery</div>
                            <div className="text-xs text-gray-600">Pay when you recieve.</div>
                            
                        </button>
                        <button
                            type="button"
                            onClick={()=> setField('payment', 'card')}
                            className={['rounded-xl border px-3 py-2 text-left text-sm', values.payment === 'card' ? 'border-black' : 'border-gray-200',].join(' ')}
                        >
                            <div className="font-medium">Card (demo)</div>
                            <div className="text-xs text-gray-600">Simulated payment only for now.</div>

                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!canCheckout || submitting}
                 className="mt-6 w-full rounded-xl bg-black py-3 text-sm font-medium text-white disabled:opacity-40">
                    {submitting ? 'Placing order...' : 'Place order'}
                </button>
                {!canCheckout && (
                    <p className="rounded-xl border bg-white p-4 lg:p-6">Add items to your cart before checkout.</p>
                )}
            </form>

            {/* Order summary */}
            <aside className="rounded-2xl border bg-white p-6">
                <h2 className="mb-4 text-lg font-medium">Order summary</h2>
                <div className="my-4 space-y-3">
                    {items.map((i)=>(
                        <div className="flex justify-between gap-3 text-sm" key={i.cartKey}>
                            <div className="min-w-0">
                                <p className="font-medium">{i.title}</p>
                                <p className="text-xs text-gray-600">Color: {i.selectedColorId} - Size: {i.selectedSize} - Qty: {i.quantity}</p>
                            </div>
                            <div className="shrink-0 text-right">
                                <div className="font-medium">{formatEGP(i.price * i.quantity)}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order values */}
                <div className="mt-5 space-y-2 border-t pt-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatEGP(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>{shippingFee === 0 ? 'Free' : formatEGP(shippingFee)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 text-base font-semibold">
                        <span className="text-gray-600">Total</span>
                        <span>{formatEGP(grandTotal)}</span>
                    </div>
                </div>
            </aside>
        </div>
    );
}