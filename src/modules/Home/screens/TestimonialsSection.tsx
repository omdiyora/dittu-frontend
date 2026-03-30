'use client';
import React, { useState } from 'react';

interface Testimonial {
  id: number;
  image: string;
  productImage: string;
  productName: string;
  emoji: string;
}

const testimonials: Testimonial[] = [
{
  id: 1,
  image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/testimonial-image-1.webp?v=1740568912&width=360',
  productImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/prd-6.jpg?v=1740559775&width=360',
  productName: 'Exfoliating daily cleanser',
  emoji: '❤️'
},
{
  id: 2,
  image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/testimonial-image-2.webp?v=1740568912&width=360',
  productImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/prd-8.jpg?v=1740559818&width=360',
  productName: 'Bio-retinol mask',
  emoji: '🤩🙌'
},
{
  id: 3,
  image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/testimonial-image-3.webp?v=1740568912&width=360',
  productImage: 'https://zest-cosmo.myshopify.com/cdn/shop/files/prd-1.jpg?v=1740559323&width=360',
  productName: 'Gentle retinol night serum',
  emoji: '✨'
}];


export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const visibleTestimonials = [
  testimonials[current % total],
  testimonials[(current + 1) % total],
  testimonials[(current + 2) % total]];


  return (
    <section className="py-16" style={{ background: '#f5f0e8' }}>
      <div className="px-6 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#1a1a1a',
              fontWeight: '400'
            }}>
            
            Real People, Real Results
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#1a1a1a] opacity-60">{current + 1} / {total}</span>
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-all"
              style={{ borderColor: 'rgba(26,26,26,0.2)' }}>
              
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-all"
              style={{ borderColor: 'rgba(26,26,26,0.2)' }}>
              
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleTestimonials.map((testimonial, i) =>
          <div key={`${testimonial.id}-${i}`} className="testimonial-card overflow-hidden rounded-xl">
              {/* User photo */}
              <div className="relative" style={{ aspectRatio: '4/5' }}>
                <img
                src={testimonial.image}
                alt="Customer"
                className="w-full h-full object-cover" />
              
                {/* Emoji overlay */}
                <div className="absolute top-4 left-4 text-2xl">{testimonial.emoji}</div>
              </div>
              {/* Product info */}
              <div className="p-4 flex items-center gap-3 bg-white">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#f5f0e8' }}>
                  <img src={testimonial.productImage} alt={testimonial.productName} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-[#1a1a1a]">{testimonial.productName}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}