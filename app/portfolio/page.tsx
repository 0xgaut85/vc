'use client';

import { Metadata } from "next";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const startups = [
  { 
    name: "RICE AI", 
    desc: "Decentralized AI foundry powered by Rice Robotics. Solving AI robotics data scarcity with a reward system for robotics data sharing on DePIN.", 
    logo: "/portfolio/RiceAi.jpg"
  },
  { 
    name: "Hyperion", 
    desc: "Fully on-chain hybrid Orderbook-AMM DEX built natively for Aptos.", 
    logo: "/portfolio/Hyperion.jpg"
  },
  { 
    name: "RAA Vision", 
    desc: "Decentralized network powered by X social-emotional signals and AI feedback.", 
    logo: "/portfolio/RaaVision.jpg"
  },
  { 
    name: "Sahara", 
    desc: "Decentralized AI network that unlocks fair and universal access to global knowledge capital.", 
    logo: "/portfolio/sahara.png"
  },
  { 
    name: "Glacier Network", 
    desc: "L2 rollup network empowering dApps to build on other dApps with programmable data composability solutions.", 
    logo: "/portfolio/Glacier.jpg"
  },
  { 
    name: "Pin AI", 
    desc: "The Open Platform for Personal AI. Built on open source AI, leveraging crypto for data ownership and privacy.", 
    logo: "/portfolio/PinAi.jpg"
  },
  { 
    name: "Limitless", 
    desc: "Prediction market platform on Base enabling trading of crypto, politics, sports and more.", 
    logo: "/portfolio/limitless.jpg"
  },
  { 
    name: "GAIB", 
    desc: "Economic layer transforming AI infrastructure investment by turning GPU-backed assets into yield-generating opportunities.", 
    logo: "/portfolio/GAIB.jpg"
  },
  { 
    name: "Theoriq AI", 
    desc: "Building scalable, censorship-resistant protocol for machine learning and complex data-driven computation for Web3.", 
    logo: "/portfolio/Theoriq.jpg"
  },
  { 
    name: "Synnax", 
    desc: "AI Credit Intelligence with smart, privacy-focused credit analysis using encryption, blockchain and decentralized AI.", 
    logo: "/portfolio/Synnax.jpg"
  },
  { 
    name: "PitlaneOps", 
    desc: "The operating layer that turns robot intent into trusted action.", 
    logo: "/portfolio/PitlaneOps.jpg"
  },
];

export default function PortfolioPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return (prevIndex + 1) % startups.length;
      } else {
        return (prevIndex - 1 + startups.length) % startups.length;
      }
    });
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 400 : -400,
        opacity: 0,
        scale: 0.8,
        rotateZ: direction > 0 ? 15 : -15,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateZ: 0,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 400 : -400,
        opacity: 0,
        scale: 0.8,
        rotateZ: direction < 0 ? 15 : -15,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="container-pro py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-center mb-16"
      >
        <h1 className="heading-xl font-playfair">Portfolio</h1>
        <p className="body-lg font-inter mt-6 text-[color:var(--steel)] max-w-3xl mx-auto">
          We back technical teams with short time-to-demo and credible unit economics.
        </p>
      </motion.div>

      {/* Card Container */}
      <div className="relative h-[600px] max-w-md mx-auto">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 35 },
              opacity: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
              scale: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
              rotateZ: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] },
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div className="w-full h-full bg-[color:var(--ink)] border border-[color:var(--cloud)] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              {/* Logo Section */}
              <motion.div 
                className="flex-[3] flex items-end justify-center bg-gradient-to-b from-white/8 to-white/3 p-2 pb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.div 
                  className="w-56 h-56 rounded-2xl overflow-hidden bg-white/15 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <Image
                    src={startups[currentIndex].logo}
                    alt={`${startups[currentIndex].name} logo`}
                    width={224}
                    height={224}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Content Section */}
              <motion.div 
                className="flex-[2] p-6 pt-2 flex flex-col justify-start text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Title */}
                <motion.h3 
                  className="text-3xl font-playfair font-bold text-white mb-4 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {startups[currentIndex].name}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  className="text-[color:var(--cloud)] leading-relaxed text-lg font-inter font-medium px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {startups[currentIndex].desc}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Navigation Controls */}
      <motion.div 
        className="flex justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full border border-[color:var(--cloud)] bg-transparent text-white hover:bg-[color:var(--cloud)] hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full border border-[color:var(--cloud)] bg-transparent text-white hover:bg-[color:var(--cloud)] hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center"
        >
          →
        </button>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div 
        className="flex justify-center gap-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {startups.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-[color:var(--cloud)] bg-opacity-30'
            }`}
          />
        ))}
      </motion.div>

      {/* Swipe Hint */}
      <motion.p
        className="text-center text-sm font-inter text-[color:var(--steel)] mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Swipe or use arrows to explore our portfolio
      </motion.p>
    </div>
  );
}
