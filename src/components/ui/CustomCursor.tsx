"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setIsVisible(true);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setMousePos({ x: targetX, y: targetY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.onclick !== null ||
          target.getAttribute("role") === "button" ||
          target.closest("button") !== null ||
          target.closest("a") !== null;

        setIsPointer(isClickable);
      }
    };

    // Smooth inertia physics loop for outer HUD spatial ring
    const loop = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      setRingPos({ x: currentX, y: currentY });
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Precision Center Core Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          willChange: "transform",
        }}
      >
        <div
          className={`rounded-full bg-[#b5f200] transition-all duration-200 ${
            isPointer ? "w-2.5 h-2.5 shadow-[0_0_15px_#b5f200]" : "w-2 h-2 shadow-[0_0_10px_#b5f200]"
          }`}
        />
      </div>

      {/* 2. Outer Smooth Lerp Spatial HUD Reticle Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`,
          willChange: "transform",
        }}
      >
        <div
          className={`relative rounded-full border transition-all duration-300 flex items-center justify-center ${
            isPointer
              ? "w-12 h-12 border-[#b5f200] bg-[#b5f200]/15 shadow-[0_0_25px_rgba(181,242,0,0.4)] scale-110"
              : "w-8 h-8 border-[#b5f200]/40 bg-black/20 backdrop-blur-[1px]"
          }`}
        >
          {/* Spatial Reticle Crosshair Brackets */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-[#b5f200]" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-[#b5f200]" />
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-1 w-0.5 bg-[#b5f200]" />
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-1 w-0.5 bg-[#b5f200]" />
        </div>
      </div>
    </>
  );
}
