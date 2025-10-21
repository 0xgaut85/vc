'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function ThesisPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sections = [
    {
      number: "01",
      title: "The Decentralized Future",
      subtitle: "Building open, computational infrastructure",
      text: "We believe the future of global finance and computation will be decentralized, transparent, and built on open protocols.",
      detail: "The transition from centralized intermediaries to open, permissionless systems represents the most significant shift in economic infrastructure since the internet. We invest in teams building the foundational protocols, infrastructure layers, and applications that will power this decentralized economy."
    },
    {
      number: "02", 
      title: "Infrastructure First",
      subtitle: "The picks and shovels of Web3",
      text: "Our investment philosophy prioritizes infrastructure over applications—the foundational layers that enable the entire ecosystem.",
      detail: "We focus on blockchain protocols, developer tooling, data availability layers, interoperability solutions, and computational infrastructure. These are the critical building blocks that thousands of applications will be built upon, creating lasting value and defensible network effects."
    },
    {
      number: "03",
      title: "Technical Depth and Innovation", 
      subtitle: "Breakthrough technology, not incremental improvements",
      text: "We seek category-defining projects with genuine technical innovation and strong fundamentals.",
      detail: "Our portfolio companies are pushing the boundaries of cryptography, consensus mechanisms, zero-knowledge proofs, decentralized compute, and verifiable systems. We prioritize teams with deep technical expertise who are solving hard problems that matter, not chasing trends."
    },
    {
      number: "04",
      title: "AI Meets Blockchain",
      subtitle: "The convergence of two transformative technologies", 
      text: "We're particularly excited about the intersection of artificial intelligence and blockchain infrastructure.",
      detail: "Decentralized AI networks, verifiable inference, on-chain model training, and AI-powered protocols represent massive opportunities. These technologies solve fundamental challenges around data ownership, model transparency, and democratized access to compute resources."
    },
    {
      number: "05",
      title: "Global Network and Support",
      subtitle: "More than just capital",
      text: "We provide comprehensive support across operations, growth, technical architecture, and strategic connections.",
      detail: "Our portfolio companies benefit from advisory on legal structures, tokenomics, fundraising, and talent acquisition. We facilitate introductions to strategic partners, exchanges, infrastructure providers, and other portfolio companies. We're deeply embedded in the ecosystem and leverage our network to accelerate portfolio success."
    },
    {
      number: "06", 
      title: "Long-Term Value Creation",
      subtitle: "Patient capital for fundamental growth",
      text: "We take a long-term approach, focusing on sustainable growth and fundamental value creation rather than short-term speculation.",
      detail: "We support our portfolio companies through multiple cycles, helping them build resilient businesses with strong unit economics. We evaluate opportunities based on technical merit, team quality, market opportunity, and the potential to become essential infrastructure for the decentralized economy."
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F4F2EF]/50 to-white" />
        
        <div className="container-pro text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.p 
              className="text-sm uppercase tracking-wider text-[color:var(--dark-gray)] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Investment Philosophy
            </motion.p>
            
            <motion.h1 
              className="hero-title max-w-5xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              Our Thesis
            </motion.h1>
            
            <motion.p 
              className="body-large max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            >
              We invest in technical founders building the computational and decentralized infrastructure of the future economy. 
              Our conviction is built on deep technical expertise, pattern recognition across crypto cycles, and a commitment to backing category-defining projects.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center text-[color:var(--dark-gray)] text-xs">
            <span className="mb-4 tracking-wider text-sm uppercase">SCROLL TO EXPLORE</span>
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-black/50 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Thesis Sections - Editorial Layout */}
      {sections.map((section, index) => (
        <section key={index} className="relative py-24 lg:py-32">
          <div className="container-pro">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              
              {/* Left Column - Number */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  viewport={{ once: true, margin: "-200px" }}
                  className="lg:sticky lg:top-32"
                >
                  <div className="text-8xl lg:text-9xl font-bold text-black/5 leading-none tracking-tighter">
                    {section.number}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:col-span-10">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                  viewport={{ once: true, margin: "-150px" }}
                  className="space-y-8"
                >
                  {/* Eyebrow */}
                  <motion.p 
                    className="text-sm uppercase tracking-wider text-[color:var(--dark-gray)] mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {section.subtitle}
                  </motion.p>
                  
                  {/* Title */}
                  <motion.h2 
                    className="text-4xl lg:text-5xl font-semibold mb-8 leading-tight max-w-3xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                    viewport={{ once: true }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  {/* Divider */}
                  <motion.div 
                    className="w-24 h-px bg-gradient-to-r from-black/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  {/* Main Text */}
                  <motion.p 
                    className="text-xl lg:text-2xl text-black leading-relaxed max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {section.text}
                  </motion.p>
                  
                  {/* Detail Text */}
                  <motion.p 
                    className="body-large max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {section.detail}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Subtle Divider */}
          {index < sections.length - 1 && (
            <motion.div 
              className="container-pro mt-24 lg:mt-32"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="divider-subtle" />
            </motion.div>
          )}
        </section>
      ))}

      {/* Closing CTA Section */}
      <section className="relative py-32 overflow-hidden bg-[#F4F2EF]">
        <div className="container-pro text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 
              className="section-title mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Build the Future?
            </motion.h2>
            
            <motion.p 
              className="body-large mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              We partner with exceptional founders at the intersection of deep technology and market opportunity.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/contact" className="btn-primary">
                Start the Conversation
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
