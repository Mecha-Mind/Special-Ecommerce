
export type ProductColors = {
    id: string;
    name: string;
    hex: string;
    image: string;
}

export type Product = {
    id: string;
    title : string;
    description: string;
    price: number;
    compareAtPrice?: number;
    stock: number;
    rating: number;
    reviewCount: number;
    tags: string[];
    category: 'phones' | 'laptops' | 'accessories' | 'audio' ;
    image: string;
    colors: ProductColors[];
    sizes: string[];
    createdAt: string;
};


export const products: Product[] = [
    
    {
        id: 'p-001',
        title : 'Hassan Mohamed',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 9,
        compareAtPrice: 100,
        category: 'laptops',
        rating: 4.6,
        reviewCount: 218,
        stock: 12,
        tags: ['5G', 'OLED', 'Fast Charge'],
        image: '/products/1g.p',
        colors: [
            { id: 'gray', name: 'gray', hex: '#111827', image: '/products/1g.png'},
            { id: 'green', name: 'green', hex: '#111827', image: '/products/1gr.png'},
            { id: 'purple', name: 'purple', hex: '#2563eb', image: '/products/1p.png'},
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        createdAt: '2025-10-12',
    },
    {
        id: 'p-002',
        title : 'Astra Phone X (128GB)',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 15999,
        compareAtPrice: 17999,
        category: 'phones',
        rating: 4.6,
        reviewCount: 218,
        stock: 12,
        tags: ['5G', 'OLED', 'Fast Charge'],
        image: '/products/2g.png',
        colors: [
            { id: 'gray', name: 'gray', hex: '#111827', image: '/products/2g.png'},
            { id: 'green', name: 'green', hex: '#2563eb', image: '/products/2gr.png'},
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        createdAt: '2025-10-12',
    },
    {
        id: 'p-003',
        title : 'Astra Phone X (128GB)',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 159149,
        compareAtPrice: 1279239,
        category: 'phones',
        rating: 4.6,
        reviewCount: 218,
        stock: 12,
        tags: ['5G', 'OLED'],
        image: '/products/3b.png',
        colors: [
            { id: 'black', name: 'Black', hex: '#111827', image: '/products/3bl.png'},
            { id: 'blue', name: 'Blue', hex: '#2563eb', image: '/products/3b.png'},
            { id: 'green', name: 'green', hex: '#2563eb', image: '/products/3gr.png'},
        ],
        sizes: ['S', 'M', 'L'],
        createdAt: '2025-10-12',
    },
    {
        id: 'p-004',
        title : 'Astra Phone X (128GB)',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 15999,
        compareAtPrice: 17999,
        category: 'audio',
        rating: 4.6,
        reviewCount: 218,
        stock: 12,
        tags: ['5G', 'OLED', 'Fast Charge'],
        image: '/products/4p.png',
        colors: [
            { id: 'peige', name: 'peige', hex: '#111827', image: '/products/4p.png'},
            { id: 'wood', name: 'wood', hex: '#2563eb', image: '/products/4w.png'},
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        createdAt: '2025-10-12',
    },
    {
        id: 'p-005',
        title : 'Astra Phone X (128GB)',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 15999,
        compareAtPrice: 17999,
        category: 'as',
        rating: 4.6,
        reviewCount: 218,
        stock: 10,
        tags: ['5G', 'OLED', 'Fast Charge'],
        image: '/products/5bl.png',
        colors: [
            { id: 'black', name: 'Black', hex: '#111827', image: '/products/5bl.png'},
            { id: 'orange', name: 'orange', hex: '#2563eb', image: '/products/5o.png'},
            { id: 'red', name: 'red', hex: '#2563eb', image: '/products/5r.png'},
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        createdAt: '2025-10-12',
    },
    {
        id: 'p-006',
        title : 'Astra Phone X (128GB)',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 15999,
        compareAtPrice: 17999,
        category: 'phones',
        rating: 4.6,
        reviewCount: 218,
        stock: 12,
        tags: ['5G', 'OLED', 'Fast Charge'],
        image: '/products/6g.png',
        colors: [
            { id: 'gray', name: 'Gray', hex: '#111827', image: '/products/6g.png'},
            { id: 'wood', name: 'Wood', hex: '#2563eb', image: '/products/6w.png'},
        ],
        sizes: ['L', 'XL'],
        createdAt: '2025-10-12',
    },
    {
        id: 'p-007',
        title : 'Astra Phone X (128GB)',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 15999,
        compareAtPrice: 17999,
        category: 'phones',
        rating: 4.6,
        reviewCount: 218,
        stock: 12,
        tags: ['5G', 'OLED', 'Fast Charge'],
        image: '/products/7g.png',
        colors: [
            { id: 'gray', name: 'Gray', hex: '#111827', image: '/products/7g.png'},
            { id: 'peige', name: 'peige', hex: '#2563eb', image: '/products/7p.png'},
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        createdAt: '2025-10-12',
    },
    {
        id: 'p-008',
        title : 'Astra Phone X (128GB)',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 15999,
        compareAtPrice: 17999,
        category: 'phones',
        rating: 4.6,
        reviewCount: 218,
        stock: 12,
        tags: ['5G', 'OLED', 'Fast Charge'],
        image: '/products/8gr.png',
        colors: [
            { id: 'green', name: 'green', hex: '#111827', image: '/products/8gr.png'},
            { id: 'blue', name: 'Blue', hex: '#2563eb', image: '/products/8b.png'},
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        createdAt: '2025-10-12',
    },
    {
        id: 'p-009',
        title : 'Astra Phone X (128GB)',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 15999,
        compareAtPrice: 17999,
        category: 'phones',
        rating: 4.6,
        reviewCount: 218,
        stock: 12,
        tags: ['5G', 'OLED', 'Fast Charge'],
        image: '/products/1g.png',
        colors: [
            { id: 'black', name: 'Black', hex: '#111827', image: '/products/1g.png'},
            { id: 'blue', name: 'Blue', hex: '#2563eb', image: '/products/2g.png'},
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        createdAt: '2025-10-12',
    },
    {
        id: 'p-010',
        title : 'Astra Phone X (128GB)',
        description: '6.5-inch OLED, 5G, 50MP camera, fast charging, Balanced performance for daily use.',
        price: 15999,
        compareAtPrice: 17999,
        category: 'phones',
        rating: 4.6,
        reviewCount: 218,
        stock: 12,
        tags: ['5G', 'OLED', 'Fast Charge'],
        image: '/products/1g.png',
        colors: [
            { id: 'black', name: 'Black', hex: '#111827', image: '/products/1g.png'},
            { id: 'blue', name: 'Blue', hex: '#2563eb', image: '/products/2g.png'},
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        createdAt: '2025-10-12',
    },
       
]