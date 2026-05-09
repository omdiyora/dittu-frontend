'use client';

import { useCart } from '@/context/CartContext';
import React, { useEffect, useState } from 'react';

interface ApiProduct {
  id: string;
  name: string;
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

  return { background: '#e8ddd0', color: '#1a1a1a' };
}

function formatPrice(price: number) {
  return `₹${(price).toFixed(2)}`;
}

function ProductCard({
  product,
  handleAddToCart,
}: {
  product: ApiProduct;
  handleAddToCart: (product: ApiProduct) => void;
}) {
  const [hovered, setHovered] = useState(false);

  

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-lg"
        style={{ background: '#f5f0e8', aspectRatio: '3/4' }}
      >
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 scale-100 hover:scale-105"
        />

        {product.badge && (
          <span
            className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded"
            style={getBadgeStyle(product.badge_type)}
          >
            {product.badge}
          </span>
        )}

        <button 
        className="choose-options-btn" 
        onClick={(e) => {
                              e.preventDefault(); // stop Link navigation
                              e.stopPropagation(); // stop bubbling
                              handleAddToCart(product);
                            }}>
          Add to cart
        </button>
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-medium text-[#1a1a1a]">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          {product.original_price ? (
            <>
              <span className="text-sm font-medium text-[#1a1a1a]">
                {formatPrice(product.price)}
              </span>

              <span className="text-sm text-[#1a1a1a] opacity-50 line-through">
                {formatPrice(product.original_price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-[#1a1a1a]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HandpickedSection() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const { addToCart } = useCart(); // ✅ ADD


  const handleAddToCart = (product: ApiProduct) => {
    // @ts-ignore
  addToCart({
    id: product?.id,
    name: product?.name,
    price:
      typeof product?.price === 'string'
      // @ts-ignore
        ? Number(product?.price?.replace(/[^\d]/g, ''))
        : product?.price,
    image: product?.images?.[0] || '',
  });
};

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

  return (
    <section className="py-16" style={{ background: '#f5f0e8' }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Content */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="section-label mb-4">
                Our Hand-picked
              </p>

              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: '1.15',
                  color: '#1a1a1a',
                  fontWeight: '400',
                }}
              >
                Designed to make <em>you feel good.</em>
              </h2>

              <p
                className="mt-6 text-sm leading-relaxed"
                style={{
                  color: 'rgba(26,26,26,0.65)',
                  maxWidth: '420px',
                }}
              >
                Our thoughtfully curated beauty essentials are designed
                to enhance your natural glow, boost confidence, and make
                every day feel special.
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

          {/* Right Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}