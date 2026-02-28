import type {Product} from '@/data/products';

export function filterProducts(products: Product[], searchText: string, category: string){
    const q = searchText.trim().toLowerCase();

    return products.filter(p =>{
        const matchText = q.length === 0 ||
         p.title.toLowerCase().includes(q) ||
         (p.description?.toLowerCase().includes(q) ?? false);

         const matchCategory = category === 'all' ||
         p.category === category;
         return matchText && matchCategory;
    })
}