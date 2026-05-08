'use client';
import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    badge?: string;
    badgeType?: 'sale' | 'new' | 'bestseller';
    image: string;
    hoverImage: string;
}

const skinCareProducts: Product[] = [
    {
        id: 1,
        name: 'Ultimate Facelift Day Cream',
        price: '$27.00',
        originalPrice: '$30.00',
        badge: '-10%',
        badgeType: 'sale',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/69.jpg?v=1740561521&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/3a.jpg?v=1740561521&width=533'
    },
    {
        id: 2,
        name: 'Ultimate Facelift Day Cream',
        price: '$30.00',
        badge: 'New',
        badgeType: 'new',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/72.jpg?v=1740561715&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/8a.jpg?v=1740561715&width=533'
    },
    {
        id: 3,
        name: 'Intense Repair Body Cream',
        price: '$30.00',
        badge: 'Bestseller',
        badgeType: 'bestseller',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/73.jpg?v=1740561767&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/9a.jpg?v=1740561767&width=533'
    },
    {
        id: 4,
        name: 'Intense Repair Body Cream',
        price: '$25.00',
        originalPrice: '$30.00',
        badge: '-16%',
        badgeType: 'sale',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/35.jpg?v=1740561816&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/35a.jpg?v=1740561816&width=533'
    },
    {
        id: 5,
        name: 'Ultimate Avocado Hair Serum',
        price: '$30.00',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/40.jpg?v=1740561115&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/40a.jpg?v=1740561115&width=533'
    },
    {
        id: 6,
        name: 'Intense Repair Body Cream',
        price: '$30.00',
        badge: 'Bestseller',
        badgeType: 'bestseller',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/38a.jpg?v=1740561848&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/38c.jpg?v=1740561848&width=533'
    }];


const bodyProducts: Product[] = [
    {
        id: 7,
        name: 'Natural Body Wash',
        price: '$35.00',
        badge: 'New',
        badgeType: 'new',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/68.jpg?v=1740561467&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/2a.jpg?v=1740561467&width=533'
    },
    {
        id: 8,
        name: 'Intense Repair Body Cream',
        price: '$30.00',
        badge: 'Bestseller',
        badgeType: 'bestseller',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/67.jpg?v=1740561251&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/67a.jpg?v=1740561251&width=533'
    },
    {
        id: 9,
        name: 'Ultimate Facelift Day Cream',
        price: '$25.50',
        originalPrice: '$30.00',
        badge: '-15%',
        badgeType: 'sale',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/71.jpg?v=1740561628&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/6a.jpg?v=1740561628&width=533'
    },
    {
        id: 10,
        name: 'Ultimate Avocado Skin Wash',
        price: '$30.00',
        badge: 'New',
        badgeType: 'new',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/58.jpg?v=1740561346&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/58a.jpg?v=1740561346&width=533'
    },
    {
        id: 11,
        name: 'Ultimate Facelift Day Cream',
        price: '$30.00',
        badge: 'Bestseller',
        badgeType: 'bestseller',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/55.jpg?v=1740560723&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/55a.jpg?v=1740560723&width=533'
    },
    {
        id: 12,
        name: 'Intense Repair Body Cream',
        price: '$30.00',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/35.jpg?v=1740561816&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/35a.jpg?v=1740561816&width=533'
    }];


function getBadgeStyle(type?: string) {
    if (type === 'sale') return { background: '#e8ddd0', color: '#1a1a1a' };
    if (type === 'new') return { background: '#2d5a4e', color: 'white' };
    if (type === 'bestseller') return { background: '#2d5a4e', color: 'white' };
    return {};
}

function ProductCard({ product }: { product: Product; }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="product-card flex-shrink-0"
            style={{ width: '280px' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>

            <div className="relative overflow-hidden rounded-lg" style={{ background: '#f5f0e8', aspectRatio: '3/4' }}>
                <img
                    src={hovered ? product.hoverImage : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500" />

                {product.badge &&
                    <span
                        className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded"
                        style={getBadgeStyle(product.badgeType)}>

                        {product.badge}
                    </span>
                }
                <button className="choose-options-btn">
                    Choose options
                </button>
            </div>
            <div className="mt-3 px-1">
                <h3 className="text-sm font-medium text-[#1a1a1a]">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                    {product.originalPrice ?
                        <>
                            <span className="text-sm font-medium text-[#1a1a1a]">{product.price}</span>
                            <span className="text-sm text-[#1a1a1a] opacity-50 line-through">{product.originalPrice}</span>
                        </> :

                        <span className="text-sm font-medium text-[#1a1a1a]">{product.price}</span>
                    }
                </div>
            </div>
        </div>);

}

export default function FeaturedProducts() {
    const [activeTab, setActiveTab] = useState<'skin' | 'body'>('skin');
    
    const products = activeTab === 'skin' ? skinCareProducts : bodyProducts;

    return (
        <section className="py-16 bg-[#fcfaf7]">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <h2
                        className="text-2xl font-medium text-[#1a1a1a]"
                        style={{ fontFamily: "'Instrument Serif', serif", fontSize: '28px' }}>

                        Featured Products
                    </h2>
                    <div className="flex gap-6">
                        <button
                            onClick={() => setActiveTab('skin')}
                            className={`text-xs font-medium tracking-widest uppercase pb-2 transition-all ${activeTab === 'skin' ? 'text-[#1a1a1a] border-b-2 border-[#1a1a1a]' : 'text-[#1a1a1a] opacity-40 hover:opacity-70'}`
                            }>

                            SKIN CARE
                        </button>
                        <button
                            onClick={() => setActiveTab('body')}
                            className={`text-xs font-medium tracking-widest uppercase pb-2 transition-all ${activeTab === 'body' ? 'text-[#1a1a1a] border-b-2 border-[#1a1a1a]' : 'text-[#1a1a1a] opacity-40 hover:opacity-70'}`
                            }>

                            BODY CARE
                        </button>
                    </div>
                </div>

                {/* Products Scroll */}
                <div className="relative">
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                        {products.map((product) =>
                            <ProductCard key={product.id} product={product} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );

}