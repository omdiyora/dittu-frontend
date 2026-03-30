'use client';

import React from 'react';
import AppLogo from './ui/AppLogo';
// import AppLogo from '@/components/ui/AppLogo';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer
            className="border-t w-full"
            style={{ borderColor: 'rgba(245,239,230,0.08)', paddingTop: '72px', paddingBottom: '72px' }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Pattern 3 — Vercel Horizontal Flow */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo + links */}
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        <a href="/homepage" className="flex items-center gap-2">
                            <AppLogo size={28} />
                            <span className="font-sans font-semibold text-sm text-fg/80 tracking-tight">SkinCare</span>
                        </a>
                        <nav className="flex items-center gap-6 text-[13px] font-medium" style={{ color: 'rgba(245,239,230,0.5)' }}>
                            {['Ritual', 'Science', 'Stories', 'Products'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-link transition-colors duration-200"
                                    style={{ color: 'rgba(245,239,230,0.5)' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F5EFE6')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.5)')}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Right — social + legal */}
                    <div className="flex items-center gap-6">
                        {/* Social icons */}
                        {[
                            { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                            { label: 'TikTok', path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z' },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href="#"
                                aria-label={social.label}
                                className="w-8 h-8 flex items-center justify-center transition-opacity duration-200"
                                style={{ color: 'rgba(245,239,230,0.4)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.4)')}
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                    <path d={social.path} />
                                </svg>
                            </a>
                        ))}
                        <span style={{ color: 'rgba(245,239,230,0.18)', fontSize: '13px' }}>·</span>
                        <span style={{ color: 'rgba(245,239,230,0.35)', fontSize: '13px', fontWeight: 500 }}>
                            © {year} SkinCare
                        </span>
                        <a
                            href="#"
                            style={{ color: 'rgba(245,239,230,0.35)', fontSize: '13px', fontWeight: 500 }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5EFE6')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.35)')}
                            className="transition-colors duration-200"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            style={{ color: 'rgba(245,239,230,0.35)', fontSize: '13px', fontWeight: 500 }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5EFE6')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.35)')}
                            className="transition-colors duration-200"
                        >
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;