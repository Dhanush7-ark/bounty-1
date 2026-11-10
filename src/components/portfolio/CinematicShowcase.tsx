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
  aspect: "landscape" | "laptop" | "monitor" | "mobile";
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
    aspect: "landscape",
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
    aspect: "laptop",
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
    aspect: "monitor",
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
    aspect: "mobile",
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
    aspect: "mobile",
  },
  {
    id: "neura-core",
    name: "NEURA-CORE",
    category: "SPATIAL INTELLIGENCE",
    year: "2025",
    description:
      "An autonomous neural interface platform with holographic volumetric data trees, real-time quantum telemetry, and fluid glass shaders.",
    image: "/projects/neura-core.svg",
    accentColor: "#00F0FF",
    ambientGlow: "rgba(0, 240, 255, 0.45)",
    secondaryGlow: "rgba(14, 165, 233, 0.25)",
    aspect: "laptop",
  },
  {
    id: "aether-kinetics",
    name: "AETHER-KINETICS",
    category: "KINETIC ARCHITECTURE",
    year: "2025",
    description:
      "A precision automotive design atelier exploring aerodynamic carbon chassis, dynamic light ribbons, and computational fluid modeling.",
    image: "/projects/aether-kinetics.svg",
    accentColor: "#F43F5E",
    ambientGlow: "rgba(244, 63, 94, 0.45)",
    secondaryGlow: "rgba(225, 29, 72, 0.25)",
    aspect: "monitor",
  },
  {
    id: "solaris-audio",
    name: "SOLARIS-AUDIO",
    category: "SPATIAL ACOUSTICS",
    year: "2025",
    description:
      "Next-generation sonic visualizer featuring real-time frequency waveforms, lossless analog warmth, and immersive tactile soundstage controls.",
    image: "/projects/solaris-audio.svg",
    accentColor: "#C6FF36",
    ambientGlow: "rgba(198, 255, 54, 0.42)",
    secondaryGlow: "rgba(132, 204, 22, 0.22)",
    aspect: "landscape",
  },
  {
    id: "vortex-studios",
    name: "VORTEX-STUDIOS",
    category: "METAVERSE CINEMATICS",
    year: "2025",
    description:
      "A global creative direction studio crafting cinematic CG brand identities, photorealistic environments, and experiential digital campaigns.",
    image: "/projects/vortex-studios.svg",
    accentColor: "#D946EF",
    ambientGlow: "rgba(217, 70, 239, 0.45)",
    secondaryGlow: "rgba(168, 85, 247, 0.26)",
    aspect: "laptop",
  },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export function CinematicShowcase(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  
  // Track active project index for UI indicators
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
    const scrollFraction = index < 9 ? (index * 0.91) / 9 + 0.05 : 0.96;
    const targetY = containerRef.current.offsetTop + totalScroll * scrollFraction;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      // MASTER SCROLL TIMELINE (36.6s total normalized duration for all 9 cards + final statement)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          anticipatePin: 1,
          scrub: 1.5, // Weighted smooth scrubbing with physical momentum
          onUpdate: (self) => {
            const p = self.progress;
            setOverallProgress(p);

            // Phase tracking for bottom UI indicators
            const totalProjects = SHOWCASE_PROJECTS.length; // 9
            const stepRatio = 0.91 / totalProjects;
            
            if (p < 0.91) {
              setIsFinalPhase(false);
              const idx = Math.min(totalProjects - 1, Math.max(0, Math.floor(p / stepRatio)));
              setActiveProjectIndex(idx);
            } else {
              setIsFinalPhase(true);
              setActiveProjectIndex(totalProjects - 1);
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

      // Shared smooth inOut easing curve
      const easeInOut = "power2.inOut";
      const easeRevealOut = "power3.out";

      // ─── INITIAL POSITIONS AT t = 0 ───
      // Project 0 is at center stage
      gsap.set(fg[0], { y: "0vh", scale: 1.0, opacity: 1, zIndex: 20 });
      gsap.set(bg[0], { opacity: 0.45, scale: 1.25 });
      gsap.set(amb[0], { opacity: 1 });
      gsap.set(titleWrap[0], { opacity: 1 });
      gsap.set(descWrap[0], { opacity: 1 });
      gsap.set(titleLines[0], { y: "0%", opacity: 1 });
      gsap.set(descLines[0], { y: "0%", opacity: 1 });

      // Project 1 is queued at bottom center as preview card (sitting right above telemetry bar)
      gsap.set(fg[1], { y: "38vh", scale: 0.28, opacity: 0.95, zIndex: 10 });
      gsap.set(bg[1], { opacity: 0 });
      gsap.set(amb[1], { opacity: 0 });
      gsap.set(titleWrap[1], { opacity: 0 });
      gsap.set(descWrap[1], { opacity: 0 });

      // Projects 2..8 are queued beneath the viewport
      for (let i = 2; i < fg.length; i++) {
        gsap.set(fg[i], { y: "65vh", scale: 0.22, opacity: 0, zIndex: 1 });
        gsap.set(bg[i], { opacity: 0 });
        gsap.set(amb[i], { opacity: 0 });
        gsap.set(titleWrap[i], { opacity: 0 });
        gsap.set(descWrap[i], { opacity: 0 });
      }

      /* ─────────────────────────────────────────────────────────────
         DYNAMIC TIMELINE FOR ALL 9 CARDS WITH IDENTICAL SMOOTH PACING
         Each phase: 2.6s hold, 1.2s smooth ease-in-and-out transition
         ───────────────────────────────────────────────────────────── */
      const numCards = SHOWCASE_PROJECTS.length; // 9
      const stepDuration = 3.8; // 3.8s per project
      const holdDuration = 2.6; // 2.6s active hold per project
      const transitionDuration = 1.2; // 1.2s ease in & out

      for (let i = 0; i < numCards - 1; i++) {
        const startHold = i * stepDuration;
        const endHold = startHold + holdDuration;
        const endTransition = startHold + stepDuration;

        // 1. Current card i floats gently at center stage during active hold
        masterTl.to(fg[i], { scale: 1.02, y: "-1vh", duration: holdDuration, ease: "none" }, startHold);
        masterTl.to(bg[i], { scale: 1.30, duration: holdDuration, ease: "none" }, startHold);

        // 2. Next card i+1 holds steady as preview card at the bottom
        masterTl.to(fg[i + 1], { y: "38vh", scale: 0.28, opacity: 0.95, duration: holdDuration, ease: "none" }, startHold);

        // 3. Current card i EXITS UPWARD out of the viewport
        masterTl.to(fg[i], { y: "-75vh", opacity: 0, scale: 0.92, duration: transitionDuration, ease: easeInOut }, endHold);
        masterTl.to(bg[i], { opacity: 0, scale: 1.45, filter: "blur(50px)", duration: transitionDuration, ease: easeInOut }, endHold);
        masterTl.to(amb[i], { opacity: 0, duration: transitionDuration, ease: easeInOut }, endHold);

        // Text i rolls UP & OUT through mask
        masterTl.to(titleLines[i], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, endHold);
        masterTl.to(descLines[i], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, endHold);
        masterTl.set([titleWrap[i], descWrap[i]], { opacity: 0 }, endTransition);

        // 4. Next card i+1 TRAVELS UP FROM BOTTOM PREVIEW INTO CENTER STAGE
        masterTl.to(fg[i + 1], { y: "0vh", scale: 1.0, opacity: 1, zIndex: 20, duration: transitionDuration, ease: easeInOut }, endHold);
        masterTl.fromTo(bg[i + 1],
          { scale: 1.05, opacity: 0, filter: "blur(14px)" },
          { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: transitionDuration, ease: easeInOut },
          endHold
        );
        masterTl.fromTo(amb[i + 1], { opacity: 0 }, { opacity: 1, duration: transitionDuration, ease: easeInOut }, endHold);

        // Special accent light beam for Amron (project index 2)
        if (i === 1 && orangeBeam) {
          masterTl.fromTo(orangeBeam,
            { opacity: 0, scaleY: 0.5 },
            { opacity: 0.85, scaleY: 1, duration: 1.0, ease: easeInOut },
            endHold + 0.1
          );
        } else if (i === 2 && orangeBeam) {
          masterTl.to(orangeBeam, { opacity: 0, duration: 0.8, ease: easeInOut }, endHold);
        }

        // 5. Following card i+2 SLIDES UP INTO THE BOTTOM PREVIEW SLOT from below
        if (i + 2 < numCards) {
          masterTl.fromTo(fg[i + 2],
            { y: "65vh", scale: 0.22, opacity: 0, zIndex: 10 },
            { y: "38vh", scale: 0.28, opacity: 0.95, duration: 1.0, ease: easeInOut },
            endHold + 0.2
          );
        }

        // 6. Text i+1 rolls IN from DOWN to UP
        masterTl.set([titleWrap[i + 1], descWrap[i + 1]], { opacity: 1 }, endHold + 0.2);
        masterTl.fromTo(titleLines[i + 1],
          { y: "130%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
          endHold + 0.3
        );
        masterTl.fromTo(descLines[i + 1],
          { y: "130%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
          endHold + 0.4
        );
      }

      /* ─────────────────────────────────────────────────────────────
         PHASE 09: LAST CARD (Vortex-Studios, index 8)
         ───────────────────────────────────────────────────────────── */
      const lastIndex = numCards - 1; // 8
      const lastCardStart = lastIndex * stepDuration; // 30.4s
      const lastCardHoldEnd = lastCardStart + 3.2; // 33.6s (generous 3.2s hold)

      masterTl.to(fg[lastIndex], { scale: 1.02, y: "-1vh", duration: 3.2, ease: "none" }, lastCardStart);
      masterTl.to(bg[lastIndex], { scale: 1.30, duration: 3.2, ease: "none" }, lastCardStart);

      /* ─────────────────────────────────────────────────────────────
         PHASE 10: FINAL STATEMENT (33.6s – 36.6s)
         ───────────────────────────────────────────────────────────── */
      // Last card slides upward smoothly to upper-middle; side text rolls out
      masterTl.to(fg[lastIndex], { y: "-18vh", scale: 0.65, opacity: 0.55, duration: 1.0, ease: easeInOut }, lastCardHoldEnd);
      masterTl.to(bg[lastIndex], { opacity: 0.08, filter: "blur(55px)", duration: 1.0, ease: easeInOut }, lastCardHoldEnd);
      masterTl.to(amb[lastIndex], { opacity: 0.12, duration: 1.0, ease: easeInOut }, lastCardHoldEnd);
      masterTl.to(titleLines[lastIndex], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, lastCardHoldEnd);
      masterTl.to(descLines[lastIndex], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, lastCardHoldEnd);
      masterTl.set([titleWrap[lastIndex], descWrap[lastIndex]], { opacity: 0 }, lastCardHoldEnd + 1.2);

      // Final Statement reveals in Bodoni Red with words stagger
      if (statementSection && statementWords.length > 0) {
        masterTl.fromTo(statementSection, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 
          lastCardHoldEnd + 0.6
        );
        masterTl.fromTo(
          statementWords,
          { opacity: 0, y: 28, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.055, duration: 1.0, ease: easeInOut },
          lastCardHoldEnd + 0.7
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
        // 1800vh scroll track gives identical slow, relaxed scroll pacing for all 9 cards + final statement
        height: "1800vh",
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

        {/* ─── FOREGROUND PRESENTATION IMAGES (Stage Center & Bottom Preview) ─── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {SHOWCASE_PROJECTS.map((proj, idx) => {
            const maxWidthStyle =
              proj.aspect === "mobile"
                ? "max-w-[320px] sm:max-w-[360px] md:max-w-[400px]"
                : "max-w-[580px] sm:max-w-[640px] md:max-w-[700px] lg:max-w-[760px]";

            return (
              <div
                key={`fg-${proj.id}`}
                className={`project-fg-${idx} absolute w-full ${maxWidthStyle} px-4 flex items-center justify-center will-change-transform`}
                style={{
                  transformOrigin: "center center",
                }}
              >
                <div
                  onClick={() => {
                    // Clicking on a card will navigate to it if it's currently queued as bottom preview
                    if (activeProjectIndex !== idx) {
                      scrollToProject(idx);
                    }
                  }}
                  className="relative w-full rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] ring-1 ring-white/15 bg-black/40 backdrop-blur-sm cursor-pointer pointer-events-auto transition-transform hover:scale-[1.01]"
                >
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-auto object-contain block select-none pointer-events-auto"
                    draggable={false}
                  />
                  {/* Glass rim highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                </div>
              </div>
            );
          })}
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

