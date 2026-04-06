'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#192c38', color: 'white' }}>

      {/* TOP SECTION */}
      <div className="container lg:px-12 mx-auto px-6 md:px-10 py-16">

        <div className="flex flex-col lg:flex-row justify-between gap-12">

          {/* LEFT TEXT BLOCK */}
          <div className="w-full lg:w-[400px] lg:h-[181px]">
            <h3
              className="text-white"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '28px',
                fontWeight: '400',
                lineHeight: '1.4',
              }}
            >
              We use natural skincare ingredients to keep your skin smooth and hydrated
            </h3>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-5 mt-6">

              {/* Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/dittu.9/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>

            </div>
          </div>

          {/* RIGHT SIDE COLUMNS */}
          <div className="flex flex-wrap lg:flex-nowrap gap-10">

            {/* PRESETS */}
            <div className="w-[189px] h-[150px]">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-4">
                PRESETS
              </h4>
              <ul className="flex flex-col gap-2">
                {['Flairy', 'Gusto', 'Cosmo', 'Fleek', 'Laura'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/80 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ABOUT */}
            <div className="w-[189px] h-[150px]">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-4">
                ABOUT
              </h4>
              <ul className="flex flex-col gap-2">
                {['Contact', 'About', 'FAQs'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/80 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* SHOP */}
            <div className="w-[189px] h-[150px]">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-4">
                SHOP
              </h4>
              <ul className="flex flex-col gap-2">
                {['Shop All', 'Sale', 'Lookbook', 'Basic Collection'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/80 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="container mx-auto px-6 md:px-10 py-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-white/40">
            © 2026, Dittu. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/40 hover:text-white/70">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70">
              Terms of Service
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}