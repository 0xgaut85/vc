'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const portfolioCompanies = [
  { name: 'RICE AI', logo: '/portfolio/RiceAi.jpg' },
  { name: 'Hyperion', logo: '/portfolio/Hyperion.jpg' },
  { name: 'Sahara', logo: '/portfolio/sahara.png' },
  { name: 'Glacier', logo: '/portfolio/Glacier.jpg' },
  { name: 'Pin AI', logo: '/portfolio/PinAi.jpg' },
  { name: 'Limitless', logo: '/portfolio/limitless.jpg' },
  { name: 'GAIB', logo: '/portfolio/GAIB.jpg' },
  { name: 'Theoriq', logo: '/portfolio/Theoriq.jpg' },
  { name: 'Synnax', logo: '/portfolio/Synnax.jpg' },
  { name: 'RayLS', logo: '/portfolio/RayLS.png' },
  { name: 'Loyal', logo: '/portfolio/Loyal.jpg' },
  { name: 'Momentum', logo: '/portfolio/Momentum.jpg' },
  { name: 'AVICI', logo: '/portfolio/Avici.jpg' },
  { name: 'RAA Vision', logo: '/portfolio/RaaVision.jpg' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section with Illustration */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="container-pro relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="hero-title">
                Building the Computational Substrate of the Next Economy
              </h1>
              <p className="body-large">
                Sommet Capital is a leading venture capital fund that provides long-term capital and strategic partnerships to visionary technical founders in AI, blockchain, robotics, and deep tech.
              </p>
            </motion.div>

            {/* Right Side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full h-[1000px] lg:h-[1400px]"
            >
              <Image
                src="/illustration1.jpg"
                alt="Computational Infrastructure"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Invest */}
      <section>
        <div className="container-pro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="section-title">How We Invest</h2>
            <div className="max-w-4xl space-y-6">
              <p className="body-large">
                We actively invest in the boldest and most pioneering technical founders building the computational infrastructure of tomorrow.
              </p>
              <p className="body-text">
                By leveraging our deep technical expertise and network of portfolio companies, we help founders transform their groundbreaking ideas into category-defining companies. We focus on early to Series A stage investments with check sizes ranging from $500K to $5M.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Companies - Logo Marquee - Mirana beige background */}
      <section className="bg-[#F4F2EF]">
        <div className="container-pro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="section-title">These Are Some of The Companies We Work With:</h2>
            <p className="body-text mb-12 max-w-3xl">
              We have invested in companies as early as Pre-Seed up to Series A with a ticket size ranging from $500K to $5M. We provide our portfolio founders with solid and reliable support from the beginning of their journey.
            </p>
          </motion.div>

          {/* Infinite Scrolling Logo Marquee */}
          <div className="logo-marquee">
            <div className="logo-marquee-group">
              {portfolioCompanies.map((company, idx) => (
                <div key={`first-${idx}`} className="logo-item">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={140}
                    height={140}
                  />
                </div>
              ))}
            </div>
            <div className="logo-marquee-group" aria-hidden="true">
              {portfolioCompanies.map((company, idx) => (
                <div key={`second-${idx}`} className="logo-item">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={140}
                    height={140}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section>
        <div className="container-pro">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="section-title mb-12">
                What Sommet Capital Provides For Our Portfolio Companies:
              </h2>

              <div className="space-y-8">
                <div className="support-item">
                  <h3>Operations Support:</h3>
                  <p>Advisory on legal, tax, fundraising, and hiring.</p>
                </div>

                <div className="support-item">
                  <h3>Growth Support:</h3>
                  <p>Assistance in community building, distribution, and go-to-market efforts, with a focus on scaling globally.</p>
                </div>

                <div className="support-item">
                  <h3>Technical Support:</h3>
                  <p>Guidance on architecture, security, infrastructure scaling, and best practices.</p>
                </div>

                <div className="support-item">
                  <h3>Network Connections:</h3>
                  <p>Synergies across Sommet's extensive investment portfolio and strategic partners in the ecosystem.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full h-[600px] lg:h-[800px]"
            >
              <Image
                src="/illustration2.png?v=2"
                alt="Portfolio Support"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="bg-[#F4F2EF]">
        <div className="container-pro">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full h-[600px] lg:h-[800px]"
            >
              <Image
                src="/illustration3.png"
                alt="Thesis and Vision"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Right Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="section-title mb-8">Thesis and Vision</h2>
              <h3 className="text-4xl md:text-5xl font-semibold mb-12 leading-tight">
                We believe in a computational and decentralized future.
              </h3>
              <p className="body-large">
                Our investment approach prioritizes technical depth, fundamental growth, category-defining projects, and managing the associated risks of frontier technology with prudence.
              </p>
              <div className="mt-12">
                <Link href="/thesis" className="btn-secondary">
                  Read Our Full Thesis
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research & Insights - Mirana-inspired */}
      <section>
        <div className="container-pro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex justify-between items-end mb-12">
              <h2 className="section-title mb-0">Research and Insights</h2>
              <Link href="/thesis" className="text-sm text-[color:var(--dark-gray)] hover:text-black transition-colors">
                Explore more articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href="/thesis">
                  <div className="bg-[#F4F2EF] rounded-2xl p-8 h-full border border-black/5 hover:border-black/10 transition-all duration-300 hover:transform hover:scale-[1.02]">
                    <p className="text-xs text-[color:var(--dark-gray)] mb-4 uppercase tracking-wider">Oct 2025</p>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/90 transition-colors">
                      The Future of Computational Infrastructure
                    </h3>
                    <p className="body-text">
                      Exploring how the next generation of AI and blockchain infrastructure will reshape the economy. Our thesis on investing in the computational substrate layer.
                    </p>
                  </div>
                </Link>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href="/thesis">
                  <div className="bg-[#F4F2EF] rounded-2xl p-8 h-full border border-black/5 hover:border-black/10 transition-all duration-300 hover:transform hover:scale-[1.02]">
                    <p className="text-xs text-[color:var(--dark-gray)] mb-4 uppercase tracking-wider">Sep 2025</p>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/90 transition-colors">
                      Decentralization Meets Intelligence
                    </h3>
                    <p className="body-text">
                      Why the convergence of AI and decentralized systems represents the most significant technological shift of our generation.
                    </p>
                  </div>
                </Link>
              </motion.article>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="container-pro text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="section-title mb-8">Building Something Exceptional?</h2>
            <p className="body-large mb-12">
              We want to hear from you. Submit your deck and let's start a conversation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-primary">
                Submit Your Deck
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
