import ProductCard from './ProductCard';

import type  {Product}  from '@/data/products';

export default function ProductGrid({products} : {products: Product[]}) {
    if (products.length === 0) {
        return <p className='rounded-xl border bg-white p-6 text-gray-600'>No products found. Try a different search.</p>
    }
    return (
        <section className='grid gap-4 smd:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
            {products.map((p)=>(
                <ProductCard key={p.id} product={p}/>
            ))}
        </section>
    );
}