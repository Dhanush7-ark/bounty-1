"use client";

import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import Image from "next/image";

interface SpatialContentNodesProps {
  scrollProgress: number; // 0.0 to 1.0
}

const TECH_FEATURES = [
  {
    title: "React Three Fiber & Drei",
    description: "Isolated 3D canvas pipeline, responsive DPR scaling, instanced particles, and custom lighting.",
    tag: "3D Engine",
    pos: [-11, 5, -115] as [number, number, number],
  },
  {
    title: "GSAP & ScrollTrigger",
    description: "Cinematic timeline animations, scroll-driven camera transforms, and coordinated scene updates.",
    tag: "Animations",
    pos: [11, 5, -115] as [number, number, number],
  },
  {
    title: "Lenis Smooth Scroll",
    description: "Hardware-accelerated inertia scroll synchronized with GSAP ticker loop and zero scroll-jacking.",
    tag: "Scroll Engine",
    pos: [-12, -0.5, -132] as [number, number, number],
  },
  {
    title: "Strict TypeScript",
    description: "Fully typed 3D scene props, camera spline paths, performance tiers, and zero implicit any.",
    tag: "Quality",
    pos: [12, -0.5, -132] as [number, number, number],
  },
  {
    title: "Performance & Resilience",
    description: "Automatic mobile DPR capping, resource disposal patterns, and WebGL error boundary fallbacks.",
    tag: "Performance",
    pos: [-11, -6, -148] as [number, number, number],
  },
  {
    title: "Tailwind CSS & Spatial UI",
    description: "Decoupled HTML UI components kept completely separate from Three.js render cycles.",
    tag: "Styling",
    pos: [11, -6, -148] as [number, number, number],
  },
];

// Helper to compute smooth fade-in / fade-out opacity based on progress window
function calcNodeOpacity(
  progress: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
): number {
  if (progress < fadeInStart || progress > fadeOutEnd) return 0;
  if (progress >= fadeInEnd && progress <= fadeOutStart) return 1;

  if (progress >= fadeInStart && progress < fadeInEnd) {
    return (progress - fadeInStart) / (fadeInEnd - fadeInStart);
  }

  if (progress > fadeOutStart && progress <= fadeOutEnd) {
    return 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
  }

  return 0;
}

