import OrderList from '@/components/OrderList';

export const metadata = {
    title: 'Orders'
};

export default function OrdersPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-8">
            <h1 className="text-2xl font-semibold">Orders</h1>
            <p className="mt-1 text-sm text-gray-600">Your recent orders stored locally (demo).</p>
            <div className="mt-6">
                <OrderList/>
            </div>
        </main>
    )
}