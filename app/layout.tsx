import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display, Inter } from 'next/font/google';

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
  title: "summit.capital",
  description: "Early to Series A venture capital firm backing technical founders building the computational substrate of the next economy.",
  keywords: "venture capital, VC, early stage, Series A, technical founders, AI, blockchain, robotics, deep tech",
  authors: [{ name: "Sommet Capital" }],
  creator: "Sommet Capital",
  publisher: "Sommet Capital",
  metadataBase: new URL('https://summit.capital'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "summit.capital",
    description: "Early to Series A venture capital firm backing technical founders building the computational substrate of the next economy.",
    url: 'https://summit.capital',
    siteName: 'summit.capital',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Sommet Capital Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "summit.capital",
    description: "Early to Series A venture capital firm backing technical founders building the computational substrate of the next economy.",
    site: '@sommetcapital',
    creator: '@sommetcapital',
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
      <body className={`min-h-screen bg-black text-white antialiased ${playfair.variable} ${inter.variable}`}>
        <header className="sticky top-0 z-50 backdrop-blur border-b border-[color:var(--cloud)] bg-black/80">
          <div className="container-pro flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80">
              <Image src="/logo.png" width={36} height={36} alt="sommet.capital" className="rounded-lg" />
              <span className="font-playfair font-semibold">sommet.capital</span>
            </Link>
            <nav className="flex items-center gap-8 text-sm">
              <Link href="/portfolio" className="transition-colors duration-300 hover:text-[color:var(--cloud)]">Portfolio</Link>
              <Link href="/thesis" className="transition-colors duration-300 hover:text-[color:var(--cloud)]">Thesis</Link>
              <Link 
                href="https://x.com/sommetcapital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[color:var(--cloud)]"
                aria-label="Follow us on X"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link href="/contact" className="btn-secondary">Contact</Link>
              <Link href="/contact" className="btn-primary">Submit Your Deck</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-[color:var(--cloud)] mt-24">
          <div className="container-pro py-12 text-sm text-[color:var(--steel)] flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Sommet Capital</p>
            <p>Backing founders to reach new summits</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
