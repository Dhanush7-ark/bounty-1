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

  // ─── SUBTLE VERTICAL GREEN LIGHT GRADIENT PILLARS AROUND SELECTED CLUSTERS ───
  const glowPillars = [
    { left: "7.0%", width: "45px", height: "75%", top: "0%", duration: "8s", delay: "-1s", opacity: 0.55 },
    { left: "21.5%", width: "60px", height: "85%", top: "4%", duration: "10s", delay: "-3s", opacity: 0.65 },
    { left: "34.0%", width: "42px", height: "70%", top: "8%", duration: "9s", delay: "-5s", opacity: 0.45 },
    { left: "46.5%", width: "68px", height: "90%", top: "0%", duration: "11s", delay: "-2s", opacity: 0.75 },
    { left: "63.0%", width: "50px", height: "80%", top: "6%", duration: "9.5s", delay: "-4s", opacity: 0.55 },
    { left: "78.5%", width: "62px", height: "85%", top: "0%", duration: "10.5s", delay: "-1.5s", opacity: 0.65 },
    { left: "92.0%", width: "46px", height: "72%", top: "10%", duration: "8.5s", delay: "-6s", opacity: 0.5 },
  ];

  // ─── THIN VERTICAL NEON-GREEN LINES (LAYERED, DIVERSE SPEEDS, HEIGHTS & OPACITY) ───
  const verticalLines = [
    // Cluster 1 (Left: 3% - 11%)
    { id: 1, left: "3.2%", width: 0.75, height: "340px", duration: "19s", delay: "-4s", opacity: 0.15, glow: false, gradientType: "faint" },
    { id: 2, left: "4.5%", width: 1.0, height: "540px", duration: "13s", delay: "-9s", opacity: 0.55, glow: true, gradientType: "bright" },
    { id: 3, left: "5.8%", width: 1.5, height: "780px", duration: "10s", delay: "-2s", opacity: 0.85, glow: true, gradientType: "bright" },
    { id: 4, left: "6.6%", width: 1.0, height: "420px", duration: "15s", delay: "-11s", opacity: 0.4, glow: false, gradientType: "emerald" },
    { id: 5, left: "7.5%", width: 2.0, height: "890px", duration: "8.5s", delay: "-5.5s", opacity: 0.95, glow: true, gradientType: "bright" },
    { id: 6, left: "8.6%", width: 0.75, height: "610px", duration: "21s", delay: "-14s", opacity: 0.22, glow: false, gradientType: "faint" },
    { id: 7, left: "9.8%", width: 1.5, height: "510px", duration: "12s", delay: "-7s", opacity: 0.75, glow: true, gradientType: "emerald" },
    { id: 8, left: "11.2%", width: 1.0, height: "370px", duration: "16s", delay: "-1s", opacity: 0.3, glow: false, gradientType: "faint" },

    // Cluster 2 (Mid-Left: 16% - 26%)
    { id: 9, left: "16.4%", width: 0.75, height: "410px", duration: "22s", delay: "-8s", opacity: 0.18, glow: false, gradientType: "faint" },
    { id: 10, left: "18.0%", width: 1.5, height: "740px", duration: "11s", delay: "-3s", opacity: 0.8, glow: true, gradientType: "bright" },
    { id: 11, left: "19.3%", width: 2.0, height: "960px", duration: "9s", delay: "-6.5s", opacity: 0.95, glow: true, gradientType: "bright" },
    { id: 12, left: "20.5%", width: 1.0, height: "560px", duration: "14s", delay: "-12s", opacity: 0.45, glow: true, gradientType: "emerald" },
    { id: 13, left: "21.6%", width: 1.5, height: "840px", duration: "10.5s", delay: "-1.5s", opacity: 0.85, glow: true, gradientType: "bright" },
    { id: 14, left: "22.8%", width: 0.75, height: "450px", duration: "19s", delay: "-15s", opacity: 0.25, glow: false, gradientType: "faint" },
    { id: 15, left: "24.2%", width: 1.0, height: "670px", duration: "12.5s", delay: "-9s", opacity: 0.65, glow: true, gradientType: "emerald" },
    { id: 16, left: "25.8%", width: 0.75, height: "320px", duration: "24s", delay: "-4s", opacity: 0.12, glow: false, gradientType: "faint" },

    // Cluster 3 (Center-Left: 30% - 38%)
    { id: 17, left: "30.4%", width: 0.75, height: "360px", duration: "20s", delay: "-7s", opacity: 0.2, glow: false, gradientType: "faint" },
    { id: 18, left: "32.0%", width: 1.5, height: "700px", duration: "11.5s", delay: "-2.5s", opacity: 0.75, glow: true, gradientType: "bright" },
    { id: 19, left: "33.5%", width: 2.0, height: "860px", duration: "9.5s", delay: "-8s", opacity: 0.9, glow: true, gradientType: "bright" },
    { id: 20, left: "34.8%", width: 1.0, height: "490px", duration: "15s", delay: "-13s", opacity: 0.4, glow: false, gradientType: "emerald" },
    { id: 21, left: "36.2%", width: 1.5, height: "780px", duration: "10s", delay: "-4.5s", opacity: 0.85, glow: true, gradientType: "bright" },
    { id: 22, left: "37.6%", width: 0.75, height: "430px", duration: "18s", delay: "-10s", opacity: 0.22, glow: false, gradientType: "faint" },

    // Cluster 4 (Center: 42% - 50%)
    { id: 23, left: "42.4%", width: 0.75, height: "470px", duration: "21s", delay: "-6s", opacity: 0.25, glow: false, gradientType: "faint" },
    { id: 24, left: "43.9%", width: 1.5, height: "770px", duration: "10.5s", delay: "-1s", opacity: 0.82, glow: true, gradientType: "bright" },
    { id: 25, left: "45.2%", width: 2.0, height: "990px", duration: "8s", delay: "-5.5s", opacity: 1.0, glow: true, gradientType: "bright" },
    { id: 26, left: "46.5%", width: 1.0, height: "600px", duration: "13.5s", delay: "-11s", opacity: 0.5, glow: true, gradientType: "emerald" },
    { id: 27, left: "47.7%", width: 2.0, height: "910px", duration: "9s", delay: "-3s", opacity: 0.92, glow: true, gradientType: "bright" },
    { id: 28, left: "48.9%", width: 1.0, height: "650px", duration: "12s", delay: "-8.5s", opacity: 0.65, glow: true, gradientType: "emerald" },
    { id: 29, left: "50.3%", width: 0.75, height: "390px", duration: "23s", delay: "-16s", opacity: 0.16, glow: false, gradientType: "faint" },

    // Cluster 5 (Center-Right: 58% - 68%)
    { id: 30, left: "58.4%", width: 0.75, height: "400px", duration: "19s", delay: "-9s", opacity: 0.2, glow: false, gradientType: "faint" },
    { id: 31, left: "60.1%", width: 1.5, height: "730px", duration: "11s", delay: "-3.5s", opacity: 0.78, glow: true, gradientType: "bright" },
    { id: 32, left: "61.7%", width: 2.0, height: "880px", duration: "9s", delay: "-7s", opacity: 0.92, glow: true, gradientType: "bright" },
    { id: 33, left: "63.2%", width: 1.0, height: "530px", duration: "14.5s", delay: "-12.5s", opacity: 0.45, glow: true, gradientType: "emerald" },
    { id: 34, left: "64.6%", width: 1.5, height: "810px", duration: "10s", delay: "-2s", opacity: 0.85, glow: true, gradientType: "bright" },
    { id: 35, left: "66.0%", width: 0.75, height: "460px", duration: "17s", delay: "-14s", opacity: 0.28, glow: false, gradientType: "faint" },
    { id: 36, left: "67.8%", width: 1.0, height: "640px", duration: "12.5s", delay: "-5s", opacity: 0.62, glow: true, gradientType: "emerald" },

    // Cluster 6 (Mid-Right: 73% - 82%)
    { id: 37, left: "73.4%", width: 0.75, height: "370px", duration: "22s", delay: "-11s", opacity: 0.18, glow: false, gradientType: "faint" },
    { id: 38, left: "75.0%", width: 1.5, height: "750px", duration: "10.5s", delay: "-4s", opacity: 0.8, glow: true, gradientType: "bright" },
    { id: 39, left: "76.5%", width: 2.0, height: "940px", duration: "8.5s", delay: "-6s", opacity: 0.95, glow: true, gradientType: "bright" },
    { id: 40, left: "77.8%", width: 1.0, height: "570px", duration: "13s", delay: "-10.5s", opacity: 0.5, glow: true, gradientType: "emerald" },
    { id: 41, left: "79.2%", width: 1.5, height: "830px", duration: "9.5s", delay: "-1.8s", opacity: 0.88, glow: true, gradientType: "bright" },
    { id: 42, left: "80.5%", width: 0.75, height: "490px", duration: "18s", delay: "-15s", opacity: 0.24, glow: false, gradientType: "faint" },
    { id: 43, left: "81.8%", width: 1.0, height: "650px", duration: "12s", delay: "-7.5s", opacity: 0.65, glow: true, gradientType: "emerald" },

    // Cluster 7 (Far-Right: 87% - 97%)
    { id: 44, left: "87.4%", width: 0.75, height: "340px", duration: "20s", delay: "-8s", opacity: 0.15, glow: false, gradientType: "faint" },
    { id: 45, left: "88.9%", width: 1.5, height: "720px", duration: "11.5s", delay: "-3s", opacity: 0.76, glow: true, gradientType: "bright" },
    { id: 46, left: "90.5%", width: 2.0, height: "880px", duration: "9s", delay: "-7.5s", opacity: 0.9, glow: true, gradientType: "bright" },
    { id: 47, left: "91.8%", width: 1.0, height: "540px", duration: "14s", delay: "-12s", opacity: 0.42, glow: false, gradientType: "emerald" },
    { id: 48, left: "93.3%", width: 1.5, height: "790px", duration: "10s", delay: "-2.2s", opacity: 0.84, glow: true, gradientType: "bright" },
    { id: 49, left: "94.6%", width: 0.75, height: "440px", duration: "19s", delay: "-14.5s", opacity: 0.2, glow: false, gradientType: "faint" },
    { id: 50, left: "96.2%", width: 1.0, height: "610px", duration: "13s", delay: "-6s", opacity: 0.58, glow: true, gradientType: "emerald" },

    // Sporadic Gap Lines (Atmospheric texture)
    { id: 51, left: "1.5%", width: 0.75, height: "310px", duration: "26s", delay: "-13s", opacity: 0.1, glow: false, gradientType: "faint" },
    { id: 52, left: "13.8%", width: 0.75, height: "430px", duration: "24s", delay: "-7s", opacity: 0.14, glow: false, gradientType: "faint" },
    { id: 53, left: "28.2%", width: 0.75, height: "370px", duration: "25s", delay: "-17s", opacity: 0.12, glow: false, gradientType: "faint" },
    { id: 54, left: "40.5%", width: 0.75, height: "500px", duration: "22s", delay: "-9s", opacity: 0.16, glow: false, gradientType: "faint" },
    { id: 55, left: "53.8%", width: 0.75, height: "390px", duration: "27s", delay: "-21s", opacity: 0.11, glow: false, gradientType: "faint" },
    { id: 56, left: "71.0%", width: 0.75, height: "450px", duration: "23s", delay: "-5s", opacity: 0.15, glow: false, gradientType: "faint" },
    { id: 57, left: "84.5%", width: 0.75, height: "380px", duration: "25s", delay: "-16s", opacity: 0.13, glow: false, gradientType: "faint" },
    { id: 58, left: "98.5%", width: 0.75, height: "320px", duration: "28s", delay: "-11s", opacity: 0.1, glow: false, gradientType: "faint" },
  ];

  // ─── THIN HORIZONTAL SCANNING LINES (LEFT TO RIGHT, OCCASIONAL BRIGHT BEAMS) ───
  const horizontalLines = [
    { id: 1, top: "3.5%", width: "320px", height: 1, duration: "18s", delay: "-4s", opacity: 0.35, isBrightBeam: false },
    { id: 2, top: "7.0%", width: "520px", height: 1.5, duration: "13s", delay: "-9s", opacity: 0.75, isBrightBeam: true },
    { id: 3, top: "11.5%", width: "260px", height: 1, duration: "22s", delay: "-14s", opacity: 0.22, isBrightBeam: false },
    { id: 4, top: "15.0%", width: "420px", height: 1, duration: "16s", delay: "-2s", opacity: 0.45, isBrightBeam: false },
    { id: 5, top: "19.5%", width: "680px", height: 2, duration: "11s", delay: "-7.5s", opacity: 0.95, isBrightBeam: true },
    { id: 6, top: "24.0%", width: "310px", height: 1, duration: "25s", delay: "-18s", opacity: 0.18, isBrightBeam: false },
    { id: 7, top: "28.5%", width: "480px", height: 1, duration: "15s", delay: "-5s", opacity: 0.5, isBrightBeam: false },
    { id: 8, top: "33.0%", width: "360px", height: 1, duration: "20s", delay: "-12s", opacity: 0.28, isBrightBeam: false },
    { id: 9, top: "37.5%", width: "620px", height: 1.5, duration: "12.5s", delay: "-3s", opacity: 0.85, isBrightBeam: true },
    { id: 10, top: "42.0%", width: "290px", height: 1, duration: "23s", delay: "-15s", opacity: 0.2, isBrightBeam: false },
    { id: 11, top: "46.5%", width: "450px", height: 1, duration: "17s", delay: "-8s", opacity: 0.4, isBrightBeam: false },
    { id: 12, top: "51.0%", width: "740px", height: 2, duration: "10.5s", delay: "-6s", opacity: 0.95, isBrightBeam: true },
    { id: 13, top: "55.5%", width: "340px", height: 1, duration: "21s", delay: "-13.5s", opacity: 0.25, isBrightBeam: false },
    { id: 14, top: "60.0%", width: "490px", height: 1, duration: "14.5s", delay: "-1s", opacity: 0.55, isBrightBeam: false },
    { id: 15, top: "64.5%", width: "270px", height: 1, duration: "26s", delay: "-19s", opacity: 0.16, isBrightBeam: false },
    { id: 16, top: "69.0%", width: "580px", height: 1.5, duration: "13.5s", delay: "-7s", opacity: 0.8, isBrightBeam: true },
    { id: 17, top: "73.5%", width: "380px", height: 1, duration: "19s", delay: "-11s", opacity: 0.3, isBrightBeam: false },
    { id: 18, top: "78.0%", width: "460px", height: 1, duration: "16.5s", delay: "-4.5s", opacity: 0.48, isBrightBeam: false },
    { id: 19, top: "82.5%", width: "710px", height: 2, duration: "11.5s", delay: "-8.5s", opacity: 0.9, isBrightBeam: true },
    { id: 20, top: "87.0%", width: "330px", height: 1, duration: "24s", delay: "-16s", opacity: 0.22, isBrightBeam: false },
    { id: 21, top: "91.5%", width: "510px", height: 1.5, duration: "14s", delay: "-3.5s", opacity: 0.65, isBrightBeam: false },
    { id: 22, top: "95.5%", width: "400px", height: 1, duration: "20s", delay: "-10s", opacity: 0.25, isBrightBeam: false },
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

        {/* ─── 3A: SUBTLE VERTICAL GREEN LIGHT GRADIENTS AROUND SELECTED LINES ─── */}
        {glowPillars.map((pillar, idx) => (
          <div
            key={`pillar-${idx}`}
            className="absolute pointer-events-none"
            style={{
              left: pillar.left,
              width: pillar.width,
              height: pillar.height,
              top: pillar.top,
              transform: "translateX(-50%)",
              background:
                "radial-gradient(ellipse at top, rgba(198, 255, 54, 0.22) 0%, rgba(34, 197, 94, 0.08) 45%, transparent 75%)",
              filter: "blur(18px)",
              opacity: pillar.opacity,
              animationName: "verticalPillarPulse",
              animationDuration: pillar.duration,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: pillar.delay,
            }}
          />
        ))}

        {/* ─── 3B: MULTIPLE THIN VERTICAL NEON-GREEN LINES (STREAMING TOP TO BOTTOM) ─── */}
        {verticalLines.map((line) => {
          const bgGradient =
            line.gradientType === "bright"
              ? "linear-gradient(to bottom, #FFFFFF 0%, #C6FF36 18%, #C6FF36 60%, rgba(198, 255, 54, 0.3) 85%, transparent 100%)"
              : line.gradientType === "emerald"
              ? "linear-gradient(to bottom, #C6FF36 0%, #22c55e 40%, rgba(34, 197, 94, 0.25) 80%, transparent 100%)"
              : "linear-gradient(to bottom, transparent, rgba(198, 255, 54, 0.45) 25%, rgba(198, 255, 54, 0.15) 75%, transparent 100%)";

          const shadow = line.glow
            ? line.gradientType === "bright"
              ? "0 0 8px #C6FF36, 0 0 18px rgba(198, 255, 54, 0.5)"
              : "0 0 6px rgba(34, 197, 94, 0.6)"
            : undefined;

          return (
            <div
              key={`vline-${line.id}`}
              className="absolute top-0 pointer-events-none"
              style={{
                left: line.left,
                width: `${line.width}px`,
                height: line.height,
                opacity: line.opacity,
                background: bgGradient,
                boxShadow: shadow,
                animationName: "verticalBeamFlow",
                animationDuration: line.duration,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDelay: line.delay,
                willChange: "transform",
              }}
            />
          );
        })}
      </motion.div>

      {/* ─── LAYER 4: THIN HORIZONTAL SCANNING LINES (LEFT TO RIGHT WITH OCCASIONAL BRIGHT BEAMS) ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Subtle Horizontal CRT Scanline Raster Texture across full screen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 23px, rgba(198, 255, 54, 0.025) 23px, rgba(198, 255, 54, 0.06) 24px)",
          }}
        />

        {/* Horizontal Line Tracks & Traveling Laser Beams */}
        {horizontalLines.map((line) => {
          const beamGradient = line.isBrightBeam
            ? "linear-gradient(to right, transparent 0%, rgba(198, 255, 54, 0.25) 20%, #FFFFFF 65%, #C6FF36 85%, transparent 100%)"
            : "linear-gradient(to right, transparent 0%, rgba(198, 255, 54, 0.15) 30%, #C6FF36 75%, transparent 100%)";

          const beamShadow = line.isBrightBeam
            ? "0 0 10px #C6FF36, 0 0 20px rgba(198, 255, 54, 0.45)"
            : "0 0 5px rgba(198, 255, 54, 0.3)";

          return (
            <div
              key={`hline-${line.id}`}
              className="absolute left-0 right-0 pointer-events-none"
              style={{ top: line.top }}
            >
              {/* Very faint baseline guide line spanning across */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C6FF36]/8 to-transparent" />

              {/* Traveling Horizontal Laser Pulse / Scanning Beam (Left to Right) */}
              <div
                className="absolute top-0 pointer-events-none"
                style={{
                  width: line.width,
                  height: `${line.height}px`,
                  opacity: line.opacity,
                  background: beamGradient,
                  boxShadow: beamShadow,
                  animationName: "horizontalLineTravel",
                  animationDuration: line.duration,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDelay: line.delay,
                  willChange: "transform",
                }}
              />

              {/* Occasional Brighter Scanning Beam Soft Green Glow Halo */}
              {line.isBrightBeam && (
                <div
                  className="absolute -top-1.5 pointer-events-none blur-sm"
                  style={{
                    width: line.width,
                    height: "12px",
                    opacity: line.opacity * 0.4,
                    background:
                      "linear-gradient(to right, transparent 0%, rgba(198, 255, 54, 0.35) 50%, transparent 100%)",
                    animationName: "horizontalLineTravel",
                    animationDuration: line.duration,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationDelay: line.delay,
                    willChange: "transform",
                  }}
                />
              )}
            </div>
          );
        })}
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
