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

const handpickedProducts: Product[] = [
  {
    id: 1,
    name: 'Ultimate Facelift Day Cream',
    price: '$25.50',
    originalPrice: '$30.00',
    badge: '-15%',
    badgeType: 'sale',
    image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/62.jpg?v=1740561411&width=533',
    hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/62a.jpg?v=1740561411&width=533',
  },
  {
    id: 2,
    name: 'Ultimate Avocado Skin Wash',
    price: '$30.00',
    badge: 'New',
    badgeType: 'new',
    image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/58.jpg?v=1740561346&width=533',
    hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/58a.jpg?v=1740561346&width=533',
  },
  {
    id: 3,
    name: 'Ultimate Facelift Day Cream',
    price: '$30.00',
    badge: 'Bestseller',
    badgeType: 'bestseller',
    image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/55.jpg?v=1740560723&width=533',
    hoverImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/55a.jpg?v=1740560723&width=533',
  },
];

function getBadgeStyle(type?: string) {
  if (type === 'sale') return { background: '#e8ddd0', color: '#1a1a1a' };
  if (type === 'new') return { background: '#2d5a4e', color: 'white' };
  if (type === 'bestseller') return { background: '#2d5a4e', color: 'white' };
  return {};
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg" style={{ background: '#f5f0e8', aspectRatio: '3/4' }}>
        <img
          src={hovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500"
        />
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded"
            style={getBadgeStyle(product.badgeType)}
          >
            {product.badge}
          </span>
        )}
        <button className="choose-options-btn">Choose options</button>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-[#1a1a1a]">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {product.originalPrice ? (
            <>
              <span className="text-sm font-medium text-[#1a1a1a]">{product.price}</span>
              <span className="text-sm text-[#1a1a1a] opacity-50 line-through">{product.originalPrice}</span>
            </>
          ) : (
            <span className="text-sm font-medium text-[#1a1a1a]">{product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HandpickedSection() {
  return (
    <section className="py-16" style={{ background: '#f5f0e8' }}>
      <div className="px-6 md:px-10 container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Text */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="section-label mb-4">Our Hand-picked</p>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: '1.15',
                  color: '#1a1a1a',
                  fontWeight: '400',
                }}
              >
                Designed to make{' '}
                <em>you feel good.</em>
              </h2>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.65)', maxWidth: '420px' }}>
                Our thoughtfully curated beauty essentials are designed to enhance your natural glow, boost confidence, and make every day feel special.
              </p>
            </div>
            <a
              href="/collections"
              className="btn-primary mt-8 self-start"
              style={{
                background: '#1a1a1a',
                color: 'white',
                borderRadius: '100px',
                padding: '14px 36px',
                fontSize: '11px',
                letterSpacing: '0.15em',
              }}
            >
              SHOP NOW
            </a>
          </div>

          {/* Right - Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {handpickedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
