'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import SummitBackground from '@/components/SummitBackground';

/** Palette */
const BG = '#0B0E14';      // near-black
const WHITE = '#FFFFFF';   // white
const CLOUD = '#E9EEF6';   // bluish light grey

const WORDS = ['AI', 'DePIN', 'Blockchain', 'Robotics', 'Apps', 'Startups', 'Crypto'];
const LOOP = [...WORDS, WORDS[0]]; // seamless loop

export default function HeroSky() {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [lineH, setLineH] = useState(0);
  const [idx, setIdx] = useState(0);
  const [instant, setInstant] = useState(false);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    setLineH(wrapRef.current?.offsetHeight ?? 0);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIdx(i => i + 1), 1000); // every second
    return () => clearInterval(id);
  }, [reduced]);

  // Seamless reset when reaching the duplicate last item
  useEffect(() => {
    if (reduced) return;
    if (idx === LOOP.length - 1) {
      const t = setTimeout(() => {
        setInstant(true);
        setIdx(0);
        requestAnimationFrame(() => setInstant(false));
      }, 520); // slightly longer than the word transition
      return () => clearTimeout(t);
    }
  }, [idx, reduced]);

  const transition = instant ? { duration: 0 } : { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] };

  return (
    <section className="hero-sky" aria-label="Sommet Capital hero">
      {/* Three.js Wireframe Waves Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Canvas 
          orthographic
          camera={{ 
            left: -1, 
            right: 1, 
            top: 1, 
            bottom: -1, 
            near: 0, 
            far: 1,
            position: [0, 0, 0]
          }} 
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            powerPreference: 'high-performance',
            alpha: false,
            depth: false,
            stencil: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1
          }}
          style={{ width: '100%', height: '100%' }}
          resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
        >
          <SummitBackground />
        </Canvas>
      </div>

      {/* Centered content */}
      <div className="hero-sky__inner relative z-10">
        <motion.h1
          className="hero-sky__title"
          initial={reduced ? false : { opacity: 0, y: '18vh' }}
          animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="hero-sky__lead">Backing frontier builders in </span>

          {/* Defile window */}
          <span ref={wrapRef} className="hero-sky__window" aria-hidden={false}>
            <motion.div
              className="hero-sky__column"
              animate={{ y: reduced ? 0 : -idx * lineH }}
              transition={transition}
            >
              {LOOP.map((w, i) => (
                <div key={`${w}-${i}`} className="hero-sky__row">
                  {/* Main word */}
                  <span className="hero-sky__word">{w}</span>
                  {/* Faint trailing glow clones */}
                  {!reduced && (
                    <>
                      <span className="hero-sky__trail hero-sky__trail--1">{w}</span>
                      <span className="hero-sky__trail hero-sky__trail--2">{w}</span>
                    </>
                  )}
                </div>
              ))}
            </motion.div>
          </span>
        </motion.h1>

        <motion.p
          className="hero-sky__sub"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Early to Series A. Europe and beyond. We partner with founders to reach new summits.
        </motion.p>

        <motion.div
          className="hero-sky__ctas"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <a href="/contact" className="btn-primary">Submit your deck</a>
          <a href="/portfolio" className="btn-secondary">View portfolio</a>
        </motion.div>
      </div>
    </section>
  );
}

/** Subtle rising stars in the background */
function RisingStars({ muted }: { muted: boolean }) {
  const stars = useMemo(() => {
    const n = 42;
    const arr = Array.from({ length: n }, (_, i) => {
      const left = Math.random() * 100;         // vw
      const size = Math.random() * 1.8 + 0.6;   // px
      const delay = Math.random() * 6;          // s
      const dur = 8 + Math.random() * 10;       // s
      const opacity = 0.08 + Math.random() * 0.12;
      return { id: i, left, size, delay, dur, opacity };
    });
    return arr;
  }, []);

  return (
    <div className="hero-sky__stars" aria-hidden="true">
      {!muted &&
        stars.map(s => (
          <span
            key={s.id}
            className="hero-sky__star"
            style={{
              left: `${s.left}vw`,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
    </div>
  );
}
