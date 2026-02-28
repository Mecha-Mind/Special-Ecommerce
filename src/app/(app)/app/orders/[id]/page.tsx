import OrderDetails from '@/components/OrderDetails';

export default function OrderDetailsPage({params}: { params: {id: string} }) {
    return (
        <main className="mx-auto max-w-5xl px-4 py-8">
            <OrderDetails orderId= {params.id}/>
        </main>
    )
}