'use client';

import React, { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    name: 'Cleanse & Prep',
    description: 'Start with a clean canvas. Our Gentle Micellar Cleanser removes SPF, makeup, and daily buildup without stripping your moisture barrier.',
    product: 'Gentle Micellar Cleanser',
    time: 'AM · PM',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
      </svg>
    ),
  },
  {
    number: '02',
    name: 'Treat & Target',
    description: 'Apply your active serum while skin is still slightly damp. This is where the real work happens — targeted actives penetrate deepest on clean, hydrated skin.',
    product: 'Barrier Repair Serum or Vitamin C',
    time: 'AM · PM',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
      </svg>
    ),
  },
  {
    number: '03',
    name: 'Seal & Protect',
    description: 'Lock in your actives with the Peptide Night Cream (PM) or a lightweight moisturizer + SPF 50 (AM). Occlusion amplifies every ingredient beneath.',
    product: 'Peptide Night Cream',
    time: 'PM · AM with SPF',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

const RitualSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepsRef.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }
            }, i * 140);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="ritual"
      className="py-28 md:py-36 px-6 md:px-12"
      style={{
        background: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Build your skincare ritual"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          <div>
            <p
              className="text-[10px] uppercase font-semibold mb-6"
              style={{ color: 'var(--color-accent)', letterSpacing: '0.28em' }}
            >
              The Ritual
            </p>
            <h2
              className="font-serif-display"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                lineHeight: '0.92',
                color: 'var(--color-fg)',
                letterSpacing: '-0.02em',
              }}
            >
              Three Steps. <br />
              <span style={{ fontStyle: 'italic', color: 'rgba(245,239,230,0.4)' }}>Every Morning.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p
              className="text-base font-light leading-relaxed mb-8"
              style={{ color: 'var(--color-fg-muted)', maxWidth: '420px' }}
            >
              Complexity doesn't equal efficacy. Our 3-step ritual is built around layering order, not product volume. Takes 4 minutes. Delivers 28-day results.
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-3 text-xs uppercase font-semibold tracking-widest self-start px-8 py-4 transition-all duration-300"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-primary)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-accent-light)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-accent)';
              }}
            >
              Build Your Ritual
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7l7 7l-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Steps — horizontal divide layout */}
        <div
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="ritual-step group grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-12 items-start"
              style={{
                borderBottom: '1px solid var(--color-border)',
                opacity: 0,
                transform: 'translateY(28px)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Step number */}
              <div className="md:col-span-1">
                <span className="step-number">{step.number}</span>
              </div>

              {/* Icon + Time */}
              <div className="md:col-span-2 flex md:flex-col gap-4 items-center md:items-start pt-1">
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{
                    border: '1px solid var(--color-border-hover)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {step.icon}
                </div>
                <span
                  className="text-[10px] uppercase tracking-widest font-medium"
                  style={{ color: 'var(--color-fg-dim)' }}
                >
                  {step.time}
                </span>
              </div>

              {/* Name + description */}
              <div className="md:col-span-5">
                <h3
                  className="font-serif-display text-xl md:text-2xl mb-3"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-fg)', lineHeight: 1.2 }}
                >
                  {step.name}
                </h3>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: 'var(--color-fg-muted)' }}
                >
                  {step.description}
                </p>
              </div>

              {/* Product + CTA */}
              <div className="md:col-span-4 flex flex-col gap-4 md:items-end justify-start">
                <span className="ingredient-tag">{step.product}</span>
                <a
                  href="#products"
                  className="arrow-link flex items-center gap-2 text-xs uppercase font-semibold tracking-widest"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Shop Step
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'SkinCare 3-Step Daily Ritual',
            description: 'A 3-step skincare ritual for radiant, healthy skin in 28 days.',
            step: steps.map((s) => ({
              '@type': 'HowToStep',
              name: s.name,
              text: s.description,
            })),
          }),
        }}
      />
    </section>
  );
};

export default RitualSection;