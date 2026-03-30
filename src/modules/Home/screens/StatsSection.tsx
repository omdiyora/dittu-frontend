'use client';

import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 94, suffix: '%', label: 'Visible improvement in 28 days', prefix: '' },
  { value: 12, suffix: '+', label: 'Clinically-tested botanical actives', prefix: '' },
  { value: 0, suffix: '', label: 'Synthetic fillers or parabens', prefix: '' },
  { value: 50, suffix: 'k', label: 'Customers with verified results', prefix: '' },
];

function useCountUp(target: number, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (target === 0) { setCount(0); return; }
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const StatItem: React.FC<{ stat: typeof stats[0]; delay: number; triggered: boolean }> = ({ stat, delay, triggered }) => {
  const count = useCountUp(stat.value, 1600, triggered);
  return (
    <div
      className="text-center md:text-left"
      style={{
        opacity: triggered ? 1 : 0,
        transform: triggered ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <p
        className="font-serif-display"
        style={{
          fontSize: 'clamp(2.8rem, 5vw, 4rem)',
          fontFamily: 'var(--font-serif)',
          color: 'var(--color-fg)',
          lineHeight: 1,
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}
      >
        {stat.prefix}{count}{stat.suffix}
      </p>
      <p
        className="text-xs uppercase font-semibold"
        style={{ color: 'var(--color-fg-dim)', letterSpacing: '0.18em' }}
      >
        {stat.label}
      </p>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20"
      style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(255,255,255,0.015)',
      }}
      aria-label="Clinical results statistics"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 120} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;