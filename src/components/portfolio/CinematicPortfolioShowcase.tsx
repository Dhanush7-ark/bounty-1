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
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export function CinematicPortfolioShowcase(): JSX.Element {
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
    const fraction = index < 5 ? (index * 0.86) / 5 + 0.08 : 0.95;
    const targetY = containerRef.current.offsetTop + totalScroll * fraction;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      // MASTER SCROLL TIMELINE (20.0s total normalized duration with generous holds & slow weighted scrub)
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
            const numProjects = SHOWCASE_PROJECTS.length;
            const projectDuration = 0.86 / numProjects;
            
            if (p < 0.86) {
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
      // Project 1 is queued at bottom center as preview card
      gsap.set(fg[1], { y: "30vh", scale: 0.3, opacity: 0.92, zIndex: 10 });
      // Projects 2..4 are queued beneath the viewport
      for (let i = 2; i < fg.length; i++) {
        gsap.set(fg[i], { y: "45vh", scale: 0.25, opacity: 0, zIndex: 1 });
      }

      /* ─────────────────────────────────────────────────────────────
         PHASE 01: CODENARTS (0.0s – 3.8s)
         Active Center: Codenarts | Bottom Preview: AZ-Digital
         ───────────────────────────────────────────────────────────── */
      // 0.0s -> 2.6s: Active plateau hold, subtle floating zoom
      masterTl.to(fg[0], { scale: 1.02, y: "-1.5vh", duration: 2.6, ease: "none" }, 0);
      masterTl.to(bg[0], { scale: 1.30, opacity: 0.5, filter: "blur(38px)", duration: 2.6, ease: "none" }, 0);
      // Keep AZ-Digital steady at bottom preview slot during hold
      masterTl.to(fg[1], { y: "30vh", scale: 0.3, opacity: 0.92, duration: 2.6, ease: "none" }, 0);

      // 2.6s -> 3.8s: Codenarts EASES OUT UPWARD, AZ-Digital RISES FROM BOTTOM INTO CENTER
      masterTl.to(fg[0], { scale: 1.18, opacity: 0, y: "-12vh", zIndex: 5, duration: 1.2, ease: easeInOut }, 2.6);
      masterTl.to(bg[0], { scale: 1.5, opacity: 0, filter: "blur(55px)", duration: 1.2, ease: easeInOut }, 2.6);
      masterTl.to(amb[0], { opacity: 0, duration: 1.2, ease: easeInOut }, 2.6);

      // Text 0 rolls UP & OUT through mask
      masterTl.to(titleLines[0], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 2.6);
      masterTl.to(descLines[0], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 2.6);
      masterTl.set([titleWrap[0], descWrap[0]], { opacity: 0 }, 3.8);

      // AZ-Digital expands from bottom preview up into dead center
      masterTl.to(fg[1], { y: "0vh", scale: 1.0, opacity: 1, zIndex: 20, duration: 1.2, ease: easeInOut }, 2.6);
      masterTl.fromTo(bg[1],
        { scale: 1.05, opacity: 0, filter: "blur(14px)" },
        { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: 1.2, ease: easeInOut },
        2.6
      );
      masterTl.fromTo(amb[1],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: easeInOut },
        2.6
      );

      // Amron enters into bottom preview slot
      masterTl.fromTo(fg[2],
        { y: "45vh", scale: 0.25, opacity: 0, zIndex: 10 },
        { y: "30vh", scale: 0.3, opacity: 0.92, duration: 1.0, ease: easeInOut },
        2.8
      );

      // Text 1 rolls IN from DOWN to UP
      masterTl.set([titleWrap[1], descWrap[1]], { opacity: 1 }, 2.8);
      masterTl.fromTo(titleLines[1],
        { y: "130%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
        2.9
      );
      masterTl.fromTo(descLines[1],
        { y: "130%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
        3.0
      );

      /* ─────────────────────────────────────────────────────────────
         PHASE 02: AZ-DIGITAL-VENTURES (3.8s – 7.6s)
         Active Center: AZ-Digital | Bottom Preview: Amron
         ───────────────────────────────────────────────────────────── */
      // 3.8s -> 6.4s: AZ-Digital plateau hold (2.6s hold)
      masterTl.to(fg[1], { scale: 1.02, y: "-1.5vh", duration: 2.6, ease: "none" }, 3.8);
      masterTl.to(bg[1], { scale: 1.32, duration: 2.6, ease: "none" }, 3.8);
      masterTl.to(fg[2], { y: "30vh", scale: 0.3, opacity: 0.92, duration: 2.6, ease: "none" }, 3.8);

      // 6.4s -> 7.6s: AZ-Digital EASES OUT, Amron RISES FROM BOTTOM INTO CENTER
      masterTl.to(fg[1], { scale: 1.18, opacity: 0, y: "-12vh", zIndex: 5, duration: 1.2, ease: easeInOut }, 6.4);
      masterTl.to(bg[1], { scale: 1.5, opacity: 0, filter: "blur(55px)", duration: 1.2, ease: easeInOut }, 6.4);
      masterTl.to(amb[1], { opacity: 0, duration: 1.2, ease: easeInOut }, 6.4);

      // Text 1 rolls OUT
      masterTl.to(titleLines[1], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 6.4);
      masterTl.to(descLines[1], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 6.4);
      masterTl.set([titleWrap[1], descWrap[1]], { opacity: 0 }, 7.6);

      // Amron expands from bottom preview up into dead center
      masterTl.to(fg[2], { y: "0vh", scale: 1.0, opacity: 1, zIndex: 20, duration: 1.2, ease: easeInOut }, 6.4);
      masterTl.fromTo(bg[2],
        { scale: 1.05, opacity: 0, filter: "blur(14px)" },
        { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: 1.2, ease: easeInOut },
        6.4
      );
      masterTl.fromTo(amb[2],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: easeInOut },
        6.4
      );
      if (orangeBeam) {
        masterTl.fromTo(orangeBeam,
          { opacity: 0, scaleY: 0.5 },
          { opacity: 0.85, scaleY: 1, duration: 1.0, ease: easeInOut },
          6.5
        );
      }

      // ChatOne enters into bottom preview slot
      masterTl.fromTo(fg[3],
        { y: "45vh", scale: 0.25, opacity: 0, zIndex: 10 },
        { y: "30vh", scale: 0.3, opacity: 0.92, duration: 1.0, ease: easeInOut },
        6.6
      );

      // Text 2 rolls IN from DOWN to UP
      masterTl.set([titleWrap[2], descWrap[2]], { opacity: 1 }, 6.6);
      masterTl.fromTo(titleLines[2],
        { y: "130%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
        6.7
      );
      masterTl.fromTo(descLines[2],
        { y: "130%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
        6.8
      );

      /* ─────────────────────────────────────────────────────────────
         PHASE 03: AMRON (7.6s – 11.4s)
         Active Center: Amron | Bottom Preview: ChatOne
         ───────────────────────────────────────────────────────────── */
      // 7.6s -> 10.2s: Amron plateau hold (2.6s hold)
      masterTl.to(fg[2], { scale: 1.02, y: "-1.5vh", duration: 2.6, ease: "none" }, 7.6);
      masterTl.to(bg[2], { scale: 1.32, duration: 2.6, ease: "none" }, 7.6);
      masterTl.to(fg[3], { y: "30vh", scale: 0.3, opacity: 0.92, duration: 2.6, ease: "none" }, 7.6);

      // 10.2s -> 11.4s: Amron EASES OUT, ChatOne RISES FROM BOTTOM INTO CENTER
      masterTl.to(fg[2], { scale: 1.18, opacity: 0, y: "-12vh", zIndex: 5, duration: 1.2, ease: easeInOut }, 10.2);
      masterTl.to(bg[2], { scale: 1.5, opacity: 0, filter: "blur(55px)", duration: 1.2, ease: easeInOut }, 10.2);
      masterTl.to(amb[2], { opacity: 0, duration: 1.2, ease: easeInOut }, 10.2);
      if (orangeBeam) {
        masterTl.to(orangeBeam, { opacity: 0, duration: 0.8, ease: easeInOut }, 10.2);
      }

      // Text 2 rolls OUT
      masterTl.to(titleLines[2], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 10.2);
      masterTl.to(descLines[2], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 10.2);
      masterTl.set([titleWrap[2], descWrap[2]], { opacity: 0 }, 11.4);

      // ChatOne expands from bottom preview up into dead center
      masterTl.to(fg[3], { y: "0vh", scale: 1.0, opacity: 1, zIndex: 20, duration: 1.2, ease: easeInOut }, 10.2);
      masterTl.fromTo(bg[3],
        { scale: 1.05, opacity: 0, filter: "blur(14px)" },
        { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: 1.2, ease: easeInOut },
        10.2
      );
      masterTl.fromTo(amb[3],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: easeInOut },
        10.2
      );

      // Finance enters into bottom preview slot
      masterTl.fromTo(fg[4],
        { y: "45vh", scale: 0.25, opacity: 0, zIndex: 10 },
        { y: "30vh", scale: 0.3, opacity: 0.92, duration: 1.0, ease: easeInOut },
        10.4
      );

      // Text 3 rolls IN from DOWN to UP
      masterTl.set([titleWrap[3], descWrap[3]], { opacity: 1 }, 10.4);
      masterTl.fromTo(titleLines[3],
        { y: "130%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
        10.5
      );
      masterTl.fromTo(descLines[3],
        { y: "130%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
        10.6
      );

      /* ─────────────────────────────────────────────────────────────
         PHASE 04: CHATONE (11.4s – 15.2s)
         Active Center: ChatOne | Bottom Preview: Finance
         ───────────────────────────────────────────────────────────── */
      // 11.4s -> 14.0s: ChatOne plateau hold (2.6s hold)
      masterTl.to(fg[3], { scale: 1.02, y: "-1.5vh", duration: 2.6, ease: "none" }, 11.4);
      masterTl.to(bg[3], { scale: 1.32, duration: 2.6, ease: "none" }, 11.4);
      masterTl.to(fg[4], { y: "30vh", scale: 0.3, opacity: 0.92, duration: 2.6, ease: "none" }, 11.4);

      // 14.0s -> 15.2s: ChatOne EASES OUT, Finance RISES FROM BOTTOM INTO CENTER
      masterTl.to(fg[3], { scale: 1.18, opacity: 0, y: "-12vh", zIndex: 5, duration: 1.2, ease: easeInOut }, 14.0);
      masterTl.to(bg[3], { scale: 1.5, opacity: 0, filter: "blur(55px)", duration: 1.2, ease: easeInOut }, 14.0);
      masterTl.to(amb[3], { opacity: 0, duration: 1.2, ease: easeInOut }, 14.0);

      // Text 3 rolls OUT
      masterTl.to(titleLines[3], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 14.0);
      masterTl.to(descLines[3], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 14.0);
      masterTl.set([titleWrap[3], descWrap[3]], { opacity: 0 }, 15.2);

      // Finance expands from bottom preview up into dead center
      masterTl.to(fg[4], { y: "0vh", scale: 1.0, opacity: 1, zIndex: 20, duration: 1.2, ease: easeInOut }, 14.0);
      masterTl.fromTo(bg[4],
        { scale: 1.05, opacity: 0, filter: "blur(14px)" },
        { scale: 1.25, opacity: 0.48, filter: "blur(32px)", duration: 1.2, ease: easeInOut },
        14.0
      );
      masterTl.fromTo(amb[4],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: easeInOut },
        14.0
      );

      // Text 4 rolls IN from DOWN to UP
      masterTl.set([titleWrap[4], descWrap[4]], { opacity: 1 }, 14.2);
      masterTl.fromTo(titleLines[4],
        { y: "130%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
        14.3
      );
      masterTl.fromTo(descLines[4],
        { y: "130%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.9, ease: easeRevealOut },
        14.4
      );

      /* ─────────────────────────────────────────────────────────────
         PHASE 05: FINANCE (15.2s – 17.6s)
         Active Center: Finance
         ───────────────────────────────────────────────────────────── */
      // 15.2s -> 17.6s: Finance plateau hold (2.4s hold)
      masterTl.to(fg[4], { scale: 1.02, y: "-1.5vh", duration: 2.4, ease: "none" }, 15.2);
      masterTl.to(bg[4], { scale: 1.32, duration: 2.4, ease: "none" }, 15.2);

      /* ─────────────────────────────────────────────────────────────
         PHASE 06: FINAL ENDING SECTION (17.6s – 20.0s)
         ───────────────────────────────────────────────────────────── */
      // 17.6s -> 18.8s: Finance slides upward smoothly to upper-middle; side text rolls out
      masterTl.to(fg[4], { y: "-18vh", scale: 0.65, opacity: 0.55, duration: 1.0, ease: easeInOut }, 17.6);
      masterTl.to(bg[4], { opacity: 0.08, filter: "blur(55px)", duration: 1.0, ease: easeInOut }, 17.6);
      masterTl.to(amb[4], { opacity: 0.12, duration: 1.0, ease: easeInOut }, 17.6);
      masterTl.to(titleLines[4], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 17.6);
      masterTl.to(descLines[4], { y: "-125%", opacity: 0, stagger: 0.04, duration: 0.8, ease: easeInOut }, 17.6);
      masterTl.set([titleWrap[4], descWrap[4]], { opacity: 0 }, 18.8);

      // 18.2s -> 20.0s: Red statement reveals with smooth upward ease-in-and-out stagger
      if (statementSection && statementWords.length > 0) {
        masterTl.fromTo(statementSection, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 
          18.2
        );
        masterTl.fromTo(
          statementWords,
          { opacity: 0, y: 28, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.055, duration: 1.0, ease: easeInOut },
          18.3
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
        // 1100vh scroll track gives relaxed, slow, weighted scroll time
        height: "1100vh",
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
                : "max-w-[580px] sm:max-w-[640px] md:max-w-[700px] lg:max-w-[780px]";

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
                  style={{
                    transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`,
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
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

        {/* ─── LEFT SIDE: PROJECT / CLIENT NAME (Large Bold Minimal Text) ─── */}
        <div className="absolute left-6 sm:left-12 lg:left-20 top-1/2 -translate-y-1/2 z-40 w-[260px] sm:w-[320px] pointer-events-none">
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

        {/* ─── RIGHT SIDE: EDITORIAL PROJECT DESCRIPTION & CIRCULAR ORBIT INDICATOR ─── */}
        <div className="hidden md:flex absolute right-8 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-40 w-[260px] lg:w-[320px] pointer-events-none flex-col">
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
