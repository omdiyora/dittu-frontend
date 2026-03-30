'use client';

import React, { useEffect, useRef } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const Header: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 60) {
        navRef.current.classList.add('nav-scrolled');
      } else {
        navRef.current.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-scrolled {
          mix-blend-mode: normal !important;
          background: rgba(10, 24, 16, 0.88) !important;
          backdrop-filter: blur(16px) !important;
          border-bottom: 1px solid rgba(245, 239, 230, 0.06) !important;
        }
        nav { transition: background 0.4s ease, backdrop-filter 0.4s ease; }
      `}</style>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[100] mix-blend-difference"
        style={{ background: 'transparent' }}
      >
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/homepage"
            className="flex items-center gap-2 group"
            aria-label="SkinCare home"
          >
            <AppLogo size={32} />
            <span
              className="font-sans font-semibold text-base tracking-tight text-white"
              style={{ letterSpacing: '-0.01em' }}
            >
              SkinCare
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-medium tracking-widest uppercase text-white/60">
            {[
              { label: 'Ritual', href: '#ritual' },
              { label: 'Science', href: '#science' },
              { label: 'Stories', href: '#stories' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#products"
            className="text-[11px] font-semibold uppercase tracking-widest bg-white text-black px-7 py-2.5 hover:bg-accent hover:text-primary transition-all duration-300"
            style={{ borderRadius: 0 }}
          >
            Shop Now
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;