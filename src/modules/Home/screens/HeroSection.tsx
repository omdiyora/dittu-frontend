'use client';
import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '600px' }}>
      {/* Split background images */}
      <div className="absolute inset-0 flex">
        {/* Left - woman portrait */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src="https://zest-cosmo.myshopify.com/cdn/shop/files/hero-banner.webp?v=1740558419&width=3000"
            alt="Universal Beauty"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: '30% center' }} />
          
        </div>
        {/* Right - sandy/nature */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src="https://zest-cosmo.myshopify.com/cdn/shop/files/hero-banner.webp?v=1740558419&width=3000"
            alt="Universal Beauty"
            className="w-full h-full object-cover"
            style={{ objectPosition: '70% center' }} />
          
        </div>
      </div>

      {/* Brand name overlay - large display text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="text-white text-center"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(5rem, 18vw, 14rem)',
            lineHeight: '0.85',
            letterSpacing: '-0.01em',
            fontWeight: '400',
            textShadow: 'none',
            mixBlendMode: 'normal'
          }}>
          
          DITTU
        </div>
      </div>

      {/* Bottom text and CTA */}
      <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-6">
        <h2
          className="text-white text-center"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '400'
          }}>
          
          Universal <em>Beauty</em>
        </h2>
        <a
          href="#"
          className="btn-primary"
          style={{
            background: 'white',
            color: '#1a1a1a',
            borderRadius: '100px',
            padding: '14px 40px',
            fontSize: '11px',
            letterSpacing: '0.15em',
            fontWeight: '500'
          }}>
          
          SHOW NOW
        </a>
      </div>
    </section>);

}