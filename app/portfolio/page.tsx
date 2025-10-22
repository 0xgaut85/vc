'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const startups = [
  { 
    name: "RICE AI", 
    desc: "Decentralized AI foundry powered by Rice Robotics. Solving AI robotics data scarcity with a reward system for robotics data sharing on DePIN.", 
    logo: "/portfolio/RiceAi.jpg",
    sector: "AI + DePIN"
  },
  { 
    name: "Hyperion", 
    desc: "Fully on-chain hybrid Orderbook-AMM DEX built natively for Aptos.", 
    logo: "/portfolio/Hyperion.jpg",
    sector: "Blockchain"
  },
  { 
    name: "RAA Vision", 
    desc: "Decentralized network powered by X social-emotional signals and AI feedback.", 
    logo: "/portfolio/RaaVision.jpg",
    sector: "AI + Social"
  },
  { 
    name: "Sahara", 
    desc: "Decentralized AI network that unlocks fair and universal access to global knowledge capital.", 
    logo: "/portfolio/sahara.png",
    sector: "AI + Blockchain"
  },
  { 
    name: "Glacier Network", 
    desc: "L2 rollup network empowering dApps to build on other dApps with programmable data composability solutions.", 
    logo: "/portfolio/Glacier.jpg",
    sector: "Blockchain"
  },
  { 
    name: "Pin AI", 
    desc: "The Open Platform for Personal AI. Built on open source AI, leveraging crypto for data ownership and privacy.", 
    logo: "/portfolio/PinAi.jpg",
    sector: "AI + Crypto"
  },
  { 
    name: "Nolimit", 
    desc: "A privacy-first AI ecosystem. Redefining what AI can and should be.", 
    logo: "/portfolio/nolimit.jpg",
    sector: "AI"
  },
  { 
    name: "Limitless", 
    desc: "Prediction market platform on Base enabling trading of crypto, politics, sports and more.", 
    logo: "/portfolio/limitless.jpg",
    sector: "DeFi"
  },
  { 
    name: "GAIB", 
    desc: "Economic layer transforming AI infrastructure investment by turning GPU-backed assets into yield-generating opportunities.", 
    logo: "/portfolio/GAIB.jpg",
    sector: "AI + DeFi"
  },
  { 
    name: "Theoriq AI", 
    desc: "Building scalable, censorship-resistant protocol for machine learning and complex data-driven computation for Web3.", 
    logo: "/portfolio/Theoriq.jpg",
    sector: "AI + Web3"
  },
  { 
    name: "Synnax", 
    desc: "AI Credit Intelligence with smart, privacy-focused credit analysis using encryption, blockchain and decentralized AI.", 
    logo: "/portfolio/Synnax.jpg",
    sector: "AI + FinTech"
  },
  { 
    name: "RayLS", 
    desc: "The blockchain for banks. Bringing $100 trillion and 6 billion bank customers onchain.", 
    logo: "/portfolio/RayLS.png",
    sector: "Blockchain"
  },
  { 
    name: "Loyal", 
    desc: "Private onchain intelligence infra.", 
    logo: "/portfolio/Loyal.jpg",
    sector: "AI + Blockchain"
  },
  { 
    name: "Momentum", 
    desc: "Building a global financial OS for the tokenized future.", 
    logo: "/portfolio/Momentum.jpg",
    sector: "DeFi"
  },
  { 
    name: "AVICI", 
    desc: "Neobank - Invest, spend, earn trust, go fully onchain for your banking needs.", 
    logo: "/portfolio/Avici.jpg",
    sector: "DeFi"
  },
  {
    name: "Ondo Finance",
    desc: "Institutional-grade financial products and services powered by blockchain. Tokenizing real-world assets with $1.6B+ TVL.",
    logo: "/portfolio/ondo.jpg",
    sector: "DeFi"
  },
  {
    name: "Ta-da",
    desc: "AI data marketplace centered on gamified Web3 application model. Raised $3.5M in 2025.",
    logo: "/portfolio/Ta da.jpg",
    sector: "AI + Web3"
  },
  {
    name: "Inference Labs",
    desc: "Web3 AI startup making artificial intelligence more accessible with decentralized and privacy-centric technologies.",
    logo: "/portfolio/Inference Labs.jpg",
    sector: "AI + Infrastructure"
  },
  {
    name: "PublicAI",
    desc: "Decentralized AI training network using blockchain to generate high-quality training data at scale.",
    logo: "/portfolio/Public AI.jpg",
    sector: "AI + Blockchain"
  },
  {
    name: "AIT Protocol",
    desc: "AI data infrastructure built on blockchain for data annotation and AI model training. Backed by Animoca Brands.",
    logo: "/portfolio/Ait Protocol.jpg",
    sector: "AI + Blockchain"
  },
  {
    name: "Fetch.ai",
    desc: "Open-access decentralized platform leveraging AI to create autonomous software agents. Raised $40M from top-tier VCs.",
    logo: "/portfolio/FetchAI.png",
    sector: "AI + Blockchain"
  },
  {
    name: "Plasma",
    desc: "Redefining how money moves. Stablecoin infrastructure for a new global financial system.",
    logo: "/portfolio/Plasma.jpg",
    sector: "DeFi"
  },
  {
    name: "Credia",
    desc: "AI research terminal for Web3. Real-time data, token insights, and narrative scans—just ask.",
    logo: "/portfolio/Credia.jpg",
    sector: "AI + Web3"
  },
  {
    name: "Falcon",
    desc: "The first universal collateralization infrastructure powering onchain liquidity and yield.",
    logo: "/portfolio/Falcon.png",
    sector: "DeFi"
  },
  {
    name: "Scroll",
    desc: "The secure and performant network for the Open Economy.",
    logo: "/portfolio/Scroll.jpg",
    sector: "Blockchain"
  },
  {
    name: "AltLayer",
    desc: "Accelerate Web3 with our restaked rollups & verifiable agents.",
    logo: "/portfolio/AltLayer.jpg",
    sector: "Infrastructure"
  },
  {
    name: "Nomina",
    desc: "Power tools for onchain markets. Building the first unified trading platform.",
    logo: "/portfolio/Nomina.jpg",
    sector: "DeFi"
  },
  {
    name: "Tabi",
    desc: "The World's First Decentralized Network for Consumer Finance",
    logo: "/portfolio/Tabi.jpg",
    sector: "DeFi"
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container-pro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-wider text-[color:var(--dark-gray)] mb-6">Portfolio</p>
            <h1 className="hero-title mb-6">
              Building the Computational Future
            </h1>
            <p className="body-large">
              We back technical teams with short time-to-demo and credible unit economics. 
              Our portfolio spans decentralized AI, blockchain infrastructure, robotics, and developer tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Responsive Portfolio Grid */}
      <section className="pb-32 pt-24">
        <div className="container-pro">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
            {startups.map((startup, index) => (
              <PortfolioCard 
                key={startup.name}
                startup={startup}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 bg-[#F4F2EF]">
        <div className="container-pro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16 px-8 rounded-2xl"
          >
            <h2 className="section-title mb-6">Want to Join Our Portfolio?</h2>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              We're always looking for exceptional technical founders building the next generation of computational infrastructure.
            </p>
            <a href="/contact" className="btn-primary">
              Submit Your Deck
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function PortfolioCard({ startup, index }: { startup: typeof startups[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: (index % 8) * 0.08,
        ease: [0.2, 0.8, 0.2, 1]
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="group flex flex-col"
    >
      {/* Logo Container */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-xl overflow-hidden bg-white border border-black/5 group-hover:border-black/15 transition-all duration-500 group-hover:shadow-xl">
        <Image
          src={startup.logo}
          alt={`${startup.name} logo`}
          fill
          className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Company Name */}
      <h3 className="text-base sm:text-lg font-semibold mb-2 tracking-tight group-hover:text-black/70 transition-colors">
        {startup.name}
      </h3>

      {/* Sector Tag */}
      <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[color:var(--dark-gray)] mb-3 font-medium">
        {startup.sector}
      </p>

      {/* Description */}
      <p className="text-xs sm:text-sm leading-relaxed text-[color:var(--dark-gray)]">
        {startup.desc}
      </p>
    </motion.div>
  );
}
