'use client';
import React from 'react';

const pressQuotes = [
{ quote: '"Glow naturally with skincare that nourishes, protects, and enhances your beauty."', brand: 'Vogue', logo: 'https://zest-cosmo.myshopify.com/cdn/shop/files/brand-vogue.webp?v=1740563468&width=360' },
{ quote: '"Detox nights call for treatments that purify, restore, and leave you glowing."', brand: 'Martha Stewart', logo: 'https://zest-cosmo.myshopify.com/cdn/shop/files/brand-martha-stewart.webp?v=1740563468&width=360' },
{ quote: '"Feel confident with beauty essentials crafted to enhance your natural radiance."', brand: 'Bustle', logo: 'https://zest-cosmo.myshopify.com/cdn/shop/files/brand-bustle.webp?v=1740563468&width=360' },
{ quote: '"Refresh and restore with soothing skincare for your summer adventures."', brand: 'Elite Daily', logo: 'https://zest-cosmo.myshopify.com/cdn/shop/files/brand-elite-daily.webp?v=1740563468&width=360' },
{ quote: '"Unlock your glow with skincare that pampers, protects, and enhances your beauty."', brand: 'Elle', logo: 'https://zest-cosmo.myshopify.com/cdn/shop/files/brand-elle.webp?v=1740563468&width=360' }];


export default function PressSection() {
  return (
    <section className="py-16 overflow-hidden" style={{ background: '#fcfaf7' }}>
      <div className="px-6 md:px-10 mb-8">
        <p className="section-label">Our Press</p>
      </div>
      {/* Scrolling press quotes */}
      <div className="overflow-hidden">
        <div className="marquee-track" style={{ animationDuration: '30s' }}>
          {[...pressQuotes, ...pressQuotes]?.map((item, i) =>
          <div
            key={i}
            className="flex-shrink-0 px-8 py-6 mr-4 rounded-lg"
            style={{
              background: '#f5f0e8',
              width: '380px'
            }}>
            
              <div className="mb-4 h-8">
                <img src={item?.logo} alt={item?.brand} className="h-full w-auto object-contain opacity-60" />
              </div>
              <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '16px',
                color: '#1a1a1a',
                fontStyle: 'italic'
              }}>
              
                {item?.quote}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}