export function SpatialContentNodes({ scrollProgress }: SpatialContentNodesProps) {
  const coreMeshRef = useRef<Mesh>(null);
  const [coreHovered, setCoreHovered] = useState(false);

  // Rotate core 3D object in space
  useFrame((state, delta) => {
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.x += delta * 0.4;
      coreMeshRef.current.rotation.y += delta * 0.6;
      coreMeshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  // Calculate clean isolated opacities for each node phase
  const heroOpacity = calcNodeOpacity(scrollProgress, 0.0, 0.0, 0.12, 0.20);
  const techOpacity = calcNodeOpacity(scrollProgress, 0.16, 0.28, 0.48, 0.58);
  const coreOpacity = calcNodeOpacity(scrollProgress, 0.52, 0.65, 0.78, 0.86);
  const terminalOpacity = calcNodeOpacity(scrollProgress, 0.82, 0.92, 1.0, 1.0);

  return (
    <group>
      {/* ─── NODE 1: HERO SPATIAL COMPOSITION (Z = -15) ────────────────── */}
      {heroOpacity > 0.01 && (
        <group position={[0, 0, -15]}>
          <Html
            transform
            distanceFactor={12}
            position={[0, 0, 0]}
            className="pointer-events-auto select-none w-[850px] text-center transition-opacity duration-300"
            style={{ opacity: heroOpacity }}
          >
            <div className="flex flex-col items-center">
              {/* Logo Showcase */}
              <div className="mb-6 relative flex items-center justify-center px-6 py-3 rounded-2xl border border-[#00FF66]/30 bg-black/80 backdrop-blur-xl shadow-2xl shadow-[#00FF66]/20">
                <Image
                  src="/images/image.png"
                  alt="Bounty Bytes AI Studios"
                  width={260}
                  height={75}
                  className="h-14 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(0,255,102,0.4)]"
                  priority
                />
              </div>

              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#00FF66]/40 bg-[#00FF66]/10 px-5 py-1.5 text-xs font-semibold text-[#00FF66] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
                Bounty Bytes AI Studios • 3D Space Journey
              </div>

              {/* Main Hero Title */}
              <h1 className="mb-6 text-5xl font-black tracking-tight text-white sm:text-7xl uppercase leading-none">
                NEXT-GEN{" "}
                <span className="bg-gradient-to-r from-[#00FF66] via-emerald-300 to-green-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,102,0.3)]">
                  3D AI Interactive
                </span>{" "}
                EXPERIENCES
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl text-base text-neutral-300 sm:text-xl font-light leading-relaxed">
                High-performance 3D spatial platform built with Next.js App Router, TypeScript,
                React Three Fiber, GSAP ScrollTrigger, and Lenis.
              </p>

              {/* Scroll Indicator Arrow */}
              <div className="mt-10 flex flex-col items-center gap-2 text-xs font-mono text-[#00FF66]/70 uppercase tracking-widest animate-bounce">
                <span>Scroll down to fly into space</span>
                <svg className="w-5 h-5 text-[#00FF66]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* ─── NODE 2: TECH STACK UNIVERSE FLOATING TEXT (Z = -105 to -155) ── */}
      {techOpacity > 0.01 && (
        <group>
          {/* Node Heading floating pure in space at Z = -95 */}
          <Html
            transform
            distanceFactor={14}
            position={[0, 8, -95]}
            style={{ opacity: techOpacity }}
            className="transition-opacity duration-300"
          >
            <div className="text-center select-none w-[600px]">
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#00FF66] font-semibold">
                02 // ARCHITECTURE UNIVERSE
              </span>
              <h2 className="mt-2 text-4xl font-black text-white uppercase tracking-tight drop-shadow-[0_0_20px_rgba(0,255,102,0.4)]">
                CONFIGURED SYSTEM MODULES
              </h2>
            </div>
          </Html>

          {TECH_FEATURES.map((feat, idx) => (
            <group key={idx} position={feat.pos}>
              <Html
                transform
                distanceFactor={11}
                className="pointer-events-auto select-none w-[300px] transition-opacity duration-300"
                style={{ opacity: techOpacity }}
              >
                <div className="transition-all duration-300 hover:scale-105">
                  <span className="inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#00FF66] bg-[#00FF66]/10 rounded-full border border-[#00FF66]/30 mb-2">
                    {feat.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white drop-shadow-[0_0_12px_rgba(0,255,102,0.4)] mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {feat.description}
                  </p>
                </div>
              </Html>
            </group>
          ))}
        </group>
      )}

      {/* ─── NODE 3: INTERACTIVE CORE ENGINE FLOATING TEXT (Z = -210) ───── */}
      {coreOpacity > 0.01 && (
        <group position={[0, 0, -210]}>
          {/* 3D Torus Knot Core Mesh */}
          <mesh
            ref={coreMeshRef}
            scale={(coreHovered ? 2.3 : 2.0) * coreOpacity}
            onPointerOver={() => setCoreHovered(true)}
            onPointerOut={() => setCoreHovered(false)}
          >
            <torusKnotGeometry args={[1.2, 0.38, 128, 32]} />
            <meshStandardMaterial
              color={coreHovered ? "#00FF66" : "#052e16"}
              roughness={0.2}
              metalness={0.8}
              emissive="#00FF66"
              emissiveIntensity={(coreHovered ? 0.6 : 0.25) * coreOpacity}
              transparent
              opacity={coreOpacity}
            />
          </mesh>

          {/* Spatial Diagnostic Pure Floating Text */}
          <Html
            transform
            distanceFactor={14}
            position={[0, -5, 0]}
            className="pointer-events-auto select-none w-[650px] text-center transition-opacity duration-300"
            style={{ opacity: coreOpacity }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#00FF66] font-semibold mb-2">
                03 // CORE ENGINE DIAGNOSTICS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight drop-shadow-[0_0_25px_rgba(0,255,102,0.5)] mb-6">
                SYNCHRONIZED WEBGL & GSAP ENGINE
              </h2>
              <div className="flex items-center gap-8 font-mono text-xs">
                <div className="flex flex-col items-center">
                  <span className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1">TICKER FPS</span>
                  <span className="text-[#00FF66] font-bold text-2xl drop-shadow-[0_0_12px_#00FF66]">60 FPS</span>
                </div>
                <div className="h-8 w-px bg-[#00FF66]/30" />
                <div className="flex flex-col items-center">
                  <span className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1">INERTIA SMOOTH</span>
                  <span className="text-[#00FF66] font-bold text-2xl drop-shadow-[0_0_12px_#00FF66]">1.2s LENIS</span>
                </div>
                <div className="h-8 w-px bg-[#00FF66]/30" />
                <div className="flex flex-col items-center">
                  <span className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1">RENDER PIPELINE</span>
                  <span className="text-[#00FF66] font-bold text-2xl drop-shadow-[0_0_12px_#00FF66]">STRICT TS</span>
                </div>
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* ─── NODE 4: FINAL DESTINATION SPACE TERMINAL (Z = -290) ───────── */}
      {terminalOpacity > 0.01 && (
        <group position={[0, 0, -290]}>
          <Html
            transform
            distanceFactor={16}
            position={[0, 0, 0]}
            className="pointer-events-auto select-none w-[680px] text-center transition-opacity duration-300"
            style={{ opacity: terminalOpacity }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#00FF66] font-semibold mb-3">
                04 // DESTINATION REACHED
              </span>

              <Image
                src="/images/image.png"
                alt="Bounty Bytes AI Studios"
                width={220}
                height={65}
                className="h-14 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(0,255,102,0.6)] mb-6"
              />

              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-[0_0_25px_rgba(0,255,102,0.5)] leading-tight">
                READY TO BUILD YOUR 3D UNIVERSE?
              </h2>

              <p className="max-w-md text-sm text-neutral-300 font-light mb-8 leading-relaxed">
                Bounty Bytes AI Studios crafts production-ready 3D web experiences with custom shaders, GSAP scroll pathing, and zero-compromise performance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="px-8 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-black bg-[#00FF66] hover:bg-[#33ff85] transition-all shadow-[0_0_25px_rgba(0,255,102,0.5)] hover:scale-105 cursor-pointer"
                >
                  RETURN TO START [WARP 0%]
                </button>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-[#00FF66] border border-[#00FF66]/60 hover:bg-[#00FF66]/15 transition-all hover:scale-105 cursor-pointer"
                >
                  EXPLORE REPOSITORY
                </a>
              </div>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
