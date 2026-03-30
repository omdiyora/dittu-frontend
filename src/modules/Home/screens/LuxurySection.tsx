'use client';

import React from 'react';

const categories = [
    {
        name: 'Body Care',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/collection-1.webp?v=1740562525&width=1500',
        href: '#',
    },
    {
        name: 'Cleansers',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/collection-2.webp?v=1740562526&width=1500',
        href: '#',
    },
    {
        name: 'Serums',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/collection-3.webp?v=1740562525&width=1500',
        href: '#',
    },
    {
        name: 'Skincare',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/collection-4.webp?v=1740562526&width=1500',
        href: '#',
    },
    {
        name: 'Moisturizer',
        image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/collection-5.webp?v=1740562525&width=1500',
        href: '#',
    },
];

export default function LuxurySection() {

    const items = [
        { text: '30 Days Free Returns', italic: true },
        { text: 'Fast Delivery' },
        { text: 'Secure Payment', italic: true },
        { text: 'Free Shipping' },
    ];
    return (
        <section className="py-20 bg-[#fcfaf7]">

            {/* ✅ Container */}
            <div className="container mx-auto px-4 md:px-8 lg:px-12">

                {/* Title */}
                <h2
                    className="text-center mb-14 text-[28px] md:text-[40px] leading-tight text-[#1a1a1a]"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                    The Luxury of the Uncomplicated
                </h2>




                {/* Categories */}
                {/* ✅ Mobile: scroll | Desktop: grid */}
                <div className="flex lg:grid lg:grid-cols-5 gap-5 overflow-x-auto lg:overflow-visible no-scrollbar">

                    {categories.map((cat) => (
                        <a
                            key={cat.name}
                            href={cat.href}
                            className="flex-shrink-0 lg:flex-shrink group"
                            style={{ width: '220px' }}
                        >
                            <div className="overflow-hidden rounded-lg bg-[#f5f0e8] aspect-[3/4]">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-sm text-[#1a1a1a]">{cat.name}</span>
                                <span className="text-sm">→</span>
                            </div>
                        </a>
                    ))}

                </div>
            </div>

            {/* Marquee */}

            <div className="bg-[#e9e4dc] py-5 mt-10 overflow-hidden">
                <div className="relative overflow-hidden">

                    <div className="flex animate-marquee whitespace-nowrap">

                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-12 px-6 min-h-[60px]"
                            >

                                <span className="italic text-[26px] leading-[1.2]">
                                    30 Days Free Returns
                                </span>
                                <span className="w-8 h-[1px] bg-black/40"></span>

                                <span className="text-[26px] leading-[1.2]">
                                    Fast Delivery
                                </span>
                                <span className="w-8 h-[1px] bg-black/40"></span>

                                <span className="italic text-[26px] leading-[1.2]">
                                    Secure Payment
                                </span>
                                <span className="w-8 h-[1px] bg-black/40"></span>

                                <span className="text-[26px] leading-[1.2]">
                                    Free shipping
                                </span>
                                <span className="w-8 h-[1px] bg-black/40"></span>

                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </section>
    );
}