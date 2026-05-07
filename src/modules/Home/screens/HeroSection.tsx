'use client';
import React from 'react';
import { useRouter } from "next/navigation";
export default function HeroSection() {
  const router = useRouter();

  return (
    <>
      {/* Desktop Banner */}


      <section className="relative hidden md:block w-full h-[700px] lg:h-screen overflow-hidden">

        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/dbfyydres/image/upload/v1778139179/ChatGPT_Image_May_6__2026__01_06_53_PM_Picsart_AiImageEnhancer_bxpal4.png"
          alt="Universal Beauty"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">

          <div className="max-w-xl xl:max-w-2xl lg:max-w-2xl px-8 lg:px-16">

            {/* Heading */}
            <h1 className="
        text-[42px]
        lg:text-[56px]
        xl:text-[61px]
        leading-[1.1]
        font-light
        text-[#3E3A39]
        tracking-tight
      ">
              Skincare that
              <br />
              nourishes, protects &
              <br />
              brings out{" "}
              <span className="text-[#C9A063] italic font-normal">
                your glow.
              </span>
            </h1>

            {/* Description */}
            <p className="
        mt-5
        lg:mt-8
        text-[16px]
        lg:text-[20px]
        leading-relaxed
        text-[#5F5B58]
      ">
              Pure ingredients. Proven results.
              <br />
              For healthy, radiant skin every day.
            </p>

            {/* Button */}
            <button
              onClick={() => router.push('/collections')}
              className="
        mt-6
        lg:mt-10
        flex
        items-center
        gap-3
        bg-[#C9A063]
        hover:bg-[#b58d52]
        transition-all
        duration-300
        text-white
        uppercase
        tracking-[2px]
        px-5
        lg:px-4
        py-3
        lg:py-2.5
        rounded-full
        text-sm
        lg:text-base
      ">
              Shop Now
              <span className="text-xl lg:text-2xl">→</span>
            </button>

          </div>

        </div>
      </section>

      {/* Mobile Banner */}
      <section className="relative block md:hidden w-full h-screen overflow-hidden">

        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/dbfyydres/image/upload/v1778139832/Mobile-banner_k26agj.png"
          alt="Universal Beauty"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Content */}
        <div className="absolute inset-0 px-6 pt-24">

          <div className="max-w-[260px]">

            {/* Heading */}
            <h1 className="
        text-[34px]
        leading-[1.12]
        font-light
        text-[#3E3A39]
        tracking-tight
      ">
              Skincare that
              <br />
              nourishes,
              <br />
              protects &
              <br />
              brings out{" "}
              <span className="text-[#C9A063] italic font-normal">
                your glow.
              </span>
            </h1>

            {/* Divider */}
            <div className="w-12 h-[2px] bg-[#C9A063] mt-6 mb-6" />

            {/* Description */}
            <p className="
        text-[15px]
        leading-8
        text-[#5F5B58]
      ">
              Pure ingredients.
              <br />
              Proven results.
              <br />
              For healthy, radiant skin every day.
            </p>

            {/* Button */}
            <button
              onClick={() => router.push('/collections')}
              className="
        mt-8
        flex
        items-center
        justify-center
        gap-3
        bg-[#C9A063]
        text-white
        uppercase
        tracking-[2px]
        px-6
        py-3
        rounded-full
        text-sm
      ">
              Shop Now
              <span className="text-lg">→</span>
            </button>

          </div>

        </div>
      </section>
    </>
    // <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '600px' }}>
    //   {/* Split background images */}
    //   <div className="absolute inset-0 flex">
    //     <div className="w-full h-full relative overflow-hidden">

    //       {/* Desktop Image */}
    //       <img
    //         src="https://res.cloudinary.com/dbfyydres/image/upload/v1775135093/hero-banner_xg1qux.png"
    //         alt="Universal Beauty"
    //         className="w-full h-full object-cover object-center hidden md:block"
    //         style={{ objectPosition: "30% center" }}
    //       />

    //       {/* Mobile Image */}
    //       <img
    //         src="https://res.cloudinary.com/dbfyydres/image/upload/v1775135113/hero-banner-m_yisyl4.png"
    //         alt="Universal Beauty Mobile"
    //         className="w-full h-full object-cover object-center block md:hidden"
    //       />

    //     </div>
    //   </div>

    //   {/* Brand name overlay - large display text */}
    //   <div className="absolute inset-0 flex flex-col items-center justify-center">
    //     <div
    //       className="text-white text-center"
    //       style={{
    //         fontFamily: "'Instrument Serif', serif",
    //         fontSize: 'clamp(5rem, 18vw, 14rem)',
    //         lineHeight: '0.85',
    //         letterSpacing: '-0.01em',
    //         fontWeight: '400',
    //         textShadow: 'none',
    //         mixBlendMode: 'normal'
    //       }}>

    //       DITTU
    //     </div>
    //   </div>

    //   {/* Bottom text and CTA */}
    //   <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-6">
    //     <h2
    //       className="text-white text-center"
    //       style={{
    //         fontFamily: "'Instrument Serif', serif",
    //         fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    //         fontWeight: '400'
    //       }}>

    //       Universal <em>Beauty</em>
    //     </h2>
    //     <a
    //       href="/collections"
    //       className="btn-primary"
    //       style={{
    //         background: 'white',
    //         color: '#1a1a1a',
    //         borderRadius: '100px',
    //         padding: '14px 40px',
    //         fontSize: '11px',
    //         letterSpacing: '0.15em',
    //         fontWeight: '500'
    //       }}>

    //       SHOW NOW
    //     </a>
    //   </div>
    // </section>
  );

}