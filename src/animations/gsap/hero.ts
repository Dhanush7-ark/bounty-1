import { gsap } from "@/lib/gsap";

export function animateHeroEntrance(
  titleRef: HTMLElement | null,
  subtitleRef: HTMLElement | null,
  ctaRef: HTMLElement | null
): gsap.core.Timeline {
  const tl = gsap.timeline();

  if (titleRef) {
    tl.fromTo(
      titleRef,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    );
  }

  if (subtitleRef) {
    tl.fromTo(
      subtitleRef,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
      "-=0.7"
    );
  }

  if (ctaRef) {
    tl.fromTo(
      ctaRef,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );
  }

  return tl;
}
