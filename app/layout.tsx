import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display, Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: "ascentis.capital",
  description: "Early to Series A venture capital firm backing technical founders building the computational substrate of the next economy.",
  keywords: "venture capital, VC, early stage, Series A, technical founders, AI, blockchain, robotics, deep tech",
  authors: [{ name: "Ascentis Capital" }],
  creator: "Ascentis Capital",
  publisher: "Ascentis Capital",
  metadataBase: new URL('https://ascentis.capital'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ascentis.capital",
    description: "Early to Series A venture capital firm backing technical founders building the computational substrate of the next economy.",
    url: 'https://ascentis.capital',
    siteName: 'ascentis.capital',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Ascentis Capital Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ascentis.capital",
    description: "Early to Series A venture capital firm backing technical founders building the computational substrate of the next economy.",
    site: '@ascentiscapital',
    creator: '@ascentiscapital',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-white text-black antialiased ${playfair.variable} ${inter.variable}`}>
        <Navigation />
        <main className="pt-24">{children}</main>
        
        <footer className="relative mt-32 overflow-hidden">
          <div className="divider" />
          <div className="container-pro py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              {/* Brand */}
              <div className="lg:col-span-2">
                <Link href="/" className="flex items-center gap-3 mb-6">
                  <Image src="/logo.png" width={40} height={40} alt="ascentis.capital" className="rounded-lg" />
                  <span className="font-inter font-semibold text-lg tracking-tight">ascentis.capital</span>
                </Link>
                <p className="text-[color:var(--dark-gray)] text-sm leading-relaxed max-w-sm">
                  Early to Series A venture capital firm backing technical founders building the computational substrate of the next economy.
                </p>
              </div>
              
              {/* Links */}
              <div>
                <h3 className="text-sm font-semibold mb-4 tracking-tight">Explore</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/portfolio" className="text-sm text-[color:var(--dark-gray)] hover:text-black transition-colors duration-200">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/thesis" className="text-sm text-[color:var(--dark-gray)] hover:text-black transition-colors duration-200">
                      Thesis
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-[color:var(--dark-gray)] hover:text-black transition-colors duration-200">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Social */}
              <div>
                <h3 className="text-sm font-semibold mb-4 tracking-tight">Connect</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="https://x.com/ascentiscapital" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[color:var(--dark-gray)] hover:text-black transition-colors duration-200">
                      X / Twitter
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="divider mb-8" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[color:var(--dark-gray)]">
              <p>© {new Date().getFullYear()} Ascentis Capital. All rights reserved.</p>
              <p className="hidden md:block">Guiding visionary founders to the peak of their potential.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
