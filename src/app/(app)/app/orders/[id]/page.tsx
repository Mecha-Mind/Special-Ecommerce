import OrderDetails from '@/components/OrderDetails';

export default async function OrderDetailsPage({params}: { params: Promise<{id: string}> }) {

    const {id} = await params;
    return (
        <main className="mx-auto max-w-5xl px-4 py-8">
            <OrderDetails orderId= {id}/>
        </main>
    )
}