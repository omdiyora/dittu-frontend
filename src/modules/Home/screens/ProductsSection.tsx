'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const products = [
{
  id: 1,
  name: 'Barrier Repair Serum',
  tagline: 'Ceramide Complex · Niacinamide 10%',
  price: '$68',
  badge: 'Best Seller',
  image: "https://images.unsplash.com/photo-1690222089959-481ccffdca6a",
  alt: 'Glass dropper bottle of barrier repair serum on marble surface',
  span: 'col-span-2 row-span-2',
  aspectRatio: '1/1'
},
{
  id: 2,
  name: 'Brightening Vitamin C',
  tagline: 'Ascorbyl Glucoside 15% · Ferulic Acid',
  price: '$54',
  badge: 'New',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11de5e129-1765285065370.png",
  alt: 'Vitamin C serum bottle surrounded by fresh citrus fruits',
  span: 'col-span-1 row-span-1',
  aspectRatio: '1/1'
},
{
  id: 3,
  name: 'Peptide Night Cream',
  tagline: 'Matrixyl 3000 · Bakuchiol',
  price: '$82',
  badge: null,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1420d9abe-1772476188504.png",
  alt: 'Luxurious cream jar with botanical ingredients beside it',
  span: 'col-span-1 row-span-1',
  aspectRatio: '1/1'
},
{
  id: 4,
  name: 'Hydra-Plump Mist',
  tagline: 'Hyaluronic Acid 3-weight · Rose Extract',
  price: '$38',
  badge: 'Fan Favourite',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12dcf4cb2-1772072287430.png",
  alt: 'Facial mist spray bottle with rose petals on light background',
  span: 'col-span-2 row-span-1',
  aspectRatio: '2/1'
}];


const ProductCard: React.FC<{product: typeof products[0];index: number;}> = ({ product, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && cardRef.current) {
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bento-card group relative overflow-hidden ${product.span}`}
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        opacity: 0,
        transform: 'translateY(28px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, border-color 0.5s ease`,
        cursor: 'pointer',
        aspectRatio: product.aspectRatio
      }}>
      
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <AppImage
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover transition-transform duration-1000 ease-out"
          style={{
            transform: 'scale(1.02)',
            filter: 'brightness(0.65)'
          } as React.CSSProperties}
          sizes="(max-width: 768px) 100vw, 50vw" />
        
        <div
          className="absolute inset-0 group-hover:opacity-60 transition-opacity duration-700"
          style={{ background: 'linear-gradient(to top, rgba(10,24,16,0.95) 0%, rgba(10,24,16,0.3) 50%, transparent 100%)' }} />
        
      </div>

      {/* Badge */}
      {product.badge &&
      <div
        className="absolute top-4 left-4 z-10"
        style={{
          background: 'var(--color-accent)',
          color: 'var(--color-primary)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '4px 10px'
        }}>
        
          {product.badge}
        </div>
      }

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-7">
        <p
          className="text-[10px] uppercase tracking-widest mb-2 font-medium"
          style={{ color: 'var(--color-accent)', letterSpacing: '0.18em' }}>
          
          {product.tagline}
        </p>
        <div className="flex items-end justify-between">
          <h3
            className="font-serif-display text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-fg)', lineHeight: 1.1 }}>
            
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <span
              className="font-semibold text-sm"
              style={{ color: 'var(--color-fg-muted)' }}>
              
              {product.price}
            </span>
            <button
              className="flex items-center justify-center w-8 h-8 transition-all duration-300"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-primary)'
              }}
              aria-label={`Add ${product.name} to cart`}>
              
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>);

};

const ProductsSection: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && headingRef.current) {
          headingRef.current.style.opacity = '1';
          headingRef.current.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="products"
      className="py-28 md:py-36 px-6 md:px-12"
      style={{ background: 'var(--color-bg)' }}
      aria-label="Signature products">
      
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          
          <div>
            <p
              className="text-[10px] uppercase font-semibold mb-4"
              style={{ color: 'var(--color-accent)', letterSpacing: '0.28em' }}>
              
              Signature Collection
            </p>
            <h2
              className="font-serif-display"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                lineHeight: '0.92',
                color: 'var(--color-fg)',
                letterSpacing: '-0.02em'
              }}>
              
              Your Skin's <br />
              <span style={{ fontStyle: 'italic', color: 'rgba(245,239,230,0.45)' }}>New Ritual.</span>
            </h2>
          </div>
          <a
            href="#"
            className="arrow-link flex items-center gap-3 text-xs uppercase font-semibold tracking-widest self-end"
            style={{ color: 'var(--color-accent)' }}>
            
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>

        {/* Asymmetric bento grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          style={{ gridTemplateRows: 'auto auto auto' }}>
          
          {products.map((product, i) =>
          <ProductCard key={product.id} product={product} index={i} />
          )}
        </div>
      </div>
    </section>);

};

export default ProductsSection;