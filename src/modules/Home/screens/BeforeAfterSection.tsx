'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function BeforeAfterSection() {
      const router = useRouter()
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, x / rect.width * 100));
    setSliderPos(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pct = Math.max(0, Math.min(100, x / rect.width * 100));
    setSliderPos(pct);
  };

  return (
    <>
      <section className="py-20 bg-[#fcfaf7]">

        {/* ✅ Perfect centered container */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12">

          <div className="max-w-[1200px] mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

              {/* ✅ LEFT SIDE */}
              <div className="flex justify-center lg:justify-start">

                {/* ✅ FIXED IMAGE SIZE */}
                <div className="w-full max-w-[670px] h-[280px] sm:h-[380px] md:h-[480px] lg:h-[530px]">

                  <div
                    ref={containerRef}
                    className="relative w-full h-full  overflow-hidden before-after-container rounded-lg cursor-col-resize"
                    style={{ aspectRatio: '4/5', position: 'relative', overflow: 'hidden' }}
                    onMouseDown={() => { isDragging.current = true; }}
                    onMouseUp={() => { isDragging.current = false; }}
                    onMouseLeave={() => { isDragging.current = false; }}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}>

                    {/* After image (full) */}
                    <img
                      src="https://zest-cosmo.myshopify.com/cdn/shop/files/home-after.webp?v=1740563987&width=1500"
                      alt="After"
                      className="absolute inset-0 w-full h-full object-cover" />

                    {/* Before image (clipped) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPos}%` }}>

                      <img
                        src="https://zest-cosmo.myshopify.com/cdn/shop/files/home-before.webp?v=1740563985&width=1500"
                        alt="Before"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ width: `${10000 / sliderPos}%`, maxWidth: 'none' }} />

                    </div>
                    {/* Slider line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white"
                      style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>

                      <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-col-resize">

                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
                          <path d="M9 18l-6-6 6-6" />
                          <path d="M15 6l6 6-6 6" />
                        </svg>
                      </div>
                    </div>
                    {/* Labels */}
                    <span className="absolute top-4 left-4 text-white text-xs font-medium tracking-widest uppercase bg-black/30 px-3 py-1 rounded">Before</span>
                    <span className="absolute top-4 right-4 text-white text-xs font-medium tracking-widest uppercase bg-black/30 px-3 py-1 rounded">After</span>
                  </div>

                  {/* PRODUCT INFO */}
                  {/* <div className="mt-5 flex justify-between text-sm text-[#1a1a1a]">
                    <a href="#" className="border-b border-black/20 hover:border-black">
                      Ultimate Facelift Day Cream
                    </a>
                    <span>$30.00</span>
                  </div> */}

                </div>
              </div>

              {/* ✅ RIGHT SIDE */}
              <div className="max-w-[480px] mx-auto lg:mx-0 flex flex-col gap-6">

                <p className="text-[16px] tracking-[0.2em] uppercase text-black">
                  WEAR IT FOUR WAY
                </p>

                <h2
                  className="text-[30px] md:text-[40px] lg:text-[48px] leading-[1.15]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  The balance of <br />
                  <em className="italic font-light">high-performance</em>
                </h2>

                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                  Experience the perfect blend of advanced formulas and skin-loving
                  ingredients, delivering powerful results while maintaining harmony
                  for a healthy, radiant complexion.
                </p>

                <button onClick={() => router.push('/collections')} className="w-fit px-6 py-3 bg-black text-white text-xs tracking-widest uppercase rounded-full hover:opacity-90 transition">
                  SHOP THIS PRODUCT
                </button>

              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );

}