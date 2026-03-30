'use client';
import React, { useState } from 'react';

interface BundleProduct {
  id: number;
  number: string;
  name: string;
  price: string;
  image: string;
  options: string[];
  selectedOption: string;
}

const bundleProducts: BundleProduct[] = [
{
  id: 1,
  number: '1',
  name: 'Hyaluronic sea serum',
  price: '$130.00',
  image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/prd-2.jpg?v=1740559404&width=533',
  options: ['30ml', '45ml'],
  selectedOption: '30ml'
},
{
  id: 2,
  number: '2',
  name: 'Ultimate Facelift Day Cream',
  price: '$30.00',
  image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/70.jpg?v=1740561574&width=1500',
  options: ['45ml', '75ml', '100ml'],
  selectedOption: '45ml'
},
{
  id: 3,
  number: '3',
  name: 'Ultimate Blanca Hair Oil',
  price: '$30.00',
  image: 'https://zest-cosmo.myshopify.com/cdn/shop/files/43.jpg?v=1740561204&width=1500',
  options: ['45ml', '75ml', '100ml'],
  selectedOption: '45ml'
}];


export default function BundleSection() {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>(
    Object.fromEntries(bundleProducts.map((p) => [p.id, p.selectedOption]))
  );
  const [activeBundle, setActiveBundle] = useState(1);

  return (
    <section className="py-16" style={{ background: '#fcfaf7' }}>
      <div className="px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Bundle info */}
          <div>
            <p className="section-label mb-4">product bundle</p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.15',
                color: '#1a1a1a',
                fontWeight: '400'
              }}>
              
              Favorite <em>Packs</em>
            </h2>

            {/* Bundle products list */}
            <div className="mt-8 flex flex-col gap-0">
              {bundleProducts.map((product) =>
              <div
                key={product.id}
                className="bundle-item"
                style={{ borderBottom: '1px solid rgba(26,26,26,0.1)', paddingBottom: '16px', marginBottom: '16px' }}>
                
                  <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium"
                  style={{ background: '#f5f0e8', color: '#1a1a1a' }}>
                  
                    {product.number}
                  </div>
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#f5f0e8' }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h6 className="text-sm font-medium text-[#1a1a1a]">{product.name}</h6>
                    <p className="text-sm text-[#1a1a1a] opacity-60">{product.price}</p>
                  </div>
                  <select
                  value={selectedOptions[product.id]}
                  onChange={(e) => setSelectedOptions((prev) => ({ ...prev, [product.id]: e.target.value }))}
                  className="text-xs border rounded px-2 py-1 bg-white"
                  style={{ borderColor: 'rgba(26,26,26,0.2)', color: '#1a1a1a' }}>
                  
                    {product.options.map((opt) =>
                  <option key={opt} value={opt}>{opt}</option>
                  )}
                  </select>
                </div>
              )}
            </div>

            <button
              className="mt-6 w-full py-4 text-xs font-medium tracking-widest uppercase text-white rounded-full"
              style={{ background: '#1a1a1a' }}>
              
              ADD ALL TO CART
            </button>
          </div>

          {/* Right - Bundle image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden" style={{ aspectRatio: '4/5', background: '#f5f0e8' }}>
              <img
                src="https://zest-cosmo.myshopify.com/cdn/shop/files/product-bundle-banner.webp?v=1740566454&width=1500"
                alt="Favorite Packs"
                className="w-full h-full object-cover" />
              
            </div>
            {/* Bundle number indicators */}
            <div className="flex gap-3 mt-4 justify-center">
              {bundleProducts.map((p) =>
              <button
                key={p.id}
                onClick={() => setActiveBundle(p.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all"
                style={{
                  background: activeBundle === p.id ? '#1a1a1a' : '#f5f0e8',
                  color: activeBundle === p.id ? 'white' : '#1a1a1a'
                }}>
                
                  {p.number}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}