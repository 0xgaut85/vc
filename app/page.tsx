'use client';
import dynamic from 'next/dynamic';

const HeroSky = dynamic(() => import('@/components/HeroSky'), { ssr: false });

export default function Home() {
  return <HeroSky />;
}