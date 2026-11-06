"use client";

import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/components/ui/ServicesGrid";
import { SaturnPlanet } from "./SaturnPlanet";

interface SpatialContentNodesProps {
  scrollProgress: number; // 0.0 to 1.0
}

const SPATIAL_SERVICES = [
  {
    ...SERVICES_DATA[0], // Digital Marketing
    tag: "01 // MARKETING",
    pos: [-16, 5.0, -100] as [number, number, number],
  },
  {
    ...SERVICES_DATA[1], // Web & Mobile Development
    tag: "02 // DEV",
    pos: [0, 4.5, -110] as [number, number, number],
  },
  {
    ...SERVICES_DATA[2], // AI/ML Services
    tag: "03 // AI & ML",
    pos: [16, 5.0, -100] as [number, number, number],
  },
  {
    ...SERVICES_DATA[3], // Desktop Development
    tag: "04 // SOFTWARE",
    pos: [-18, 0, -125] as [number, number, number],
  },
  {
    ...SERVICES_DATA[4], // Graphic Designing
    tag: "05 // DESIGN",
    pos: [0, -0.5, -130] as [number, number, number],
  },
  {
    ...SERVICES_DATA[5], // AI Agents Development
    tag: "06 // AGENTS",
    pos: [18, 0, -125] as [number, number, number],
  },
  {
    ...SERVICES_DATA[6], // Cyber Security
    tag: "07 // SECURITY",
    pos: [-16, -5.5, -140] as [number, number, number],
  },
  {
    ...SERVICES_DATA[7], // IT Infrastructures
    tag: "08 // INFRA",
    pos: [0, -5.5, -145] as [number, number, number],
  },
  {
    ...SERVICES_DATA[8], // Cloud Applications
    tag: "09 // CLOUD",
    pos: [16, -5.5, -140] as [number, number, number],
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

// Helper component for 3D spatial service cards with explicit React hover state tracking
function SpatialServiceCard({ feat }: { feat: (typeof SPATIAL_SERVICES)[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden border border-neutral-800/90 bg-gradient-to-b from-neutral-900/95 to-black/95 transition-all duration-300 hover:scale-105 hover:border-[#b5f200]/70 hover:shadow-[0_0_25px_rgba(181,242,0,0.35)] aspect-[4/3] flex flex-col items-center justify-center p-2 cursor-pointer backdrop-blur-sm"
    >
      {/* Visual Illustration */}
      <div className="absolute inset-0 z-0">
        {feat.renderVisual()}
      </div>

      {/* Spatial Tag Pill (Default State) */}
      <span
        className={`absolute top-2 left-3 z-10 text-[9px] font-mono uppercase tracking-widest text-[#b5f200] bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#b5f200]/30 shadow-md transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        {feat.tag}
      </span>

      {/* Dark glass center title pill badge matching 1st image */}
      <div
        className={`relative z-10 px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 shadow-xl max-w-[90%] text-center transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
          {feat.title}
        </h3>
      </div>

      {/* Hover State: Exact detailed description overlay matching user reference images */}
      <div
        className={`absolute inset-0 z-20 transition-all duration-300 bg-black/92 backdrop-blur-md p-3 flex flex-col items-center justify-between border-2 border-white/25 rounded-2xl shadow-2xl ${
          isHovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Top Row: Ps Icon & Yellow Title */}
        <div className="w-full flex flex-col items-center relative">
          <span className="absolute top-0 left-0 w-5 h-5 rounded bg-[#0081d6] flex items-center justify-center font-bold text-[10px] text-white shadow-md border border-white/30">
            Ps
          </span>
          <h3 className="text-yellow-400 font-bold text-sm text-center leading-tight tracking-tight px-5 pt-0.5">
            {feat.title}
          </h3>
        </div>

        {/* Description Body */}
        <p className="text-white text-[11px] font-normal leading-snug text-center px-1 py-1 flex-1 flex items-center justify-center">
          {feat.description}
        </p>

        {/* Bottom White Arrow */}
        <div className="w-full flex items-center justify-center pt-0.5 text-white">
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
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

  // Dynamic 3D Orbital Calculation around Saturn Planet at Z = -125
  const normScroll = Math.max(0, Math.min(1, (scrollProgress - 0.16) / (0.58 - 0.16)));
  const orbitAngleOffset = normScroll * Math.PI * 2.2;

  const SATURN_CENTER_Z = -125;
  const RADIUS_X = 17.5;
  const RADIUS_Y = 8.5;
  const RADIUS_Z = 12.5;
  const TILT_ANGLE = Math.PI / 6;

  const dynamicSpatialServices = SERVICES_DATA.map((service, idx) => {
    const baseAngle = (idx / SERVICES_DATA.length) * Math.PI * 2;
    const angle = baseAngle + orbitAngleOffset;

    // 3D Orbital math around Saturn
    const x = Math.cos(angle) * RADIUS_X;
    const y = Math.sin(angle) * RADIUS_Y * Math.cos(TILT_ANGLE);
    const z = SATURN_CENTER_Z + Math.sin(angle) * RADIUS_Z;

    return {
      ...service,
      tag: `0${idx + 1} // SERVICE`,
      pos: [x, y, z] as [number, number, number],
    };
  });

  return (
    <group>
      {/* ─── NODE 1: HERO SPATIAL COMPOSITION (Z = -15) ────────────────── */}
      {heroOpacity > 0.01 && (
        <group position={[0, 0, -15]}>
          <Html
            transform
            distanceFactor={11}
            position={[0, 0, 0]}
            className="pointer-events-auto select-none w-[900px] max-w-[90vw] text-center transition-opacity duration-300"
            style={{ opacity: heroOpacity }}
          >
            <div className="w-full flex flex-col items-center justify-center text-center p-4 mx-auto">
              {/* Main Hero Title with Quotes & Green Star */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-center max-w-4xl">
                “Revolutionize{" "}
                <span className="inline-flex items-center justify-center align-middle mx-1 text-[#b5f200] transform hover:rotate-45 transition-transform duration-300">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0L14.59 8.41L23 9.59L16.29 15.29L18.41 24L12 19.59L5.59 24L7.71 15.29L1 9.59L9.41 8.41L12 0Z" />
                  </svg>
                </span>
                <br />
                Business with AI
                <br />
                Automation”
              </h1>

              {/* Paragraph Subtitle */}
              <p className="text-neutral-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mb-8 text-center mx-auto">
                Transform how you work with cutting-edge AI and automation solutions designed to streamline processes, enhance productivity, and accelerate growth.
              </p>

              {/* CTA Button with dark circular call icon badge */}
              <div className="relative flex flex-col items-center justify-center gap-4 text-center">
                <button
                  onClick={() => {
                    const el = document.getElementById("terminal");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#b5f200] hover:bg-[#c7ff1a] text-black font-bold text-base sm:text-lg transition-all duration-300 shadow-[0_0_30px_rgba(181,242,0,0.35)] hover:scale-105 active:scale-95 cursor-pointer group"
                >
                  <span>Book a free consultation</span>
                  <span className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                    <Phone className="w-4 h-4 text-white" />
                  </span>
                </button>

                {/* Curvy Lime Green Arrow pointing down */}
                <div className="mt-2 text-[#b5f200] opacity-90">
                  <svg className="w-32 h-16" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 10 C 50 65, 110 65, 138 35"
                      stroke="#b5f200"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M122 34 L 140 35 L 135 52"
                      stroke="#b5f200"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* ─── NODE 2: SATURN PLANET & REVOLVING SERVICES UNIVERSE (Z = -125) ─── */}
      {techOpacity > 0.01 && (
        <group>
          {/* 3D Saturn Planet with Multi-Band Glowing Rings */}
          <SaturnPlanet position={[0, 0, SATURN_CENTER_Z]} scale={7.5} opacity={techOpacity} />

          {/* Floating Header at Z = -85 */}
          <Html
            transform
            distanceFactor={14}
            position={[0, 9.5, -85]}
            style={{ opacity: techOpacity }}
            className="transition-opacity duration-300 pointer-events-auto select-none"
          >
            <div className="text-center w-[750px] max-w-[90vw] mx-auto">
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#b5f200] font-semibold">
                02 // OUR CORE SERVICES
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3 drop-shadow-[0_0_25px_rgba(181,242,0,0.4)]">
                <span>We provide effective design solutions</span>
                <span className="inline-flex items-center text-[#b5f200]">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0L14.59 8.41L23 9.59L16.29 15.29L18.41 24L12 19.59L5.59 24L7.71 15.29L1 9.59L9.41 8.41L12 0Z" />
                  </svg>
                </span>
              </h2>
            </div>
          </Html>

          {/* 9 Service Cards Orbiting around Saturn as User Scrolls */}
          {dynamicSpatialServices.map((feat) => (
            <group key={feat.id} position={feat.pos}>
              <Html
                transform
                distanceFactor={13.5}
                className="pointer-events-auto select-none w-[320px] transition-opacity duration-300"
                style={{ opacity: techOpacity }}
              >
                <SpatialServiceCard feat={feat} />
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
