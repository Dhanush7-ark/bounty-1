"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { animateHeroEntrance } from "@/animations/gsap/hero";
import { useLoadingState } from "@/hooks/useLoadingState";
import { Phone } from "lucide-react";

export function HeroSection() {
  const { isRevealed } = useLoadingState();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    <section id="hero" className="relative flex min-h-screen items-center pt-24 pb-16 bg-black text-white overflow-hidden">
      <Container className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="w-full flex flex-col items-center justify-center text-center">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-center max-w-4xl"
          >
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

          <p
            ref={subtitleRef}
            className="text-neutral-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mb-8 text-center mx-auto"
          >
            Transform how you work with cutting-edge AI and automation solutions designed to streamline processes, enhance productivity, and accelerate growth.
          </p>

          <div ref={ctaRef} className="relative flex flex-col items-center justify-center gap-4 text-center">
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
      </Container>
    </section>
  );
}
