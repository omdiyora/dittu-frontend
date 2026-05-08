'use client';

import Image from 'next/image';
import { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import Link from 'next/link';
type Product = {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    badge?: string;
    badgeType?: 'sale' | 'new' | 'bestseller';
    image: string;
    hoverImage: string;
};

const products: Product[] = [
    {
        id: 1,
        name: 'Ultimate Facelift Day Cream',
        price: '$27.00',
        originalPrice: '$30.00',
        badge: '-10%',
        badgeType: 'sale',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/69.jpg?v=1740561521&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/3a.jpg?v=1740561521&width=533',
    },
    {
        id: 2,
        name: 'Ultimate Facelift Day Cream',
        price: '$30.00',
        badge: 'New',
        badgeType: 'new',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/72.jpg?v=1740561715&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/8a.jpg?v=1740561715&width=533',
    },
    {
        id: 3,
        name: 'Intense Repair Body Cream',
        price: '$30.00',
        badge: 'Bestseller',
        badgeType: 'bestseller',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/73.jpg?v=1740561767&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/9a.jpg?v=1740561767&width=533',
    },
    {
        id: 4,
        name: 'Intense Repair Body Cream',
        price: '$25.00',
        originalPrice: '$30.00',
        badge: '-16%',
        badgeType: 'sale',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/35.jpg?v=1740561816&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/35a.jpg?v=1740561816&width=533',
    },
    {
        id: 5,
        name: 'Ultimate Avocado Hair Serum',
        price: '$30.00',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/40.jpg?v=1740561115&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/40a.jpg?v=1740561115&width=533',
    },
    {
        id: 6,
        name: 'Intense Repair Body Cream',
        price: '$30.00',
        badge: 'Bestseller',
        badgeType: 'bestseller',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/38a.jpg?v=1740561848&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/38c.jpg?v=1740561848&width=533',
    },
    {
        id: 1,
        name: 'Ultimate Facelift Day Cream',
        price: '$27.00',
        originalPrice: '$30.00',
        badge: '-10%',
        badgeType: 'sale',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/69.jpg?v=1740561521&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/3a.jpg?v=1740561521&width=533',
    },
    {
        id: 2,
        name: 'Ultimate Facelift Day Cream',
        price: '$30.00',
        badge: 'New',
        badgeType: 'new',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/72.jpg?v=1740561715&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/8a.jpg?v=1740561715&width=533',
    },
    {
        id: 3,
        name: 'Intense Repair Body Cream',
        price: '$30.00',
        badge: 'Bestseller',
        badgeType: 'bestseller',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/73.jpg?v=1740561767&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/9a.jpg?v=1740561767&width=533',
    },
    {
        id: 4,
        name: 'Intense Repair Body Cream',
        price: '$25.00',
        originalPrice: '$30.00',
        badge: '-16%',
        badgeType: 'sale',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/35.jpg?v=1740561816&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/35a.jpg?v=1740561816&width=533',
    },
    {
        id: 5,
        name: 'Ultimate Avocado Hair Serum',
        price: '$30.00',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/40.jpg?v=1740561115&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/40a.jpg?v=1740561115&width=533',
    },
    {
        id: 6,
        name: 'Intense Repair Body Cream',
        price: '$30.00',
        badge: 'Bestseller',
        badgeType: 'bestseller',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/38a.jpg?v=1740561848&width=533',
        hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/38c.jpg?v=1740561848&width=533',
    },
];

export default function Collections() {

    // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    return (
        <>

            <div className='bg-[#fcfaf7]'>
                <div className="max-w-[1400px] mx-auto px-4 py-10 ">
                    <div className="w-full flex justify-center">
                        <div className="max-w-[1200px] w-full px-4 text-center">
                            <h1 className="text-[28px] font-medium">Shop All</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Explore our full collection of beauty essentials.s
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Sidebar */}
                        {/* <FilterSidebar */}
                        {/* // setSelectedF/ilters={setSelectedFilters} */}
                        {/* // selectedFilt/ers={selectedFilters} */}
                        {/* /> */}

                        {/* Products Grid */}
                        <section className="flex-1">

                            {/* Top Bar */}
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-sm">{products.length} products</p>
                                <select className="border rounded-full px-4 py-2 text-sm focus:outline-none">
                                    <option>Best selling</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>

                            </div>



                            {/* Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                                {products.map((product) => (
                                    <div key={product.id}>
                                        <Link href={`/products`} className="block group cursor-pointer">

                                            {/* Image */}
                                            <div className="relative bg-[#f5f3f0] rounded-lg h-[320px] overflow-hidden">

                                                {/* Badge */}
                                                {product.badge && (
                                                    <span
                                                        className={`absolute top-3 left-3 text-xs px-2 py-1 text-white z-10
          ${product.badgeType === 'sale'
                                                                ? 'bg-orange-500'
                                                                : product.badgeType === 'new'
                                                                    ? 'bg-green-700'
                                                                    : 'bg-black'
                                                            }`}
                                                    >
                                                        {product.badge}
                                                    </span>
                                                )}

                                                {/* Main Image */}
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain transition duration-500 group-hover:opacity-0"
                                                />

                                                {/* Hover Image */}
                                                <Image
                                                    src={product.hoverImage}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain opacity-0 transition duration-500 group-hover:opacity-100"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="mt-3">
                                                <h4 className="text-sm font-medium">{product.name}</h4>

                                                <div className="text-sm mt-1">
                                                    <span className="font-semibold">{product.price}</span>

                                                    {product.originalPrice && (
                                                        <span className="line-through text-gray-400 ml-2">
                                                            {product.originalPrice}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </>
    );
}