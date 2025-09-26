'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function ThesisPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      number: "01",
      title: "The Computational Transformation",
      subtitle: "Convergence of exponential technologies",
      text: "We are in the early stages of a fundamental shift where computation becomes ambient, intelligent and deeply integrated into physical systems.",
      detail: "This transformation spans artificial intelligence, quantum computing, biotechnology, advanced materials and autonomous systems. Unlike previous technology cycles driven by connectivity or mobility, this wave is characterized by the convergence of multiple exponential technologies creating entirely new categories of value creation."
    },
    {
      number: "02", 
      title: "Infrastructure Over Applications",
      subtitle: "Building the foundational layer",
      text: "Our investment philosophy prioritizes infrastructure and platform technologies over consumer applications.",
      detail: "The most enduring value is created by companies that become essential building blocks for entire industries rather than end-user experiences. We focus on developer tools, computational platforms, hardware-software systems and protocol layers that enable thousands of other companies to build upon."
    },
    {
      number: "03",
      title: "Technical Moats and Defensibility", 
      subtitle: "Deep science meets engineering execution",
      text: "In rapidly evolving technology markets, sustainable competitive advantages must be rooted in technical depth rather than market positioning.",
      detail: "We seek companies with proprietary algorithms, unique datasets, specialized hardware capabilities or novel system architectures that create genuine barriers to entry. The strongest moats emerge from the intersection of deep scientific knowledge and engineering execution."
    },
    {
      number: "04",
      title: "Market Timing and Adoption Curves",
      subtitle: "2-5 years before mainstream adoption", 
      text: "Our investment strategy targets technologies that are scientifically proven but commercially nascent.",
      detail: "This timing allows us to partner with exceptional teams during their formative stages while avoiding the valuation premiums that accompany market validation. We look for early signals of product-market fit through enterprise pilot programs and research collaborations."
    },
    {
      number: "05",
      title: "Global Innovation Networks",
      subtitle: "Orchestrating worldwide talent and research",
      text: "Innovation in frontier technologies increasingly occurs through global networks of research institutions, technology companies and entrepreneurial teams.",
      detail: "We maintain deep relationships across European research universities, Silicon Valley technology companies and emerging innovation hubs worldwide. This network provides us with early visibility into breakthrough research and access to exceptional talent."
    },
    {
      number: "06", 
      title: "Capital Efficiency and Scale",
      subtitle: "Sustainable unit economics at scale",
      text: "Modern technology companies can achieve unprecedented scale with relatively modest capital requirements compared to previous industrial cycles.",
      detail: "We focus on businesses that can demonstrate clear paths to profitability and sustainable unit economics, even in capital-intensive sectors like robotics and biotechnology. Our approach emphasizes revenue efficiency and gross margin expansion."
    }
  ];

  // Track scroll progress for section highlighting
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const sectionIndex = Math.floor(latest * sections.length);
      setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress, sections.length]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container-pro text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.span 
              className="text-[color:var(--steel)] text-sm tracking-[0.2em] uppercase font-medium mb-6 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Investment Philosophy
            </motion.span>
            
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              Our
              <br />
              <span className="bg-gradient-to-r from-white via-[color:var(--cloud)] to-white bg-clip-text text-transparent">
                Thesis
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-[color:var(--steel)] max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            >
              We back technical founders building the computational substrate of the next economy. 
              Our conviction stems from pattern recognition across technology cycles and deep domain expertise in frontier computing paradigms.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center text-[color:var(--steel)] text-sm">
            <span className="mb-4 tracking-wider">SCROLL TO EXPLORE</span>
            <motion.div 
              className="w-px h-12 bg-gradient-to-b from-[color:var(--cloud)] to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Thesis Sections */}
      {sections.map((section, index) => (
        <section key={index} className="min-h-screen flex items-center relative">
          <div className="container-pro">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Left Column - Number & Progress */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  viewport={{ once: true, margin: "-200px" }}
                  className="sticky top-1/2 transform -translate-y-1/2"
                >
                  <div className="text-8xl md:text-9xl font-bold text-white/10 leading-none mb-4">
                    {section.number}
                  </div>
                  
                  {/* Progress dots */}
                  <div className="flex flex-col space-y-2">
                    {sections.map((_, dotIndex) => (
                      <motion.div
                        key={dotIndex}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          dotIndex === index ? 'bg-white' : 'bg-white/20'
                        }`}
                        animate={{
                          scale: dotIndex === index ? 1.2 : 1,
                          opacity: dotIndex === index ? 1 : 0.3
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:col-span-10">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                  viewport={{ once: true, margin: "-200px" }}
                >
                  <motion.span 
                    className="text-[color:var(--steel)] text-sm tracking-[0.15em] uppercase font-medium mb-4 block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {section.subtitle}
                  </motion.span>
                  
                  <motion.h2 
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                    viewport={{ once: true }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  <motion.div 
                    className="w-24 h-px bg-gradient-to-r from-[color:var(--cloud)] to-transparent mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  <motion.p 
                    className="text-2xl md:text-3xl text-white leading-relaxed mb-8 max-w-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {section.text}
                  </motion.p>
                  
                  <motion.p 
                    className="text-lg md:text-xl text-[color:var(--steel)] leading-relaxed max-w-4xl"
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
        </section>
      ))}

      {/* Closing Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container-pro text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to build
              <br />
              <span className="bg-gradient-to-r from-white via-[color:var(--cloud)] to-white bg-clip-text text-transparent">
                the future?
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-[color:var(--steel)] mb-12 max-w-2xl mx-auto"
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
            >
              <a href="/contact" className="btn-primary text-lg px-8 py-4">
                Start the Conversation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
