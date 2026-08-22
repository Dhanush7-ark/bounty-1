"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { animateHeroEntrance } from "@/animations/gsap/hero";
import { useLoadingState } from "@/hooks/useLoadingState";

export function HeroSection() {
  const { isRevealed } = useLoadingState();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run hero entrance after the cinematic loader finishes
    if (!isRevealed) return;

    const tl = animateHeroEntrance(
      titleRef.current,
      subtitleRef.current,
      ctaRef.current
    );
    return () => {
      tl.kill();
    };
  }, [isRevealed]);

  return (
    <section id="hero" className="relative flex min-h-screen items-center pt-20 bg-black">
      <Container className="relative z-10 py-16 text-center">
        <div className="mx-auto max-w-4xl flex flex-col items-center">
          {/* Logo Showcase */}
          <div className="mb-8 relative flex items-center justify-center p-4 rounded-2xl border border-lime-500/20 bg-black/60 backdrop-blur-md shadow-2xl shadow-lime-500/10">
            <Image
              src="/images/image.png"
              alt="Bounty Bytes AI Studios"
              width={260}
              height={75}
              className="h-16 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(132,204,22,0.4)]"
              priority
            />
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 text-xs font-semibold text-lime-400 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
            Bounty Bytes AI Studios • 3D Architecture Stack
          </div>

          <h1
            ref={titleRef}
            className="mb-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl uppercase"
            style={{ opacity: 0 }}
          >
            Next-Gen{" "}
            <span className="bg-gradient-to-r from-lime-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
              3D AI Interactive
            </span>{" "}
            Experiences
          </h1>

          <p
            ref={subtitleRef}
            className="mb-10 max-w-2xl text-base text-neutral-300 sm:text-lg lg:text-xl leading-relaxed"
            style={{ opacity: 0 }}
          >
            High-performance 3D web platform built with Next.js App Router, TypeScript,
            React Three Fiber, GSAP, Lenis, and Tailwind CSS.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ opacity: 0 }}
          >
            <Button size="lg" onClick={() => {
              const el = document.getElementById("features");
              el?.scrollIntoView({ behavior: "smooth" });
            }}>
              Explore Tech Stack
            </Button>
            <Button variant="outline" size="lg" onClick={() => {
              const el = document.getElementById("test-scroll");
              el?.scrollIntoView({ behavior: "smooth" });
            }}>
              Verify Smooth Scroll
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
