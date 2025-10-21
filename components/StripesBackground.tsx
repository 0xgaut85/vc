'use client';

import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

export default function StripesBackground() {
  return (
    <>
      <color attach="background" args={[0x0a0a0a]} />
      <fog attach="fog" args={[0x0a0a0a, 10, 28]} />

      <ambientLight intensity={0.04} />
      <MovingLights />

      <group rotation={[0.08, -0.3, -0.6]} position={[0, -0.6, 0]}>
        <Stripes count={60} />
      </group>

      <Environment preset="studio" />
    </>
  );
}

function Stripes({ count = 60 }) {
  const group = useRef();

  // Premium dark material with subtle metallic sheen
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0a0a'),
      metalness: 0.98,
      roughness: 0.15,
      emissive: new THREE.Color('#000000'),
      envMapIntensity: 1.5,
    });
    return mat;
  }, []);

  // Extremely slow, smooth rotation for premium feel
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      // Very subtle, smooth sinusoidal motion
      group.current.rotation.y = Math.sin(t * 0.05) * 0.12;
      group.current.rotation.x = Math.cos(t * 0.04) * 0.08;
      group.current.position.y = Math.sin(t * 0.03) * 0.1;
    }
  });

  // Thin ribbon made from a TubeGeometry along a slightly curved path
  const Strip = ({ i }) => {
    const mesh = useRef();

    const { geom, pos } = useMemo(() => {
      const width = 0.03; // thickness of each line
      const length = 30;
      const z = (i - count / 2) * 0.09;

      const points = [];
      const steps = 40;
      for (let s = 0; s <= steps; s++) {
        const t = (s / steps) * 2 - 1; // -1..1 along X
        const x = t * (length / 2);
        // A very gentle S-curve; varies with index so the bundle forms a smooth wave
        const y = Math.sin(t * 0.9 + i * 0.035) * 0.45 + Math.sin(t * 0.35 + i * 0.07) * 0.12;
        points.push(new THREE.Vector3(x, y, 0));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const geom = new THREE.TubeGeometry(curve, 200, width, 8, false);
      return { geom, pos: [0, 0, z] };
    }, [i]);

    // Ultra-subtle shimmer for premium feel
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      if (mesh.current) {
        // Very minimal variation for smooth, premium appearance
        mesh.current.material.metalness = 0.96 + Math.sin(t * 0.08 + i * 0.15) * 0.02;
        mesh.current.material.roughness = 0.14 + Math.cos(t * 0.06 + i * 0.1) * 0.01;
      }
    });

    return (
      <mesh ref={mesh} position={pos} geometry={geom} material={material} castShadow receiveShadow />
    );
  };

  return (
    <group ref={group}>
      {new Array(count).fill().map((_, i) => (
        <Strip key={i} i={i} />
      ))}
    </group>
  );
}

function MovingLights() {
  const key1 = useRef();
  const key2 = useRef();
  const rim = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Ultra-slow, elegant light motion
    if (key1.current) {
      key1.current.position.set(
        Math.cos(t * 0.06) * 7,
        4.0 + Math.sin(t * 0.04) * 0.2,
        6 + Math.sin(t * 0.035) * 0.8
      );
    }
    if (key2.current) {
      key2.current.position.set(
        -Math.cos(t * 0.045) * 8,
        3.0 + Math.cos(t * 0.03) * 0.15,
        5.5 + Math.cos(t * 0.025) * 0.6
      );
    }
    if (rim.current) {
      rim.current.position.set(
        0.0 + Math.sin(t * 0.035) * 0.3,
        5.5,
        -4.0
      );
    }
  });

  return (
    <>
      <pointLight ref={key1} intensity={1.2} distance={32} decay={1.5} color="#ffffff" />
      <pointLight ref={key2} intensity={0.7} distance={28} decay={1.5} color="#ffffff" />
      <directionalLight ref={rim} intensity={0.4} castShadow position={[0, 5.5, -4]} />
    </>
  );
}

