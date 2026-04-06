'use client';
import React from 'react';

const images = [
  'https://zest-cosmo.myshopify.com/cdn/shop/files/gallery-image-1.webp?v=1740622581&width=600',
  'https://zest-cosmo.myshopify.com/cdn/shop/files/gallery-image-2.webp?v=1740622580&width=600',
  'https://zest-cosmo.myshopify.com/cdn/shop/files/gallery-image-3.webp?v=1740622580&width=600',
  'https://zest-cosmo.myshopify.com/cdn/shop/files/gallery-image-4.webp?v=1740622581&width=600',
  'https://zest-cosmo.myshopify.com/cdn/shop/files/gallery-image-5.webp?v=1740622580&width=600',
  'https://zest-cosmo.myshopify.com/cdn/shop/files/gallery-image-6.webp?v=1740622581&width=600',
  'https://zest-cosmo.myshopify.com/cdn/shop/files/gallery-image-7.webp?v=1740622581&width=600',
  'https://zest-cosmo.myshopify.com/cdn/shop/files/gallery-image-8.webp?v=1740622580&width=600',
];

export default function InstagramSection() {
  return (
    <section className="bg-[#fcfaf7]">

      {/* MAIN 3 COLUMN LAYOUT — equal thirds, no gaps */}
      <div className="grid md:grid-cols-3 w-full">

        {/* LEFT 2×2 GRID */}
        <div className="grid grid-cols-2 grid-rows-2 aspect-square">
          {[images[0], images[1], images[4], images[5]].map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img src={img} className="w-full h-full object-cover block" />
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div className="flex items-center justify-center bg-[#e9e1d8] aspect-square text-center px-6">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/60 mb-3">
              FOLLOW US
            </p>

            <h2
              className="mb-4"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 400,
              }}
            >
              On Instagram
            </h2>

            <p className="text-sm text-[#1a1a1a]/70 mb-6 max-w-[320px] mx-auto">
              Tag <strong>@dittu</strong> in your Instagram photos for a chance to be featured here.
            </p>

            <a
              href="https://www.instagram.com/dittu.9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-black text-white text-xs tracking-widest uppercase px-8 py-3 rounded-full">
                FOLLOW US
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT 2×2 GRID */}
        <div className="grid grid-cols-2 grid-rows-2 aspect-square">
          {[images[2], images[3], images[6], images[7]].map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img src={img} className="w-full h-full object-cover block" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}