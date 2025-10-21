'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        scrolled ? 'border-black/10 py-3' : 'border-transparent py-5'
      }`}
    >
      <div className="container-pro flex items-center justify-between">
        <Link 
          href="/" 
          className={`flex items-center gap-3 transition-all duration-300 hover:opacity-80 ${
            scrolled ? 'scale-90' : 'scale-100'
          }`}
        >
          <Image 
            src="/logo.png" 
            width={scrolled ? 32 : 36} 
            height={scrolled ? 32 : 36} 
            alt="sommet.capital" 
            className="rounded-lg transition-all duration-300" 
          />
          <span className={`font-inter font-semibold tracking-tight transition-all duration-300 text-black ${
            scrolled ? 'text-sm' : 'text-base'
          }`}>
            sommet.capital
          </span>
        </Link>
        
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
            href="https://x.com/sommetcapital" 
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
      </div>
    </header>
  );
}

