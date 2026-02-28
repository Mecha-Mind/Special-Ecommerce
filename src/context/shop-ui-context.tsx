"use client"

import React, {createContext, useContext, useMemo, useState} from "react";

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';

type ShopUiState = {
    searchText: string;
    setSearchText: (v:string) => void;
    category: string; // all | 'phones' | etc....
    setCategory: (v:string) => void;

    sort: SortKey;
    setSort: (v:string) => void;

    minPrice: number;
    maxPrice: number;
    setMinPrice: (v: number) => void;
    setMaxPrice: (v: number) => void;
};

const ShopUiContext = createContext<ShopUiState | null>(null);

export function ShopUiProvider({children}: {children:React.ReactNode}) {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState<SortKey>('featured');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(999999);

    const value = useMemo(()=>({
        searchText, setSearchText, 
        category, setCategory,
        sort, setSort,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
    }), [searchText, category, sort, minPrice, maxPrice]);
    return <ShopUiContext.Provider value={value}>{children}</ShopUiContext.Provider>

}

export function useShopUi() {
    const ctx = useContext(ShopUiContext);
    if (!ctx) throw new Error('useShopUi must be used inside ShopUiProvider');
    return ctx;
}