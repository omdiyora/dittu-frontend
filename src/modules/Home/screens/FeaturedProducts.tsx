'use client';

import { useCart } from '@/context/CartContext';
import React, { useEffect, useState } from 'react';
import Link from "next/link";

interface ApiProduct {
    id: string;
    name: string;
    category: string;
    price: number;
    original_price?: number;
    badge?: string;
    badge_type?: 'sale' | 'new' | 'bestseller' | null;
    images: string[];
}

function getBadgeStyle(type?: string | null) {
    if (type === 'sale') return { background: '#e8ddd0', color: '#1a1a1a' };
    if (type === 'new') return { background: '#2d5a4e', color: 'white' };
    if (type === 'bestseller') return { background: '#2d5a4e', color: 'white' };

    return {};
}

function ProductCard({ product }: { product: ApiProduct }) {
    const [hovered, setHovered] = useState(false);
    const { addToCart } = useCart(); // ✅ ADD
    const handleAddToCart = (product: any) => {
        // @ts-ignore
        addToCart({
            id: product?.id,
            name: product?.name,
            price:
                typeof product?.price === "string"
                    ? Number(product?.price.replace(/[^\d]/g, ""))
                    : product?.price,
            image: product?.image || product?.images?.[0] || "",
        });

        // enqueueSnackbar("Added to cart", {
        //     variant: "success",
        //     anchorOrigin: {
        //         vertical: "bottom",
        //         horizontal: "right",
        //     },
        //     autoHideDuration: 1500,
        // });
    };

    return (
        <div
            className="product-card flex-shrink-0"
            style={{ width: '280px' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link
                href={`/products/${product.id}`}
                className="block cursor-pointer"
            >
                <div
                    className="relative overflow-hidden rounded-lg"
                    style={{ background: '#f5f0e8', aspectRatio: '3/4' }}
                >
                    <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500"
                    />

                    {product.badge && (
                        <span
                            className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded bg-black text-white"
                            style={getBadgeStyle(product.badge_type)}

                        >
                            {product.badge}
                        </span>
                    )}

                    <button className="choose-options-btn"
                        onClick={(e) => {
                            e.preventDefault(); // stop Link navigation
                            e.stopPropagation(); // stop bubbling
                            handleAddToCart(product);
                        }}>
                        Add to cart
                    </button>
                </div>

                <div className="mt-3 px-1">
                    <h3 className="text-sm font-medium text-[#1a1a1a]">
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-[#1a1a1a]">
                            ₹{product.price}.00
                        </span>

                        {product.original_price && (
                            <span className="text-sm text-[#1a1a1a] opacity-50 line-through">
                                ₹{product.original_price}.00
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default function FeaturedProducts() {
    const [activeTab, setActiveTab] = useState<'skincare' | 'bodycare'>('skincare');
    const [productss, setProducts] = useState<ApiProduct[]>([]);

    const API_ENDPOINT = `/api/products`;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(API_ENDPOINT);
                const data = await res.json();

                setProducts(data || []);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        fetchProducts();
    }, []);

    // Dynamic Filter
    const products =
        activeTab === 'skincare'
            ? productss.filter(
                (item) =>
                    item.category?.toLowerCase() === 'skincare'
            )
            : productss.filter(
                (item) =>
                    item.category?.toLowerCase() === 'bodycare'
            );



    return (
        <section className="py-16 bg-[#fcfaf7]">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <h2
                        className="text-2xl font-medium text-[#1a1a1a]"
                        style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: '28px',
                        }}
                    >
                        Featured Products
                    </h2>

                    <div className="flex gap-6">
                        <button
                            onClick={() => setActiveTab('skincare')}
                            className={`text-xs font-medium tracking-widest uppercase pb-2 transition-all ${activeTab === 'skincare'
                                ? 'text-[#1a1a1a] border-b-2 border-[#1a1a1a]'
                                : 'text-[#1a1a1a] opacity-40 hover:opacity-70'
                                }`}
                        >
                            SKIN CARE
                        </button>

                        <button
                            onClick={() => setActiveTab('bodycare')}
                            className={`text-xs font-medium tracking-widest uppercase pb-2 transition-all ${activeTab === 'bodycare'
                                ? 'text-[#1a1a1a] border-b-2 border-[#1a1a1a]'
                                : 'text-[#1a1a1a] opacity-40 hover:opacity-70'
                                }`}
                        >
                            BODY CARE
                        </button>
                    </div>
                </div>

                {/* Products */}
                <div className="relative">
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}