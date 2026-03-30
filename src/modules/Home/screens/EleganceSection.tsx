'use client';
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  badge?: string;
  badgeType?: 'sale' | 'new' | 'bestseller';
  image: string;
  hoverImage: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Hyaluronic sea serum',
    price: '$130.00',
    image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/68.jpg?v=1740561467&width=533',
    hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/2a.jpg?v=1740561467&width=533'
  },
  {
    id: 2,
    name: 'Pure free oil cleanser',
    price: '$100.00',
    badge: '-16%',
    badgeType: 'sale',
    image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/73.jpg?v=1740561767&width=533',
    hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/9a.jpg?v=1740561767&width=533'
  },
  {
    id: 3,
    name: 'Intense Repair Body Cream',
    price: '$30.00',
    image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/38a.jpg?v=1740561848&width=533',
    hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/38c.jpg?v=1740561848&width=533'
  },
  {
    id: 4,
    name: 'Intense Repair Body Cream',
    price: '$30.00',
    badge: 'Bestseller',
    badgeType: 'bestseller',
    image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/67.jpg?v=1740561251&width=533',
    hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/67a.jpg?v=1740561251&width=533'
  }
];

function getBadgeStyle(type?: string) {
  if (type === 'sale') return 'bg-[#c75a2c] text-white';
  if (type === 'bestseller') return 'bg-[#1f2d3a] text-white';
  if (type === 'new') return 'bg-[#2d5a4e] text-white';
  return '';
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group product-card"
    >
      {/* IMAGE BOX */}
      <div className="relative bg-[#f5f0e8] rounded-sm overflow-hidden aspect-[3/4]">

        <img
          src={hovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500"
        />

        {/* BADGE */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs px-2 py-1 ${getBadgeStyle(product.badgeType)}`}>
            {product.badge}
          </span>
        )}

        {/* HOVER BUTTON */}
        {/* <button className="absolute bottom-0 left-0 w-full bg-black text-white text-xs py-3 opacity-0 group-hover:opacity-100 transition">
          Choose options
        </button> */}
        <button className="choose-options-btn">
          Choose options
        </button>

      </div>

      {/* TEXT */}
      <div className="mt-4">
        <h3 className="text-sm text-[#1a1a1a]">{product.name}</h3>
        <p className="text-sm text-[#1a1a1a]/70">{product.price}</p>
      </div>
    </div>
  );
}

export default function EleganceSection() {
  return (
    <section className="bg-[#fcfaf7] py-16">

      <div className="container mx-auto px-4 md:px-8 lg:px-12">

        {/* TITLE */}
        <h2
          className="text-center mb-12"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400
          }}
        >
          The Elegance of Effortless Beauty
        </h2>

        {/* ✅ GRID (MAIN FIX) */}
        <div className="
          grid 
          grid-cols-2 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6
        ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}