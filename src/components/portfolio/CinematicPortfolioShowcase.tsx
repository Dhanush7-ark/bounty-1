"use client";

import { useEffect, useRef, useState, useCallback, type JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── PROJECT DATA ─────────────────────────── */

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
      "A premium technology-themed visual with purple lighting and warm orange reflections. Designed as an immersive workstation experience exploring spatial computing and neural aesthetics.",
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
      "Central laptop presentation with bold editorial typography. Warm orange background with dark brown shadows, cinematic layered zoom, and deep luxury identity systems.",
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
      "Desktop studio mockup featuring dark red and burnt-orange visual dynamics. Accompanied by soft vertical orange light reflections and monolithic geometric form study.",
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
      "Purple and black mobile application presentation. High-contrast smartphone mockup featuring dynamic encrypted conversation streams and soft purple atmospheric lighting.",
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
      "Warm photographic environment featuring a smartphone within a curated desk lifestyle scene. Warm amber, natural leather textures, coffee tones, and high-frequency asset visualizers.",
    image: "/projects/finance.svg",
    accentColor: "#F59E0B",
    ambientGlow: "rgba(217, 119, 6, 0.42)",
    secondaryGlow: "rgba(16, 185, 129, 0.18)",
    aspect: "mobile",
  },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export function CinematicPortfolioShowcase(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  
  // Track active project index for UI
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

  // Programmatic scroll to project
  const scrollToProject = (index: number) => {
    if (!containerRef.current) return;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    const fraction = index / (SHOWCASE_PROJECTS.length + 0.5);
    const targetY = containerRef.current.offsetTop + totalScroll * fraction;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const handleNextClick = () => {
    const nextIndex = (activeProjectIndex + 1) % (SHOWCASE_PROJECTS.length + 1);
    scrollToProject(nextIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      // MASTER SCROLL TIMELINE (12.2s total duration matching the Master Prompt timeline)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          anticipatePin: 1,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            setOverallProgress(p);

            // Phase tracking:
            // 0.00 - 0.18 => Codenarts (0)
            // 0.18 - 0.36 => AZ-Digital (1)
            // 0.36 - 0.54 => Amron (2)
            // 0.54 - 0.72 => ChatOne (3)
            // 0.72 - 0.86 => Finance (4)
            // 0.86 - 1.00 => Final Statement (5)
            const numProjects = SHOWCASE_PROJECTS.length;
            const projectDuration = 0.84 / numProjects;
            
            if (p < 0.84) {
              setIsFinalPhase(false);
              const idx = Math.min(numProjects - 1, Math.max(0, Math.floor(p / projectDuration)));
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
      const orangeBeam = stage.querySelector(".amron-orange-beam");
      const statementSection = stage.querySelector(".final-statement-wrap");
      const statementWords = stage.querySelectorAll(".statement-word");

      /* ─── PHASE 01: CODENARTS (0.0s – 2.5s) ─── */
      // Initial state: Codenarts fg=1, bg=0.45
      // 0.0s -> 2.0s: Slow zoom + floating movement
      masterTl.to(fg[0], { scale: 1.05, y: -15, duration: 2.0, ease: "none" }, 0);
      masterTl.to(bg[0], { scale: 1.35, opacity: 0.5, filter: "blur(40px)", duration: 2.0, ease: "none" }, 0);

      // 2.0s -> 2.5s: Codenarts exits
      masterTl.to(fg[0], { scale: 1.15, opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 2.0);
      masterTl.to(bg[0], { scale: 1.5, opacity: 0, filter: "blur(50px)", duration: 0.5, ease: "power2.in" }, 2.0);
      masterTl.to(amb[0], { opacity: 0, duration: 0.5, ease: "power2.in" }, 2.0);

      /* ─── PHASE 02: AZ-DIGITAL-VENTURES (2.5s – 4.5s) ─── */
      // 2.3s -> 2.8s: AZ-Digital enters
      masterTl.fromTo(fg[1], { scale: 0.78, opacity: 0, y: 50 }, { scale: 1.0, opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.3);
      masterTl.fromTo(bg[1], { scale: 1.0, opacity: 0, filter: "blur(14px)" }, { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: 0.6, ease: "power2.out" }, 2.3);
      masterTl.fromTo(amb[1], { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 2.3);

      // 2.8s -> 4.0s: AZ-Digital plateau + gentle zoom
      masterTl.to(fg[1], { scale: 1.05, y: -15, duration: 1.4, ease: "none" }, 2.8);
      masterTl.to(bg[1], { scale: 1.35, duration: 1.4, ease: "none" }, 2.8);

      // 4.0s -> 4.5s: AZ-Digital exits
      masterTl.to(fg[1], { scale: 1.15, opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 4.0);
      masterTl.to(bg[1], { scale: 1.5, opacity: 0, filter: "blur(50px)", duration: 0.5, ease: "power2.in" }, 4.0);
      masterTl.to(amb[1], { opacity: 0, duration: 0.5, ease: "power2.in" }, 4.0);

      /* ─── PHASE 03: AMRON (4.5s – 6.5s) ─── */
      // 4.3s -> 4.8s: Amron enters
      masterTl.fromTo(fg[2], { scale: 0.78, opacity: 0, y: 50 }, { scale: 1.0, opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 4.3);
      masterTl.fromTo(bg[2], { scale: 1.0, opacity: 0, filter: "blur(14px)" }, { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: 0.6, ease: "power2.out" }, 4.3);
      masterTl.fromTo(amb[2], { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 4.3);
      if (orangeBeam) {
        masterTl.fromTo(orangeBeam, { opacity: 0, scaleY: 0.6 }, { opacity: 0.85, scaleY: 1, duration: 0.6, ease: "power2.out" }, 4.3);
      }

      // 4.8s -> 6.0s: Amron plateau + parallax
      masterTl.to(fg[2], { scale: 1.05, y: -15, duration: 1.4, ease: "none" }, 4.8);
      masterTl.to(bg[2], { scale: 1.35, duration: 1.4, ease: "none" }, 4.8);

      // 6.0s -> 6.5s: Amron exits
      masterTl.to(fg[2], { scale: 1.15, opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 6.0);
      masterTl.to(bg[2], { scale: 1.5, opacity: 0, filter: "blur(50px)", duration: 0.5, ease: "power2.in" }, 6.0);
      masterTl.to(amb[2], { opacity: 0, duration: 0.5, ease: "power2.in" }, 6.0);
      if (orangeBeam) {
        masterTl.to(orangeBeam, { opacity: 0, duration: 0.4 }, 6.1);
      }

      /* ─── PHASE 04: CHATONE (6.5s – 8.0s) ─── */
      // 6.3s -> 6.8s: ChatOne enters
      masterTl.fromTo(fg[3], { scale: 0.78, opacity: 0, y: 50 }, { scale: 1.0, opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 6.3);
      masterTl.fromTo(bg[3], { scale: 1.0, opacity: 0, filter: "blur(14px)" }, { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: 0.6, ease: "power2.out" }, 6.3);
      masterTl.fromTo(amb[3], { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 6.3);

      // 6.8s -> 7.6s: ChatOne plateau
      masterTl.to(fg[3], { scale: 1.05, y: -15, duration: 1.0, ease: "none" }, 6.8);
      masterTl.to(bg[3], { scale: 1.35, duration: 1.0, ease: "none" }, 6.8);

      // 7.6s -> 8.0s: ChatOne exits
      masterTl.to(fg[3], { scale: 1.15, opacity: 0, y: -40, duration: 0.4, ease: "power2.in" }, 7.6);
      masterTl.to(bg[3], { scale: 1.5, opacity: 0, filter: "blur(50px)", duration: 0.4, ease: "power2.in" }, 7.6);
      masterTl.to(amb[3], { opacity: 0, duration: 0.4, ease: "power2.in" }, 7.6);

      /* ─── PHASE 05: FINANCE (8.0s – 9.5s) ─── */
      // 7.8s -> 8.3s: Finance enters
      masterTl.fromTo(fg[4], { scale: 0.78, opacity: 0, y: 50 }, { scale: 1.0, opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 7.8);
      masterTl.fromTo(bg[4], { scale: 1.0, opacity: 0, filter: "blur(14px)" }, { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: 0.6, ease: "power2.out" }, 7.8);
      masterTl.fromTo(amb[4], { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 7.8);

      // 8.3s -> 9.5s: Finance plateau
      masterTl.to(fg[4], { scale: 1.04, y: -15, duration: 1.2, ease: "none" }, 8.3);
      masterTl.to(bg[4], { scale: 1.35, duration: 1.2, ease: "none" }, 8.3);

      /* ─── PHASE 06: FINAL ENDING SECTION (9.5s – 12.2s) ─── */
      // 9.5s -> 10.3s: Finance translates upward, scales down, background returns to pure black
      masterTl.to(fg[4], { y: -150, scale: 0.68, opacity: 0.6, duration: 0.8, ease: "power2.out" }, 9.5);
      masterTl.to(bg[4], { opacity: 0.1, filter: "blur(50px)", duration: 0.8, ease: "power2.out" }, 9.5);
      masterTl.to(amb[4], { opacity: 0.15, duration: 0.8, ease: "power2.out" }, 9.5);

      // 10.0s -> 12.2s: Staggered red statement reveal
      if (statementSection && statementWords.length > 0) {
        masterTl.fromTo(statementSection, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 10.0);
        masterTl.fromTo(
          statementWords,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.06, duration: 0.9, ease: "power3.out" },
          10.1
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const currentProject = SHOWCASE_PROJECTS[activeProjectIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#050505] text-white selection:bg-[#FF1A00] selection:text-black z-30"
      style={{
        // 600vh scroll track gives generous, smooth scrub time for all 6 phases
        height: "600vh",
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
              background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${proj.ambientGlow}, transparent 70%), radial-gradient(circle at 75% 30%, ${proj.secondaryGlow || "transparent"}, transparent 50%)`,
            }}
          />
        ))}

        {/* ─── PHASE 03 VERTICAL ORANGE LIGHT BEAM (Master prompt requirement) ─── */}
        <div
          className="amron-orange-beam pointer-events-none absolute left-6 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F97316] to-transparent opacity-0 shadow-[0_0_15px_#F97316]"
        />

        {/* ─── ENLARGED BLURRED BACKGROUND IMAGES (Atmospheric Layer) ─── */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          {SHOWCASE_PROJECTS.map((proj, idx) => (
            <div
              key={`bg-${proj.id}`}
              className={`project-bg-${idx} absolute inset-0 flex items-center justify-center`}
              style={{
                opacity: idx === 0 ? 0.45 : 0,
                transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)`,
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <img
                src={proj.image}
                alt=""
                className="h-[135%] w-[135%] max-w-none object-contain pointer-events-none"
                style={{
                  filter: "blur(32px)",
                  transform: "scale(1.18)",
                }}
              />
            </div>
          ))}
        </div>

        {/* ─── DARK CINEMATIC GRADIENT MASK (Preserving Deep Black Space) ─── */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/90" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-transparent to-[#050505]/95" />

        {/* ─── SHARP CENTERED FOREGROUND IMAGES (Stage Center) ─── */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {SHOWCASE_PROJECTS.map((proj, idx) => {
            const maxWidthStyle =
              proj.aspect === "mobile"
                ? "max-w-[340px] sm:max-w-[380px] md:max-w-[420px]"
                : "max-w-[560px] sm:max-w-[660px] md:max-w-[760px] lg:max-w-[840px]";

            return (
              <div
                key={`fg-${proj.id}`}
                className={`project-fg-${idx} absolute w-full ${maxWidthStyle} px-6 flex items-center justify-center will-change-transform`}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`,
                  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-auto object-contain block select-none pointer-events-auto"
                    draggable={false}
                  />
                  {/* Subtle glass rim highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── TOP-LEFT CORNER: ABSTRACT WHITE LOGO (Fixed Throughout) ─── */}
        <div className="absolute top-8 left-8 sm:top-10 sm:left-12 z-40 flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-7 h-7 text-white opacity-90 transition-opacity hover:opacity-100"
            >
              {/* Minimalist abstract agency mark */}
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
              <path
                d="M10 16L16 10L22 16L16 22L10 16Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="16" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            BOUNTY // ATELIER
          </span>
        </div>

        {/* ─── LEFT SIDE: PROJECT / CLIENT NAME (Vertically Centered) ─── */}
        <div
          className={`absolute left-8 sm:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-40 max-w-[220px] transition-all duration-700 pointer-events-none ${
            isFinalPhase ? "opacity-30 -translate-y-2/3" : "opacity-100"
          }`}
        >
          {/* Subtle category tracker */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-block h-[2px] w-5 rounded-full transition-all duration-500"
              style={{ backgroundColor: currentProject.accentColor }}
            />
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">
              0{activeProjectIndex + 1} // {currentProject.category}
            </span>
          </div>

          {/* Project Title */}
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold tracking-[0.2em] text-white uppercase leading-snug">
            {currentProject.name}
          </h2>

          <div className="mt-2 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
            {currentProject.year} ARCHIVE
          </div>
        </div>

        {/* ─── RIGHT SIDE: EDITORIAL PROJECT DESCRIPTION (Vertically Centered) ─── */}
        <div
          className={`hidden md:block absolute right-8 sm:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-40 max-w-[260px] lg:max-w-[290px] transition-all duration-700 pointer-events-none ${
            isFinalPhase ? "opacity-20 translate-y-[-40%]" : "opacity-100"
          }`}
        >
          <div className="space-y-3">
            <p className="text-[11px] sm:text-[12px] font-light leading-[1.8] tracking-wide text-neutral-400">
              {currentProject.description}
            </p>

            <div className="pt-2 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 border-t border-white/10">
              <span>EXPLORE CASE</span>
              <span>—&gt;</span>
            </div>
          </div>
        </div>

        {/* ─── PHASE 06: FINAL ENDING SECTION (Red Statement Bottom-Center) ─── */}
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

        {/* ─── BOTTOM: MINIMAL HORIZONTAL NAVIGATION ─── */}
        <div className="absolute bottom-6 sm:bottom-8 left-8 right-8 sm:left-12 sm:right-12 z-50 flex items-center justify-between pointer-events-none">
          {/* Left: Project indicators */}
          <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
            {SHOWCASE_PROJECTS.map((proj, idx) => {
              const isActive = idx === activeProjectIndex && !isFinalPhase;
              return (
                <button
                  key={`nav-${proj.id}`}
                  onClick={() => scrollToProject(idx)}
                  className="group flex items-center gap-2 py-2 cursor-pointer transition-all duration-300"
                  title={`Jump to ${proj.name}`}
                >
                  <span
                    className="block h-[2px] rounded-full transition-all duration-500"
                    style={{
                      width: isActive ? "28px" : "8px",
                      backgroundColor: isActive ? proj.accentColor : "#444",
                    }}
                  />
                  <span
                    className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 hidden sm:inline-block ${
                      isActive ? "text-white" : "text-white/30 group-hover:text-white/70"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </button>
              );
            })}

            {/* Final statement indicator */}
            <button
              onClick={() => scrollToProject(5)}
              className="group flex items-center gap-2 py-2 cursor-pointer transition-all duration-300"
              title="Jump to Final Statement"
            >
              <span
                className="block h-[2px] rounded-full transition-all duration-500"
                style={{
                  width: isFinalPhase ? "28px" : "8px",
                  backgroundColor: isFinalPhase ? "#FF1A00" : "#444",
                }}
              />
              <span
                className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 hidden sm:inline-block ${
                  isFinalPhase ? "text-[#FF1A00]" : "text-white/30 group-hover:text-white/70"
                }`}
              >
                STATEMENT
              </span>
            </button>
          </div>

          {/* Center: Red progress indicator & Counter */}
          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase hidden sm:inline-block">
              {isFinalPhase
                ? "06 / 06"
                : `0${activeProjectIndex + 1} / 0${SHOWCASE_PROJECTS.length}`}
            </span>
            <div className="h-[2px] w-20 sm:w-28 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF1A00] transition-all duration-150 ease-out rounded-full shadow-[0_0_8px_rgba(255,26,0,0.8)]"
                style={{ width: `${Math.min(100, Math.max(0, overallProgress * 100))}%` }}
              />
            </div>
          </div>

          {/* Right: Circular Navigation Control (Clickable to advance) */}
          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase hidden md:inline-block">
              Scroll to explore
            </span>
            <button
              onClick={handleNextClick}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer group hover:scale-105 active:scale-95 transition-transform"
              title="Next Project"
            >
              {/* Outer static ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="#333"
                  strokeWidth="1"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke={isFinalPhase ? "#FF1A00" : currentProject.accentColor}
                  strokeWidth="1.5"
                  strokeDasharray="113.1"
                  strokeDashoffset={113.1 * (1 - overallProgress)}
                  strokeLinecap="round"
                  className="transition-all duration-150 ease-out"
                />
              </svg>

              {/* Center Down Arrow */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-white/70 group-hover:text-white transition-colors group-hover:translate-y-0.5 duration-200"
              >
                <path
                  d="M6 2.5V9.5M6 9.5L2.5 6M6 9.5L9.5 6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
