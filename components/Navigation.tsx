'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          scrolled ? 'border-black/10 py-3' : 'border-transparent py-5'
        }`}
      >
        <div className="container-pro flex items-center justify-between">
          <Link 
            href="/" 
            className={`flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:opacity-80 ${
              scrolled ? 'scale-90' : 'scale-100'
            }`}
          >
            <Image 
              src="/logo.png" 
              width={scrolled ? 28 : 32} 
              height={scrolled ? 28 : 32} 
              alt="ascentis.capital" 
              className="rounded-lg transition-all duration-300" 
            />
            <span className={`font-inter font-semibold tracking-tight transition-all duration-300 text-black ${
              scrolled ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
            }`}>
              ascentis.capital
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              href="/portfolio" 
              className="text-sm font-medium text-[color:var(--dark-gray)] hover:text-black transition-all duration-300 cubic-bezier(0.47, 0, 0.745, 0.715)"
            >
              Portfolio
            </Link>
            <Link 
              href="/thesis" 
              className="text-sm font-medium text-[color:var(--dark-gray)] hover:text-black transition-all duration-300 cubic-bezier(0.47, 0, 0.745, 0.715)"
            >
              Thesis
            </Link>
            <Link 
              href="https://x.com/ascentisVC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[color:var(--dark-gray)] hover:text-black transition-all duration-300 cubic-bezier(0.47, 0, 0.745, 0.715)"
              aria-label="Follow us on X"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            <div className="w-px h-4 bg-[color:var(--border)]" />
            <Link href="/contact" className="btn-primary">
              Submit Deck
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-white md:hidden"
          style={{ top: scrolled ? '60px' : '72px' }}
        >
          <nav className="flex flex-col items-center justify-center h-full gap-8 px-8">
            <Link 
              href="/portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium text-black hover:opacity-70 transition-opacity"
            >
              Portfolio
            </Link>
            <Link 
              href="/thesis" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium text-black hover:opacity-70 transition-opacity"
            >
              Thesis
            </Link>
            <Link 
              href="https://x.com/ascentisVC" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium text-black hover:opacity-70 transition-opacity flex items-center gap-3"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow on X
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary text-lg px-8 py-3 mt-4"
            >
              Submit Deck
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

