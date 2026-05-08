'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';

const product = {
    id: 1,
    name: 'Ultimate Facelift Day Cream',
    price: '$27.00',
    originalPrice: '$30.00',
    badge: 'New',
    images: [
        'https://zest-cosmo.myshopify.com/cdn/shop/files/69.jpg?v=1740561521&width=800',
        'https://zest-cosmo.myshopify.com/cdn/shop/files/3a.jpg?v=1740561521&width=800',
        'https://zest-cosmo.myshopify.com/cdn/shop/files/72.jpg?v=1740561715&width=800',
        'https://zest-cosmo.myshopify.com/cdn/shop/files/73.jpg?v=1740561767&width=800',
    ],

};

export default function ProductPage() {
    const [selectedSize, setSelectedSize] = useState('100ml');

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-12">

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
                Home &gt; Bodycare &gt; {product.name}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* LEFT: IMAGE GRID */}
                {/* <div className="grid grid-cols-2 gap-4">
          {product.images.map((img, i) => (
            <div
              key={i}
              className="bg-[#f5f3f0] rounded-lg overflow-hidden aspect-square"
            >
              <Image
                src={img}
                alt="product"
                width={500}
                height={500}
                className="object-contain w-full h-full hover:scale-105 transition"
              />
            </div>
          ))}
        </div> */}
                <ProductGallery />

                {/* RIGHT: PRODUCT INFO */}
                <ProductInfo product={product} />

            </div>
        </div>
    );
}