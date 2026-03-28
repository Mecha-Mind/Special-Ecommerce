import {notFound} from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductOptions from '@/components/ProductOptions';

export function generateStaticParams() {
    return products.map((p)=>({id: p.id}));
}

type PageProps = {params: Promise<{id: string}>};

export default async function ProductDetailsPage ({params} : PageProps) {
    const {id} = await params;
    const product = products.find((p)=> p.id === id);
    if (!product) return notFound();

    const discount = product.compareAtPrice && product.compareAtPrice > product.price ?
    Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : null;

    return (
        <main className='mx-auto max-w-6xl px-4 py-6'>
            {/* Breadcrumb */}
            <nav className='mb-4 text-sm text-gray-600'>
                <Link href='/' className='hover:underline'>Home</Link>
                <span className='mx-2'>/</span>
                <Link href='/app/products' className='hover:underline'>Products</Link>
                <span className='mx-2'>/</span>
                <span className='text-gray-900'>{product.title}</span>
            </nav>
            <ProductOptions key={product.id} product={product}/>
        </main>
    )
}