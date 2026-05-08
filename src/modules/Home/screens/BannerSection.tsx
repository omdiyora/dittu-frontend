'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function BannerSection() {

    const router = useRouter()

  return (
    <section className="py-10 px-6 md:px-10 bg-[#fcfaf7]">

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12">

        {/* LEFT CARD */}
        <div className="w-full md:w-[450px] lg:w-[655px]">
          <div className="relative w-full h-[500px] md:h-[650px] lg:h-[700px] overflow-hidden rounded-xl">

            {/* IMAGE */}
            <img
              src="/assets/images/image-dittu-skin.png"
              alt="Naturally Strong, Beautiful Skin"
              className="w-full h-full object-cover object-[50%_15%] scale-[1.05] transition-transform duration-700 ease-out hover:scale-110"
            />

            {/* SOFT OVERLAY (more natural like reference) */}
            <div className="absolute inset-0 bg-black/10" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex flex-col items-start justify-end pb-10 md:pb-14 lg:pb-16 pl-6 md:pl-10 lg:pl-12 text-white">

              <h3
                className="text-xl md:text-2xl lg:text-3xl max-w-[80%] leading-snug mb-5"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Naturally Strong, Beautiful Skin
              </h3>

              <button  onClick={() => router.push('/collections')} className="bg-white text-black text-xs px-6 py-3 rounded-full tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300">
                SHOP NOW
              </button>

            </div>

          </div>
        </div>
       

        {/* RIGHT CARD */}
        <div className="w-full md:w-[450px] lg:w-[655px]">
          <div className="relative w-full h-[450px] md:h-[600px] lg:h-[600px] overflow-hidden rounded-md">

            <img
              src="https://zest-cosmo.myshopify.com/cdn/shop/files/custom-banner-2.webp?v=1740710018&width=900"
              alt="For Naturally Resilient Skin"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 text-center text-white">

              <h3
                className="text-xl md:text-2xl lg:text-3xl mb-6"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Resilient Skin, Everyday Glow
              </h3>

              <button onClick={() => router.push('/collections')} className="bg-white text-black text-xs px-5 py-2.5 md:px-6 md:py-3 rounded-full tracking-widest uppercase">
                SHOP NOW
              </button>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}