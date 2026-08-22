"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TECH_FEATURES = [
  {
    title: "React Three Fiber & Drei",
    description:
      "Isolated 3D canvas pipeline, responsive DPR scaling, instanced particles, and custom lighting setup.",
    tag: "3D Engine",
  },
  {
    title: "GSAP & ScrollTrigger",
    description:
      "Cinematic timeline animations, scroll-driven object transforms, and coordinated scene updates.",
    tag: "Animations",
  },
  {
    title: "Lenis Smooth Scroll",
    description:
      "Hardware-accelerated inertia scroll synchronized with GSAP ticker loop and zero scroll-jacking.",
    tag: "Scroll Engine",
  },
  {
    title: "Strict TypeScript",
    description:
      "Fully typed 3D scene props, animation options, performance tiers, and zero implicit any.",
    tag: "Quality",
  },
  {
    title: "Performance & Resilience",
    description:
      "Automatic mobile DPR capping, resource disposal patterns, and WebGL error boundary fallbacks.",
    tag: "Performance",
  },
  {
    title: "Tailwind CSS & Modular UI",
    description:
      "Decoupled HTML UI components kept completely separate from Three.js render cycles.",
    tag: "Styling",
  },
];

export function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    triggerRef: sectionRef,
    start: "top 80%",
    end: "bottom 20%",
    scrub: false,
    animation: (tl) => {
      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    },
  });

  return (
    <section id="features" ref={sectionRef} className="relative z-10 py-24 bg-black/80">
      <Container>
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-semibold">
            Bounty Bytes Architecture
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Configured System Modules
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base">
            Verified production foundation configured for high-performance 3D web applications.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_FEATURES.map((feature, idx) => (
            <Card key={idx} className="flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-lime-400 bg-lime-500/10 rounded-md border border-lime-500/20 mb-3">
                  {feature.tag}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
