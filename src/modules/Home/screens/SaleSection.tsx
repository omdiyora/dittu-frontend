'use client';
import React from 'react';

export default function SaleSection() {
  return (
    <section className="bg-[#fcfaf7] py-12">

      <div className="container mx-auto px-4 md:px-8 lg:px-12">

        {/* MAIN BANNER */}
        <div className="bg-[#7a5144] rounded-md overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2 items-center">

            {/* LEFT SIDE */}
            <div className="px-6 md:px-12 py-10 flex flex-col items-center justify-center text-center">

              <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-3">
                SAVING UP TO $30
              </p>

              <h2
                className="text-[#f3d98c] mb-4"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontStyle: 'italic',
                  fontWeight: 400
                }}
              >
                Sale Up To 30%
              </h2>

              <p className="text-white/70 text-xs">
                *Ends April 10 2025, 12:00 PST. T&C&apos;s Apply
              </p>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative px-6 md:px-12 py-10 flex flex-col items-center justify-center text-center">

              {/* Divider */}
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[1px] bg-white/30" />

              <h3
                className="text-white mb-3"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 400
                }}
              >
                Seasonal Savings Event
              </h3>

              <p className="text-white/80 text-sm mb-6">
                Up to 30% Off on Must–Have Styles !
              </p>

              <button className="bg-white text-[#1a1a1a] text-xs tracking-widest uppercase px-8 py-3 rounded-full hover:opacity-90 transition">
                SHOP THE SALE
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}