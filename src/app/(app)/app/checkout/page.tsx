import CheckoutForm from '@/components/CheckoutForm'

export default function CheckoutPage() {
    return (
        <main className='mx-auto max-w-6xl px-4 py-8'>
            <h1 className='mb-6 text-2xl font-semibold'>Checkout</h1>
            <p className="mt-1 text-sm text-gray-600">Complete your order details below.</p>
            <div className="mt-6">

                <CheckoutForm/>
            </div>
        </main>
    )
}