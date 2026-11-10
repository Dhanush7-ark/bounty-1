"use client";

import { useEffect, useRef, useState, useCallback, type JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── PROJECT DATA (9 PROJECTS) ─────────────────────────── */

export interface ShowcaseProject {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  image: string;
  accentColor: string;
  ambientGlow: string;
  secondaryGlow?: string;
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "codenarts",
    name: "CODENARTS",
    category: "CREATIVE COMPUTING",
    year: "2024",
    description:
      "A bold creative agency website featuring futuristic Golden and purple visuals, seamless animations, and Immersive storytelling.",
    image: "/projects/codenarts.svg",
    accentColor: "#A78BFA",
    ambientGlow: "rgba(124, 58, 237, 0.45)",
    secondaryGlow: "rgba(249, 115, 22, 0.28)",
  },
  {
    id: "az-digital",
    name: "AZ-DIGITAL-VENTURES",
    category: "EDITORIAL BRANDING",
    year: "2024",
    description:
      "A high-end venture studio editorial platform featuring amber illumination, luxury typography, and fluid interactive transitions.",
    image: "/projects/az-digital.svg",
    accentColor: "#F97316",
    ambientGlow: "rgba(234, 88, 12, 0.48)",
    secondaryGlow: "rgba(245, 158, 11, 0.22)",
  },
  {
    id: "amron",
    name: "AMRON",
    category: "INDUSTRIAL AESTHETICS",
    year: "2024",
    description:
      "An industrial creative studio interface designed with burnt-orange dynamics, precision layouts, and monolithic architecture.",
    image: "/projects/amron.svg",
    accentColor: "#EF4444",
    ambientGlow: "rgba(220, 38, 38, 0.45)",
    secondaryGlow: "rgba(249, 115, 22, 0.25)",
  },
  {
    id: "chatone",
    name: "CHATONE",
    category: "MOBILE ECOSYSTEM",
    year: "2024",
    description:
      "An encrypted mobile communication ecosystem engineered with deep purple radiance, tactile micro-interactions, and real-time streams.",
    image: "/projects/chatone.svg",
    accentColor: "#C084FC",
    ambientGlow: "rgba(168, 85, 247, 0.45)",
    secondaryGlow: "rgba(147, 51, 234, 0.25)",
  },
  {
    id: "finance",
    name: "FINANCE",
    category: "LIFESTYLE FINTECH",
    year: "2024",
    description:
      "A luxury lifestyle fintech visualizer combining editorial desk environments, warm ambient lighting, and high-frequency asset telemetry.",
    image: "/projects/finance.svg",
    accentColor: "#F59E0B",
    ambientGlow: "rgba(217, 119, 6, 0.42)",
    secondaryGlow: "rgba(16, 185, 129, 0.18)",
  },
  {
    id: "nexus-labs",
    name: "NEXUS LABS",
    category: "SPATIAL AI & BIOMETRICS",
    year: "2024",
    description:
      "Autonomous multi-agent intelligence operating with real-time biometric telemetry, neon emerald radiance, and spatial graph visualization.",
    image: "/projects/nexus.svg",
    accentColor: "#10B981",
    ambientGlow: "rgba(16, 185, 129, 0.45)",
    secondaryGlow: "rgba(6, 182, 212, 0.25)",
  },
  {
    id: "valkyrie",
    name: "VALKYRIE",
    category: "AERODYNAMIC LUXURY",
    year: "2024",
    description:
      "A bespoke hypercar monograph featuring active aero flow dynamics, carbon-composite engineering, and crimson obsidian velocity accents.",
    image: "/projects/valkyrie.svg",
    accentColor: "#EF4444",
    ambientGlow: "rgba(239, 68, 68, 0.45)",
    secondaryGlow: "rgba(249, 115, 22, 0.25)",
  },
  {
    id: "orbital-sound",
    name: "ORBITAL SOUND",
    category: "SPATIAL ACOUSTICS",
    year: "2024",
    description:
      "Object-based binaural soundscapes, spherical harmonic synthesis, and ultra-low-latency spatial rendering with deep violet lighting.",
    image: "/projects/orbital.svg",
    accentColor: "#8B5CF6",
    ambientGlow: "rgba(139, 92, 246, 0.45)",
    secondaryGlow: "rgba(59, 130, 246, 0.25)",
  },
  {
    id: "kinetic-atelier",
    name: "KINETIC ATELIER",
    category: "PARAMETRIC SPATIAL ART",
    year: "2024",
    description:
      "Generative kinetic facades, molten bronze sculptural structures, and real-time solar responsive geometry with warm golden highlights.",
    image: "/projects/kinetic.svg",
    accentColor: "#F59E0B",
    ambientGlow: "rgba(245, 158, 11, 0.48)",
    secondaryGlow: "rgba(217, 119, 6, 0.25)",
  },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export function CinematicPortfolioShowcase(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  
  // Track active project index for UI indicators (0 to 8)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isFinalPhase, setIsFinalPhase] = useState(false);

  // Mouse tilt parallax state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  }, []);

  // Programmatic smooth scroll to any project
  const scrollToProject = (index: number) => {
    if (!containerRef.current) return;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    const fraction = index < SHOWCASE_PROJECTS.length 
      ? (index * 0.90) / SHOWCASE_PROJECTS.length + 0.04 
      : 0.96;
    const targetY = containerRef.current.offsetTop + totalScroll * fraction;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      const numProjects = SHOWCASE_PROJECTS.length; // 9 projects
      const projectSlot = 0.90 / numProjects;

      // MASTER SCROLL TIMELINE (Weighted scrub with physical momentum)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          anticipatePin: 1,
          scrub: 1.5, // Weighted smooth scrubbing with inertia
          onUpdate: (self) => {
            const p = self.progress;
            setOverallProgress(p);

            // Phase tracking for bottom UI indicators
            if (p < 0.90) {
              setIsFinalPhase(false);
              const idx = Math.min(numProjects - 1, Math.max(0, Math.floor(p / projectSlot)));
              setActiveProjectIndex(idx);
            } else {
              setIsFinalPhase(true);
              setActiveProjectIndex(numProjects - 1);
            }
          },
        },
      });

      // Targets
      const fg = SHOWCASE_PROJECTS.map((_, i) => stage.querySelector(`.project-fg-${i}`));
      const bg = SHOWCASE_PROJECTS.map((_, i) => stage.querySelector(`.project-bg-${i}`));
      const amb = SHOWCASE_PROJECTS.map((_, i) => stage.querySelector(`.project-amb-${i}`));
      const titleWrap = SHOWCASE_PROJECTS.map((_, i) => stage.querySelector(`.project-title-${i}`));
      const titleLines = SHOWCASE_PROJECTS.map((_, i) => stage.querySelectorAll(`.project-title-${i} .reveal-line`));
      const descWrap = SHOWCASE_PROJECTS.map((_, i) => stage.querySelector(`.project-desc-${i}`));
      const descLines = SHOWCASE_PROJECTS.map((_, i) => stage.querySelectorAll(`.project-desc-${i} .reveal-line`));

      const orangeBeam = stage.querySelector(".amron-orange-beam");
      const statementSection = stage.querySelector(".final-statement-wrap");
      const statementWords = stage.querySelectorAll(".statement-word");

      const easeInOut = "power2.inOut";
      const easeRevealOut = "power3.out";

      // ─── INITIAL TIMELINE STATES AT t = 0 (Ensures no card is ever stuck) ───
      masterTl.set(fg[0], { y: "0vh", scale: 1.0, opacity: 1, zIndex: 20 }, 0);
      masterTl.set(bg[0], { opacity: 0.45, scale: 1.25, filter: "blur(34px)" }, 0);
      masterTl.set(amb[0], { opacity: 1 }, 0);
      masterTl.set([titleWrap[0], descWrap[0]], { opacity: 1 }, 0);
      masterTl.set([titleLines[0], descLines[0]], { y: "0%", opacity: 1 }, 0);

      // Card 1 queued at bottom preview position (above telemetry bar)
      masterTl.set(fg[1], { y: "38vh", scale: 0.28, opacity: 0.95, zIndex: 10 }, 0);
      masterTl.set([bg[1], amb[1], titleWrap[1], descWrap[1]], { opacity: 0 }, 0);

      // Cards 2..8 queued beneath the viewport
      for (let i = 2; i < numProjects; i++) {
        masterTl.set(fg[i], { y: "65vh", scale: 0.22, opacity: 0, zIndex: 1 }, 0);
        masterTl.set([bg[i], amb[i], titleWrap[i], descWrap[i]], { opacity: 0 }, 0);
      }

      // ─── CHOREOGRAPH 9 UNIFORM CARD TRANSITIONS (EXACT SAME DURATION & ANIMATION) ───
      const holdTime = 2.4;  // Exact same active hold for every card
      const transTime = 1.2; // Exact same transition duration for every card
      const phaseDuration = holdTime + transTime; // 3.6s per card phase

      for (let i = 0; i < numProjects; i++) {
        const start = i * phaseDuration;

        // 1. Uniform Active Hold for Center Card
        masterTl.to(fg[i], { scale: 1.02, y: "-1vh", duration: holdTime, ease: "none" }, start);
        masterTl.to(bg[i], { scale: 1.30, duration: holdTime, ease: "none" }, start);

        // Keep the upcoming card steady in the bottom preview slot during the hold
        if (i + 1 < numProjects) {
          masterTl.to(fg[i + 1], { y: "38vh", scale: 0.28, opacity: 0.95, duration: holdTime, ease: "none" }, start);
        }

        const transStart = start + holdTime;

        if (i < numProjects - 1) {
          // 2. Active Card travels UPWARD and OUT of the screen
          masterTl.fromTo(fg[i], 
            { y: "-1vh", scale: 1.02, opacity: 1 },
            { y: "-75vh", opacity: 0, scale: 0.92, zIndex: 5, duration: transTime, ease: easeInOut },
            transStart
          );
          masterTl.fromTo(bg[i],
            { opacity: 0.45, scale: 1.30 },
            { opacity: 0, scale: 1.45, filter: "blur(50px)", duration: transTime, ease: easeInOut },
            transStart
          );
          masterTl.to(amb[i], { opacity: 0, duration: transTime, ease: easeInOut }, transStart);

          // Current text rolls UP & OUT through mask
          masterTl.to(titleLines[i], { y: "-125%", opacity: 0, duration: 0.8, ease: easeInOut }, transStart);
          masterTl.to(descLines[i], { y: "-125%", opacity: 0, duration: 0.8, ease: easeInOut }, transStart);
          masterTl.set([titleWrap[i], descWrap[i]], { opacity: 0 }, transStart + transTime);

          // Orange light beam exit for Amron (index 2)
          if (i === 2 && orangeBeam) {
            masterTl.to(orangeBeam, { opacity: 0, duration: 0.8, ease: easeInOut }, transStart);
          }

          // 3. NEXT CARD (i + 1) TRAVELS UP FROM BOTTOM PREVIEW INTO DEAD CENTER
          masterTl.fromTo(fg[i + 1],
            { y: "38vh", scale: 0.28, opacity: 0.95 },
            { y: "0vh", scale: 1.0, opacity: 1, zIndex: 20, duration: transTime, ease: easeInOut },
            transStart
          );
          masterTl.fromTo(bg[i + 1],
            { scale: 1.05, opacity: 0, filter: "blur(14px)" },
            { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: transTime, ease: easeInOut },
            transStart
          );
          masterTl.fromTo(amb[i + 1], { opacity: 0 }, { opacity: 1, duration: transTime, ease: easeInOut }, transStart);

          // Orange light beam entrance for Amron (index 2)
          if (i + 1 === 2 && orangeBeam) {
            masterTl.fromTo(orangeBeam,
              { opacity: 0, scaleY: 0.5 },
              { opacity: 0.85, scaleY: 1, duration: transTime, ease: easeInOut },
              transStart
            );
          }

          // 4. FOLLOWING CARD (i + 2) TRAVELS UP FROM BELOW INTO BOTTOM PREVIEW SLOT
          if (i + 2 < numProjects) {
            masterTl.fromTo(fg[i + 2],
              { y: "65vh", scale: 0.22, opacity: 0 },
              { y: "38vh", scale: 0.28, opacity: 0.95, zIndex: 10, duration: 1.0, ease: easeInOut },
              transStart + 0.1
            );
          }

          // 5. NEXT TEXT (i + 1) REVEALS FROM DOWN TO UP
          masterTl.set([titleWrap[i + 1], descWrap[i + 1]], { opacity: 1 }, transStart + 0.1);
          masterTl.fromTo(titleLines[i + 1],
            { y: "130%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.9, stagger: 0.08, ease: easeRevealOut },
            transStart + 0.15
          );
          masterTl.fromTo(descLines[i + 1],
            { y: "130%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.9, stagger: 0.08, ease: easeRevealOut },
            transStart + 0.2
          );
        }
      }

      // ─── PHASE 10: FINAL STATEMENT SECTION ───
      const lastIdx = numProjects - 1;
      const finalStart = lastIdx * phaseDuration + holdTime; // 31.2s

      // Last card (Kinetic) translates smoothly upward
      masterTl.to(fg[lastIdx], { y: "-18vh", scale: 0.65, opacity: 0.55, duration: 1.2, ease: easeInOut }, finalStart);
      masterTl.to(bg[lastIdx], { opacity: 0.08, filter: "blur(55px)", duration: 1.2, ease: easeInOut }, finalStart);
      masterTl.to(amb[lastIdx], { opacity: 0.12, duration: 1.2, ease: easeInOut }, finalStart);
      masterTl.to(titleLines[lastIdx], { y: "-125%", opacity: 0, duration: 0.8, ease: easeInOut }, finalStart);
      masterTl.to(descLines[lastIdx], { y: "-125%", opacity: 0, duration: 0.8, ease: easeInOut }, finalStart);
      masterTl.set([titleWrap[lastIdx], descWrap[lastIdx]], { opacity: 0 }, finalStart + 1.2);

      // Red statement reveal
      if (statementSection && statementWords.length > 0) {
        masterTl.fromTo(statementSection, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 
          finalStart + 0.4
        );
        masterTl.fromTo(
          statementWords,
          { opacity: 0, y: 28, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.045, duration: 1.0, ease: easeInOut },
          finalStart + 0.5
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#050505] text-white selection:bg-[#FF1A00] selection:text-black z-30"
      style={{
        // 1600vh scroll track gives generous, slow, weighted scroll pacing for all 9 cards
        height: "1600vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ─── PINNED FULL-SCREEN STAGE ─── */}
      <div
        ref={pinnedStageRef}
        className="relative h-screen w-full overflow-hidden bg-[#050505] select-none"
      >
        {/* ─── BACKGROUND AMBIENT GLOW SYSTEM ─── */}
        {SHOWCASE_PROJECTS.map((proj, idx) => (
          <div
            key={`amb-${proj.id}`}
            className={`project-amb-${idx} pointer-events-none absolute inset-0 transition-opacity duration-700`}
            style={{
              opacity: idx === 0 ? 1 : 0,
              background: `radial-gradient(ellipse 75% 65% at 50% 45%, ${proj.ambientGlow}, transparent 70%), radial-gradient(circle at 75% 30%, ${proj.secondaryGlow || "transparent"}, transparent 50%)`,
            }}
          />
        ))}

        {/* ─── PHASE 03 VERTICAL ORANGE LIGHT BEAM ─── */}
        <div
          className="amron-orange-beam pointer-events-none absolute left-6 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F97316] to-transparent opacity-0 shadow-[0_0_15px_#F97316]"
        />

        {/* ─── ENLARGED BLURRED BACKGROUND IMAGES (Atmospheric Aura Layer) ─── */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          {SHOWCASE_PROJECTS.map((proj, idx) => (
            <div
              key={`bg-${proj.id}`}
              className={`project-bg-${idx} absolute inset-0 flex items-center justify-center`}
              style={{
                opacity: idx === 0 ? 0.45 : 0,
                transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0)`,
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <img
                src={proj.image}
                alt=""
                className="h-[140%] w-[140%] max-w-none object-contain pointer-events-none"
                style={{
                  filter: "blur(34px)",
                  transform: "scale(1.15)",
                }}
              />
            </div>
          ))}
        </div>

        {/* ─── DARK CINEMATIC GRADIENT MASKS ─── */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/85" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-[#050505]/90" />

        {/* ─── FOREGROUND PRESENTATION IMAGES (Uniform 16:10 Workstation Frame for ALL 9 Cards) ─── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {SHOWCASE_PROJECTS.map((proj, idx) => (
            <div
              key={`fg-${proj.id}`}
              className={`project-fg-${idx} absolute w-full max-w-[620px] sm:max-w-[680px] md:max-w-[740px] lg:max-w-[780px] px-4 flex items-center justify-center will-change-transform`}
              style={{
                transformOrigin: "center center",
              }}
            >
              <div
                onClick={() => {
                  // Clicking on a card navigates to it if it's currently queued as bottom preview
                  if (activeProjectIndex !== idx) {
                    scrollToProject(idx);
                  }
                }}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] ring-1 ring-white/15 bg-black/40 backdrop-blur-sm cursor-pointer pointer-events-auto transition-transform hover:scale-[1.01]"
              >
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover block select-none pointer-events-auto"
                  draggable={false}
                />
                {/* Glass rim highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              </div>
            </div>
          ))}
        </div>

        {/* ─── TOP-LEFT CORNER: ABSTRACT STUDIO GLYPH (Matching Reference) ─── */}
        <div className="absolute top-8 left-8 sm:top-10 sm:left-12 z-40 flex items-center gap-3 select-none pointer-events-none">
          <div className="relative w-4 h-10 flex flex-col justify-between py-1 opacity-80">
            <div className="w-[1.5px] h-3 bg-white mx-auto shadow-[0_0_8px_white]" />
            <div className="w-[2px] h-2 bg-white/70 mx-auto" />
            <div className="w-[1.5px] h-2 bg-white/40 mx-auto" />
          </div>
        </div>

        {/* ─── LEFT SIDE: PROJECT / CLIENT NAME (Large Bold Minimal Text with Explicit Height) ─── */}
        <div className="absolute left-6 sm:left-12 lg:left-20 top-1/2 -translate-y-1/2 z-40 w-[260px] sm:w-[340px] h-[200px] pointer-events-none">
          {SHOWCASE_PROJECTS.map((proj, idx) => (
            <div
              key={`title-${proj.id}`}
              className={`project-title-${idx} absolute inset-0 flex flex-col justify-center will-change-transform`}
              style={{ opacity: idx === 0 ? 1 : 0 }}
            >
              <div className="overflow-hidden py-1">
                <h2 className="reveal-line text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-white uppercase leading-none will-change-transform drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                  {proj.name}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* ─── RIGHT SIDE: EDITORIAL PROJECT DESCRIPTION & CIRCULAR ORBIT INDICATOR (with Explicit Height) ─── */}
        <div className="hidden md:block absolute right-8 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-40 w-[260px] lg:w-[320px] h-[240px] pointer-events-none">
          {SHOWCASE_PROJECTS.map((proj, idx) => (
            <div
              key={`desc-${proj.id}`}
              className={`project-desc-${idx} absolute inset-0 flex flex-col justify-center will-change-transform`}
              style={{ opacity: idx === 0 ? 1 : 0 }}
            >
              {/* Description Paragraph (Masked Reveal) */}
              <div className="overflow-hidden py-1">
                <p className="reveal-line text-xs sm:text-sm font-normal leading-[1.75] tracking-wide text-neutral-300 will-change-transform drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  {proj.description}
                </p>
              </div>

              {/* Circular Orbit Progress Indicator with Italic Index (Matching meermohsin.me) */}
              <div className="overflow-hidden py-1 mt-6">
                <div className="reveal-line flex items-center will-change-transform">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    {/* Sweeping partial circular arc */}
                    <svg className="absolute inset-0 w-full h-full -rotate-45" viewBox="0 0 40 40">
                      <circle
                        cx="20"
                        cy="20"
                        r="17"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="1"
                      />
                      <path
                        d="M 20 3 A 17 17 0 0 1 37 20"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.55)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className="text-lg sm:text-xl font-light text-white/90 italic tracking-wider select-none pl-0.5"
                      style={{ fontFamily: "var(--font-bodoni-72), 'Bodoni MT', 'Didot', Georgia, serif" }}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── PHASE 10: FINAL ENDING SECTION (Red Statement Bottom-Center) ─── */}
        <div
          className="final-statement-wrap pointer-events-none absolute bottom-24 sm:bottom-28 left-0 right-0 z-40 px-6 sm:px-12 flex flex-col items-center justify-center text-center opacity-0"
        >
          <div className="max-w-4xl mx-auto">
            <h1
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#FF1A00] leading-[1.25]"
              style={{
                fontFamily: "var(--font-bodoni-72), 'Bodoni MT', 'Didot', Georgia, serif",
                textShadow: "0 0 30px rgba(255,26,0,0.35)",
              }}
            >
              {[
                "From", "the", "First", "Idea", "to", "the", "Final", "Frame,", "Every", "Step", "is", "Crafted", "to", "Create", "an", "Unforgettable", "Experience."
              ].map((word, wIdx) => (
                <span
                  key={`word-${wIdx}`}
                  className="statement-word inline-block mr-[0.28em] will-change-transform"
                >
                  {word}
                </span>
              ))}
            </h1>
            <p className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 opacity-60">
              DIGITAL ATELIER // BOUNTY BYTES AI STUDIOS
            </p>
          </div>
        </div>

        {/* ─── BOTTOM: HORIZONTAL TELEMETRY BAR (Matching meermohsin.me layout) ─── */}
        <div className="absolute bottom-6 left-0 right-0 z-40 px-8 sm:px-16 flex items-center justify-between font-mono text-[9px] sm:text-[11px] tracking-[0.32em] uppercase text-white/45 select-none pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="text-[#A78BFA] text-xs font-bold shadow-[0_0_10px_#A78BFA]">+</span>
          </div>
          <div className="flex items-center gap-2">
            <span>TENSION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/20 text-xs font-bold">+</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/85 font-semibold tracking-[0.38em]">IMMERSION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/20 text-xs font-bold">+</span>
          </div>
          <div className="flex items-center gap-2">
            <span>IMPACT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#A78BFA] text-xs font-bold shadow-[0_0_10px_#A78BFA]">+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
