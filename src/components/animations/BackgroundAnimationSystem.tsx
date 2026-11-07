"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export function BackgroundAnimationSystem() {
  const [isDesktopHover, setIsDesktopHover] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  // Mouse coords for smooth radial spotlight
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth springs for cursor glow
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 24, mass: 0.2 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 24, mass: 0.2 });

  // Scroll parallax tracking across layers
  const { scrollY } = useScroll();
  const parallaxVerticalLines = useTransform(scrollY, [0, 5000], [0, -320]);
  const parallaxLightTrails = useTransform(scrollY, [0, 5000], [0, -180]);
  const parallaxParticlesFast = useTransform(scrollY, [0, 5000], [0, -420]);
  const parallaxParticlesSlow = useTransform(scrollY, [0, 5000], [0, -140]);

  // Floating particles in multiple directions
  const particles = [
    { id: 1, top: "6%", left: "12%", size: 2.5, opacity: 0.55, duration: 8, delay: 0, anim: "particleDriftUpRight" },
    { id: 2, top: "14%", left: "84%", size: 3, opacity: 0.45, duration: 11, delay: 1.5, anim: "particleDriftDownLeft" },
    { id: 3, top: "22%", left: "42%", size: 2, opacity: 0.6, duration: 9, delay: 0.8, anim: "particleDriftUpLeft" },
    { id: 4, top: "32%", left: "8%", size: 1.5, opacity: 0.35, duration: 10, delay: 2.2, anim: "particleDriftFloat" },
    { id: 5, top: "42%", left: "91%", size: 2.5, opacity: 0.5, duration: 12, delay: 1, anim: "particleDriftUpRight" },
    { id: 6, top: "52%", left: "24%", size: 3, opacity: 0.65, duration: 9.5, delay: 3, anim: "particleDriftDownLeft" },
    { id: 7, top: "62%", left: "76%", size: 2, opacity: 0.4, duration: 11.5, delay: 0.5, anim: "particleDriftFloat" },
    { id: 8, top: "72%", left: "36%", size: 1.5, opacity: 0.45, duration: 10, delay: 2.8, anim: "particleDriftUpLeft" },
    { id: 9, top: "82%", left: "88%", size: 2.5, opacity: 0.4, duration: 8.5, delay: 1.2, anim: "particleDriftUpRight" },
    { id: 10, top: "92%", left: "15%", size: 2, opacity: 0.55, duration: 9, delay: 2, anim: "particleDriftDownLeft" },
    { id: 11, top: "18%", left: "62%", size: 2, opacity: 0.35, duration: 8, delay: 3.5, anim: "particleDriftFloat" },
    { id: 12, top: "48%", left: "68%", size: 3, opacity: 0.5, duration: 13, delay: 0.2, anim: "particleDriftUpLeft" },
    { id: 13, top: "68%", left: "50%", size: 1.5, opacity: 0.4, duration: 9, delay: 1.8, anim: "particleDriftUpRight" },
    { id: 14, top: "86%", left: "60%", size: 2.5, opacity: 0.55, duration: 8.2, delay: 2.5, anim: "particleDriftFloat" },
    { id: 15, top: "28%", left: "28%", size: 2, opacity: 0.4, duration: 10.5, delay: 4, anim: "particleDriftDownLeft" },
    { id: 16, top: "78%", left: "18%", size: 2, opacity: 0.5, duration: 9.2, delay: 1.6, anim: "particleDriftUpRight" },
  ];

  // Thin vertical neon-green lines moving top to bottom
  const verticalLines = [
    { left: "8%", duration: "9s", delay: "0s", height: "180px", opacity: 0.45 },
    { left: "22%", duration: "13s", delay: "3.5s", height: "140px", opacity: 0.35 },
    { left: "36%", duration: "11s", delay: "1.5s", height: "220px", opacity: 0.4 },
    { left: "50%", duration: "14s", delay: "4.5s", height: "160px", opacity: 0.3 },
    { left: "64%", duration: "10s", delay: "2s", height: "200px", opacity: 0.45 },
    { left: "78%", duration: "12s", delay: "5s", height: "150px", opacity: 0.35 },
    { left: "92%", duration: "10.5s", delay: "1s", height: "190px", opacity: 0.4 },
  ];

  useEffect(() => {
    // Check if device supports fine hover (desktop)
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktopHover(hoverQuery.matches);

    const handleHoverChange = (e: MediaQueryListEvent) => {
      setIsDesktopHover(e.matches);
    };
    hoverQuery.addEventListener("change", handleHoverChange);

    // Check reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (hoverQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // Visibility change listener to pause animations when hidden
    const handleVisibility = () => {
      setIsPageVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      hoverQuery.removeEventListener("change", handleHoverChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mouseX, mouseY]);

  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(198,255,54,0.06),transparent_70%)] blur-[100px]" />
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505] transition-opacity duration-700 ${
        isPageVisible ? "opacity-100" : "opacity-30"
      }`}
    >
      {/* ─── LAYER 1: SOFT RADIAL GREEN AMBIENT LIGHTING ─── */}
      <div className="absolute inset-0">
        {/* Top Header Soft Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(ellipse_at_top,rgba(198,255,54,0.08),transparent_65%)] blur-[130px] animate-pulse-glow" />

        {/* Mid-Canvas Olive Ambient Glow */}
        <div className="absolute top-1/3 -left-48 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(45,55,25,0.35),transparent_70%)] blur-[140px]" />

        {/* Lower Canvas Accent Glow */}
        <div className="absolute top-2/3 -right-48 w-[850px] h-[850px] bg-[radial-gradient(circle,rgba(198,255,54,0.05),transparent_65%)] blur-[140px]" />

        {/* Footer Ambient Accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,rgba(198,255,54,0.07),transparent_70%)] blur-[120px]" />
      </div>

      {/* ─── LAYER 2: INTERACTIVE MOUSE-FOLLOWING SPOTLIGHT GLOW (DESKTOP ONLY) ─── */}
      {isDesktopHover && (
        <motion.div
          className="absolute -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
            background:
              "radial-gradient(circle, rgba(198, 255, 54, 0.08) 0%, rgba(198, 255, 54, 0.02) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}

      {/* ─── LAYER 3: THIN VERTICAL NEON-GREEN LINES SLOWLY MOVING FROM TOP TO BOTTOM ─── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: parallaxVerticalLines }}
      >
        {/* Subtle static grid guides */}
        <div className="absolute inset-0 flex justify-between px-6 sm:px-16 opacity-25">
          <div className="w-px h-full bg-white/[0.03]" />
          <div className="w-px h-full bg-white/[0.03]" />
          <div className="w-px h-full bg-white/[0.03]" />
          <div className="w-px h-full bg-white/[0.03]" />
          <div className="w-px h-full bg-white/[0.03]" />
          <div className="w-px h-full bg-white/[0.03]" />
          <div className="w-px h-full bg-white/[0.03]" />
        </div>

        {/* Moving thin vertical neon-green laser pulses */}
        {verticalLines.map((col, index) => (
          <div
            key={index}
            className="absolute top-0 w-px h-full pointer-events-none overflow-hidden"
            style={{ left: col.left }}
          >
            <div
              className="w-full bg-gradient-to-b from-transparent via-[#C6FF36] to-transparent shadow-[0_0_8px_#C6FF36]"
              style={{
                height: col.height,
                opacity: col.opacity,
                animationName: "verticalBeamFlow",
                animationDuration: col.duration,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: col.delay,
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* ─── LAYER 4: HORIZONTAL SCANNING LINES MOVING FROM LEFT TO RIGHT ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Primary Horizontal Scanning Beam */}
        <div
          className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-[#C6FF36]/10 to-transparent pointer-events-none"
          style={{
            animationName: "horizontalScanSweep",
            animationDuration: "16s",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationIterationCount: "infinite",
            filter: "blur(12px)",
          }}
        />
        {/* Secondary subtle high-tech scanning line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C6FF36]/30 to-transparent pointer-events-none shadow-[0_0_12px_#C6FF36]"
          style={{
            animationName: "horizontalScanSweep",
            animationDuration: "16s",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationIterationCount: "infinite",
            animationDelay: "0.2s",
          }}
        />
      </div>

      {/* ─── LAYER 5: CINEMATIC CURVED NEON-GREEN SVG LIGHT TRAILS ─── */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ y: parallaxLightTrails }}
      >
        <svg
          className="w-full h-full opacity-60 mix-blend-screen"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 1800"
        >
          <defs>
            <linearGradient id="globalTrail1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C6FF36" stopOpacity="0" />
              <stop offset="35%" stopColor="#C6FF36" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#C6FF36" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C6FF36" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="globalTrail2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C6FF36" stopOpacity="0" />
              <stop offset="50%" stopColor="#C6FF36" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C6FF36" stopOpacity="0" />
            </linearGradient>

            <filter id="svgLightGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Curved Trail 1: Top Hero flowing diagonally down across center */}
          <path
            d="M -150 180 C 250 80, 500 480, 950 350 C 1250 260, 1400 520, 1600 420"
            fill="none"
            stroke="url(#globalTrail1)"
            strokeWidth="2.2"
            filter="url(#svgLightGlow)"
            strokeDasharray="350 1100"
            style={{
              animationName: "lightTrailFlow",
              animationDuration: "18s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          />

          {/* Curved Trail 2: Middle Workflow to Features section */}
          <path
            d="M 1600 700 C 1200 650, 950 950, 500 850 C 200 780, 0 1100, -200 980"
            fill="none"
            stroke="url(#globalTrail2)"
            strokeWidth="1.8"
            filter="url(#svgLightGlow)"
            strokeDasharray="300 1000"
            style={{
              animationName: "lightTrailFlow",
              animationDuration: "24s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDirection: "reverse",
            }}
          />

          {/* Curved Trail 3: Lower Analytics and Testimonials Section */}
          <path
            d="M -100 1350 C 350 1200, 700 1550, 1100 1400 C 1350 1300, 1500 1600, 1650 1500"
            fill="none"
            stroke="url(#globalTrail1)"
            strokeWidth="2"
            filter="url(#svgLightGlow)"
            strokeDasharray="400 1300"
            style={{
              animationName: "lightTrailFlow",
              animationDuration: "21s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          />
        </svg>
      </motion.div>

      {/* ─── LAYER 6: MULTIPLE SUBTLE GLOWING GREEN PARTICLES FLOATING IN DIFFERENT DIRECTIONS ─── */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ y: parallaxParticlesFast }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#C6FF36] pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px #C6FF36`,
              animationName: p.anim,
              animationDuration: `${p.duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Subtle Matrix Dot Grid (Very fine texture) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
    </div>
  );
}
