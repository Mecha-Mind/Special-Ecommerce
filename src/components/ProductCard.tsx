'use-client';

import type {Product} from '@/data/products';
import { useCart } from '@/context/cart-context';
import Image from 'next/image'
import Link from 'next/link'
import AddToCartBtn from './AddToCartBtn';
import { formatEGP } from '@/lib/formatEGP';

function calcDiscountPercent(price: number, compareAt?:number) {
    if (!compareAt || compareAt <= price) 
        return null;
    const pct = Math.round(((compareAt - price) / compareAt) * 100);
    return pct > 0 ? pct : null;
}



export default function ProductCard({product}: { product: Product}){
    const {title, description, price, compareAtPrice, rating, reviewCount, stock, category, tags, image}= product;
    const discount = calcDiscountPercent(price, compareAtPrice);
    const { addItem } = useCart();
    return(
        <article className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md relative">
            
            {/* Image */}
            <Link href={`/app/products/${product.id}`} className='hover:underline'>

                <div className='relative'>
                    {/* placeholder image block */}
                    <div className='relative aspect-square overflow-hidden rounded-xl bg-gray-100'>
                        <Image src={product.image} alt={product.title} fill className='object-cover transition-transform duration-300 group-hover:scale-105' sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' priority={false}/>
                    </div>
                    {discount !== null && (
                        <span className='absolute left-3 top-3 rounded-full bg-black px-2 py-1 text-xs text-white'>-{discount}%</span>
                    ) }
                </div>
            </Link>
            {/* Info */}
            <div>
                <div>
                    <h3 className='font-semibold'>
                        <Link href={`/app/products/${product.id}`} className='hover:underline'>
                            {title}
                        </Link>
                    </h3>
                    <span>{category}</span>
                </div>
                <p>{description}</p>
                {/* Rating */}
                <div>
                    <span className='font-medium'>{rating.toFixed(1)}</span>
                    <span className='text-gray-400'>.</span>
                    <span className='text-gray-600'>{reviewCount} reviews</span>
                    <span className='ml-auto text-xs text-gray-500'>{stock > 0? `${stock} in stock`: 'Out of stock'}</span>
                </div>
                {/* Price */}
                <div className='flex items-end gap-2'>
                    <div className='text-lg font-semibold'>{formatEGP(price)}</div>
                    {compareAtPrice && compareAtPrice > price && (

                        <div className='text-sm text-gray-500 line-through'>
                            {formatEGP(compareAtPrice)}
                        </div>
                    )}
                </div>
                {/* Tags */}
                <div className='flex flex-wrap gap-2 pt-1'>
                    {tags.slice(0,3).map((t)=>(
                        <span key={t} className='rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-700'>
                            {t}
                        </span>
                    ))}
                </div>
                {/* Actions */}
                <div className='pt-2'>
                    <AddToCartBtn 
                        product={product}
                        colorId={product.colors[0]?.id ?? ''}
                        size={product.sizes[0]}
                        disabled={product.stock === 0}/>
                </div>
            </div>
        </article>
    )
}