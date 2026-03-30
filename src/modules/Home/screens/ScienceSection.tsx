'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const ingredients = [
{ name: 'Ceramide NP', source: 'Wheat-derived', benefit: 'Restores lipid barrier integrity' },
{ name: 'Bakuchiol', source: 'Psoralea corylifolia seed', benefit: 'Retinol-equivalent without irritation' },
{ name: 'Niacinamide', source: 'Vitamin B3', benefit: 'Reduces pores, evens skin tone' },
{ name: 'Polyglutamic Acid', source: 'Fermented soy', benefit: '4× more hydrating than hyaluronic acid' }];


const ScienceSection: React.FC = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLDivElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.15 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="science"
      className="py-28 md:py-36 px-6 md:px-12 overflow-hidden"
      style={{
        background: 'var(--color-primary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}
      aria-label="The science behind our formulas">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image */}
          <div
            ref={leftRef}
            style={{
              opacity: 0,
              transform: 'translateY(32px)',
              transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)'
            }}>
            
            <div className="relative" style={{ aspectRatio: '4/5', borderRadius: '4px', overflow: 'hidden' }}>
              <AppImage
                src="https://images.unsplash.com/photo-1710593348891-819bd90ef61d"
                alt="Close-up of laboratory testing botanical skincare ingredients in glass vials"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw" />
              
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(13,31,26,0.8) 0%, transparent 60%)' }} />
              
            </div>

            {/* Floating stat card */}
            <div
              className="absolute -bottom-6 -right-4 md:-right-8 hidden md:block"
              style={{
                background: 'rgba(17,31,24,0.92)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--color-border-hover)',
                padding: '20px 24px',
                maxWidth: '220px',
                borderRadius: '4px'
              }}>
              
              <p
                className="font-serif-display text-3xl mb-1"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-accent)' }}>
                
                Zero
              </p>
              <p className="text-xs uppercase font-semibold" style={{ color: 'var(--color-fg-dim)', letterSpacing: '0.14em' }}>
                Synthetic Fillers
              </p>
            </div>
          </div>

          {/* Right — Content */}
          <div
            ref={rightRef}
            style={{
              opacity: 0,
              transform: 'translateY(32px)',
              transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s'
            }}>
            
            <p
              className="text-[10px] uppercase font-semibold mb-6"
              style={{ color: 'var(--color-accent)', letterSpacing: '0.28em' }}>
              
              The Foundation
            </p>

            <h2
              className="font-serif-display mb-8"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                lineHeight: '0.95',
                color: 'var(--color-fg)',
                letterSpacing: '-0.02em'
              }}>
              
              Every Ingredient <br />
              <span style={{ fontStyle: 'italic', color: 'rgba(245,239,230,0.4)' }}>Earns Its Place.</span>
            </h2>

            <p
              className="text-base font-light leading-relaxed mb-12"
              style={{ color: 'var(--color-fg-muted)', maxWidth: '440px' }}>
              
              We don't use ingredients because they photograph well. Every active in our formulas has passed double-blind clinical trials and meets our 99th-percentile purity standard.
            </p>

            {/* Ingredient list */}
            <div
              className="space-y-0"
              style={{ borderTop: '1px solid var(--color-border)' }}>
              
              {ingredients.map((ing, i) =>
              <div
                key={ing.name}
                className="group flex items-start gap-6 py-5"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(201,169,110,0.04)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                
                  <span
                  className="font-serif-display text-sm mt-0.5 shrink-0"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-accent)', minWidth: '20px' }}>
                  
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="font-semibold text-sm" style={{ color: 'var(--color-fg)' }}>{ing.name}</span>
                      <span className="ingredient-tag">{ing.source}</span>
                    </div>
                    <p className="text-xs font-light" style={{ color: 'var(--color-fg-muted)' }}>{ing.benefit}</p>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#"
              className="arrow-link inline-flex items-center gap-3 mt-10 text-xs uppercase font-semibold tracking-widest"
              style={{ color: 'var(--color-accent)' }}>
              
              Full Ingredient Index
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>);

};

export default ScienceSection;