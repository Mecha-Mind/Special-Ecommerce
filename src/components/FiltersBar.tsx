"use client";

import { useMemo } from "react";
import { useShopUi } from "@/context/shop-ui-context";
import type { Product } from "@/data/products";

export default function FiltersBar({products}: {products: Product[]}) {
    const {
        category, setCategory,
        sort, setSort,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
    } = useShopUi();
    const categories = useMemo(()=> {
        const set = new Set(products.map((p)=> p.category));
        return ['all', ...Array.from(set)];
    }, [products]);

    return (
        <div className="mb-4 grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-4">
            {/* Category */}
            <div>
                <label htmlFor="category" className="mb-1 block text-xs font-medium text-gray-700">Category</label>
                <select 
                    name="category" 
                    id="category"
                    value={category}
                    onChange={(e)=> setCategory(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 text-sm">
                        {categories.map((c)=>(
                            <option key={c} value={c}>{c === 'all' ? 'All' : c}</option>
                        ))}
                    </select>
            </div>

            {/* Sort */}
            <div>
                        <label htmlFor="sortSelect" className="mb-1 block text-xs font-medium text-gray-700">Sort</label>
                        <select 
                            name="sortSelect" 
                            id="sortSelect"
                            value={sort}
                            onChange={(e)=> setSort(e.target.value as any)}
                            className="w-full rounded-xl border px-3 py-2 text-sm"
                        >
                            <option value='newest'>Newest</option>
                            <option value='rating-desc'>Top rated</option>
                            <option value='price-asc'>Price: low to high</option>
                            <option value='price-desc'>Price: high to low</option>
                        </select>
            </div>

            {/* Min Price */}
            <div>
                <label htmlFor="minPrice" className="mb-1 block text-xs font-medium text-gray-700">Min price</label>
                <input 
                    type="number" 
                    value={minPrice} 
                    name={'minPrice'} 
                    id="minPrice" 
                    onChange={(e)=> setMinPrice(Number(e.target.value || 0))}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    min={0}
                />
            </div>

            {/* Max Price */}
            <div>
                <label htmlFor="maxPrice" className="mb-1 block text-xs font-medium text-gray-700">Max price</label>
                <input 
                    type="number" 
                    value={maxPrice} 
                    name={'maxPrice'} 
                    id="maxPrice" 
                    onChange={(e)=> setMaxPrice(Number(e.target.value || 0))}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    min={0}
                />
            </div>
        </div>
    )
}