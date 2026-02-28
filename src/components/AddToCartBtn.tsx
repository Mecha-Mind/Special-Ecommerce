'use client';

import { useCart } from "@/context/cart-context";
import type { Product } from '@/data/products';
import { useToast } from "./toast/ToastProvider";


type Props = {
    product: Product;
    colorId: string;
    size: string;
    disabled?: boolean;
}



export default function AddToCartBtn({product, colorId, size, disabled}: Props) {

    const {addItem} = useCart();
    const {push} = useToast();
    const handleAddToCart = () => {
        const ok =  addItem(product, {colorId, size});
        if (ok) {
            push({title: 'Added to cart', message: 'Product added to cart', variant: 'success'});
        } else {
            push({title: 'Failed to add to cart', message: 'Product is out of stock', variant: 'error'});
        }
    };
    return (
        <button 
            onClick={handleAddToCart}
            className="flex-1 rounded-xl bg-black py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            disabled= { disabled || product.stock === 0}
            type="button"
        >
            Add to cart
        </button>
    );
}