"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function TestScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    triggerRef: sectionRef,
    start: "top bottom",
    end: "bottom top",
    scrub: 0.5,
    animation: (tl) => {
      if (boxRef.current) {
        tl.to(boxRef.current, {
          rotation: 360,
          scale: 1.2,
          borderRadius: "50%",
          ease: "none",
        });
      }
    },
  });

  return (
    <section
      id="test-scroll"
      ref={sectionRef}
      className="relative z-10 min-h-screen py-32 flex flex-col items-center justify-center bg-black"
    >
      <Container className="text-center flex flex-col items-center">
        <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-semibold mb-2">
          Animation & Scroll Engine
        </span>
        <h2 className="text-3xl font-bold text-white mb-4 sm:text-4xl">
          Lenis + GSAP Scroll Synchronization
        </h2>
        <p className="text-neutral-400 max-w-xl mb-12 text-sm sm:text-base">
          Scroll up and down to observe synchronized Lenis inertia scrolling, GSAP ScrollTrigger timeline interpolation, and 3D scene responsiveness.
        </p>

        <div
          ref={boxRef}
          className="h-36 w-36 rounded-2xl bg-gradient-to-tr from-lime-400 via-emerald-400 to-green-500 p-0.5 shadow-2xl shadow-lime-500/30 flex items-center justify-center"
        >
          <div className="h-full w-full rounded-[14px] bg-black flex items-center justify-center font-mono text-xs text-lime-400 font-bold">
            GSAP SCRUB
          </div>
        </div>
      </Container>
    </section>
  );
}
