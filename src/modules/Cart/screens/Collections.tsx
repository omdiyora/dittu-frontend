'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FilterSidebar from './FilterSidebar';

type Product = {
    id: string;
    name: string;
    slug: string;
    category: string;
    price: number;
    original_price?: number;
    badge?: string;
    badge_type?: 'sale' | 'new' | 'bestseller' | null;
    images: string[];
};

const products: Product[] = [
    // YOUR API DATA HERE
];

export default function Collections() {

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    // FILTER PRODUCTS
    const filteredProducts = useMemo(() => {

        // no filter
        if (selectedFilters.length === 0) {
            return products;
        }

        return products.filter((product) =>
            selectedFilters.includes(product.category)
        );

    }, [selectedFilters]);

    // DYNAMIC CATEGORY OPTIONS
    // @ts-ignore
    const categoryOptions = [...new Set(products.map((p) => p.category))];

    return (
        <div className='bg-[#fcfaf7]'>
            <div className="max-w-[1400px] mx-auto px-4 py-10">

                <div className="w-full flex justify-center">
                    <div className="max-w-[1200px] w-full px-4 text-center">
                        <h1 className="text-[28px] font-medium">Shop All</h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Explore our full collection of beauty essentials.ss
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Sidebar */}
                    <FilterSidebar
                    // @ts-ignore
                        // selectedFilters={selectedFilters}
                        // @ts-ignore
                        // setSelectedFilters={setSelectedFilters}
                        // categoryOptions={categoryOptions}
                    />

                    {/* Products */}
                    <section className="flex-1">

                        {/* Top Bar */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm">
                                {filteredProducts.length} products
                            </p>

                            <select className="border rounded-full px-4 py-2 text-sm focus:outline-none">
                                <option>Best selling</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                            {filteredProducts.map((product) => (
                                <div key={product.id}>

                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="block group cursor-pointer"
                                    >

                                        {/* Image */}
                                        <div className="relative bg-[#f5f3f0] rounded-lg h-[320px] overflow-hidden">

                                            {/* Badge */}
                                            {product.badge && (
                                                <span
                                                    className={`absolute top-3 left-3 text-xs px-2 py-1 text-white z-10
                                                    ${product.badge_type === 'sale'
                                                            ? 'bg-orange-500'
                                                            : product.badge_type === 'new'
                                                                ? 'bg-green-700'
                                                                : 'bg-black'
                                                        }`}
                                                >
                                                    {product.badge}
                                                </span>
                                            )}

                                            {/* Main Image */}
                                            <Image
                                                src={product.images?.[0]}
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="mt-3">

                                            <h4 className="text-sm font-medium">
                                                {product.name}
                                            </h4>

                                            <div className="text-sm mt-1">

                                                <span className="font-semibold">
                                                    ₹{product.price / 100}
                                                </span>

                                                {product.original_price && (
                                                    <span className="line-through text-gray-400 ml-2">
                                                        ₹{product.original_price / 100}
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
    );
} 