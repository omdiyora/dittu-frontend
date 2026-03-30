'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const stories = [
{
  id: 1,
  name: 'Maya Chen',
  role: 'Combination skin · 6 months',
  quote: '"My hyperpigmentation faded noticeably by week 6. The Vitamin C serum is the only product that\'s ever worked this fast."',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_125990276-1767692216610.png",
  alt: 'Maya Chen, woman with glowing skin smiling outdoors in natural light',
  case: 'Brightening Case 017'
},
{
  id: 2,
  name: 'Jordan Reeves',
  role: 'Sensitive skin · 3 months',
  quote: '"I\'ve tried every \"gentle\" brand out there. SkinCare is the first that didn\'t trigger a reaction and actually improved my barrier."',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13f0fa5d6-1772072472341.png",
  alt: 'Jordan Reeves, person with clear skin in close-up portrait',
  case: 'Barrier Case 044'
},
{
  id: 3,
  name: 'Priya Nair',
  role: 'Dry skin · 8 months',
  quote: '"The Peptide Night Cream is unlike anything I\'ve used. I wake up with genuinely plumper skin — not just surface moisture."',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1012b024b-1768906487116.png",
  alt: 'Priya Nair, woman with radiant skin in warm natural lighting',
  case: 'Hydration Case 089'
},
{
  id: 4,
  name: 'David Park',
  role: 'Oily skin · 4 months',
  quote: '"As someone who was skeptical of skincare altogether, the 28-day result guarantee pushed me to try. Week 3, my coworkers asked what I changed."',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_142c1feec-1772856158300.png",
  alt: 'David Park, man with healthy clear skin in professional setting',
  case: 'Balance Case 122'
}];


const StoriesSection: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && headingRef.current) {
          headingRef.current.style.opacity = '1';
          headingRef.current.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stories"
      className="py-28 md:py-36 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
      aria-label="Customer skin stories">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <div
          ref={headingRef}
          className="mb-14"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          
          <h2
            className="text-[10px] font-semibold uppercase flex items-center gap-4"
            style={{ color: 'var(--color-fg)', letterSpacing: '0.3em' }}>
            
            <span className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
            Skin Stories
          </h2>
        </div>

        {/* Two-column layout: quote + horizontal scroll */}
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-24 items-start">
          {/* Left — Feature quote */}
          <div className="lg:w-5/12 shrink-0">
            <h3
              className="font-serif-display mb-10"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                lineHeight: '1.15',
                color: 'var(--color-fg)',
                letterSpacing: '-0.01em'
              }}>
              
              "Real people. Real skin. Real results — not filters."
            </h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-fg)' }}>Verified Customers</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-fg-dim)' }}>50,000+ reviews · 4.9 avg</p>
              </div>
            </div>

            {/* Skin type tags */}
            <div className="flex flex-wrap gap-2">
              {['Dry', 'Oily', 'Combination', 'Sensitive', 'Mature'].map((type) =>
              <span key={type} className="ingredient-tag">{type}</span>
              )}
            </div>
          </div>

          {/* Right — Horizontal scroll cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory lg:w-7/12"
            style={{ scrollPaddingLeft: '0px' }}>
            
            {stories.map((story) =>
            <div
              key={story.id}
              className="story-card snap-center shrink-0 relative overflow-hidden"
              style={{
                width: '260px',
                height: '380px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
              
                {/* Photo */}
                <AppImage
                src={story.image}
                alt={story.alt}
                fill
                className="object-cover"
                sizes="260px" />
              
                {/* Gradient overlay */}
                <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,24,16,0.97) 0%, rgba(10,24,16,0.4) 55%, transparent 100%)' }} />
              

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                  <p
                  className="text-[10px] uppercase tracking-widest mb-3 font-medium"
                  style={{ color: 'var(--color-accent)' }}>
                  
                    {story.case}
                  </p>
                  <p
                  className="text-xs font-light leading-relaxed mb-4"
                  style={{ color: 'rgba(245,239,230,0.7)' }}>
                  
                    {story.quote}
                  </p>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-fg)' }}>{story.name}</p>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-fg-dim)' }}>{story.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default StoriesSection;