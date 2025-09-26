'use client';

import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Extend R3F with post-processing passes
extend({ EffectComposer, RenderPass, UnrealBloomPass });

// Monochromatic palette - black to white with blue tones
const PALETTE_HEX = ['#000000', '#1a1f2e', '#8b9dc3', '#9ca3af', '#ffffff'];

const PARAMS = {
  // Voronoi shattered glass parameters
  zoom: 1.6,
  rotationSpeed: 0.06,
  drift: 0.22,
  edgeWidth: 0.015,
  edgeGlow: 1.7,
  edgeTint: 0.8,
  refraction: 0.014,
  noise: 0.9,
  vignette: 0.45,
  // bloom
  bloomStrength: 0.45,
  bloomRadius: 0.85,
  bloomThreshold: 0.7,
};

// Shattered Glass Voronoi Shader
function ShatteredGlass() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Convert hex palette to THREE.Colors
  const cols = useMemo(() => PALETTE_HEX.map(h => new THREE.Color(h)), []);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2, 2);

    // Pack colors into a fixed-size array (max 6)
    const uCols = new Array(6).fill(0).map((_, i) => cols[i] || new THREE.Color(0x000000));

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080) },
      uCols0: { value: uCols[0] },
      uCols1: { value: uCols[1] },
      uCols2: { value: uCols[2] },
      uCols3: { value: uCols[3] },
      uCols4: { value: uCols[4] },
      uCols5: { value: uCols[5] },
      uColCount: { value: Math.min(cols.length, 6) },
      // style controls
      uZoom: { value: PARAMS.zoom },
      uRotationSpeed: { value: PARAMS.rotationSpeed },
      uDrift: { value: PARAMS.drift },
      uEdgeWidth: { value: PARAMS.edgeWidth },
      uEdgeGlow: { value: PARAMS.edgeGlow },
      uEdgeTint: { value: PARAMS.edgeTint },
      uRefraction: { value: PARAMS.refraction },
      uNoise: { value: PARAMS.noise },
      uVignette: { value: PARAMS.vignette },
      uParallax: { value: new THREE.Vector2(0.0, 0.0) }
    };

    const vertexShader = /* glsl */`
      void main(){ 
        gl_Position = vec4(position, 1.0); 
      }
    `;

    const fragmentShader = /* glsl */`
      precision highp float;

      uniform vec2  uResolution;
      uniform float uTime, uZoom, uRotationSpeed, uDrift;
      uniform float uEdgeWidth, uEdgeGlow, uEdgeTint, uRefraction, uNoise, uVignette;
      uniform vec2  uParallax;

      uniform vec3 uCols0, uCols1, uCols2, uCols3, uCols4, uCols5;
      uniform int  uColCount;

      // ---- utilities ----
      float hash11(float n){ return fract(sin(n) * 43758.5453123); }
      vec2  hash21(float n){
        n = fract(n * 0.1031);
        n *= n + 33.33;
        n *= n + n;
        return fract(vec2(n, n * 1.2154));
      }

      mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

      // Simplex-ish value noise
      float vnoise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        float a = dot(hash21(dot(i, vec2(1.0,57.0))), f - vec2(0.0,0.0));
        float b = dot(hash21(dot(i+vec2(1.0,0.0), vec2(1.0,57.0))), f - vec2(1.0,0.0));
        float c = dot(hash21(dot(i+vec2(0.0,1.0), vec2(1.0,57.0))), f - vec2(0.0,1.0));
        float d = dot(hash21(dot(i+vec2(1.0,1.0), vec2(1.0,57.0))), f - vec2(1.0,1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
      }

      vec3 pickColor(int i){
        int k = int(mod(float(i), float(uColCount)));
        if(k==0) return uCols0;
        if(k==1) return uCols1;
        if(k==2) return uCols2;
        if(k==3) return uCols3;
        if(k==4) return uCols4;
        return uCols5;
      }

      // Voronoi: returns nearest seed data
      struct VRes { float d1; float d2; vec2  g1; float id1; float id2; };
      VRes voronoi(vec2 p){
        vec2 ip = floor(p);
        float d1 = 1e9, d2 = 1e9;
        vec2  g1 = vec2(0.0), g2 = vec2(0.0);
        float id1 = 0.0, id2 = 0.0;

        // 3x3 neighborhood search
        for(int j=-1;j<=1;j++){
          for(int i=-1;i<=1;i++){
            vec2 cell = ip + vec2(float(i), float(j));
            float id = dot(cell, vec2(127.1, 311.7));
            // animated seed offset (drift)
            vec2 rnd = hash21(id);
            float ang = uTime * uDrift + id * 0.5;
            vec2 seed = cell + rnd + 0.35 * vec2(cos(ang), sin(ang));
            vec2 r = seed - p;
            float d = dot(r, r);
            if(d < d1){
              d2 = d1; g2 = g1; id2 = id1;
              d1 = d;  g1 = r;  id1 = id;
            } else if(d < d2){
              d2 = d;  g2 = r;  id2 = id;
            }
          }
        }
        VRes vr; vr.d1 = d1; vr.d2 = d2; vr.g1 = g1; vr.id1 = id1; vr.id2 = id2; return vr;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 p = (uv - 0.5);
        p.x *= uResolution.x / uResolution.y;     // keep aspect
        p += uParallax * 0.08;                    // pointer parallax

        // global slow rotation + zoom
        float ang = uTime * uRotationSpeed;
        p = rot(ang) * p * uZoom;

        // compute Voronoi
        VRes v = voronoi(p);

        // signed-ish distance to nearest border between closest two seeds
        float ed = 0.5 * (sqrt(v.d2) - sqrt(v.d1));
        // crisp edge mask
        float edge = 1.0 - smoothstep(uEdgeWidth, uEdgeWidth*2.2, ed);

        // facet id & neighbor id → color pick and blend
        vec3 ca = pickColor(int(abs(v.id1)));
        vec3 cb = pickColor(int(abs(v.id2)));
        // time-vary hue across facets
        float t = 0.5 + 0.5 * sin(uTime * 0.4 + v.id1);
        vec3 facetCol = mix(ca, cb, t);

        // micro "refraction": sample a warped background gradient
        vec2 norm = normalize(v.g1 + 1e-5);
        vec2 refr = norm * uRefraction;
        // background gradient from palette sweep
        float g = 0.5 + 0.5 * sin(uTime*0.2 + p.x*0.7 + p.y*0.9);
        vec3 gradA = pickColor(0);
        vec3 gradB = pickColor(1);
        vec3 bg = mix(gradA, gradB, g);
        // add a third color softly
        bg = mix(bg, pickColor(2), 0.25 + 0.25 * sin(uTime*0.27));

        // add noise-based chroma for glassy dispersion
        float n = vnoise(p*3.0 + uTime*0.5);
        vec3 refracted = bg + (n * uNoise) * 0.08;

        // combine facet base + refracted bg (as if catching light)
        vec3 base = mix(refracted, facetCol, 0.65);

        // edge glow (fresnel-ish accent)
        float fres = pow(1.0 - abs(dot(norm, vec2(0.0,1.0))), 2.0);
        vec3 edgeTint = mix(cb, vec3(1.0), 0.35);
        vec3 edges = edge * (uEdgeGlow * 0.7) * (edgeTint * (0.6 + 0.4*fres));

        // final color
        vec3 col = base + edges;

        // slight cell interior shading for depth
        float interior = smoothstep(0.0, 0.8, ed);
        col *= (0.95 + 0.05 * interior);

        // vignette
        float r = length((uv - 0.5) * vec2(uResolution.x/uResolution.y, 1.0));
        float vig = smoothstep(0.95, uVignette, r);
        col *= mix(1.0, 0.82, vig);

        // gentle lift
        col = pow(col, vec3(0.96)); // tiny gamma lift

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
      transparent: false,
      dithering: true
    });

    return { geometry: geo, material: mat };
  }, [cols]);

  // Pointer parallax effect
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer(prev => ({
        ...prev,
        targetX: nx,
        targetY: -ny
      }));
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      
      // Update time
      mat.uniforms.uTime.value = clock.getElapsedTime();
      
      // Smooth pointer parallax
      setPointer(prev => {
        const newX = prev.x + (prev.targetX - prev.x) * 0.08;
        const newY = prev.y + (prev.targetY - prev.y) * 0.08;
        mat.uniforms.uParallax.value.set(newX, newY);
        return { ...prev, x: newX, y: newY };
      });
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  );
}

// Post-processing effects component
function PostProcessing() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer>(null);

  useEffect(() => {
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));
    
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      PARAMS.bloomStrength,
      PARAMS.bloomRadius,
      PARAMS.bloomThreshold
    );
    composer.addPass(bloom);
    
    composerRef.current = composer;

    return () => {
      composer.dispose();
    };
  }, [gl, scene, camera, size]);

  useFrame(() => {
    if (composerRef.current) {
      composerRef.current.render();
    }
  }, 1);

  return null;
}

// Main component
export default function SummitBackground() {
  return (
    <>
      {/* Shattered glass Voronoi background */}
      <ShatteredGlass />
      
      {/* Post-processing for bloom effect */}
      <PostProcessing />
    </>
  );
}