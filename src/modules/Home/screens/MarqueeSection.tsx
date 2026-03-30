'use client';
import React from 'react';

export default function MarqueeSection() {
  return (
    <section
      className="py-16 overflow-hidden"
      style={{ background: '#fcfaf7' }}
    >
      <div
        className="text-center"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          lineHeight: '1.2',
          color: '#1a1a1a',
          fontWeight: '400',
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6">
          <span>Make you feel</span>
          <span className="inline-block w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden align-middle">
            <img
              src="https://zest-cosmo.myshopify.com/cdn/shop/files/highlight-icon-1.webp?v=1740619480&width=300"
              alt=""
              className="w-full h-full object-cover"
            />
          </span>
          <span>and appear</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 mt-2">
          <em>glowing</em>
          <span className="inline-block w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden align-middle">
            <img
              src="https://zest-cosmo.myshopify.com/cdn/shop/files/highlight-icon-2.webp?v=1740619480&width=300"
              alt=""
              className="w-full h-full object-cover"
            />
          </span>
          <em>healthy</em>
          <span className="inline-block w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden align-middle">
            <img
              src="https://zest-cosmo.myshopify.com/cdn/shop/files/highlight-icon-3.webp?v=1740619480&width=300"
              alt=""
              className="w-full h-full object-cover"
            />
          </span>
          <em>and balanced</em>
        </div>
      </div>
    </section>
  );
}
