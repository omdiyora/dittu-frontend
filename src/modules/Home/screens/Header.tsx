'use client';
import React, { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="header-sticky"
        style={{
          backgroundColor: '#fcfaf7',
          borderBottom: '1px solid rgba(26,26,26,0.08)',
        }}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
          {/* Left Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/homepage" className="text-xs font-medium tracking-widest uppercase text-[#1a1a1a] hover:opacity-60 transition-opacity">HOME</a>
            <div className="relative group">
              <a href="#" className="text-xs font-medium tracking-widest uppercase text-[#1a1a1a] hover:opacity-60 transition-opacity flex items-center gap-1">
                PRESETS
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <a href="#" className="text-xs font-medium tracking-widest uppercase text-[#1a1a1a] hover:opacity-60 transition-opacity flex items-center gap-1">
                SHOP
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              {shopOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg p-6 flex gap-8 z-50 min-w-[600px]">
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#1a1a1a] mb-3">Categories</p>
                    {['Serums', 'Cleansers', 'Toners', 'Body & Hands', 'Masks', 'Moisturizer', 'Shop All']?.map(item => (
                      <a key={item} href="#" className="block text-sm text-[#1a1a1a] hover:opacity-60 py-1 transition-opacity">{item}</a>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#1a1a1a] mb-3">Discover</p>
                    {['Best Sellers', 'New Arrivals', 'Essential Routine', 'Oil Remover', 'Holiday Gifting']?.map(item => (
                      <a key={item} href="#" className="block text-sm text-[#1a1a1a] hover:opacity-60 py-1 transition-opacity">{item}</a>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#1a1a1a] mb-3">Featured</p>
                    {['Power Couple Kit', 'Natural Body Wash', 'Bio-retinol Mask', 'Pure free oil cleanser']?.map(item => (
                      <a key={item} href="#" className="block text-sm text-[#1a1a1a] hover:opacity-60 py-1 transition-opacity">{item}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Logo - Center */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <a href="#" className="flex items-center">
              <span
                className="font-serif-italic text-2xl tracking-wider text-[#1a1a1a]"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '26px', letterSpacing: '0.05em' }}
              >
                Dittu
              </span>
            </a>
          </div>

          {/* Right Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <a href="#" className="text-xs font-medium tracking-widest uppercase text-[#1a1a1a] hover:opacity-60 transition-opacity flex items-center gap-1">
                COLLECTIONS
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-xs font-medium tracking-widest uppercase text-[#1a1a1a] hover:opacity-60 transition-opacity flex items-center gap-1">
                PAGES
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-[#1a1a1a] hover:opacity-60 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
              <button className="text-[#1a1a1a] hover:opacity-60 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              <button className="text-[#1a1a1a] hover:opacity-60 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#1a1a1a]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#fcfaf7] flex flex-col p-6">
          <div className="flex justify-between items-center mb-8">
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '26px' }}>Dittu</span>
            <button onClick={() => setMobileOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {['Home', 'Shop', 'Collections', 'Pages', 'Contact']?.map(item => (
              <a key={item} href="#" className="text-2xl font-light text-[#1a1a1a]" onClick={() => setMobileOpen(false)}>{item}</a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
