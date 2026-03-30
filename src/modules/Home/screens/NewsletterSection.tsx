'use client';
import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 text-center" style={{ background: '#fcfaf7' }}>
      <div className="px-6 md:px-10 max-w-xl mx-auto">
        <h2
          className="mb-4"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1a1a1a',
            fontWeight: '400',
          }}
        >
          Join the Dittu Club
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(26,26,26,0.65)' }}>
          Subscribe for store updates and discounts.
        </p>

        {submitted ? (
          <p className="text-sm font-medium text-[#2d5a4e]">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
            <div className="flex-1 relative">
              <label className="absolute -top-5 left-0 text-xs text-[#1a1a1a] opacity-60">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-5 py-4 text-sm border rounded-l-full outline-none"
                style={{
                  background: 'white',
                  borderColor: 'rgba(26,26,26,0.15)',
                  color: '#1a1a1a',
                  borderRight: 'none',
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 rounded-r-full flex items-center justify-center"
              style={{ background: '#1a1a1a', color: 'white' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
        )}

        <p className="mt-4 text-xs" style={{ color: 'rgba(26,26,26,0.45)' }}>
          By subscribing you agree to the{' '}
          <a href="#" className="underline">Terms of Use</a>{' '}&amp;{' '}
          <a href="#" className="underline">Privacy Policy.</a>
        </p>
      </div>
    </section>
  );
}
