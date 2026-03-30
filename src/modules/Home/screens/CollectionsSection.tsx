'use client';

import React, { useState } from 'react';

interface Collection {
    id: string;
    number: string;
    name: string;
    description: string;
    image: string;
}

const collections: Collection[] = [
    {
        id: 'beach',
        number: '01.',
        name: 'Skincare For Beach',
        description:
            'Protect and nourish your skin with hydrating, sun-ready essentials for a radiant and refreshed beach glow.',
        image:
            'https://zest-cosmo.myshopify.com/cdn/shop/files/collection-tab-1.webp?v=1740561416&width=360',
    },
    {
        id: 'detox',
        number: '02.',
        name: 'Detox Skin Nights',
        description:
            'Purify and rejuvenate your skin overnight with powerful treatments that restore balance and reveal a healthy glow.',
        image:
            'https://zest-cosmo.myshopify.com/cdn/shop/files/collection-tab-2.webp?v=1740561416&width=360',
    },
    {
        id: 'summer',
        number: '03.',
        name: 'Summer Treatments',
        description:
            'Keep your skin fresh and hydrated with lightweight, soothing formulas perfect for warm, sunny days and balmy nights.',
        image:
            'https://zest-cosmo.myshopify.com/cdn/shop/files/collection-tab-3.webp?v=1740561416&width=360',
    },
];

export default function CollectionsSection() {
    const [activeCollection, setActiveCollection] = useState('beach');

    const active =
        collections.find((c) => c.id === activeCollection) || collections[0];

    return (
        <section className="py-24 bg-[#18343c] text-white">
            {/* CONTAINER */}
            <div className="container mx-auto px-4 md:px-8 lg:px-12">

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-start">

                    {/* LEFT SIDE (HEADER + TABS) */}
                    <div>

                        {/* HEADER */}
                        <div className="max-w-xl mb-10">
                            <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-4">
                                OUR COLLECTIONS
                            </p>

                            <h2
                                className="leading-[1.05] text-[32px] md:text-[56px]"
                                style={{ fontFamily: "'Instrument Serif', serif" }}
                            >
                                Time to achieve
                                <br />
                                <em className="italic font-light text-white/80">
                                    more with less
                                </em>
                            </h2>
                        </div>

                        {/* TABS */}
                        {collections.map((collection) => {
                            const isActive = activeCollection === collection.id;

                            return (
                                <div
                                    key={collection.id}
                                    className={`border-b transition-all duration-300 ${isActive ? 'border-white/40' : 'border-white/10'
                                        }`}
                                >
                                    <button
                                        onClick={() => setActiveCollection(collection.id)}
                                        className="w-full flex items-center justify-between py-7 group"
                                    >
                                        <div className="flex items-center gap-5">
                                            <span
                                                className={`text-sm ${isActive ? 'text-white' : 'text-white/40'
                                                    }`}
                                            >
                                                {collection.number}
                                            </span>

                                            <span
                                                className={`text-[18px] md:text-[20px] transition-all ${isActive
                                                    ? 'text-white'
                                                    : 'text-white/40 group-hover:text-white/70'
                                                    }`}
                                            >
                                                {collection.name}
                                            </span>
                                        </div>

                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isActive
                                                ? 'border-white scale-100'
                                                : 'border-white/30 scale-90 group-hover:scale-100'
                                                }`}
                                        >
                                            →
                                        </div>
                                    </button>

                                    {/* DESCRIPTION */}
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ${isActive
                                            ? 'max-h-[200px] opacity-100 translate-y-0'
                                            : 'max-h-0 opacity-0 -translate-y-2'
                                            }`}
                                    >
                                        <p className="text-sm text-white/70 max-w-md pb-6 leading-relaxed">
                                            {collection.description}
                                        </p>

                                        {/* MOBILE IMAGE */}
                                        <div className="lg:hidden rounded-lg overflow-hidden aspect-[4/3] mb-6">
                                            <img
                                                src={active.image}
                                                alt={active.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* RIGHT IMAGE (NOW PERFECTLY ALIGNED) */}
                    <div className="hidden lg:block">
                        <div className="w-[670px] h-[670px] rounded-lg overflow-hidden">
                            <img
                                key={active.image}
                                src={active.image}
                                alt={active.name}
                                className="w-full h-full object-cover opacity-0 animate-fadeIn"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* ANIMATION */}
            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.03);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </section>
    );
}