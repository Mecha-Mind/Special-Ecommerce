import Link from "next/link";

export default function CheckoutSuccessPage({ searchParams, }: { searchParams: {orderId?: string} }) {
    const orderId = searchParams.orderId ?? '_';

    return (
        <main className="mx-auto max-w-xl px-4 py-16 text-center">
            <div className="rounded-2xl border text-white p-6 flex justify-center items-center">
                <h1 className="mb-3 text-2xl font-semibold">Order placed :).</h1>
                <p className="mb-6 text-gray-600">Thanks! your order has been created successfully.</p>
                <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm">
                    <div className="text-gray-600">Order ID</div>
                    <div className="mt-1 font-mono">{orderId}</div>
                </div>
            </div>

            <Link className="inline-block rounded-xl bg-black px-6 py-3 text-sm font-medium text-white" href='/'>Back to store</Link>
        </main>
    )
}